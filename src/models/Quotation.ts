import type { QuotationStatus } from "@/config/lifecycle";
import type { PaintQuality } from "@/types/quotation";

export interface QuotationModel {
  leadId: string;
  publicShareToken?: string;
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
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}
