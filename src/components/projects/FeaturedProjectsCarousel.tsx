import { useMemo, useRef } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import { buildPath } from "../../i18n/config";
import { projectsCatalog } from "../../data/projectsExperience";
import ImageCard from "../hub/ImageCard";

type Props = {
  dict: Dictionary;
  lang: Lang;
};

export default function FeaturedProjectsCarousel({ dict, lang }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const projectsPath = buildPath(lang, "projects");

  const featuredProjects = useMemo(() => projectsCatalog.filter((item) => item.featured).slice(0, 4), []);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-feature-card]");
    const cardWidth = card?.offsetWidth ?? 320;
    track.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="featured-projects-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-300/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="featured-projects-title" className="text-2xl font-semibold text-bw-navy">
              {dict.projectsPage.featured.title}
            </h2>
            <p className="mt-2 text-bw-gray">{dict.projectsPage.featured.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label={dict.projectsPage.featured.previous}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bw-lightgray bg-white text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label={dict.projectsPage.featured.next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bw-lightgray bg-white text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              &#8250;
            </button>
          </div>
        </div>

      <div
        ref={trackRef}
        className="relative z-10 mt-6 grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
      >
        {featuredProjects.map((item) => {
          const content = dict.projectsPage.content[item.slug];
          const href = `${projectsPath}/${item.slug}`;
          return (
            <a
              key={item.slug}
              href={href}
              data-feature-card="true"
              className="group snap-start overflow-hidden rounded-2xl border border-bw-lightgray bg-white shadow-[0_12px_32px_rgba(3,25,52,0.12)] transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(3,25,52,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              <ImageCard
                src={item.image}
                alt={content.title}
                fallbackLabel={dict.home.imageFallback}
                className="h-40 w-full border-b border-bw-lightgray transition motion-safe:duration-300 group-hover:scale-[1.02] sm:h-48"
              />
              <div className="p-4">
                <span className="inline-flex rounded-full border border-bw-lightgray bg-bw-lightblue/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-bw-navy">
                  {dict.projectsPage.divisions[item.division]}
                </span>
                <h3 className="mt-3 text-base font-semibold text-bw-navy">{content.title}</h3>
                <p className="mt-2 text-sm text-bw-gray">{content.goal}</p>
              </div>
            </a>
          );
        })}
      </div>
      </div>
    </section>
  );
}
