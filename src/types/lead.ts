import type { LeadStatus } from "@/config/lifecycle";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  budgetRange?: string;
  preferredDate?: string;
  message?: string;
  status: LeadStatus;
  source: string;
  sourceDetail?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  budgetRange?: string;
  preferredDate?: string;
  message?: string;
  source: string;
  sourceDetail?: string;
}
