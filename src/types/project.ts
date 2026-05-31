import type { ProjectStatus } from "@/config/lifecycle";

export interface ProjectImage {
  src: string;
  alt: string;
  tone: "warm" | "sage" | "clay" | "ink" | "mist";
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  city: string;
  serviceType: string;
  propertyType: string;
  shortDescription: string;
  problem: string;
  solution: string;
  resultSummary: string;
  timeline: string;
  areaSize: number;
  budgetRange: string;
  materialsUsed: string[];
  beforeImages: ProjectImage[];
  afterImages: ProjectImage[];
  galleryImages: ProjectImage[];
  featured: boolean;
  tags: string[];
  relatedServiceSlug: string;
  status: ProjectStatus;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
