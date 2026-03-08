import type { HubDestination, ServiceId } from "./hub";

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

export const homeServiceCards: HomeServiceCard[] = [
  {
    id: "residential-remodeling",
    serviceId: "residential-remodeling",
    division: "residential",
    destination: { type: "internal", route: "services", query: { division: "residential" } },
    image: "/images/residential-remodeling.jpg",
    tags: ["renovation", "planning"],
  },
  {
    id: "home-additions",
    serviceId: "home-additions",
    division: "residential",
    destination: { type: "internal", route: "services", query: { division: "residential" } },
    image: "/images/home-additions.jpg",
    tags: ["buildout", "planning"],
  },
  {
    id: "maintenance-plans",
    serviceId: "maintenance-plans",
    division: "residential",
    destination: { type: "internal", route: "maintenance" },
    image: "/images/maintence-plan.jpg",
    tags: ["maintenance", "planning"],
  },
  {
    id: "tenant-buildouts",
    serviceId: "tenant-buildouts",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: "/images/tenant-buildots.jpg",
    tags: ["buildout", "planning"],
  },
  {
    id: "office-renovations",
    serviceId: "office-renovations",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: "/images/office-renovations.jpg",
    tags: ["renovation", "buildout"],
  },
  {
    id: "project-management",
    serviceId: "project-management",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: "/images/project-management.jpg",
    tags: ["planning", "maintenance"],
  },
  {
    id: "facility-upgrades",
    serviceId: "facility-upgrades",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: "/images/facilities-upgrades.jpg",
    tags: ["renovation", "maintenance"],
  },
  {
    id: "safety-retrofits",
    serviceId: "safety-retrofits",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: "/images/safety-retrofits.jpg",
    tags: ["maintenance", "planning"],
  },
  {
    id: "shutdown-planning",
    serviceId: "shutdown-planning",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: "/images/shutdown-planning.jpg",
    tags: ["planning", "buildout"],
  },
];

export const divisionFeaturedCards: Record<HomeDivisionId, string[]> = {
  residential: ["residential-remodeling", "home-additions", "maintenance-plans"],
  commercial: ["tenant-buildouts", "office-renovations", "project-management"],
  industrial: ["facility-upgrades", "safety-retrofits", "shutdown-planning"],
};

export const projectPreviewImages = [
  "/images/home-additions.jpg",
  "/images/project-management.jpg",
  "/images/safety-retrofits.jpg",
] as const;
