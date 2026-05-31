import type { LeadStatus } from "@/config/lifecycle";

export interface LeadModel {
  name: string;
  phone: string;
  email?: string;
  city: string;
  serviceType: string;
  status: LeadStatus;
  source: string;
}
