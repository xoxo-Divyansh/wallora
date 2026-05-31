import Link from "next/link";

interface ProjectCardProps {
  title: string;
  city: string;
  serviceType: string;
  slug: string;
}

export function ProjectCard({ title, city, serviceType, slug }: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-brand-muted">
        {city} - {serviceType}
      </p>
      <Link href={`/projects/${slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-accent">
        View case study
      </Link>
    </article>
  );
}
