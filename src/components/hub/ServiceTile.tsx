import React from "react";

type Props = {
  name: string;
  description: string;
  learnMoreHref: string;
  learnMoreLabel: string;
  routeLabel: string;
  contactHref: string;
  serviceId: string;
  isExternal?: boolean;
};

export default function ServiceTile({
  name,
  description,
  learnMoreHref,
  learnMoreLabel,
  routeLabel,
  contactHref,
  serviceId,
  isExternal = false,
}: Props) {
  return (
    <div className="rounded-2xl border border-bw-lightgray bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-bw-lightblue text-xs font-semibold text-bw-navy">
          +
        </span>
      </div>
      <h4 className="mt-4 text-base font-semibold text-bw-navy">{name}</h4>
      <p className="mt-2 text-sm text-bw-gray">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={learnMoreHref}
          className="text-sm font-semibold text-bw-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 rounded-sm"
          rel={isExternal ? "noreferrer" : undefined}
        >
          {learnMoreLabel}
        </a>
        <a
          href={contactHref}
          data-quote-open="true"
          data-service={serviceId}
          className="inline-flex items-center rounded-md border border-bw-lightgray px-3 py-1.5 text-xs font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
        >
          {routeLabel}
        </a>
      </div>
    </div>
  );
}
