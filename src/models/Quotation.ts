import type { QuotationStatus } from "@/config/lifecycle";

export interface QuotationModel {
  leadId: string;
  quoteNumber: string;
  serviceType: string;
  totalAmount: number;
  status: QuotationStatus;
}
