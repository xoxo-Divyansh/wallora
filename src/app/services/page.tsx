import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { getServices } from "@/features/services";

const primaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto";
const secondaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-full border border-brand-border bg-brand-card px-5 py-3 text-sm font-semibold text-brand-text transition hover:bg-stone-100 sm:w-auto";

export default function ServicesPage() {
  const services = getServices();

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Wallora Services"
          title="Painting and interior finishing, planned with clarity."
          description="Explore managed services built around site inspection, transparent scope, and clean execution."
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className={primaryLinkClass} href="/estimator">
            Get Estimate
          </Link>
          <Link className={secondaryLinkClass} href="/contact">
            Book Site Visit
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            category={service.category}
            shortDescription={service.shortDescription}
            slug={service.slug}
            startingPrice={service.startingPrice}
            timeline={service.timeline}
            title={service.title}
          />
        ))}
      </div>
    </section>
  );
}
