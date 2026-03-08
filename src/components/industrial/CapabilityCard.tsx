import ImageCard from "../hub/ImageCard";
import CapabilityDetailAccordion from "./CapabilityDetailAccordion";

type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  isExpanded: boolean;
  onToggle: () => void;
  onTagClick: (tag: string) => void;
  labels: {
    learnMore: string;
    routeRequest: string;
    openDestination: string;
    expandedLabel: string;
    collapsedLabel: string;
    whatItCovers: string;
    typicalScope: string;
    deliverables: string;
    faqs: string;
    quote: string;
  };
  details: {
    title: string;
    destinationHref: string;
    whatItCovers: string[];
    typicalScope: string[];
    deliverables: string[];
    faqs: FaqItem[];
  };
  contactPath: string;
  projectType: string;
  serviceId: string;
  campaign: string;
  utmContent: string;
  placeholderLabel: string;
};

export default function CapabilityCard({
  id,
  image,
  title,
  description,
  tags,
  isExpanded,
  onToggle,
  onTagClick,
  labels,
  details,
  contactPath,
  projectType,
  serviceId,
  campaign,
  utmContent,
  placeholderLabel,
}: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-sm transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-bw-primary/60">
      <ImageCard src={image} alt={title} fallbackLabel={placeholderLabel} className="h-48 w-full border-b border-bw-lightgray" />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <button
              key={`${id}-${tag}`}
              type="button"
              onClick={() => onTagClick(tag)}
              className="inline-flex rounded-full border border-bw-lightgray px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-bw-gray transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {tag}
            </button>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-bw-navy">{title}</h3>
        <p className="mt-2 truncate text-sm text-bw-gray">{description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            className="inline-flex items-center rounded-md border border-bw-lightgray px-3 py-1.5 text-xs font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {labels.learnMore}
            <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-bw-gray">{isExpanded ? labels.expandedLabel : labels.collapsedLabel}</span>
          </button>
          <a
            href={contactPath}
            data-quote-open="true"
            data-project={projectType}
            data-service={serviceId}
            data-campaign={campaign}
            data-content={utmContent}
            className="inline-flex items-center rounded-md bg-bw-primary px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {labels.routeRequest}
          </a>
        </div>

        <CapabilityDetailAccordion
          isOpen={isExpanded}
          title={details.title}
          destinationHref={details.destinationHref}
          destinationLabel={labels.openDestination}
          whatItCoversLabel={labels.whatItCovers}
          typicalScopeLabel={labels.typicalScope}
          deliverablesLabel={labels.deliverables}
          faqsLabel={labels.faqs}
          whatItCovers={details.whatItCovers}
          typicalScope={details.typicalScope}
          deliverables={details.deliverables}
          faqs={details.faqs}
          quoteLabel={labels.quote}
          contactPath={contactPath}
          projectType={projectType}
          serviceId={serviceId}
          campaign={campaign}
          utmContent={utmContent}
        />
      </div>
    </article>
  );
}
