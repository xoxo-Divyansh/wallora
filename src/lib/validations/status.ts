import { LEAD_STATUSES, PROJECT_STATUSES, QUOTATION_STATUSES } from "@/config/lifecycle";

export function isValidLeadStatus(status: string): boolean {
  return LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number]);
}

export function isValidQuotationStatus(status: string): boolean {
  return QUOTATION_STATUSES.includes(status as (typeof QUOTATION_STATUSES)[number]);
}

export function isValidProjectStatus(status: string): boolean {
  return PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number]);
}
