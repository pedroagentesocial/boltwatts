import { buildPath, type Lang } from "../i18n/config";
import { destinationUrls } from "../config/destinationUrls";

export type DivisionId = "residential" | "commercial" | "industrial" | "specialty";
export type ServiceCategoryId =
  | "residential-remodeling"
  | "home-additions"
  | "maintenance-plans"
  | "tenant-buildouts"
  | "office-renovations"
  | "project-management"
  | "facility-upgrades"
  | "safety-retrofits"
  | "shutdown-planning"
  | "partner-brands";
export type ServiceId =
  | "residential-remodeling"
  | "home-additions"
  | "maintenance-plans"
  | "tenant-buildouts"
  | "office-renovations"
  | "project-management"
  | "facility-upgrades"
  | "safety-retrofits"
  | "shutdown-planning"
  | "partner-brands";

export type HubDestination =
  | {
      type: "internal";
      route: "services" | "contact" | "projects" | "industrial";
      query?: Record<string, string>;
    }
  | {
      type: "external";
      url: string;
    };

export type HubDivision = {
  id: DivisionId;
  detailsDestination: HubDestination;
};

export type HubServiceCategory = {
  id: ServiceCategoryId;
  division: DivisionId;
  destination: HubDestination;
};

export type HubService = {
  id: ServiceId;
  division: DivisionId;
  categoryId: ServiceCategoryId;
  destination: HubDestination;
};

export const hubDivisions: HubDivision[] = [
  {
    id: "residential",
    detailsDestination: {
      type: "external",
      url: destinationUrls.divisions.residential,
    },
  },
  {
    id: "commercial",
    detailsDestination: {
      type: "external",
      url: destinationUrls.divisions.commercial,
    },
  },
  {
    id: "industrial",
    detailsDestination: {
      type: "internal",
      route: "industrial",
    },
  },
  {
    id: "specialty",
    detailsDestination: {
      type: "external",
      url: destinationUrls.divisions.specialty,
    },
  },
];

export const hubServiceCategories: HubServiceCategory[] = [
  {
    id: "residential-remodeling",
    division: "residential",
    destination: {
      type: "internal",
      route: "services",
      query: { division: "residential" },
    },
  },
  {
    id: "home-additions",
    division: "residential",
    destination: {
      type: "internal",
      route: "services",
      query: { division: "residential" },
    },
  },
  {
    id: "maintenance-plans",
    division: "residential",
    destination: {
      type: "internal",
      route: "maintenance",
    },
  },
  {
    id: "tenant-buildouts",
    division: "commercial",
    destination: {
      type: "internal",
      route: "services",
      query: { division: "commercial" },
    },
  },
  {
    id: "office-renovations",
    division: "commercial",
    destination: {
      type: "internal",
      route: "services",
      query: { division: "commercial" },
    },
  },
  {
    id: "project-management",
    division: "commercial",
    destination: {
      type: "external",
      url: destinationUrls.services.projectManagement,
    },
  },
  {
    id: "facility-upgrades",
    division: "industrial",
    destination: {
      type: "internal",
      route: "industrial",
    },
  },
  {
    id: "safety-retrofits",
    division: "industrial",
    destination: {
      type: "internal",
      route: "industrial",
    },
  },
  {
    id: "shutdown-planning",
    division: "industrial",
    destination: {
      type: "internal",
      route: "industrial",
    },
  },
  {
    id: "partner-brands",
    division: "specialty",
    destination: {
      type: "external",
      url: destinationUrls.services.partnerBrands,
    },
  },
];

export const hubServices: HubService[] = [
  {
    id: "residential-remodeling",
    division: "residential",
    categoryId: "residential-remodeling",
    destination: hubServiceCategories[0].destination,
  },
  {
    id: "home-additions",
    division: "residential",
    categoryId: "home-additions",
    destination: hubServiceCategories[1].destination,
  },
  {
    id: "maintenance-plans",
    division: "residential",
    categoryId: "maintenance-plans",
    destination: hubServiceCategories[2].destination,
  },
  {
    id: "tenant-buildouts",
    division: "commercial",
    categoryId: "tenant-buildouts",
    destination: hubServiceCategories[3].destination,
  },
  {
    id: "office-renovations",
    division: "commercial",
    categoryId: "office-renovations",
    destination: hubServiceCategories[4].destination,
  },
  {
    id: "project-management",
    division: "commercial",
    categoryId: "project-management",
    destination: hubServiceCategories[5].destination,
  },
  {
    id: "facility-upgrades",
    division: "industrial",
    categoryId: "facility-upgrades",
    destination: hubServiceCategories[6].destination,
  },
  {
    id: "safety-retrofits",
    division: "industrial",
    categoryId: "safety-retrofits",
    destination: hubServiceCategories[7].destination,
  },
  {
    id: "shutdown-planning",
    division: "industrial",
    categoryId: "shutdown-planning",
    destination: hubServiceCategories[8].destination,
  },
  {
    id: "partner-brands",
    division: "specialty",
    categoryId: "partner-brands",
    destination: hubServiceCategories[9].destination,
  },
];

export function resolveDestinationHref(lang: Lang, destination: HubDestination) {
  if (destination.type === "external") {
    return destination.url;
  }
  const base = buildPath(lang, destination.route);
  const params = destination.query ? new URLSearchParams(destination.query).toString() : "";
  return params ? `${base}?${params}` : base;
}
