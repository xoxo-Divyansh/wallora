import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getFeaturedProjects, getProjects } from "@/features/projects";

const primaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto";
const secondaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-full border border-brand-border bg-brand-card px-5 py-3 text-sm font-semibold text-brand-text transition hover:bg-stone-100 sm:w-auto";

export default function ProjectsPage() {
  const projects = getProjects();
  const featuredProjects = getFeaturedProjects();
  const tags = Array.from(new Set(projects.flatMap((project) => project.tags))).slice(0, 8);

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Project Proof"
          title="Sample transformations, documented like case studies."
          description="Browse demo-safe before-after presentations across painting, waterproofing, wallpaper, wood polish, and interior finishing."
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className={primaryLinkClass} href="/contact">
            Book Similar Transformation
          </Link>
          <Link className={secondaryLinkClass} href="/estimator">
            Estimate Your Project
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-brand-border bg-[#fbf7ef] px-3 py-1.5 text-xs font-semibold text-brand-text">
          Sample project presentation for demo purposes
        </span>
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-brand-border bg-brand-card px-3 py-1.5 text-xs font-semibold text-brand-muted">
            {tag}
          </span>
        ))}
      </div>

      {featuredProjects.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Featured Case Studies</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                budgetRange={project.budgetRange}
                city={project.city}
                featured={project.featured}
                image={project.afterImages[0]}
                serviceType={project.serviceType}
                shortDescription={project.shortDescription}
                slug={project.slug}
                timeline={project.timeline}
                title={project.title}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">All Projects</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              budgetRange={project.budgetRange}
              city={project.city}
              featured={project.featured}
              image={project.galleryImages[0]}
              serviceType={project.serviceType}
              shortDescription={project.shortDescription}
              slug={project.slug}
              timeline={project.timeline}
              title={project.title}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
