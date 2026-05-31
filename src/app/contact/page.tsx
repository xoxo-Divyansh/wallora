import { SectionHeading } from "@/components/sections/SectionHeading";
import { LeadCaptureForm } from "@/features/leads/LeadCaptureForm";

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <SectionHeading
        title="Book Free Consultation"
        description="Share your requirement and the operations team will pick it up from the lead dashboard."
      />
      <LeadCaptureForm />
    </section>
  );
}
