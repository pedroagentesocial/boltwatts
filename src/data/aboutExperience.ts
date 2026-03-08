export type AboutValueId =
  | "transparency"
  | "coordination"
  | "safety-first"
  | "quality-craft"
  | "jobsite-respect"
  | "clear-scope";

export type TeamRoleId =
  | "project-manager"
  | "site-coordinator"
  | "construction-lead"
  | "operations-support"
  | "client-coordinator"
  | "field-supervisor";

export type AboutValueItem = {
  id: AboutValueId;
};

export type AboutTeamMember = {
  id: string;
  initials: string;
  roleId: TeamRoleId;
};

export const aboutValues: AboutValueItem[] = [
  { id: "transparency" },
  { id: "coordination" },
  { id: "safety-first" },
  { id: "quality-craft" },
  { id: "jobsite-respect" },
  { id: "clear-scope" },
];

export const aboutTeamMembers: AboutTeamMember[] = [
  { id: "team-member-1", initials: "TM", roleId: "project-manager" },
  { id: "team-member-2", initials: "TM", roleId: "site-coordinator" },
  { id: "team-member-3", initials: "TM", roleId: "construction-lead" },
  { id: "team-member-4", initials: "TM", roleId: "operations-support" },
  { id: "team-member-5", initials: "TM", roleId: "client-coordinator" },
  { id: "team-member-6", initials: "TM", roleId: "field-supervisor" },
];
