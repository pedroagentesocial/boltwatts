import type { Dictionary } from "../../i18n/config";
import type { HomeDivisionId } from "../../data/homeExperience";

type Props = {
  dict: Dictionary;
  contactPath: string;
  projectTypeByDivision: Record<HomeDivisionId, string>;
};

const divisionIds: HomeDivisionId[] = ["residential", "commercial", "industrial"];

export default function DivisionRouterSection({ dict, contactPath, projectTypeByDivision }: Props) {
  return (
    <section
      id="division-router"
      data-animate
      className="py-12 border-t border-bw-lightgray bg-white sm:py-16 data-[state=visible]:motion-safe:animate-in data-[state=visible]:motion-safe:fade-in data-[state=visible]:motion-safe:slide-in-from-bottom-3"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-bw-navy via-[#0b4a9f] to-[#0a6bff] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.28)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 left-6 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">{dict.home.divisionRouter.title}</h2>
          <p className="mt-3 max-w-2xl text-white/85">{dict.home.divisionRouter.subtitle}</p>
        </div>
        <div className="relative z-10 mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {divisionIds.map((division) => {
            const divisionCard = dict.home.divisionRouter.cards[division];
            const projectType = projectTypeByDivision[division];
            return (
              <article
                key={division}
                className="group overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-[0_14px_45px_rgba(3,25,52,0.2)] transition motion-safe:duration-300 hover:-translate-y-1.5 hover:border-white/60 hover:shadow-[0_18px_55px_rgba(3,25,52,0.3)]"
              >
                <div className="p-5 sm:p-7">
                  <div className="inline-flex rounded-full border border-bw-lightgray bg-bw-lightblue/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-bw-navy">
                    {dict.home.servicesPreview.divisionLabels[division]}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-bw-navy">{divisionCard.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bw-gray">{divisionCard.description}</p>
                  <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                    <a
                      href={contactPath}
                      data-quote-open="true"
                      data-project={projectType}
                      className="inline-flex w-full items-center justify-center rounded-full bg-bw-primary px-5 py-2 text-sm font-semibold text-white shadow transition motion-safe:duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/70 sm:w-auto"
                    >
                      {dict.home.divisionRouter.contactTeam}
                    </a>
                    <a
                      href="#service-finder"
                      className="inline-flex w-full items-center justify-center rounded-full border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy transition motion-safe:duration-300 hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/70 sm:w-auto"
                    >
                      {dict.home.divisionRouter.seeServices}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
