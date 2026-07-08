export type Role =
  | "owner"
  | "admin"
  | "moderator"
  | "member";

export type ElectionStatus =
  | "draft"
  | "published"
  | "active"
  | "ended"
  | "archived";

export type ElectionType =
  | "election"
  | "award"
  | "contest"
  | "poll";