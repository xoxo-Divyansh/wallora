import type { FeatureModuleInfo } from "@/features/leads";

export const servicesFeature: FeatureModuleInfo = { domain: "services", status: "scaffolded" };
export { getServiceBySlug, getServiceSlugs, getServices } from "./repository";
