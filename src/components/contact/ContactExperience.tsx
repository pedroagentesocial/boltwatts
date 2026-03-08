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
      <section className="py-14 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bw-primary">{dict.contactPage.hero.kicker}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold text-bw-navy sm:text-5xl">{dict.contactPage.hero.title}</h1>
            <p className="mt-4 max-w-prose text-lg text-bw-gray">{dict.contactPage.hero.subtitle}</p>
            <p className="mt-3 text-sm text-bw-gray">{dict.contactPage.hero.reassurance}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contactPath}
                data-quote-open="true"
                data-project={defaultProjectType}
                data-service={defaultService}
                data-campaign="contact"
                className="inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.contactPage.hero.primaryCta}
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center rounded-md border border-bw-lightgray px-5 py-2.5 text-sm font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.contactPage.hero.secondaryCta}
              </a>
            </div>
          </div>
          <ImageCard
            src={withBasePath("/images/contact/contact-hero.svg")}
            alt={dict.contactPage.hero.imageAlt}
            fallbackLabel={dict.home.imageFallback}
            className="h-72 w-full rounded-2xl border border-bw-lightgray"
          />
        </div>
      </section>

      <ContactOptions dict={dict} contactPath={contactPath} projectType={defaultProjectType} serviceId={defaultService} />
      <ContactForm dict={dict} contactPath={contactPath} serviceCategories={serviceCategories} />
      <NextSteps dict={dict} />

      <section className="py-14 border-t border-bw-lightgray bg-bw-lightblue/35" aria-labelledby="contact-service-area-title">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
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
            className="h-56 w-full rounded-2xl border border-bw-lightgray"
          />
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
