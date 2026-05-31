export interface FeatureModuleInfo {
  domain: string;
  status: "scaffolded";
}

export const leadsFeature: FeatureModuleInfo = { domain: "leads", status: "scaffolded" };
export { createLead, getLeads, isValidLeadId, updateLeadStatusById } from "./repository";
