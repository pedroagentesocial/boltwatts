import type { ServiceId } from "./hub";
import { withBasePath } from "../i18n/config";

export type ProjectDivision = "residential" | "commercial" | "industrial";
export type ProjectTagId = "renovation" | "buildout" | "coordination" | "upgrade";
export type ProjectSortId = "newest" | "az" | "division";

export type ProjectItem = {
  slug: string;
  division: ProjectDivision;
  tags: ProjectTagId[];
  image: string;
  featured: boolean;
  sortOrder: number;
  suggestedServiceId: ServiceId;
  servicesUsed: ServiceId[];
};

export const projectDivisionFilters: Array<"all" | ProjectDivision> = ["all", "residential", "commercial", "industrial"];
export const projectTagFilters: ProjectTagId[] = ["renovation", "buildout", "coordination", "upgrade"];
export const projectSortOptions: ProjectSortId[] = ["newest", "az", "division"];
const media = (path: string) => withBasePath(path);

export const projectsCatalog: ProjectItem[] = [
  {
    slug: "residential-layout-refresh",
    division: "residential",
    tags: ["renovation", "coordination"],
    image: media("/images/Residential-layout-refresh.jpg"),
    featured: true,
    sortOrder: 8,
    suggestedServiceId: "residential-remodeling",
    servicesUsed: ["residential-remodeling", "home-additions"],
  },
  {
    slug: "home-expansion-phasing",
    division: "residential",
    tags: ["buildout", "upgrade"],
    image: media("/images/Home-expansion-phasing.jpg"),
    featured: false,
    sortOrder: 7,
    suggestedServiceId: "home-additions",
    servicesUsed: ["home-additions", "maintenance-plans"],
  },
  {
    slug: "tenant-space-alignment",
    division: "commercial",
    tags: ["buildout", "coordination"],
    image: media("/images/Tenant-space-alignment.jpg"),
    featured: true,
    sortOrder: 6,
    suggestedServiceId: "tenant-buildouts",
    servicesUsed: ["tenant-buildouts", "office-renovations"],
  },
  {
    slug: "office-modernization-wave",
    division: "commercial",
    tags: ["renovation", "upgrade"],
    image: media("/images/Office-modernization-wave.jpg"),
    featured: false,
    sortOrder: 5,
    suggestedServiceId: "office-renovations",
    servicesUsed: ["office-renovations", "project-management"],
  },
  {
    slug: "portfolio-coordination-cycle",
    division: "commercial",
    tags: ["coordination", "upgrade"],
    image: media("/images/Portfolio-coordination-cycle.jpg"),
    featured: true,
    sortOrder: 4,
    suggestedServiceId: "project-management",
    servicesUsed: ["project-management", "tenant-buildouts"],
  },
  {
    slug: "facility-access-upgrade",
    division: "industrial",
    tags: ["upgrade", "coordination"],
    image: media("/images/Facility-access-upgrade.jpg"),
    featured: true,
    sortOrder: 3,
    suggestedServiceId: "facility-upgrades",
    servicesUsed: ["facility-upgrades", "safety-retrofits"],
  },
  {
    slug: "safety-retrofit-sequence",
    division: "industrial",
    tags: ["upgrade", "renovation"],
    image: media("/images/safety-retrofits.jpg"),
    featured: false,
    sortOrder: 2,
    suggestedServiceId: "safety-retrofits",
    servicesUsed: ["safety-retrofits", "shutdown-planning"],
  },
  {
    slug: "shutdown-readiness-plan",
    division: "industrial",
    tags: ["coordination", "buildout"],
    image: media("/images/shutdown-planning.jpg"),
    featured: false,
    sortOrder: 1,
    suggestedServiceId: "shutdown-planning",
    servicesUsed: ["shutdown-planning", "facility-upgrades"],
  },
];
