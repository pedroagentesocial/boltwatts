import { useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath, withBasePath } from "../../i18n/config";
import { siteConfig } from "../../config/site";
import ProjectsGrid from "./ProjectsGrid";
import FeaturedProjectsCarousel from "./FeaturedProjectsCarousel";
import Testimonials from "../hub/Testimonials";
import FinalCTA from "../hub/FinalCTA";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
};

export default function ProjectsExperience({ dict, lang, contactPath }: Props) {
  const [heroQuery, setHeroQuery] = useState("");
  const defaultProjectType = dict.home.quoteRouter.projectTypes[0];

  const quickLinks = [
    { label: dict.common.nav.projects, href: buildPath(lang, "projects") },
    { label: dict.common.nav.services, href: buildPath(lang, "services") },
    { label: dict.common.nav.industrial, href: buildPath(lang, "industrial") },
    { label: dict.common.nav.contact, href: buildPath(lang, "contact") },
  ];

  const socialItems = [
    { id: "facebook" as const, label: dict.home.finalCta.socialLabels.facebook, href: siteConfig.socialLinks.facebook },
    { id: "instagram" as const, label: dict.home.finalCta.socialLabels.instagram, href: siteConfig.socialLinks.instagram },
    { id: "linkedin" as const, label: dict.home.finalCta.socialLabels.linkedin, href: siteConfig.socialLinks.linkedin },
    { id: "youtube" as const, label: dict.home.finalCta.socialLabels.youtube, href: siteConfig.socialLinks.youtube },
  ];

  const testimonialItems = dict.projectsPage.testimonials.items.map((item, index) => ({
    ...item,
    avatar: withBasePath(`/images/testimonial-avatar-${(index % 3) + 1}.svg`),
  }));

  return (
    <>
      <section className="py-14 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bw-primary">{dict.projectsPage.hero.kicker}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold text-bw-navy sm:text-5xl">
              {dict.projectsPage.hero.title}
            </h1>
            <p className="mt-4 max-w-prose text-lg text-bw-gray">{dict.projectsPage.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contactPath}
                data-quote-open="true"
                data-project={defaultProjectType}
                data-campaign="projects"
                className="inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.projectsPage.hero.primaryCta}
              </a>
              <a
                href="#projects-grid"
                className="inline-flex items-center rounded-md border border-bw-lightgray px-5 py-2.5 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.projectsPage.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm">
            <label className="block">
              <span className="text-sm font-semibold text-bw-navy">{dict.projectsPage.hero.searchLabel}</span>
              <input
                type="search"
                value={heroQuery}
                onChange={(event) => setHeroQuery(event.target.value)}
                placeholder={dict.projectsPage.hero.searchPlaceholder}
                className="mt-2 w-full rounded-xl border border-bw-lightgray px-4 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              />
            </label>
            <a
              href="#projects-grid"
              className="mt-4 inline-flex items-center rounded-md border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {dict.projectsPage.hero.searchAction}
            </a>
          </div>
        </div>
      </section>

      <FeaturedProjectsCarousel dict={dict} lang={lang} />
      <ProjectsGrid dict={dict} lang={lang} contactPath={contactPath} externalQuery={heroQuery} />

      <Testimonials
        title={dict.projectsPage.testimonials.title}
        subtitle={dict.projectsPage.testimonials.subtitle}
        reviewsBadgeLabel={dict.common.googleReviews.badgeLabel}
        reviewsMicrocopy={dict.common.googleReviews.microcopy}
        reviewsLinkLabel={dict.common.googleReviews.linkLabel}
        reviewsAriaLabel={dict.common.googleReviews.openLabel}
        ariaLabel={dict.projectsPage.testimonials.controlsLabel}
        previousLabel={dict.projectsPage.testimonials.previous}
        nextLabel={dict.projectsPage.testimonials.next}
        ctaLabel={dict.projectsPage.testimonials.cta}
        contactPath={contactPath}
        placeholderLabel={dict.home.imageFallback}
        starsLabel={dict.projectsPage.testimonials.ratingLabel}
        items={testimonialItems}
        quoteProjectType={defaultProjectType}
        quoteCampaign="projects"
      />

      <FinalCTA
        title={dict.projectsPage.finalCta.title}
        subtitle={dict.projectsPage.finalCta.subtitle}
        quoteLabel={dict.projectsPage.finalCta.primary}
        callLabel={dict.projectsPage.finalCta.secondary}
        quickLinksTitle={dict.projectsPage.finalCta.quickLinksTitle}
        socialTitle={dict.projectsPage.finalCta.socialTitle}
        contactPath={contactPath}
        phoneHref={siteConfig.phoneHref}
        socials={socialItems}
        quickLinks={quickLinks}
        quoteProjectType={defaultProjectType}
        quoteCampaign="projects"
        quoteContent="projects-final-cta"
      />
    </>
  );
}
