import { SectionHeading } from "@/components/sections/SectionHeading";

export default function AdminQuotationsPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Quotation Management" description="Quotation creation and lifecycle scaffold." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Draft/sent/accepted/rejected quotation flows will be implemented in `features/quotations`.
      </div>
    </section>
  );
}
