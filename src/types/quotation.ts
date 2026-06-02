import type { QuotationStatus } from "@/config/lifecycle";

export type PaintQuality = "basic" | "standard" | "premium";

export interface Quotation {
  id: string;
  leadId: string;
  customerName: string;
  customerPhone: string;
  quoteNumber: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  paintQuality: PaintQuality;
  labourCost: number;
  materialCost: number;
  additionalCost: number;
  discount: number;
  tax: number;
  totalAmount: number;
  status: QuotationStatus;
  notes?: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicQuotation {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  paintQuality: PaintQuality;
  labourCost: number;
  materialCost: number;
  additionalCost: number;
  discount: number;
  tax: number;
  totalAmount: number;
  status: QuotationStatus;
  notes?: string;
  validUntil?: string;
  createdAt: string;
}

export interface CreateQuotationInput {
  leadId: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  paintQuality: PaintQuality;
  labourCost: number;
  materialCost: number;
  additionalCost: number;
  discount: number;
  tax: number;
  notes?: string;
  validUntil?: string;
}
