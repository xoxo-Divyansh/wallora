import { SectionHeading } from "@/components/sections/SectionHeading";
import { AdminQuotationPanel } from "@/features/quotations/AdminQuotationPanel";
import { getLeads } from "@/features/leads";
import { getQuotations } from "@/features/quotations";
import { requireAdminSession } from "@/lib/auth";

interface AdminQuotationsPageProps {
  searchParams: Promise<{ leadId?: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminQuotationsPage({ searchParams }: AdminQuotationsPageProps) {
  await requireAdminSession();
  const { leadId } = await searchParams;
  const [leads, quotations] = await Promise.all([getLeads(), getQuotations()]);

  return (
    <section className="space-y-6">
      <SectionHeading title="Quotation Management" description="Create draft quotes from leads and move them through the quote lifecycle." />
      <AdminQuotationPanel initialLeads={leads} initialQuotations={quotations} selectedLeadId={leadId} />
    </section>
  );
}
