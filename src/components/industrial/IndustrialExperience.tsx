import { useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath, withBasePath } from "../../i18n/config";
import { siteConfig } from "../../config/site";
import { industrialProjectPreviewImages } from "../../data/industrialExperience";
import IndustrialCapabilities from "./IndustrialCapabilities";
import HowWeWork from "../services/HowWeWork";
import Testimonials from "../hub/Testimonials";
import FinalCTA from "../hub/FinalCTA";
import ImageCard from "../hub/ImageCard";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
  projectsPath: string;
};

export default function IndustrialExperience({ dict, lang, contactPath, projectsPath }: Props) {
  const [finderQuery, setFinderQuery] = useState("");
  const industrialProjectType = dict.home.quoteRouter.projectTypes[2];

  const testimonialsWithAvatars = dict.industrialPage.testimonials.items.map((item, index) => ({
    ...item,
    avatar: withBasePath(`/images/testimonial-avatar-${(index % 3) + 1}.svg`),
  }));

  const quickLinks = [
    { label: dict.common.nav.industrial, href: buildPath(lang, "industrial") },
    { label: dict.common.nav.services, href: buildPath(lang, "services") },
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
      <section className="py-12 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 sm:py-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">{dict.industrialPage.hero.kicker}</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-5xl">
                {dict.industrialPage.hero.title}
              </h1>
              <p className="mt-4 max-w-prose text-base text-white/85 sm:text-lg">{dict.industrialPage.hero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={contactPath}
                  data-quote-open="true"
                  data-project={industrialProjectType}
                  data-campaign="industrial"
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-auto"
                >
                  {dict.industrialPage.hero.primaryCta}
                </a>
                <a
                  href="#industrial-capabilities"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:w-auto"
                >
                  {dict.industrialPage.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.16)] sm:p-6">
              <label className="block">
                <span className="text-sm font-semibold text-bw-navy">{dict.industrialPage.hero.finderLabel}</span>
                <input
                  type="search"
                  value={finderQuery}
                  onChange={(event) => setFinderQuery(event.target.value)}
                  placeholder={dict.industrialPage.hero.finderPlaceholder}
                  className="mt-2 w-full rounded-xl border border-bw-lightgray px-4 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                />
              </label>
              <a
                href="#industrial-capabilities"
                className="mt-4 inline-flex items-center rounded-full border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.industrialPage.hero.finderAction}
              </a>
            </div>
          </div>
        </div>
      </section>

      <IndustrialCapabilities dict={dict} lang={lang} contactPath={contactPath} externalQuery={finderQuery} />

      <HowWeWork
        title={dict.industrialPage.stepper.title}
        subtitle={dict.industrialPage.stepper.subtitle}
        tabLabel={dict.industrialPage.stepper.tabLabel}
        activeLabel={dict.industrialPage.stepper.activeLabel}
        expectationsTitle={dict.industrialPage.stepper.expectationsTitle}
        expectations={dict.industrialPage.stepper.expectations}
        steps={dict.industrialPage.stepper.steps}
      />

      <section className="py-12 border-t border-bw-lightgray sm:py-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white">{dict.industrialPage.industries.title}</h2>
            <p className="mt-2 max-w-prose text-white/85">{dict.industrialPage.industries.subtitle}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {dict.industrialPage.industries.examplesLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {dict.industrialPage.industries.items.map((item) => (
                <span key={item} className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm text-white">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-bw-lightgray sm:py-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-300/25 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"></div>
          <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-bw-navy">{dict.industrialPage.projects.title}</h2>
            <p className="mt-2 text-bw-gray">{dict.industrialPage.projects.subtitle}</p>
          </div>
          <a href={projectsPath} className="text-sm font-semibold text-bw-primary hover:underline">
            {dict.industrialPage.projects.linkLabel}
          </a>
          </div>
          <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dict.industrialPage.projects.cards.map((card, index) => (
              <a
                key={card.title}
                href={projectsPath}
                className="group overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-[0_12px_32px_rgba(3,25,52,0.12)] transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(3,25,52,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                <ImageCard
                  src={industrialProjectPreviewImages[index] ?? industrialProjectPreviewImages[0]}
                  alt={card.title}
                  fallbackLabel={dict.home.imageFallback}
                  className="h-40 w-full border-b border-bw-lightgray sm:h-48"
                />
                <div className="p-5">
                  <span className="inline-flex rounded-full border border-bw-lightgray bg-bw-lightblue/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-bw-navy">
                    {card.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-bw-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-bw-gray">{card.goal}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-bw-primary">{card.linkLabel}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Testimonials
        title={dict.industrialPage.testimonials.title}
        subtitle={dict.industrialPage.testimonials.subtitle}
        reviewsBadgeLabel={dict.common.googleReviews.badgeLabel}
        reviewsMicrocopy={dict.common.googleReviews.microcopy}
        reviewsLinkLabel={dict.common.googleReviews.linkLabel}
        reviewsAriaLabel={dict.common.googleReviews.openLabel}
        ariaLabel={dict.industrialPage.testimonials.controlsLabel}
        previousLabel={dict.industrialPage.testimonials.previous}
        nextLabel={dict.industrialPage.testimonials.next}
        ctaLabel={dict.industrialPage.testimonials.cta}
        contactPath={contactPath}
        placeholderLabel={dict.home.imageFallback}
        starsLabel={dict.industrialPage.testimonials.ratingLabel}
        items={testimonialsWithAvatars}
      />

      <FinalCTA
        title={dict.industrialPage.finalCta.title}
        subtitle={dict.industrialPage.finalCta.subtitle}
        quoteLabel={dict.industrialPage.finalCta.primary}
        callLabel={dict.industrialPage.finalCta.secondary}
        quickLinksTitle={dict.industrialPage.finalCta.quickLinksTitle}
        socialTitle={dict.industrialPage.finalCta.socialTitle}
        contactPath={contactPath}
        phoneHref={siteConfig.phoneHref}
        socials={socialItems}
        quickLinks={quickLinks}
      />
    </>
  );
}
