import type { HubDestination, ServiceId } from "./hub";
import { withBasePath } from "../i18n/config";

export type HomeDivisionFilter = "all" | "residential" | "commercial" | "industrial";
export type HomeDivisionId = Exclude<HomeDivisionFilter, "all">;
export type HomeTagId = "renovation" | "buildout" | "maintenance" | "planning";

export type HomeServiceCard = {
  id: string;
  serviceId: ServiceId;
  division: HomeDivisionId;
  destination: HubDestination;
  image: string;
  tags: HomeTagId[];
};

export const divisionFilters: HomeDivisionFilter[] = ["all", "residential", "commercial", "industrial"];
export const catalogTags: HomeTagId[] = ["renovation", "buildout", "maintenance", "planning"];
const media = (path: string) => withBasePath(path);

export const homeServiceCards: HomeServiceCard[] = [
  {
    id: "residential-remodeling",
    serviceId: "residential-remodeling",
    division: "residential",
    destination: { type: "internal", route: "services", query: { division: "residential" } },
    image: media("/images/residential-remodeling.jpg"),
    tags: ["renovation", "planning"],
  },
  {
    id: "home-additions",
    serviceId: "home-additions",
    division: "residential",
    destination: { type: "internal", route: "services", query: { division: "residential" } },
    image: media("/images/home-additions.jpg"),
    tags: ["buildout", "planning"],
  },
  {
    id: "maintenance-plans",
    serviceId: "maintenance-plans",
    division: "residential",
    destination: { type: "internal", route: "maintenance" },
    image: media("/images/maintence-plan.jpg"),
    tags: ["maintenance", "planning"],
  },
  {
    id: "tenant-buildouts",
    serviceId: "tenant-buildouts",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: media("/images/tenant-buildots.jpg"),
    tags: ["buildout", "planning"],
  },
  {
    id: "office-renovations",
    serviceId: "office-renovations",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: media("/images/office-renovations.jpg"),
    tags: ["renovation", "buildout"],
  },
  {
    id: "project-management",
    serviceId: "project-management",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: media("/images/project-management.jpg"),
    tags: ["planning", "maintenance"],
  },
  {
    id: "facility-upgrades",
    serviceId: "facility-upgrades",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: media("/images/facilities-upgrades.jpg"),
    tags: ["renovation", "maintenance"],
  },
  {
    id: "safety-retrofits",
    serviceId: "safety-retrofits",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: media("/images/safety-retrofits.jpg"),
    tags: ["maintenance", "planning"],
  },
  {
    id: "shutdown-planning",
    serviceId: "shutdown-planning",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: media("/images/shutdown-planning.jpg"),
    tags: ["planning", "buildout"],
  },
];

export const divisionFeaturedCards: Record<HomeDivisionId, string[]> = {
  residential: ["residential-remodeling", "home-additions", "maintenance-plans"],
  commercial: ["tenant-buildouts", "office-renovations", "project-management"],
  industrial: ["facility-upgrades", "safety-retrofits", "shutdown-planning"],
};

export const projectPreviewImages = [
  media("/images/home-additions.jpg"),
  media("/images/project-management.jpg"),
  media("/images/safety-retrofits.jpg"),
] as const;
