import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
}

export function ServiceCard({ title, description, slug }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-brand-border bg-brand-card p-5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-brand-muted">{description}</p>
      <Link href={`/services/${slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-accent">
        View service
      </Link>
    </article>
  );
}
