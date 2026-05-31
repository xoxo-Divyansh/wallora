import Link from "next/link";
import { ProjectImageBlock } from "./ProjectImageBlock";
import type { ProjectImage } from "@/types/project";

interface ProjectCardProps {
  title: string;
  city: string;
  serviceType: string;
  slug: string;
  shortDescription?: string;
  timeline?: string;
  budgetRange?: string;
  featured?: boolean;
  image?: ProjectImage;
}

export function ProjectCard({
  title,
  city,
  serviceType,
  slug,
  shortDescription,
  timeline,
  budgetRange,
  featured,
  image,
}: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-brand-border bg-brand-card">
      {image ? <ProjectImageBlock className="min-h-44 rounded-none" image={image} label={featured ? "Featured transformation" : undefined} /> : null}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          {featured ? <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-brand-muted">Featured</span> : null}
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{serviceType}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-brand-muted">{city}</p>
        {shortDescription ? <p className="mt-3 text-sm text-brand-muted">{shortDescription}</p> : null}
        {timeline || budgetRange ? (
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-brand-muted">
            {timeline ? <span className="rounded-full bg-stone-100 px-3 py-1">{timeline}</span> : null}
            {budgetRange ? <span className="rounded-full bg-stone-100 px-3 py-1">{budgetRange}</span> : null}
          </div>
        ) : null}
        <Link href={`/projects/${slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-accent">
          View case study
        </Link>
      </div>
    </article>
  );
}
