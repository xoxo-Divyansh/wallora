import type { ProjectStatus } from "@/config/lifecycle";

export interface ProjectModel {
  title: string;
  slug: string;
  city: string;
  serviceType: string;
  status: ProjectStatus;
  isFeatured: boolean;
  isPublished: boolean;
}
