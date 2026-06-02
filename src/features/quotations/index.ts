import type { FeatureModuleInfo } from "@/features/leads";

export const quotationsFeature: FeatureModuleInfo = { domain: "quotations", status: "scaffolded" };
export {
  createQuotation,
  generatePublicShareToken,
  getQuotationById,
  getQuotations,
  getPublicQuotationById,
  getPublicQuotationByToken,
  isValidQuotationId,
  markQuotationSentAfterEmail,
  updateQuotationStatusByToken,
  updateQuotationStatusById,
} from "./repository";
