import { SectionHeading } from "@/components/sections/SectionHeading";
import { AdminLeadTable } from "@/features/leads/AdminLeadTable";
import { getLeads } from "@/features/leads";
import type { Lead } from "@/types/lead";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  let errorMessage: string | null = null;

  try {
    leads = await getLeads();
  } catch (error) {
    console.error("Admin leads page failed to load", error);
    errorMessage = "Lead data is unavailable. Check MONGODB_URI and database connectivity.";
  }

  return (
    <section className="space-y-6">
      <SectionHeading title="Lead Management" description="Newest consultation requests from the public lead form." />

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">{errorMessage}</div>
      ) : null}

      {!errorMessage ? <AdminLeadTable initialLeads={leads} /> : null}
    </section>
  );
}
