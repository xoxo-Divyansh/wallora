import { projects } from "./data";
import type { Project } from "@/types/project";

export function getProjects(): Project[] {
  return [...projects].filter((project) => project.isPublished).sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getProjects().map((project) => project.slug);
}

export function getProjectsGroupedByService(): Record<string, Project[]> {
  return getProjects().reduce<Record<string, Project[]>>((groups, project) => {
    groups[project.serviceType] ??= [];
    groups[project.serviceType].push(project);
    return groups;
  }, {});
}
