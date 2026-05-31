import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getServiceBySlug, getServiceSlugs } from "@/features/services";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatPrice(value: number) {
  return `From Rs. ${value}/sq ft`;
}

const primaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto";
const secondaryLinkClass =
  "inline-flex w-full items-center justify-center rounded-md border border-brand-border bg-brand-card px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-stone-100 sm:w-auto";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Wallora",
    };
  }

  return {
    title: `${service.title} | Wallora`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const estimatorHref = service.estimatorServiceType
    ? `/estimator?serviceType=${service.estimatorServiceType}`
    : "/estimator";
  const contactHref = `/contact?serviceType=${encodeURIComponent(service.title)}&sourceDetail=service_page`;

  return (
    <article className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <SectionHeading eyebrow={service.category} title={service.title} description={service.description} />

        <aside className="rounded-lg border border-brand-border bg-brand-card p-5">
          <p className="text-sm text-brand-muted">Starting price</p>
          <p className="mt-1 text-2xl font-semibold">{formatPrice(service.startingPrice)}</p>
          <p className="mt-4 text-sm text-brand-muted">Typical timeline</p>
          <p className="mt-1 font-semibold">{service.timeline}</p>
          <div className="mt-6 grid gap-3">
            <Link className={primaryLinkClass} href={estimatorHref}>
              Get Estimate
            </Link>
            <Link className={secondaryLinkClass} href={contactHref}>
              Book Free Site Visit
            </Link>
          </div>
        </aside>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Ideal For</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            {service.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Benefits</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-card p-5">
          <h2 className="text-xl font-semibold">Included</h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            {service.includedServices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold">Process</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {service.processSteps.map((step, index) => (
            <div key={step} className="rounded-lg border border-brand-border bg-brand-card p-4">
              <p className="text-xs font-semibold text-brand-muted">Step {index + 1}</p>
              <p className="mt-2 text-sm font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {service.faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-brand-border bg-brand-card p-5">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm text-brand-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 border-t border-brand-border pt-8 sm:flex-row">
        <Link className={primaryLinkClass} href={estimatorHref}>
          {service.ctaLabel}
        </Link>
        <Link className={secondaryLinkClass} href={contactHref}>
          Book Free Site Visit
        </Link>
      </div>
    </article>
  );
}
