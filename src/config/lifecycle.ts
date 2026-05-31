export const LEAD_STATUSES = [
  "new",
  "contacted",
  "survey_scheduled",
  "quoted",
  "converted",
  "rejected",
] as const;

export const QUOTATION_STATUSES = ["draft", "sent", "accepted", "rejected"] as const;

export const PROJECT_STATUSES = ["planned", "in_progress", "inspection", "completed"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type QuotationStatus = (typeof QUOTATION_STATUSES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
