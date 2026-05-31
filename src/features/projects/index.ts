import type { FeatureModuleInfo } from "@/features/leads";

export const projectsFeature: FeatureModuleInfo = { domain: "projects", status: "scaffolded" };
export {
  getFeaturedProjects,
  getProjectBySlug,
  getProjectSlugs,
  getProjects,
  getProjectsGroupedByService,
} from "./repository";
