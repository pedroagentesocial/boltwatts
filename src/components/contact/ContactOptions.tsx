import type { Dictionary } from "../../i18n/config";
import { siteConfig } from "../../config/site";

type Props = {
  dict: Dictionary;
  contactPath: string;
  projectType: string;
  serviceId: string;
};

export default function ContactOptions({ dict, contactPath, projectType, serviceId }: Props) {
  return (
    <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="contact-options-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 id="contact-options-title" className="text-2xl font-semibold text-white">
            {dict.contactPage.options.title}
          </h2>
          <p className="mt-2 max-w-prose text-white/85">{dict.contactPage.options.subtitle}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <a
          href={siteConfig.phoneHref}
          className="rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(3,25,52,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <p className="text-sm font-semibold text-bw-navy">{dict.contactPage.options.callTitle}</p>
          <p className="mt-2 text-sm text-bw-gray">{siteConfig.phoneDisplay}</p>
        </a>

        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(3,25,52,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <p className="text-sm font-semibold text-bw-navy">{dict.contactPage.options.emailTitle}</p>
          <p className="mt-2 text-sm text-bw-gray">{siteConfig.email}</p>
        </a>

        <div className="rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.15)]">
          <p className="text-sm font-semibold text-bw-navy">{dict.contactPage.options.socialTitle}</p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={siteConfig.socialLinks.facebook}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bw-lightgray text-xs font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              aria-label={dict.home.finalCta.socialLabels.facebook}
            >
              f
            </a>
            <a
              href={siteConfig.socialLinks.instagram}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bw-lightgray text-xs font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              aria-label={dict.home.finalCta.socialLabels.instagram}
            >
              i
            </a>
            <a
              href={siteConfig.socialLinks.linkedin}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bw-lightgray text-xs font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              aria-label={dict.home.finalCta.socialLabels.linkedin}
            >
              in
            </a>
          </div>
        </div>

        <a
          href={contactPath}
          data-quote-open="true"
          data-project={projectType}
          data-service={serviceId}
          data-campaign="contact"
          className="rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(3,25,52,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <p className="text-sm font-semibold text-bw-navy">{dict.contactPage.options.routeTitle}</p>
          <p className="mt-2 text-sm text-bw-gray">{dict.contactPage.options.routeText}</p>
        </a>
      </div>
      </div>
      </div>
    </section>
  );
}
