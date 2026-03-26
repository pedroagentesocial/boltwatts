import type { Lang } from "../../i18n/config";
import { buildPath } from "../../i18n/config";
import ImageCard from "../hub/ImageCard";

type Props = {
  slug: string;
  lang: Lang;
  image: string;
  title: string;
  divisionLabel: string;
  goal: string;
  tags: string[];
  viewCaseStudyLabel: string;
  routeLabel: string;
  contactPath: string;
  projectType: string;
  serviceId: string;
  placeholderLabel: string;
};

export default function ProjectCard({
  slug,
  lang,
  image,
  title,
  divisionLabel,
  goal,
  tags,
  viewCaseStudyLabel,
  routeLabel,
  contactPath,
  projectType,
  serviceId,
  placeholderLabel,
}: Props) {
  const caseStudyHref = `${buildPath(lang, "projects")}/${slug}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/35 bg-white/95 shadow-[0_12px_32px_rgba(3,25,52,0.15)] transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(3,25,52,0.2)] focus-within:ring-2 focus-within:ring-white/80">
      <div className="overflow-hidden border-b border-bw-lightgray">
        <ImageCard src={image} alt={title} fallbackLabel={placeholderLabel} className="h-40 w-full transition motion-safe:duration-300 group-hover:scale-[1.02] sm:h-56" />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full border border-bw-lightgray bg-bw-lightblue/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-bw-navy">
            {divisionLabel}
          </span>
          {tags.map((tag) => (
            <span
              key={`${slug}-${tag}`}
              className="inline-flex rounded-full border border-bw-lightgray px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-bw-gray"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-bw-navy">{title}</h3>
        <p className="mt-2 text-sm text-bw-gray">{goal}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={caseStudyHref}
            className="inline-flex items-center rounded-full border border-bw-lightgray px-3 py-1.5 text-xs font-semibold text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {viewCaseStudyLabel}
          </a>
          <a
            href={contactPath}
            data-quote-open="true"
            data-project={projectType}
            data-service={serviceId}
            data-campaign="projects"
            data-content={slug}
            className="inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            {routeLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
