import type { ServiceId } from "./hub";
import { destinationUrls } from "../config/destinationUrls";
import type { HubDestination } from "./hub";

export type IndustrialTagId = "upgrades" | "structural" | "repair" | "coordination";
export type IndustrialSortId = "popular" | "az";

export type IndustrialCapability = {
  id: string;
  serviceId: ServiceId;
  destination: HubDestination;
  image: string;
  tags: IndustrialTagId[];
  popularity: number;
};

export const industrialTagFilters: IndustrialTagId[] = ["upgrades", "structural", "repair", "coordination"];
export const industrialSortOptions: IndustrialSortId[] = ["popular", "az"];

export const industrialCapabilities: IndustrialCapability[] = [
  {
    id: "facility-upgrades",
    serviceId: "facility-upgrades",
    destination: { type: "internal", route: "industrial" },
    image: "/images/industrial/capability-1.svg",
    tags: ["upgrades", "coordination"],
    popularity: 10,
  },
  {
    id: "structural-modifications",
    serviceId: "safety-retrofits",
    destination: { type: "internal", route: "industrial" },
    image: "/images/industrial/capability-2.svg",
    tags: ["structural", "upgrades"],
    popularity: 8,
  },
  {
    id: "equipment-foundations",
    serviceId: "facility-upgrades",
    destination: { type: "internal", route: "industrial" },
    image: "/images/industrial/capability-3.svg",
    tags: ["structural", "coordination"],
    popularity: 9,
  },
  {
    id: "industrial-retrofits",
    serviceId: "safety-retrofits",
    destination: { type: "internal", route: "industrial" },
    image: "/images/industrial/capability-4.svg",
    tags: ["upgrades", "repair"],
    popularity: 7,
  },
  {
    id: "site-repairs",
    serviceId: "shutdown-planning",
    destination: { type: "internal", route: "industrial" },
    image: "/images/industrial/capability-5.svg",
    tags: ["repair", "coordination"],
    popularity: 6,
  },
  {
    id: "industrial-coordination",
    serviceId: "project-management",
    destination: { type: "external", url: destinationUrls.industrial.coordination },
    image: "/images/industrial/capability-6.svg",
    tags: ["coordination", "upgrades"],
    popularity: 5,
  },
];

export const industrialProjectPreviewImages = [
  "/images/industrial/project-1.svg",
  "/images/industrial/project-2.svg",
  "/images/industrial/project-3.svg",
  "/images/industrial/project-4.svg",
] as const;
