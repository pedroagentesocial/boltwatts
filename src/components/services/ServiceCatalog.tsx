import { useEffect, useMemo, useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath } from "../../i18n/config";
import {
  servicesCatalog,
  serviceDivisionFilters,
  serviceSortOptions,
  serviceTagFilters,
  type ServicesDivisionFilter,
  type ServiceSortId,
  type ServiceTagId,
} from "../../data/servicesCatalog";
import type { HubDestination } from "../../data/hub";
import ServiceCard from "./ServiceCard";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
  externalQuery: string;
};

function resolveCatalogHref(lang: Lang, destination: HubDestination, serviceId: string) {
  if (destination.type === "external") {
    const targetUrl = new URL(destination.url);
    targetUrl.searchParams.set("utm_source", "boltwatts-hub");
    targetUrl.searchParams.set("utm_campaign", "services");
    targetUrl.searchParams.set("utm_content", serviceId);
    return targetUrl.toString();
  }
  const base = buildPath(lang, destination.route);
  const params = destination.query ? new URLSearchParams(destination.query).toString() : "";
  return params ? `${base}?${params}` : base;
}

export default function ServiceCatalog({ dict, lang, contactPath, externalQuery }: Props) {
  const [query, setQuery] = useState(externalQuery);
  const [activeDivision, setActiveDivision] = useState<ServicesDivisionFilter>("all");
  const [activeTag, setActiveTag] = useState<ServiceTagId | "all">("all");
  const [sortBy, setSortBy] = useState<ServiceSortId>("popular");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  const projectTypeByDivision = {
    residential: dict.home.quoteRouter.projectTypes[0],
    commercial: dict.home.quoteRouter.projectTypes[1],
    industrial: dict.home.quoteRouter.projectTypes[2],
  } as const;

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setQuery(externalQuery);
  }, [externalQuery]);

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const listed = servicesCatalog.filter((service) => {
      const byDivision = activeDivision === "all" || service.division === activeDivision;
      const byTag = activeTag === "all" || service.tags.includes(activeTag);
      const content = dict.servicesPage.catalogContent[service.id];
      const byQuery =
        !normalizedQuery ||
        content.title.toLowerCase().includes(normalizedQuery) ||
        content.description.toLowerCase().includes(normalizedQuery);
      return byDivision && byTag && byQuery;
    });
    if (sortBy === "az") {
      return [...listed].sort((a, b) =>
        dict.servicesPage.catalogContent[a.id].title.localeCompare(dict.servicesPage.catalogContent[b.id].title)
      );
    }
    return [...listed].sort((a, b) => b.popularity - a.popularity);
  }, [activeDivision, activeTag, sortBy, query, dict.servicesPage.catalogContent]);

  const routeMeProject =
    activeDivision === "all" ? "" : projectTypeByDivision[activeDivision as keyof typeof projectTypeByDivision];

  return (
    <section id="services-catalog" className="py-14 border-t border-bw-lightgray" aria-labelledby="catalog-title">
      <div
        className={`fixed left-0 right-0 z-40 border-b border-bw-lightgray bg-white/95 backdrop-blur transition-all duration-300 ${
          showSticky
            ? "pointer-events-auto top-[64px] translate-y-0 opacity-100"
            : "pointer-events-none top-[64px] -translate-y-6 opacity-0"
        }`}
      >
        <div className="container-responsive py-3">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="block">
              <span className="sr-only">{dict.servicesPage.utilityBar.searchLabel}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={dict.servicesPage.utilityBar.searchPlaceholder}
                className="w-full rounded-lg border border-bw-lightgray px-3 py-2 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              />
            </label>
            <div className="inline-flex w-full flex-wrap rounded-lg border border-bw-lightgray p-1 lg:w-auto" role="tablist" aria-label={dict.servicesPage.utilityBar.divisionLabel}>
              {serviceDivisionFilters.map((division) => (
                <button
                  key={`utility-${division}`}
                  type="button"
                  role="tab"
                  aria-selected={activeDivision === division}
                  onClick={() => setActiveDivision(division)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                    activeDivision === division
                      ? "bg-bw-primary text-white"
                      : "text-bw-navy hover:bg-bw-lightblue/70"
                  }`}
                >
                  {dict.servicesPage.divisions[division]}
                </button>
              ))}
            </div>
            <a
              href={contactPath}
              data-quote-open="true"
              data-project={routeMeProject}
              data-campaign="services"
              className="inline-flex items-center justify-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {dict.servicesPage.utilityBar.routeButton}
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="catalog-title" className="text-2xl font-semibold text-bw-navy">
            {dict.servicesPage.catalogTitle}
          </h2>
          <p className="mt-2 text-bw-gray">{dict.servicesPage.catalogSubtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-bw-navy">{dict.servicesPage.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.servicesPage.searchPlaceholder}
            className="mt-2 w-full rounded-xl border border-bw-lightgray px-4 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          />
        </label>

        <div className="inline-flex flex-wrap rounded-xl border border-bw-lightgray bg-white p-1" role="tablist" aria-label={dict.servicesPage.filterDivisionLabel}>
          {serviceDivisionFilters.map((division) => (
            <button
              key={division}
              type="button"
              role="tab"
              aria-selected={activeDivision === division}
              onClick={() => setActiveDivision(division)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                activeDivision === division ? "bg-bw-primary text-white" : "text-bw-navy hover:bg-bw-lightblue/70"
              }`}
            >
              {dict.servicesPage.divisions[division]}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-bw-navy">{dict.servicesPage.sortLabel}</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as ServiceSortId)}
            className="mt-2 rounded-xl border border-bw-lightgray px-3 py-2 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {serviceSortOptions.map((option) => (
              <option key={option} value={option}>
                {dict.servicesPage.sortOptions[option]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
            activeTag === "all" ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
          }`}
        >
          {dict.servicesPage.allTags}
        </button>
        {serviceTagFilters.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
              activeTag === tag ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
            }`}
          >
            {dict.servicesPage.tags[tag]}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => {
          const content = dict.servicesPage.catalogContent[service.id];
          const divisionLabel = dict.servicesPage.divisions[service.division];
          const projectType = projectTypeByDivision[service.division];
          const linkTags = service.tags.map((tag) => dict.servicesPage.tags[tag]);
          const destinationHref = resolveCatalogHref(lang, service.destination, service.id);
          const details = content.details;
          return (
            <ServiceCard
              key={`service-card-${service.id}`}
              id={service.id}
              image={service.image}
              title={content.title}
              description={content.description}
              divisionLabel={divisionLabel}
              tags={linkTags}
              isExpanded={expandedId === service.id}
              onToggle={() => setExpandedId((prev) => (prev === service.id ? null : service.id))}
              onTagClick={(label) => {
                const match = Object.entries(dict.servicesPage.tags).find(([, value]) => value === label);
                if (match) {
                  setActiveTag(match[0] as ServiceTagId);
                }
              }}
              labels={{
                learnMore: dict.servicesPage.learnMore,
                getRouted: dict.servicesPage.getRouted,
                openDestination: dict.servicesPage.detailLabels.openDestination,
                expandedLabel: dict.servicesPage.expandedLabel,
                collapsedLabel: dict.servicesPage.collapsedLabel,
                whatItCovers: dict.servicesPage.detailLabels.whatItCovers,
                typicalScope: dict.servicesPage.detailLabels.typicalScope,
                deliverables: dict.servicesPage.detailLabels.deliverables,
                faqs: dict.servicesPage.detailLabels.faqs,
                quote: dict.servicesPage.detailLabels.requestQuote,
              }}
              details={{
                title: details.title,
                destinationHref,
                whatItCovers: details.whatItCovers,
                typicalScope: details.typicalScope,
                deliverables: details.commonDeliverables,
                faqs: details.faqs,
              }}
              contactPath={contactPath}
              projectType={projectType}
              placeholderLabel={dict.home.imageFallback}
            />
          );
        })}
      </div>

      {filteredServices.length === 0 ? (
        <p className="mt-5 rounded-xl border border-bw-lightgray bg-bw-lightblue/40 p-4 text-sm text-bw-gray">
          {dict.servicesPage.emptyState}
        </p>
      ) : null}
    </section>
  );
}
