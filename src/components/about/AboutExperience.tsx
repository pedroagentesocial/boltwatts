import { useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath, withBasePath } from "../../i18n/config";
import { siteConfig } from "../../config/site";
import ImageCard from "../hub/ImageCard";
import ValuesGrid from "./ValuesGrid";
import HowWeWork from "../services/HowWeWork";
import Testimonials from "../hub/Testimonials";
import FinalCTA from "../hub/FinalCTA";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
};

export default function AboutExperience({ dict, lang, contactPath }: Props) {
  const [activeChangeId, setActiveChangeId] = useState(dict.aboutPage.quality.changeAccordion.items[0]?.id ?? "");
  const defaultProjectType = dict.home.quoteRouter.projectTypes[0];

  const quickLinks = [
    { label: dict.common.nav.about, href: buildPath(lang, "about") },
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

  const testimonialItems = dict.aboutPage.testimonials.items.map((item, index) => ({
    ...item,
    avatar: withBasePath(`/images/testimonial-avatar-${(index % 3) + 1}.svg`),
  }));

  return (
    <>
      <section className="py-14 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bw-primary">{dict.aboutPage.hero.kicker}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold text-bw-navy sm:text-5xl">{dict.aboutPage.hero.title}</h1>
            <p className="mt-4 max-w-prose text-lg text-bw-gray">{dict.aboutPage.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contactPath}
                data-quote-open="true"
                data-project={defaultProjectType}
                data-campaign="about"
                className="inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.aboutPage.hero.primaryCta}
              </a>
              <a
                href="#about-values"
                className="inline-flex items-center rounded-md border border-bw-lightgray px-5 py-2.5 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.aboutPage.hero.secondaryCta}
              </a>
            </div>
          </div>
          <ImageCard
            src={withBasePath("/images/Residential-layout-refresh.jpg")}
            alt={dict.aboutPage.hero.imageAlt}
            fallbackLabel={dict.home.imageFallback}
            className="h-72 w-full rounded-2xl border border-bw-lightgray"
          />
        </div>
      </section>

      <section className="py-14 border-t border-bw-lightgray" aria-labelledby="about-who-title">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 id="about-who-title" className="text-2xl font-semibold text-bw-navy">
              {dict.aboutPage.whoWeAre.title}
            </h2>
            <div className="mt-3 space-y-3 text-bw-gray">
              {dict.aboutPage.whoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl border border-bw-lightgray bg-bw-lightblue/50 p-6">
            <h3 className="text-lg font-semibold text-bw-navy">{dict.aboutPage.whoWeAre.atGlanceTitle}</h3>
            <div className="mt-4 space-y-3">
              {dict.aboutPage.whoWeAre.atGlanceItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-bw-lightgray bg-white p-4">
                  <p className="text-sm font-semibold text-bw-navy">{item.title}</p>
                  <p className="mt-1 text-sm text-bw-gray">{item.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <ValuesGrid dict={dict} />

      <HowWeWork
        title={dict.aboutPage.howWeWork.title}
        subtitle={dict.aboutPage.howWeWork.subtitle}
        tabLabel={dict.aboutPage.howWeWork.tabLabel}
        activeLabel={dict.aboutPage.howWeWork.activeLabel}
        expectationsTitle={dict.aboutPage.howWeWork.expectationsTitle}
        expectations={dict.aboutPage.howWeWork.expectations}
        steps={dict.aboutPage.howWeWork.steps}
      />

      <section className="py-14 border-t border-bw-lightgray bg-bw-lightblue/35" aria-labelledby="about-quality-title">
        <h2 id="about-quality-title" className="text-2xl font-semibold text-bw-navy">
          {dict.aboutPage.quality.title}
        </h2>
        <p className="mt-2 max-w-prose text-bw-gray">{dict.aboutPage.quality.subtitle}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dict.aboutPage.quality.highlights.map((item) => (
            <div key={item} className="rounded-xl border border-bw-lightgray bg-white p-4 text-sm font-semibold text-bw-navy">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-bw-lightgray bg-white p-6">
          <h3 className="text-lg font-semibold text-bw-navy">{dict.aboutPage.quality.changeAccordion.title}</h3>
          <div className="mt-4 space-y-2">
            {dict.aboutPage.quality.changeAccordion.items.map((item) => {
              const isOpen = item.id === activeChangeId;
              return (
                <div key={item.id} className="rounded-xl border border-bw-lightgray">
                  <button
                    type="button"
                    onClick={() => setActiveChangeId((prev) => (prev === item.id ? "" : item.id))}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                  >
                    <span className="text-sm font-semibold text-bw-navy">{item.question}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-bw-gray">
                      {isOpen ? dict.aboutPage.quality.changeAccordion.expandedLabel : dict.aboutPage.quality.changeAccordion.collapsedLabel}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden px-4 pb-3 text-sm text-bw-gray">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials
        title={dict.aboutPage.testimonials.title}
        subtitle={dict.aboutPage.testimonials.subtitle}
        reviewsBadgeLabel={dict.common.googleReviews.badgeLabel}
        reviewsMicrocopy={dict.common.googleReviews.microcopy}
        reviewsLinkLabel={dict.common.googleReviews.linkLabel}
        reviewsAriaLabel={dict.common.googleReviews.openLabel}
        ariaLabel={dict.aboutPage.testimonials.controlsLabel}
        previousLabel={dict.aboutPage.testimonials.previous}
        nextLabel={dict.aboutPage.testimonials.next}
        ctaLabel={dict.aboutPage.testimonials.cta}
        contactPath={contactPath}
        placeholderLabel={dict.home.imageFallback}
        starsLabel={dict.aboutPage.testimonials.ratingLabel}
        items={testimonialItems}
        quoteProjectType={defaultProjectType}
        quoteCampaign="about"
      />

      <FinalCTA
        title={dict.aboutPage.finalCta.title}
        subtitle={dict.aboutPage.finalCta.subtitle}
        quoteLabel={dict.aboutPage.finalCta.primary}
        callLabel={dict.aboutPage.finalCta.secondary}
        quickLinksTitle={dict.aboutPage.finalCta.quickLinksTitle}
        socialTitle={dict.aboutPage.finalCta.socialTitle}
        contactPath={contactPath}
        phoneHref={siteConfig.phoneHref}
        socials={socialItems}
        quickLinks={quickLinks}
        quoteProjectType={defaultProjectType}
        quoteCampaign="about"
        quoteContent="about-final-cta"
      />
    </>
  );
}
