import { useEffect, useMemo, useState } from "react";
import type { Dictionary, Lang } from "../../i18n/config";
import {
  projectsCatalog,
  projectSortOptions,
  projectTagFilters,
  type ProjectDivision,
  type ProjectSortId,
  type ProjectTagId,
} from "../../data/projectsExperience";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";

type Props = {
  dict: Dictionary;
  lang: Lang;
  contactPath: string;
  externalQuery: string;
};

const divisionOrder: Record<ProjectDivision, number> = {
  residential: 1,
  commercial: 2,
  industrial: 3,
};

export default function ProjectsGrid({ dict, lang, contactPath, externalQuery }: Props) {
  const [search, setSearch] = useState(externalQuery);
  const [activeDivision, setActiveDivision] = useState<"all" | ProjectDivision>("all");
  const [activeTag, setActiveTag] = useState<ProjectTagId | "all">("all");
  const [sortBy, setSortBy] = useState<ProjectSortId>("newest");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    setSearch(externalQuery);
  }, [externalQuery]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    const listed = projectsCatalog.filter((project) => {
      const content = dict.projectsPage.content[project.slug];
      const byDivision = activeDivision === "all" || project.division === activeDivision;
      const byTag = activeTag === "all" || project.tags.includes(activeTag);
      const bySearch =
        !query ||
        content.title.toLowerCase().includes(query) ||
        content.goal.toLowerCase().includes(query);
      return byDivision && byTag && bySearch;
    });

    if (sortBy === "az") {
      return [...listed].sort((a, b) =>
        dict.projectsPage.content[a.slug].title.localeCompare(dict.projectsPage.content[b.slug].title)
      );
    }
    if (sortBy === "division") {
      return [...listed].sort((a, b) => divisionOrder[a.division] - divisionOrder[b.division]);
    }
    return [...listed].sort((a, b) => b.sortOrder - a.sortOrder);
  }, [search, activeDivision, activeTag, sortBy, dict.projectsPage.content]);

  const projectTypeByDivision = {
    all: dict.home.quoteRouter.projectTypes[0],
    residential: dict.home.quoteRouter.projectTypes[0],
    commercial: dict.home.quoteRouter.projectTypes[1],
    industrial: dict.home.quoteRouter.projectTypes[2],
  } as const;

  return (
    <section id="projects-grid" className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="projects-grid-title">
      <FilterBar
        visible={showSticky}
        search={search}
        onSearchChange={setSearch}
        activeDivision={activeDivision}
        onDivisionChange={setActiveDivision}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        sortBy={sortBy}
        onSortChange={setSortBy}
        routeProjectType={projectTypeByDivision[activeDivision]}
        contactPath={contactPath}
        labels={{
          searchLabel: dict.projectsPage.filterBar.searchLabel,
          searchPlaceholder: dict.projectsPage.filterBar.searchPlaceholder,
          divisionLabel: dict.projectsPage.filterBar.divisionLabel,
          routeLabel: dict.projectsPage.filterBar.routeLabel,
          sortLabel: dict.projectsPage.filterBar.sortLabel,
          allTags: dict.projectsPage.filterBar.allTags,
          divisionValues: dict.projectsPage.divisions,
          tagValues: dict.projectsPage.tags,
          sortValues: dict.projectsPage.sortOptions,
        }}
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="projects-grid-title" className="text-2xl font-semibold text-white">
              {dict.projectsPage.grid.title}
            </h2>
            <p className="mt-2 text-white/85">{dict.projectsPage.grid.subtitle}</p>
          </div>
        </div>

        <div className="relative z-10 mt-6 rounded-2xl border border-white/30 bg-white/95 p-3 shadow-[0_12px_32px_rgba(3,25,52,0.15)] sm:p-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
            <label className="block">
              <span className="text-sm font-semibold text-bw-navy">{dict.projectsPage.grid.searchLabel}</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={dict.projectsPage.grid.searchPlaceholder}
                className="mt-2 w-full rounded-xl border border-bw-lightgray px-4 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              />
            </label>

            <div className="inline-flex flex-wrap rounded-xl border border-bw-lightgray bg-white p-1" role="tablist" aria-label={dict.projectsPage.grid.divisionLabel}>
              {(Object.keys(projectTypeByDivision) as Array<"all" | ProjectDivision>).map((division) => (
                <button
                  key={`grid-division-${division}`}
                  type="button"
                  role="tab"
                  aria-selected={activeDivision === division}
                  onClick={() => setActiveDivision(division)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                    activeDivision === division ? "bg-bw-primary text-white" : "text-bw-navy hover:bg-bw-lightblue/70"
                  }`}
                >
                  {dict.projectsPage.divisions[division]}
                </button>
              ))}
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-bw-navy">{dict.projectsPage.grid.sortLabel}</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as ProjectSortId)}
                className="mt-2 rounded-xl border border-bw-lightgray px-3 py-2 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {projectSortOptions.map((option) => (
                  <option key={option} value={option}>
                    {dict.projectsPage.sortOptions[option]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTag("all")}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                activeTag === "all" ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
              }`}
            >
              {dict.projectsPage.grid.allTags}
            </button>
            {projectTagFilters.map((tag) => (
              <button
                key={`grid-tag-${tag}`}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                  activeTag === tag ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
                }`}
              >
                {dict.projectsPage.tags[tag]}
              </button>
            ))}
          </div>
        </div>

      <div className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            lang={lang}
            image={project.image}
            title={dict.projectsPage.content[project.slug].title}
            divisionLabel={dict.projectsPage.divisions[project.division]}
            goal={dict.projectsPage.content[project.slug].goal}
            tags={project.tags.map((tag) => dict.projectsPage.tags[tag])}
            viewCaseStudyLabel={dict.projectsPage.grid.viewCaseStudy}
            routeLabel={dict.projectsPage.grid.routeSimilar}
            contactPath={contactPath}
            projectType={projectTypeByDivision[project.division]}
            serviceId={project.suggestedServiceId}
            placeholderLabel={dict.home.imageFallback}
          />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="relative z-10 mt-5 rounded-xl border border-white/35 bg-white/20 p-4 text-sm text-white">
          {dict.projectsPage.grid.emptyState}
        </p>
      ) : null}
      </div>
    </section>
  );
}
