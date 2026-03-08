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
      <section className="py-14 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bw-primary">{dict.industrialPage.hero.kicker}</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold text-bw-navy sm:text-5xl">
              {dict.industrialPage.hero.title}
            </h1>
            <p className="mt-4 max-w-prose text-lg text-bw-gray">{dict.industrialPage.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contactPath}
                data-quote-open="true"
                data-project={industrialProjectType}
                data-campaign="industrial"
                className="inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.industrialPage.hero.primaryCta}
              </a>
              <a
                href="#industrial-capabilities"
                className="inline-flex items-center rounded-md border border-bw-lightgray px-5 py-2.5 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.industrialPage.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm">
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
              className="mt-4 inline-flex items-center rounded-md border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {dict.industrialPage.hero.finderAction}
            </a>
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

      <section className="py-14 border-t border-bw-lightgray bg-bw-lightblue/35 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="container-responsive">
          <h2 className="text-2xl font-semibold text-bw-navy">{dict.industrialPage.industries.title}</h2>
          <p className="mt-2 max-w-prose text-bw-gray">{dict.industrialPage.industries.subtitle}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-bw-gray">
            {dict.industrialPage.industries.examplesLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {dict.industrialPage.industries.items.map((item) => (
              <span key={item} className="rounded-full border border-bw-lightgray bg-white px-4 py-2 text-sm text-bw-gray">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-bw-lightgray">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-bw-navy">{dict.industrialPage.projects.title}</h2>
            <p className="mt-2 text-bw-gray">{dict.industrialPage.projects.subtitle}</p>
          </div>
          <a href={projectsPath} className="text-sm font-semibold text-bw-primary hover:underline">
            {dict.industrialPage.projects.linkLabel}
          </a>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dict.industrialPage.projects.cards.map((card, index) => (
            <a
              key={card.title}
              href={projectsPath}
              className="group overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-sm transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              <ImageCard
                src={industrialProjectPreviewImages[index] ?? industrialProjectPreviewImages[0]}
                alt={card.title}
                fallbackLabel={dict.home.imageFallback}
                className="h-48 w-full border-b border-bw-lightgray"
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
