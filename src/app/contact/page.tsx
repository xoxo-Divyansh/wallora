import { SectionHeading } from "@/components/sections/SectionHeading";

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Book Free Consultation" description="Lead capture entry point scaffold." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Contact form and validation wiring will be implemented in the leads feature module.
      </div>
    </section>
  );
}
