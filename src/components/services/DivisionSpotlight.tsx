import ImageCard from "../hub/ImageCard";

type SpotlightService = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type Props = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  contactPath: string;
  projectType: string;
  services: SpotlightService[];
  placeholderLabel: string;
};

export default function DivisionSpotlight({
  id,
  title,
  subtitle,
  ctaLabel,
  contactPath,
  projectType,
  services,
  placeholderLabel,
}: Props) {
  return (
    <section id={id} className="py-12 border-t border-bw-lightgray sm:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-300/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-bw-navy">{title}</h2>
            <p className="mt-2 max-w-prose text-bw-gray">{subtitle}</p>
          </div>
          <a
            href={contactPath}
            data-quote-open="true"
            data-project={projectType}
            data-campaign="services"
            className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={`${id}-${service.id}`}
              className="overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-[0_12px_32px_rgba(3,25,52,0.12)] transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(3,25,52,0.18)]"
            >
              <ImageCard
                src={service.image}
                alt={service.title}
                fallbackLabel={placeholderLabel}
                className="h-44 w-full border-b border-bw-lightgray"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-bw-navy">{service.title}</h3>
                <p className="mt-2 text-sm text-bw-gray">{service.description}</p>
                <a
                  href={contactPath}
                  data-quote-open="true"
                  data-project={projectType}
                  data-service={service.id}
                  data-campaign="services"
                  className="mt-4 inline-flex items-center rounded-full border border-bw-lightgray px-3 py-1.5 text-xs font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                >
                  {ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
