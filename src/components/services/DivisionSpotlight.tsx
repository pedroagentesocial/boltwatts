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
    <section id={id} className="py-14 border-t border-bw-lightgray bg-bw-lightblue/35 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="container-responsive">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-bw-navy">{title}</h2>
            <p className="mt-2 max-w-prose text-bw-gray">{subtitle}</p>
          </div>
          <a
            href={contactPath}
            data-quote-open="true"
            data-project={projectType}
            data-campaign="services"
            className="inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={`${id}-${service.id}`}
              className="overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-sm transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-md"
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
                  className="mt-4 inline-flex items-center rounded-md border border-bw-lightgray px-3 py-1.5 text-xs font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
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
