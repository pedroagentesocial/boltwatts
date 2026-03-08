import { projectDivisionFilters, projectTagFilters, projectSortOptions, type ProjectDivision, type ProjectSortId, type ProjectTagId } from "../../data/projectsExperience";

type Props = {
  visible: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  activeDivision: "all" | ProjectDivision;
  onDivisionChange: (value: "all" | ProjectDivision) => void;
  activeTag: ProjectTagId | "all";
  onTagChange: (value: ProjectTagId | "all") => void;
  sortBy: ProjectSortId;
  onSortChange: (value: ProjectSortId) => void;
  routeProjectType: string;
  contactPath: string;
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    divisionLabel: string;
    routeLabel: string;
    sortLabel: string;
    allTags: string;
    divisionValues: Record<"all" | ProjectDivision, string>;
    tagValues: Record<ProjectTagId, string>;
    sortValues: Record<ProjectSortId, string>;
  };
};

export default function FilterBar({
  visible,
  search,
  onSearchChange,
  activeDivision,
  onDivisionChange,
  activeTag,
  onTagChange,
  sortBy,
  onSortChange,
  routeProjectType,
  contactPath,
  labels,
}: Props) {
  return (
    <div
      className={`fixed left-0 right-0 z-40 border-b border-bw-lightgray bg-white/95 backdrop-blur transition-all duration-300 ${
        visible ? "pointer-events-auto top-[64px] translate-y-0 opacity-100" : "pointer-events-none top-[64px] -translate-y-6 opacity-0"
      }`}
    >
      <div className="container-responsive py-3">
        <div className="grid gap-3 xl:grid-cols-[1fr_auto_auto_auto] xl:items-center">
          <label className="block">
            <span className="sr-only">{labels.searchLabel}</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-lg border border-bw-lightgray px-3 py-2 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            />
          </label>

          <div className="inline-flex w-full flex-wrap rounded-lg border border-bw-lightgray p-1 xl:w-auto" role="tablist" aria-label={labels.divisionLabel}>
            {projectDivisionFilters.map((division) => (
              <button
                key={`projects-division-${division}`}
                type="button"
                role="tab"
                aria-selected={activeDivision === division}
                onClick={() => onDivisionChange(division)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                  activeDivision === division ? "bg-bw-primary text-white" : "text-bw-navy hover:bg-bw-lightblue/70"
                }`}
              >
                {labels.divisionValues[division]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onTagChange("all")}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                activeTag === "all" ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
              }`}
            >
              {labels.allTags}
            </button>
            {projectTagFilters.map((tag) => (
              <button
                key={`project-tag-${tag}`}
                type="button"
                onClick={() => onTagChange(tag)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                  activeTag === tag ? "border-bw-primary bg-bw-primary text-white" : "border-bw-lightgray bg-white text-bw-navy hover:bg-bw-lightblue"
                }`}
              >
                {labels.tagValues[tag]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-bw-gray">{labels.sortLabel}</span>
              <select
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value as ProjectSortId)}
                className="rounded-lg border border-bw-lightgray px-2.5 py-1.5 text-xs text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {projectSortOptions.map((option) => (
                  <option key={option} value={option}>
                    {labels.sortValues[option]}
                  </option>
                ))}
              </select>
            </label>
            <a
              href={contactPath}
              data-quote-open="true"
              data-project={routeProjectType}
              data-campaign="projects"
              className="inline-flex items-center justify-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {labels.routeLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
