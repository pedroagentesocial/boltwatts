import React from "react";
import { buildPath, withBasePath, type Dictionary, type Lang } from "../i18n/config";
import { siteConfig } from "../config/site";

type Props = {
  lang: Lang;
  dict: Dictionary;
};

export default function Footer({ lang, dict }: Props) {
  const enHome = buildPath("en", "home");
  const esHome = buildPath("es", "home");
  const contactPath = buildPath(lang, "contact");
  const exploreLinks = [
    { label: dict.common.nav.services, href: buildPath(lang, "services") },
    { label: dict.common.nav.industrial, href: buildPath(lang, "industrial") },
    { label: dict.common.nav.projects, href: buildPath(lang, "projects") },
    { label: dict.common.nav.about, href: buildPath(lang, "about") },
    { label: dict.common.nav.contact, href: contactPath },
  ];
  const privacyPath = buildPath(lang, "privacyPolicy");
  const termsPath = buildPath(lang, "termsAndConditions");
  const divisionProjectTypes = {
    residential: dict.home.quoteRouter.projectTypes[0] ?? "",
    commercial: dict.home.quoteRouter.projectTypes[1] ?? "",
    industrial: dict.home.quoteRouter.projectTypes[2] ?? "",
  };
  const divisionLabels = {
    residential: dict.home.divisionRouter.cards.residential.title,
    commercial: dict.home.divisionRouter.cards.commercial.title,
    industrial: dict.home.divisionRouter.cards.industrial.title,
  };
  const routeAttrs = { "data-quote-open": "true" };

  return (
    <footer className="mt-10 border-t border-bw-lightgray bg-bw-navy text-sm text-white" aria-label={dict.common.footer.footerLabel}>
      <div className="container-responsive py-8">
        <section className="rounded-2xl border border-white/20 bg-white/5 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">{dict.common.footer.ctaTitle}</h2>
              <p className="mt-1 text-sm text-white/80">{dict.common.footer.ctaSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={contactPath}
                {...routeAttrs}
                data-campaign="footer"
                data-content="footer-top-cta"
                className="inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow transition motion-safe:duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                {dict.common.cta.requestQuote}
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center rounded-md bg-bw-secondary px-4 py-2 text-sm font-semibold text-white shadow transition motion-safe:duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                {dict.common.cta.call}
              </a>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-4">
          <div>
            <a href={buildPath(lang, "home")} className="inline-flex items-center" aria-label={dict.common.brand}>
              <img src={withBasePath("/images/logo.png")} alt={dict.common.brand} className="h-12 w-auto object-contain" />
            </a>
            <p className="mt-3 max-w-sm text-sm text-white/80">{dict.common.footer.brandDescription}</p>
            <a
              href={siteConfig.GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={dict.common.googleReviews.openLabel}
              className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white px-3 py-1.5 text-xs font-semibold text-bw-navy transition motion-safe:duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <img src={withBasePath("/images/logos/google-reviews.svg")} alt={dict.common.googleReviews.badgeLabel} className="h-5 w-auto" />
            </a>
          </div>

          <div>
            <p className="font-semibold text-white">{dict.common.footer.exploreTitle}</p>
            <div className="mt-3 flex flex-col gap-2">
              {exploreLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 underline-offset-2 transition motion-safe:duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">{dict.common.footer.divisionsTitle}</p>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={contactPath}
                {...routeAttrs}
                data-project={divisionProjectTypes.residential}
                data-campaign="footer"
                data-content="division-residential"
                className="text-white/80 underline-offset-2 transition motion-safe:duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
              >
                {divisionLabels.residential}
              </a>
              <a
                href={contactPath}
                {...routeAttrs}
                data-project={divisionProjectTypes.commercial}
                data-campaign="footer"
                data-content="division-commercial"
                className="text-white/80 underline-offset-2 transition motion-safe:duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
              >
                {divisionLabels.commercial}
              </a>
              <a
                href={contactPath}
                {...routeAttrs}
                data-project={divisionProjectTypes.industrial}
                data-campaign="footer"
                data-content="division-industrial"
                className="text-white/80 underline-offset-2 transition motion-safe:duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
              >
                {divisionLabels.industrial}
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">{dict.common.footer.contactTitle}</p>
            <div className="mt-3 space-y-2 text-white/80">
              <p aria-label={dict.common.footer.phoneLabel}>☎ {siteConfig.phoneDisplay}</p>
              <p aria-label={dict.common.footer.emailLabel}>✉ {siteConfig.email}</p>
              <p aria-label={dict.common.footer.hoursLabel}>🕒 {siteConfig.hoursDisplay}</p>
              <p aria-label={dict.common.footer.serviceAreaLabel}>⌖ {dict.common.footer.serviceAreaValue}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={siteConfig.socialLinks.facebook}
                aria-label={`${dict.common.footer.socialLinks.facebook} ${dict.common.footer.openExternal}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs font-semibold text-white transition motion-safe:duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                f
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                aria-label={`${dict.common.footer.socialLinks.instagram} ${dict.common.footer.openExternal}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs font-semibold text-white transition motion-safe:duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                i
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                aria-label={`${dict.common.footer.socialLinks.linkedin} ${dict.common.footer.openExternal}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-[10px] font-semibold text-white transition motion-safe:duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                in
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                aria-label={`${dict.common.footer.socialLinks.youtube} ${dict.common.footer.openExternal}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs font-semibold text-white transition motion-safe:duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                ▶
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 text-xs text-white/70">
          <p>
            &copy; {new Date().getFullYear()} {dict.common.brand}. {dict.common.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={privacyPath}
              aria-label={dict.common.footer.privacy}
              className="underline-offset-2 transition motion-safe:duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
            >
              {dict.common.footer.privacy}
            </a>
            <a
              href={termsPath}
              aria-label={dict.common.footer.terms}
              className="underline-offset-2 transition motion-safe:duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
            >
              {dict.common.footer.terms}
            </a>
            <span className="text-white/40">|</span>
            <a href={enHome} className="uppercase tracking-[0.2em] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm">
              {dict.common.language.shortEn}
            </a>
            <a href={esHome} className="uppercase tracking-[0.2em] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm">
              {dict.common.language.shortEs}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
