import { withBasePath, type Dictionary } from "../../i18n/config";
import { aboutTeamMembers } from "../../data/aboutExperience";
import ImageCard from "../hub/ImageCard";

type Props = {
  dict: Dictionary;
};

export default function TeamGrid({ dict }: Props) {
  return (
    <section className="py-14 border-t border-bw-lightgray" aria-labelledby="about-team-title">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <h2 id="about-team-title" className="text-2xl font-semibold text-bw-navy">
            {dict.aboutPage.team.title}
          </h2>
          <p className="mt-2 max-w-prose text-bw-gray">{dict.aboutPage.team.subtitle}</p>
        </div>
        <ImageCard
          src={withBasePath("/images/about/team.jpg")}
          alt={dict.aboutPage.team.imageAlt}
          fallbackLabel={dict.home.imageFallback}
          className="h-56 w-full rounded-2xl border border-bw-lightgray"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {aboutTeamMembers.map((member) => (
          <article key={member.id} className="rounded-2xl border border-bw-lightgray bg-white p-5 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-bw-lightblue text-sm font-semibold uppercase tracking-[0.12em] text-bw-navy">
              {member.initials}
            </div>
            <h3 className="mt-4 text-base font-semibold text-bw-navy">{dict.aboutPage.team.memberName}</h3>
            <p className="mt-1 text-sm text-bw-gray">{dict.aboutPage.team.roles[member.roleId]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
