import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description?: string;
  shortDescription?: string;
  slug: string;
  category?: string;
  startingPrice?: number;
  timeline?: string;
}

function formatPrice(value?: number) {
  if (!value) {
    return null;
  }

  return `From Rs. ${value}/sq ft`;
}

export function ServiceCard({ title, description, shortDescription, slug, category, startingPrice, timeline }: ServiceCardProps) {
  const priceText = formatPrice(startingPrice);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      {category ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{category}</p> : null}
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-muted">{shortDescription ?? description}</p>
      {priceText || timeline ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-brand-muted">
          {priceText ? <span className="rounded-full bg-stone-100 px-3 py-1">{priceText}</span> : null}
          {timeline ? <span className="rounded-full bg-stone-100 px-3 py-1">{timeline}</span> : null}
        </div>
      ) : null}
      <Link href={`/services/${slug}`} className="mt-auto inline-block pt-5 text-sm font-semibold text-brand-accent">
        View service
      </Link>
    </article>
  );
}
