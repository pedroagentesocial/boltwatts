import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath, withBasePath } from "../../i18n/config";
import { siteConfig } from "../../config/site";
import type { HubServiceCategory } from "../../data/hub";
import ImageCard from "../hub/ImageCard";
import FinalCTA from "../hub/FinalCTA";
import ContactOptions from "./ContactOptions";
import ContactForm from "./ContactForm";
import NextSteps from "./NextSteps";
import ContactFAQ from "./ContactFAQ";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
  serviceCategories: HubServiceCategory[];
};

export default function ContactExperience({ dict, lang, contactPath, serviceCategories }: Props) {
  const defaultProjectType = dict.home.quoteRouter.projectTypes[0];
  const defaultService = serviceCategories.find((item) => item.division === "residential")?.id ?? "";

  const quickLinks = [
    { label: dict.common.nav.contact, href: buildPath(lang, "contact") },
    { label: dict.common.nav.services, href: buildPath(lang, "services") },
    { label: dict.common.nav.projects, href: buildPath(lang, "projects") },
    { label: dict.common.nav.about, href: buildPath(lang, "about") },
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
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">{dict.contactPage.hero.kicker}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-5xl">{dict.contactPage.hero.title}</h1>
              <p className="mt-4 max-w-prose text-base text-white/85 sm:text-lg">{dict.contactPage.hero.subtitle}</p>
              <p className="mt-3 text-sm text-white/75">{dict.contactPage.hero.reassurance}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={contactPath}
                  data-quote-open="true"
                  data-project={defaultProjectType}
                  data-service={defaultService}
                  data-campaign="contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-auto"
                >
                  {dict.contactPage.hero.primaryCta}
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:w-auto"
                >
                  {dict.contactPage.hero.secondaryCta}
                </a>
              </div>
            </div>
            <ImageCard
              src={withBasePath("/images/contact/contact-hero.svg")}
              alt={dict.contactPage.hero.imageAlt}
              fallbackLabel={dict.home.imageFallback}
              className="h-64 w-full rounded-2xl border border-white/30 bg-white/95 p-2 shadow-[0_12px_32px_rgba(3,25,52,0.16)] sm:h-72"
            />
          </div>
        </div>
      </section>

      <ContactOptions dict={dict} contactPath={contactPath} projectType={defaultProjectType} serviceId={defaultService} />
      <ContactForm dict={dict} contactPath={contactPath} serviceCategories={serviceCategories} />
      <NextSteps dict={dict} />

      <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="contact-service-area-title">
        <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-300/25 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"></div>
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h2 id="contact-service-area-title" className="text-2xl font-semibold text-bw-navy">
                {dict.contactPage.serviceArea.title}
              </h2>
              <p className="mt-2 max-w-prose text-bw-gray">{dict.contactPage.serviceArea.subtitle}</p>
            </div>
            <ImageCard
              src={withBasePath("/images/contact/service-area.svg")}
              alt={dict.contactPage.serviceArea.imageAlt}
              fallbackLabel={dict.home.imageFallback}
              className="h-52 w-full rounded-2xl border border-bw-lightgray bg-white p-2 shadow-[0_12px_32px_rgba(3,25,52,0.12)] sm:h-56"
            />
          </div>
        </div>
      </section>

      <ContactFAQ dict={dict} />

      <FinalCTA
        title={dict.contactPage.finalCta.title}
        subtitle={dict.contactPage.finalCta.subtitle}
        quoteLabel={dict.contactPage.finalCta.primary}
        callLabel={dict.contactPage.finalCta.secondary}
        quickLinksTitle={dict.contactPage.finalCta.quickLinksTitle}
        socialTitle={dict.contactPage.finalCta.socialTitle}
        contactPath={contactPath}
        phoneHref={siteConfig.phoneHref}
        socials={socialItems}
        quickLinks={quickLinks}
        quoteProjectType={defaultProjectType}
        quoteServiceId={defaultService}
        quoteCampaign="contact"
        quoteContent="contact-final-cta"
      />
    </>
  );
}
