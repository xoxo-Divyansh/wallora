import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProjectImageBlock } from "@/components/ui/ProjectImageBlock";
import { getProjectBySlug, getProjectSlugs } from "@/features/projects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

const primaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto";
const secondaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-md border border-brand-border bg-brand-card px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-stone-100 sm:w-auto";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | Wallora" };
  }

  return {
    title: `${project.title} | Wallora Projects`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const contactHref = `/contact?serviceType=${encodeURIComponent(project.serviceType)}&propertyType=${encodeURIComponent(project.propertyType)}&areaSize=${project.areaSize}&city=${encodeURIComponent(project.city)}&sourceDetail=project_case_study`;
  const estimatorHref = `/estimator`;

  return (
    <article className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <SectionHeading eyebrow={`${project.city} - ${project.serviceType}`} title={project.title} description={project.shortDescription} />

        <aside className="rounded-lg border border-brand-border bg-brand-card p-5">
          <dl className="grid gap-4 text-sm">
            <div>
              <dt className="text-brand-muted">Timeline</dt>
              <dd className="font-semibold">{project.timeline}</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Area</dt>
              <dd className="font-semibold">{project.areaSize} sq ft</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Budget Range</dt>
              <dd className="font-semibold">{project.budgetRange}</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-3">
            <Link className={primaryLinkClass} href={contactHref}>
              Book Similar Transformation
            </Link>
            <Link className={secondaryLinkClass} href={estimatorHref}>
              Estimate Your Project
            </Link>
          </div>
        </aside>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <ProjectImageBlock image={project.beforeImages[0]} label="Before" />
        <ProjectImageBlock image={project.afterImages[0]} label="After" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Problem</h2>
          <p className="mt-3 text-sm text-brand-muted">{project.problem}</p>
        </div>
        <div className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Solution</h2>
          <p className="mt-3 text-sm text-brand-muted">{project.solution}</p>
        </div>
        <div className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Result</h2>
          <p className="mt-3 text-sm text-brand-muted">{project.resultSummary}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {project.galleryImages.map((image) => (
              <ProjectImageBlock key={image.src} className="min-h-56" image={image} />
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Materials Used</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            {project.materialsUsed.map((material) => (
              <li key={material}>{material}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-brand-muted">
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </article>
  );
}
