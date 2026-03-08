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
    <section className="py-14 border-t border-bw-lightgray">
      <div className="rounded-3xl border border-bw-lightgray bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="rounded-2xl border border-bw-lightgray bg-bw-lightblue/50 p-6">
              <h2 className="text-2xl font-semibold text-bw-navy">{title}</h2>
              <p className="mt-3 text-bw-gray max-w-prose">{subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={contactPath}
                  data-quote-open="true"
                  data-project={quoteProjectType}
                  data-service={quoteServiceId}
                  data-campaign={quoteCampaign}
                  data-content={quoteContent}
                  className="inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                >
                  {quoteLabel}
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex items-center rounded-md bg-bw-secondary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-secondary/60"
                >
                  {callLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-bw-navy">{socialTitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bw-lightgray bg-white text-bw-navy transition hover:-translate-y-0.5 hover:border-bw-primary hover:text-bw-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                  >
                    <SocialIcon id={social.id} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-bw-navy">{quickLinksTitle}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-bw-lightgray bg-white px-3 py-2 text-sm font-medium text-bw-navy transition hover:border-bw-primary hover:text-bw-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
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
