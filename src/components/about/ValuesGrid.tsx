import { useState } from "react";
import { aboutValues, type AboutValueId } from "../../data/aboutExperience";
import type { Dictionary } from "../../i18n/config";

type Props = {
  dict: Dictionary;
};

export default function ValuesGrid({ dict }: Props) {
  const [activeId, setActiveId] = useState<AboutValueId>(aboutValues[0].id);

  return (
    <section id="about-values" className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="about-values-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-300/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 id="about-values-title" className="text-2xl font-semibold text-bw-navy">
            {dict.aboutPage.values.title}
          </h2>
          <p className="mt-2 max-w-prose text-bw-gray">{dict.aboutPage.values.subtitle}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aboutValues.map((value) => {
              const isActive = activeId === value.id;
              const content = dict.aboutPage.values.items[value.id];
              return (
                <article
                  key={value.id}
                  className={`rounded-2xl border bg-white p-5 shadow-[0_12px_32px_rgba(3,25,52,0.12)] transition motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${
                    isActive ? "border-bw-primary" : "border-bw-lightgray hover:border-bw-primary/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId((previous) => (previous === value.id ? aboutValues[0].id : value.id))}
                    aria-expanded={isActive}
                    className="flex w-full items-start justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                  >
                    <span className="text-base font-semibold text-bw-navy">{content.title}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-bw-gray">
                      {isActive ? dict.aboutPage.values.expandedLabel : dict.aboutPage.values.collapsedLabel}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="text-sm text-bw-gray">{content.detail}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
