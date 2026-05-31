import { SectionHeading } from "@/components/sections/SectionHeading";
import { getLeads } from "@/features/leads";
import type { Lead } from "@/types/lead";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

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

      {!errorMessage && leads.length === 0 ? (
        <div className="rounded-lg border border-brand-border bg-brand-card p-6 text-sm text-brand-muted">
          No leads submitted yet.
        </div>
      ) : null}

      {leads.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-brand-border bg-brand-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-stone-100 text-xs uppercase text-brand-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">City</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium text-brand-text">{lead.name}</div>
                      <div className="text-brand-muted">{lead.phone}</div>
                      {lead.email ? <div className="text-brand-muted">{lead.email}</div> : null}
                    </td>
                    <td className="px-4 py-4 align-top text-brand-muted">
                      <div>{lead.serviceType}</div>
                      {lead.propertyType ? <div>{lead.propertyType}</div> : null}
                    </td>
                    <td className="px-4 py-4 align-top text-brand-muted">{lead.city}</td>
                    <td className="px-4 py-4 align-top">
                      <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-semibold text-brand-muted">
                        {lead.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top text-brand-muted">{lead.source}</td>
                    <td className="px-4 py-4 align-top text-brand-muted">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}
