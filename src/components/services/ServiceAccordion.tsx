type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  isOpen: boolean;
  title: string;
  destinationHref: string;
  destinationLabel: string;
  whatItCoversLabel: string;
  typicalScopeLabel: string;
  deliverablesLabel: string;
  faqsLabel: string;
  whatItCovers: string[];
  typicalScope: string[];
  deliverables: string[];
  faqs: FaqItem[];
  quoteLabel: string;
  contactPath: string;
  projectType: string;
  serviceId: string;
};

export default function ServiceAccordion({
  isOpen,
  title,
  destinationHref,
  destinationLabel,
  whatItCoversLabel,
  typicalScopeLabel,
  deliverablesLabel,
  faqsLabel,
  whatItCovers,
  typicalScope,
  deliverables,
  faqs,
  quoteLabel,
  contactPath,
  projectType,
  serviceId,
}: Props) {
  return (
    <div
      className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden">
        <div className="mt-4 rounded-xl border border-bw-lightgray bg-bw-lightblue/25 p-4">
          <h4 className="text-base font-semibold text-bw-navy">{title}</h4>
          <a
            href={destinationHref}
            className="mt-2 inline-flex text-sm font-semibold text-bw-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {destinationLabel}
          </a>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-bw-navy">{whatItCoversLabel}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-bw-gray">
                {whatItCovers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-bw-navy">{typicalScopeLabel}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-bw-gray">
                {typicalScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-bw-navy">{deliverablesLabel}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-bw-gray">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-bw-navy">{faqsLabel}</p>
              <div className="mt-2 space-y-2">
                {faqs.map((item) => (
                  <div key={item.q} className="rounded-lg border border-bw-lightgray bg-white p-3">
                    <p className="text-sm font-semibold text-bw-navy">{item.q}</p>
                    <p className="mt-1 text-sm text-bw-gray">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a
            href={contactPath}
            data-quote-open="true"
            data-project={projectType}
            data-service={serviceId}
            data-campaign="services"
            className="mt-5 inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {quoteLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
