import { SectionHeading } from "@/components/sections/SectionHeading";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-6">
      <SectionHeading title={`Service: ${slug.replace(/-/g, " ")}`} description="Dynamic service detail placeholder for future CMS/API integration." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Content modules for scope, pricing, FAQs, and conversion CTAs will be implemented in the services feature domain.
      </div>
    </section>
  );
}
