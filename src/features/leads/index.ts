export interface FeatureModuleInfo {
  domain: string;
  status: "scaffolded";
}

export const leadsFeature: FeatureModuleInfo = { domain: "leads", status: "scaffolded" };
export { createLead, getLeadById, getLeads, isValidLeadId, updateLeadStatusById } from "./repository";
