import type { LeadStatus } from "@/config/lifecycle";

export interface LeadModel {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  budgetRange?: string;
  preferredDate?: Date;
  message?: string;
  status: LeadStatus;
  source: string;
  sourceDetail?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}
