import type { HubDestination, ServiceCategoryId, ServiceId } from "./hub";
import { destinationUrls } from "../config/destinationUrls";
import { withBasePath } from "../i18n/config";

export type ServicesDivision = "residential" | "commercial" | "industrial";
export type ServicesDivisionFilter = "all" | ServicesDivision;
export type ServiceTagId = "renovation" | "buildout" | "maintenance" | "planning";
export type ServiceSortId = "popular" | "az";

export type ServiceCatalogItem = {
  id: ServiceId;
  categoryId: ServiceCategoryId;
  division: ServicesDivision;
  destination: HubDestination;
  image: string;
  tags: ServiceTagId[];
  popularity: number;
};

export const serviceDivisionFilters: ServicesDivisionFilter[] = ["all", "residential", "commercial", "industrial"];
export const serviceTagFilters: ServiceTagId[] = ["renovation", "buildout", "maintenance", "planning"];
export const serviceSortOptions: ServiceSortId[] = ["popular", "az"];
const media = (path: string) => withBasePath(path);

export const servicesCatalog: ServiceCatalogItem[] = [
  {
    id: "residential-remodeling",
    categoryId: "residential-remodeling",
    division: "residential",
    destination: { type: "internal", route: "services", query: { division: "residential" } },
    image: media("/images/services/residential-1.svg"),
    tags: ["renovation", "planning"],
    popularity: 10,
  },
  {
    id: "home-additions",
    categoryId: "home-additions",
    division: "residential",
    destination: { type: "internal", route: "services", query: { division: "residential" } },
    image: media("/images/services/residential-2.svg"),
    tags: ["buildout", "planning"],
    popularity: 8,
  },
  {
    id: "maintenance-plans",
    categoryId: "maintenance-plans",
    division: "residential",
    destination: { type: "internal", route: "maintenance" },
    image: media("/images/services/residential-3.svg"),
    tags: ["maintenance", "planning"],
    popularity: 9,
  },
  {
    id: "tenant-buildouts",
    categoryId: "tenant-buildouts",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: media("/images/services/commercial-1.svg"),
    tags: ["buildout", "planning"],
    popularity: 9,
  },
  {
    id: "office-renovations",
    categoryId: "office-renovations",
    division: "commercial",
    destination: { type: "internal", route: "services", query: { division: "commercial" } },
    image: media("/images/services/commercial-2.svg"),
    tags: ["renovation", "buildout"],
    popularity: 7,
  },
  {
    id: "project-management",
    categoryId: "project-management",
    division: "commercial",
    destination: { type: "external", url: destinationUrls.services.projectManagement },
    image: media("/images/services/commercial-3.svg"),
    tags: ["planning", "maintenance"],
    popularity: 6,
  },
  {
    id: "facility-upgrades",
    categoryId: "facility-upgrades",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: media("/images/services/industrial-1.svg"),
    tags: ["renovation", "maintenance"],
    popularity: 8,
  },
  {
    id: "safety-retrofits",
    categoryId: "safety-retrofits",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: media("/images/services/industrial-2.svg"),
    tags: ["maintenance", "planning"],
    popularity: 7,
  },
  {
    id: "shutdown-planning",
    categoryId: "shutdown-planning",
    division: "industrial",
    destination: { type: "internal", route: "industrial" },
    image: media("/images/services/industrial-3.svg"),
    tags: ["planning", "buildout"],
    popularity: 5,
  },
];

export const divisionSpotlights: Record<ServicesDivision, ServiceId[]> = {
  residential: ["residential-remodeling", "home-additions", "maintenance-plans"],
  commercial: ["tenant-buildouts", "office-renovations", "project-management"],
  industrial: ["facility-upgrades", "safety-retrofits", "shutdown-planning"],
};
