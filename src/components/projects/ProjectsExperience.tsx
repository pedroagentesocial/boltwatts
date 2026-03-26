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
      <section className="py-12 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 sm:py-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">{dict.projectsPage.hero.kicker}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-5xl">
                {dict.projectsPage.hero.title}
              </h1>
              <p className="mt-4 max-w-prose text-base text-white/85 sm:text-lg">{dict.projectsPage.hero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={contactPath}
                  data-quote-open="true"
                  data-project={defaultProjectType}
                  data-campaign="projects"
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-auto"
                >
                  {dict.projectsPage.hero.primaryCta}
                </a>
                <a
                  href="#projects-grid"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:w-auto"
                >
                  {dict.projectsPage.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.16)] sm:p-6">
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
                className="mt-4 inline-flex items-center rounded-full border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.projectsPage.hero.searchAction}
              </a>
            </div>
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
