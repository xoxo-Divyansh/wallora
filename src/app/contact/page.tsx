import { SectionHeading } from "@/components/sections/SectionHeading";
import { LeadCaptureForm } from "@/features/leads/LeadCaptureForm";

interface ContactPageProps {
  searchParams: Promise<{
    serviceType?: string;
    propertyType?: string;
    areaSize?: string;
    city?: string;
    sourceDetail?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const defaults = await searchParams;

  return (
    <section className="mx-auto max-w-4xl space-y-7">
      <SectionHeading
        title="Book Free Consultation"
        description="Share your requirement and the operations team will pick it up from the lead dashboard."
      />
      <LeadCaptureForm defaults={defaults} />
    </section>
  );
}
