type SocialItem = {
  id: "facebook" | "instagram" | "linkedin" | "youtube";
  label: string;
  href: string;
};

type QuickLink = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  subtitle: string;
  quoteLabel: string;
  callLabel: string;
  quickLinksTitle: string;
  socialTitle: string;
  contactPath: string;
  phoneHref: string;
  socials: SocialItem[];
  quickLinks: QuickLink[];
  quoteProjectType?: string;
  quoteServiceId?: string;
  quoteCampaign?: string;
  quoteContent?: string;
};

function SocialIcon({ id }: { id: SocialItem["id"] }) {
  if (id === "facebook") {
    return <span aria-hidden="true">f</span>;
  }
  if (id === "instagram") {
    return <span aria-hidden="true">◎</span>;
  }
  if (id === "linkedin") {
    return <span aria-hidden="true">in</span>;
  }
  return <span aria-hidden="true">▶</span>;
}

export default function FinalCTA({
  title,
  subtitle,
  quoteLabel,
  callLabel,
  quickLinksTitle,
  socialTitle,
  contactPath,
  phoneHref,
  socials,
  quickLinks,
  quoteProjectType,
  quoteServiceId,
  quoteCampaign,
  quoteContent,
}: Props) {
  return (
    <section className="py-12 border-t border-bw-lightgray sm:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-bw-navy via-[#0b4a9f] to-[#0a6bff] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.28)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 left-6 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="rounded-3xl border border-white/30 bg-white/95 p-5 shadow-[0_14px_40px_rgba(3,25,52,0.16)] backdrop-blur-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:p-6">
              <h2 className="text-2xl font-semibold text-bw-navy sm:text-3xl">{title}</h2>
              <p className="mt-3 max-w-prose text-bw-gray">{subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={contactPath}
                  data-quote-open="true"
                  data-project={quoteProjectType}
                  data-service={quoteServiceId}
                  data-campaign={quoteCampaign}
                  data-content={quoteContent}
                  className="inline-flex w-full items-center justify-center rounded-full bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 sm:w-auto"
                >
                  {quoteLabel}
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex w-full items-center justify-center rounded-full bg-bw-secondary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-secondary/60 sm:w-auto"
                >
                  {callLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">{socialTitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white transition hover:-translate-y-0.5 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    <SocialIcon id={social.id} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">{quickLinksTitle}</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-white/35 bg-white/15 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
