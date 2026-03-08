import React from "react";

type Props = {
  title: string;
  description: string;
  detailsHref: string;
  detailsLabel: string;
  contactHref: string;
  contactLabel: string;
  projectType: string;
  isExternal?: boolean;
};

export default function DivisionCard({
  title,
  description,
  detailsHref,
  detailsLabel,
  contactHref,
  contactLabel,
  projectType,
  isExternal = false,
}: Props) {
  return (
    <div className="rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-bw-navy">{title}</h3>
      <p className="mt-2 text-sm text-bw-gray">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={detailsHref}
          className="text-sm font-semibold text-bw-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 rounded-sm"
          rel={isExternal ? "noreferrer" : undefined}
        >
          {detailsLabel}
        </a>
        <a
          href={contactHref}
          data-quote-open="true"
          data-project={projectType}
          className="inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
        >
          {contactLabel}
        </a>
      </div>
    </div>
  );
}
