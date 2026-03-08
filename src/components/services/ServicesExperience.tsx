import { useMemo, useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath, withBasePath } from "../../i18n/config";
import { siteConfig } from "../../config/site";
import { divisionSpotlights, servicesCatalog, type ServicesDivision } from "../../data/servicesCatalog";
import ServiceCatalog from "./ServiceCatalog";
import DivisionSpotlight from "./DivisionSpotlight";
import HowWeWork from "./HowWeWork";
import Testimonials from "../hub/Testimonials";
import FinalCTA from "../hub/FinalCTA";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
};

export default function ServicesExperience({ dict, lang, contactPath }: Props) {
  const [heroQuery, setHeroQuery] = useState("");

  const catalogById = useMemo(() => new Map(servicesCatalog.map((item) => [item.id, item])), []);

  const projectTypeByDivision = {
    residential: dict.home.quoteRouter.projectTypes[0],
    commercial: dict.home.quoteRouter.projectTypes[1],
    industrial: dict.home.quoteRouter.projectTypes[2],
  } as const;

  const spotlights = (["residential", "commercial", "industrial"] as ServicesDivision[]).map((division) => {
    const serviceIds = divisionSpotlights[division];
    const cards = serviceIds
      .map((serviceId) => {
        const service = catalogById.get(serviceId);
        if (!service) return null;
        const content = dict.servicesPage.catalogContent[serviceId];
        return {
          id: service.id,
          title: content.title,
          description: content.description,
          image: service.image,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    return {
      id: `spotlight-${division}`,
      title: dict.servicesPage.spotlights[division].title,
      subtitle: dict.servicesPage.spotlights[division].subtitle,
      ctaLabel: dict.servicesPage.spotlights[division].cta,
      projectType: projectTypeByDivision[division],
      cards,
    };
  });

  const testimonialsWithAvatars = dict.servicesPage.testimonials.items.map((item, index) => ({
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
      <section className="py-14 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bw-primary">{dict.servicesPage.hero.kicker}</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold text-bw-navy sm:text-5xl">
              {dict.servicesPage.hero.title}
            </h1>
            <p className="mt-4 max-w-prose text-lg text-bw-gray">{dict.servicesPage.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contactPath}
                data-quote-open="true"
                data-campaign="services"
                className="inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.servicesPage.hero.primaryCta}
              </a>
              <a
                href="#services-catalog"
                className="inline-flex items-center rounded-md border border-bw-lightgray px-5 py-2.5 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.servicesPage.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm">
            <label className="block">
              <span className="text-sm font-semibold text-bw-navy">{dict.servicesPage.hero.finderLabel}</span>
              <input
                type="search"
                value={heroQuery}
                onChange={(event) => setHeroQuery(event.target.value)}
                placeholder={dict.servicesPage.hero.finderPlaceholder}
                className="mt-2 w-full rounded-xl border border-bw-lightgray px-4 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              />
            </label>
            <a
              href="#services-catalog"
              className="mt-4 inline-flex items-center rounded-md border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {dict.servicesPage.hero.finderAction}
            </a>
          </div>
        </div>
      </section>

      <ServiceCatalog dict={dict} lang={lang} contactPath={contactPath} externalQuery={heroQuery} />

      {spotlights.map((spotlight) => (
        <DivisionSpotlight
          key={spotlight.id}
          id={spotlight.id}
          title={spotlight.title}
          subtitle={spotlight.subtitle}
          ctaLabel={spotlight.ctaLabel}
          contactPath={contactPath}
          projectType={spotlight.projectType}
          services={spotlight.cards}
          placeholderLabel={dict.home.imageFallback}
        />
      ))}

      <HowWeWork
        title={dict.servicesPage.process.title}
        subtitle={dict.servicesPage.process.subtitle}
        tabLabel={dict.servicesPage.process.tabLabel}
        activeLabel={dict.servicesPage.process.activeLabel}
        expectationsTitle={dict.servicesPage.process.expectationsTitle}
        expectations={dict.servicesPage.process.expectations}
        steps={dict.servicesPage.process.steps}
      />

      <Testimonials
        title={dict.servicesPage.testimonials.title}
        subtitle={dict.servicesPage.testimonials.subtitle}
        reviewsBadgeLabel={dict.common.googleReviews.badgeLabel}
        reviewsMicrocopy={dict.common.googleReviews.microcopy}
        reviewsLinkLabel={dict.common.googleReviews.linkLabel}
        reviewsAriaLabel={dict.common.googleReviews.openLabel}
        ariaLabel={dict.servicesPage.testimonials.controlsLabel}
        previousLabel={dict.servicesPage.testimonials.previous}
        nextLabel={dict.servicesPage.testimonials.next}
        ctaLabel={dict.servicesPage.testimonials.cta}
        contactPath={contactPath}
        placeholderLabel={dict.home.imageFallback}
        starsLabel={dict.servicesPage.testimonials.ratingLabel}
        items={testimonialsWithAvatars}
      />

      <FinalCTA
        title={dict.servicesPage.finalCta.title}
        subtitle={dict.servicesPage.finalCta.subtitle}
        quoteLabel={dict.servicesPage.finalCta.primary}
        callLabel={dict.servicesPage.finalCta.secondary}
        quickLinksTitle={dict.servicesPage.finalCta.quickLinksTitle}
        socialTitle={dict.servicesPage.finalCta.socialTitle}
        contactPath={contactPath}
        phoneHref={siteConfig.phoneHref}
        socials={socialItems}
        quickLinks={quickLinks}
      />
    </>
  );
}
