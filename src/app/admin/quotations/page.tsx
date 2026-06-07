import { SectionHeading } from "@/components/sections/SectionHeading";
import { AdminQuotationPanel } from "@/features/quotations/AdminQuotationPanel";
import { getLeads } from "@/features/leads";
import { getQuotations } from "@/features/quotations";
import { requireAdminSession } from "@/lib/auth";
import type { Lead } from "@/types/lead";
import type { Quotation } from "@/types/quotation";

interface AdminQuotationsPageProps {
  searchParams: Promise<{ leadId?: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminQuotationsPage({ searchParams }: AdminQuotationsPageProps) {
  await requireAdminSession();
  const { leadId } = await searchParams;

  let leads: Lead[] = [];
  let quotations: Quotation[] = [];
  let errorMessage: string | null = null;

  try {
    [leads, quotations] = await Promise.all([getLeads(), getQuotations()]);
  } catch (error) {
    console.error("Admin quotations page failed to load quotation data", error);
    errorMessage = "Quotation data is unavailable. Check MONGODB_URI and database connectivity.";
  }

  return (
    <section className="space-y-6">
      <SectionHeading title="Quotation Management" description="Create draft quotes from leads and move them through the quote lifecycle." />

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">{errorMessage}</div>
      ) : null}

      {!errorMessage ? <AdminQuotationPanel initialLeads={leads} initialQuotations={quotations} selectedLeadId={leadId} /> : null}
    </section>
  );
}
