import { useEffect, useMemo, useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath } from "../../i18n/config";
import type { HubDestination } from "../../data/hub";
import {
  industrialCapabilities,
  industrialSortOptions,
  industrialTagFilters,
  type IndustrialSortId,
  type IndustrialTagId,
} from "../../data/industrialExperience";
import CapabilityCard from "./CapabilityCard";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
  externalQuery: string;
};

function resolveCapabilityHref(lang: Lang, destination: HubDestination, capabilitySlug: string) {
  if (destination.type === "external") {
    const targetUrl = new URL(destination.url);
    targetUrl.searchParams.set("utm_source", "boltwatts-hub");
    targetUrl.searchParams.set("utm_campaign", "industrial");
    targetUrl.searchParams.set("utm_content", capabilitySlug);
    return targetUrl.toString();
  }
  const base = buildPath(lang, destination.route);
  const params = destination.query ? new URLSearchParams(destination.query).toString() : "";
  return params ? `${base}?${params}` : base;
}

export default function IndustrialCapabilities({ dict, lang, contactPath, externalQuery }: Props) {
  const [query, setQuery] = useState(externalQuery);
  const [activeTag, setActiveTag] = useState<IndustrialTagId | "all">("all");
  const [sortBy, setSortBy] = useState<IndustrialSortId>("popular");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setQuery(externalQuery);
  }, [externalQuery]);

  const projectType = dict.home.quoteRouter.projectTypes[2];

  const filteredCapabilities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const listed = industrialCapabilities.filter((capability) => {
      const byTag = activeTag === "all" || capability.tags.includes(activeTag);
      const content = dict.industrialPage.capabilityCatalog.content[capability.id];
      const byQuery =
        !normalizedQuery ||
        content.title.toLowerCase().includes(normalizedQuery) ||
        content.description.toLowerCase().includes(normalizedQuery);
      return byTag && byQuery;
    });
    if (sortBy === "az") {
      return [...listed].sort((a, b) =>
        dict.industrialPage.capabilityCatalog.content[a.id].title.localeCompare(
          dict.industrialPage.capabilityCatalog.content[b.id].title
        )
      );
    }
    return [...listed].sort((a, b) => b.popularity - a.popularity);
  }, [activeTag, sortBy, query, dict.industrialPage.capabilityCatalog.content]);

  return (
    <section id="industrial-capabilities" className="py-14 border-t border-bw-lightgray" aria-labelledby="industrial-capabilities-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="industrial-capabilities-title" className="text-2xl font-semibold text-bw-navy">
            {dict.industrialPage.capabilityCatalog.title}
          </h2>
          <p className="mt-2 text-bw-gray">{dict.industrialPage.capabilityCatalog.subtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-bw-navy">{dict.industrialPage.capabilityCatalog.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.industrialPage.capabilityCatalog.searchPlaceholder}
            className="mt-2 w-full rounded-xl border border-bw-lightgray px-4 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-bw-navy">{dict.industrialPage.capabilityCatalog.sortLabel}</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as IndustrialSortId)}
            className="mt-2 rounded-xl border border-bw-lightgray px-3 py-2 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {industrialSortOptions.map((option) => (
              <option key={option} value={option}>
                {dict.industrialPage.capabilityCatalog.sortOptions[option]}
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
            activeTag === "all"
              ? "border-bw-primary bg-bw-primary text-white"
              : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
          }`}
        >
          {dict.industrialPage.capabilityCatalog.allTags}
        </button>
        {industrialTagFilters.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
              activeTag === tag
                ? "border-bw-primary bg-bw-primary text-white"
                : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
            }`}
          >
            {dict.industrialPage.capabilityCatalog.tags[tag]}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCapabilities.map((capability) => {
          const content = dict.industrialPage.capabilityCatalog.content[capability.id];
          const destinationHref = resolveCapabilityHref(lang, capability.destination, capability.id);
          return (
            <CapabilityCard
              key={capability.id}
              id={capability.id}
              image={capability.image}
              title={content.title}
              description={content.description}
              tags={capability.tags.map((tag) => dict.industrialPage.capabilityCatalog.tags[tag])}
              isExpanded={expandedId === capability.id}
              onToggle={() => setExpandedId((prev) => (prev === capability.id ? null : capability.id))}
              onTagClick={(label) => {
                const match = Object.entries(dict.industrialPage.capabilityCatalog.tags).find(
                  ([, value]) => value === label
                );
                if (match) {
                  setActiveTag(match[0] as IndustrialTagId);
                }
              }}
              labels={{
                learnMore: dict.industrialPage.capabilityCatalog.learnMore,
                routeRequest: dict.industrialPage.capabilityCatalog.routeRequest,
                openDestination: dict.industrialPage.capabilityCatalog.openDestination,
                expandedLabel: dict.industrialPage.capabilityCatalog.expandedLabel,
                collapsedLabel: dict.industrialPage.capabilityCatalog.collapsedLabel,
                whatItCovers: dict.industrialPage.capabilityCatalog.detailLabels.whatItCovers,
                typicalScope: dict.industrialPage.capabilityCatalog.detailLabels.typicalScope,
                deliverables: dict.industrialPage.capabilityCatalog.detailLabels.deliverables,
                faqs: dict.industrialPage.capabilityCatalog.detailLabels.faqs,
                quote: dict.industrialPage.capabilityCatalog.detailLabels.quote,
              }}
              details={{
                title: content.details.title,
                destinationHref,
                whatItCovers: content.details.whatItCovers,
                typicalScope: content.details.typicalScope,
                deliverables: content.details.commonDeliverables,
                faqs: content.details.faqs,
              }}
              contactPath={contactPath}
              projectType={projectType}
              serviceId={capability.serviceId}
              campaign="industrial"
              utmContent={capability.id}
              placeholderLabel={dict.home.imageFallback}
            />
          );
        })}
      </div>

      {filteredCapabilities.length === 0 ? (
        <p className="mt-5 rounded-xl border border-bw-lightgray bg-bw-lightblue/40 p-4 text-sm text-bw-gray">
          {dict.industrialPage.capabilityCatalog.emptyState}
        </p>
      ) : null}
    </section>
  );
}
