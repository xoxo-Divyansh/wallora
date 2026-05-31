import { SectionHeading } from "@/components/sections/SectionHeading";

export default function AdminLeadsPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Lead Management" description="Lead pipeline table and status controls scaffold." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Lead listing, filters, and status transitions will be implemented in `features/leads`.
      </div>
    </section>
  );
}
