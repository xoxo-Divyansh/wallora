import type { ProjectStatus } from "@/config/lifecycle";

export interface Project {
  id: string;
  title: string;
  slug: string;
  city: string;
  serviceType: string;
  propertyType?: string;
  status: ProjectStatus;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
