import { useMemo, useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath, withBasePath } from "../../i18n/config";
import { siteConfig } from "../../config/site";
import {
  catalogTags,
  divisionFilters,
  homeServiceCards,
  projectPreviewImages,
  type HomeDivisionFilter,
  type HomeDivisionId,
  type HomeTagId,
} from "../../data/homeExperience";
import ImageCard from "./ImageCard";
import Testimonials from "./Testimonials";
import FinalCTA from "./FinalCTA";
import DivisionRouterSection from "./DivisionRouterSection";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
  projectsPath: string;
};

export default function PostHeroExperience({ dict, lang, contactPath, projectsPath }: Props) {
  const [activeDivisionFilter, setActiveDivisionFilter] = useState<HomeDivisionFilter>("all");
  const [serviceQuery, setServiceQuery] = useState("");
  const [activeTag, setActiveTag] = useState<HomeTagId | "all">("all");
  const [activeStep, setActiveStep] = useState(0);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const projectTypeByDivision: Record<HomeDivisionId, string> = {
    residential: dict.home.quoteRouter.projectTypes[0],
    commercial: dict.home.quoteRouter.projectTypes[1],
    industrial: dict.home.quoteRouter.projectTypes[2],
  };

  const filteredCatalog = useMemo(() => {
    const query = serviceQuery.trim().toLowerCase();
    return homeServiceCards.filter((card) => {
      const byDivision = activeDivisionFilter === "all" || card.division === activeDivisionFilter;
      const byTag = activeTag === "all" || card.tags.includes(activeTag);
      const name = dict.home.services[card.serviceId].name.toLowerCase();
      const description = dict.home.services[card.serviceId].description.toLowerCase();
      const byQuery = !query || name.includes(query) || description.includes(query);
      return byDivision && byTag && byQuery;
    });
  }, [activeDivisionFilter, activeTag, serviceQuery, dict.home.services]);

  const testimonialsWithAvatars = dict.home.testimonials.items.map((item, index) => ({
    ...item,
    avatar: withBasePath(`/images/testimonial-avatar-${(index % 3) + 1}.svg`),
  }));

  const quickLinks = [
    { label: dict.common.nav.services, href: buildPath(lang, "services") },
    { label: dict.common.nav.industrial, href: buildPath(lang, "industrial") },
    { label: dict.common.nav.projects, href: buildPath(lang, "projects") },
    { label: dict.common.nav.contact, href: buildPath(lang, "contact") },
  ];

  const socialItems = [
    { id: "facebook" as const, label: dict.home.finalCta.socialLabels.facebook, href: siteConfig.socialLinks.facebook },
    { id: "instagram" as const, label: dict.home.finalCta.socialLabels.instagram, href: siteConfig.socialLinks.instagram },
    { id: "linkedin" as const, label: dict.home.finalCta.socialLabels.linkedin, href: siteConfig.socialLinks.linkedin },
    { id: "youtube" as const, label: dict.home.finalCta.socialLabels.youtube, href: siteConfig.socialLinks.youtube },
  ];

  return (
    <>
      <DivisionRouterSection dict={dict} contactPath={contactPath} projectTypeByDivision={projectTypeByDivision} />

      <section id="service-finder" data-animate className="py-12 border-t border-bw-lightgray sm:py-14 data-[state=visible]:motion-safe:animate-in data-[state=visible]:motion-safe:fade-in data-[state=visible]:motion-safe:slide-in-from-bottom-3">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">{dict.home.servicesPreview.title}</h2>
              <p className="mt-2 text-white/85">{dict.home.servicesPreview.subtitle}</p>
            </div>
            <p className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-sm font-semibold text-white sm:text-right">
              {dict.home.servicesPreview.resultsCount.replace("{{count}}", String(filteredCatalog.length))}
            </p>
          </div>

          <div className="relative z-10 mt-5 rounded-2xl border border-white/30 bg-white/95 p-3 shadow-[0_12px_32px_rgba(3,25,52,0.15)] sm:mt-6 sm:p-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <label className="block">
                <span className="text-sm font-semibold text-bw-navy">{dict.home.servicesPreview.searchLabel}</span>
                <div className="mt-2 flex items-center rounded-xl border border-bw-lightgray bg-white px-3">
                  <span className="text-bw-gray/70">⌕</span>
                  <input
                    type="search"
                    value={serviceQuery}
                    onChange={(event) => setServiceQuery(event.target.value)}
                    placeholder={dict.home.servicesPreview.searchPlaceholder}
                    className="w-full bg-transparent px-2 py-2.5 text-sm text-bw-navy focus-visible:outline-none"
                  />
                </div>
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end">
                {divisionFilters.map((division) => (
                  <button
                    key={division}
                    type="button"
                    onClick={() => setActiveDivisionFilter(division)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                      activeDivisionFilter === division
                        ? "border-bw-primary bg-bw-primary text-white"
                        : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
                    }`}
                  >
                    {dict.home.servicesPreview.filters[division]}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTag("all")}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                  activeTag === "all" ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
                }`}
              >
                {dict.home.servicesPreview.filterAll}
              </button>
              {catalogTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                    activeTag === tag ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
                  }`}
                >
                  {dict.home.servicesPreview.tags[tag]}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-6 grid gap-4 md:mt-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredCatalog.map((card) => {
            const service = dict.home.services[card.serviceId];
            const projectType = projectTypeByDivision[card.division];
            const isExpanded = expandedServiceId === card.id;
            return (
              <article
                key={`catalog-${card.id}`}
                className="group overflow-hidden rounded-2xl border border-white/35 bg-white/95 shadow-[0_12px_32px_rgba(3,25,52,0.15)] transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(3,25,52,0.2)] focus-within:ring-2 focus-within:ring-white/80"
              >
                <ImageCard
                  src={card.image}
                  alt={service.name}
                  fallbackLabel={dict.home.imageFallback}
                  className="h-40 w-full border-b border-bw-lightgray sm:h-44"
                />
                <div className="p-4 sm:p-5">
                  <span className="inline-flex rounded-full border border-bw-lightgray bg-bw-lightblue/70 px-2.5 py-1 text-xs font-semibold text-bw-navy">
                    {dict.home.servicesPreview.divisionLabels[card.division]}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-bw-navy">{service.name}</h3>
                  <p className="mt-2 text-sm text-bw-gray line-clamp-2">{service.description}</p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedServiceId((prev) => (prev === card.id ? null : card.id))}
                      className="text-sm font-semibold text-bw-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                    >
                      {dict.home.servicesPreview.learnMore}
                    </button>
                    <a
                      href={contactPath}
                      data-quote-open="true"
                      data-project={projectType}
                      data-service={card.serviceId}
                      className="inline-flex w-full items-center justify-center rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-auto"
                    >
                      {dict.home.servicesPreview.getRouted}
                    </a>
                  </div>
                  {isExpanded ? (
                    <div className="mt-4 rounded-xl border border-bw-lightgray bg-bw-lightblue/40 p-3 text-sm text-bw-gray">
                      <p>{dict.home.servicesPreview.moreInfoTitle}</p>
                      <p className="mt-2">{dict.home.servicesPreview.moreInfoBody}</p>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
          </div>

          {filteredCatalog.length === 0 ? (
            <p className="relative z-10 mt-5 rounded-xl border border-white/35 bg-white/20 p-4 text-sm text-white">
              {dict.home.servicesPreview.emptyState}
            </p>
          ) : null}
        </div>
      </section>

      <section data-animate className="py-12 border-t border-bw-lightgray sm:py-14 data-[state=visible]:motion-safe:animate-in data-[state=visible]:motion-safe:fade-in data-[state=visible]:motion-safe:slide-in-from-bottom-3">
        <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-bw-lightblue via-white to-[#eaf2ff] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-bw-primary/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-bw-secondary/20 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-bw-navy">{dict.home.workStepper.title}</h2>
            <p className="mt-2 max-w-prose text-bw-gray">{dict.home.workStepper.subtitle}</p>
          </div>

          <div className="relative z-10 mt-6 hidden grid-cols-4 gap-3 md:grid" role="tablist" aria-label={dict.home.workStepper.tabLabel}>
            {dict.home.workStepper.steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={index === activeStep}
                onClick={() => setActiveStep(index)}
                className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                  index === activeStep
                    ? "border-bw-primary bg-white text-bw-navy shadow-sm"
                    : "border-bw-lightgray bg-white/70 text-bw-navy hover:border-bw-primary/40 hover:bg-white"
                }`}
              >
                <span className={`text-xs uppercase tracking-[0.2em] ${index === activeStep ? "text-bw-primary" : "text-bw-gray"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-semibold">{step.title}</p>
              </button>
            ))}
          </div>

          <div className="relative z-10 mt-6 grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-white/30 bg-white/95 p-4 shadow-sm motion-safe:animate-in motion-safe:fade-in sm:p-6">
              <div className="space-y-2 md:hidden">
                {dict.home.workStepper.steps.map((step, index) => (
                  <button
                    key={`mobile-${step.title}`}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                      index === activeStep
                        ? "border-bw-primary bg-bw-lightblue/40 text-bw-navy"
                        : "border-bw-lightgray bg-white text-bw-gray"
                    }`}
                  >
                    <span>{step.title}</span>
                    <span className="text-xs uppercase tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 md:mt-0">
                <p className="text-xs uppercase tracking-[0.2em] text-bw-primary">{dict.home.workStepper.activeLabel}</p>
                <h3 className="mt-2 text-xl font-semibold text-bw-navy">{dict.home.workStepper.steps[activeStep]?.title}</h3>
                <p className="mt-2 text-sm text-bw-gray">{dict.home.workStepper.steps[activeStep]?.summary}</p>
                <p className="mt-4 text-sm text-bw-navy">{dict.home.workStepper.steps[activeStep]?.details}</p>
              </div>
            </div>

            <aside className="rounded-2xl border border-bw-lightgray bg-bw-lightblue/40 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-bw-navy">{dict.home.workStepper.expectationsTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm text-bw-gray">
                {dict.home.workStepper.expectations.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-bw-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section data-animate className="py-12 border-t border-bw-lightgray sm:py-14 data-[state=visible]:motion-safe:animate-in data-[state=visible]:motion-safe:fade-in data-[state=visible]:motion-safe:slide-in-from-bottom-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
          <div>
            <h2 className="text-xl font-semibold text-bw-navy sm:text-2xl">{dict.home.projectsPreview.title}</h2>
            <p className="mt-2 text-bw-gray">{dict.home.projectsPreview.subtitle}</p>
          </div>
          <a href={projectsPath} className="text-sm font-semibold text-bw-primary hover:underline">
            {dict.home.projectsPreview.linkLabel}
          </a>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dict.home.projectsPreview.cards.map((card, index) => (
            <a
              key={card.title}
              href={projectsPath}
              className="group overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-sm transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              <ImageCard
                src={projectPreviewImages[index] ?? projectPreviewImages[0]}
                alt={card.title}
                fallbackLabel={dict.home.imageFallback}
                className="h-40 w-full border-b border-bw-lightgray sm:h-48"
              />
              <div className="p-5">
                <span className="inline-flex rounded-full border border-bw-lightgray bg-bw-lightblue/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-bw-navy">
                  {dict.home.servicesPreview.divisionLabels[card.division]}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-bw-navy">{card.title}</h3>
                <p className="mt-2 text-sm text-bw-gray">{card.goal}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-bw-primary">{card.linkLabel}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Testimonials
        title={dict.home.testimonials.title}
        subtitle={dict.home.testimonials.subtitle}
        reviewsBadgeLabel={dict.common.googleReviews.badgeLabel}
        reviewsMicrocopy={dict.common.googleReviews.microcopy}
        reviewsLinkLabel={dict.common.googleReviews.linkLabel}
        reviewsAriaLabel={dict.common.googleReviews.openLabel}
        ariaLabel={dict.home.testimonials.controlsLabel}
        previousLabel={dict.home.testimonials.previous}
        nextLabel={dict.home.testimonials.next}
        ctaLabel={dict.home.testimonials.cta}
        contactPath={contactPath}
        placeholderLabel={dict.home.imageFallback}
        starsLabel={dict.home.testimonials.ratingLabel}
        items={testimonialsWithAvatars}
      />

      <FinalCTA
        title={dict.home.finalCta.title}
        subtitle={dict.home.finalCta.subtitle}
        quoteLabel={dict.home.finalCta.primary}
        callLabel={dict.home.finalCta.secondary}
        quickLinksTitle={dict.home.finalCta.quickLinksTitle}
        socialTitle={dict.home.finalCta.socialTitle}
        contactPath={contactPath}
        phoneHref={siteConfig.phoneHref}
        socials={socialItems}
        quickLinks={quickLinks}
      />
    </>
  );
}
