import type { FeatureModuleInfo } from "@/features/leads";

export const quotationsFeature: FeatureModuleInfo = { domain: "quotations", status: "scaffolded" };
export {
  createQuotation,
  getQuotationById,
  getQuotations,
  isValidQuotationId,
  updateQuotationStatusById,
} from "./repository";
