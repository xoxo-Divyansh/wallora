import { services } from "./data";
import type { Service } from "@/types/service";

export function getServices(): Service[] {
  return [...services].filter((service) => service.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getServiceSlugs(): string[] {
  return getServices().map((service) => service.slug);
}
