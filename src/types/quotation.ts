import type { QuotationStatus } from "@/config/lifecycle";

export interface Quotation {
  id: string;
  leadId: string;
  quoteNumber: string;
  serviceType: string;
  qualityTier: "basic" | "standard" | "premium";
  labourCost: number;
  materialCost: number;
  otherCharges: number;
  discount: number;
  tax: number;
  totalAmount: number;
  status: QuotationStatus;
  createdAt: string;
  updatedAt: string;
}
