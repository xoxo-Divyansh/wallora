"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { LEAD_STATUSES, type LeadStatus } from "@/config/lifecycle";
import type { Lead } from "@/types/lead";

interface AdminLeadTableProps {
  initialLeads: Lead[];
}

type Feedback =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatStatus(status: LeadStatus) {
  return status.replace(/_/g, " ");
}

export function AdminLeadTable({ initialLeads }: AdminLeadTableProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const leadCountLabel = useMemo(() => `${leads.length} ${leads.length === 1 ? "lead" : "leads"}`, [leads.length]);

  async function handleStatusChange(leadId: string, status: LeadStatus) {
    const previousLeads = leads;
    setUpdatingLeadId(leadId);
    setFeedback(null);

    setLeads((currentLeads) =>
      currentLeads.map((lead) => (lead.id === leadId ? { ...lead, status, updatedAt: new Date().toISOString() } : lead)),
    );

    const response = await fetch(`/api/leads/${leadId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();

    if (!response.ok) {
      setLeads(previousLeads);
      setFeedback({
        type: "error",
        message: result.message ?? "Unable to update lead status.",
      });
      setUpdatingLeadId(null);
      return;
    }

    setLeads((currentLeads) => currentLeads.map((lead) => (lead.id === leadId ? result.data : lead)));
    setFeedback({ type: "success", message: "Lead status updated." });
    setUpdatingLeadId(null);
  }

  function onStatusSelect(leadId: string) {
    return (event: ChangeEvent<HTMLSelectElement>) => {
      void handleStatusChange(leadId, event.target.value as LeadStatus);
    };
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-brand-border bg-brand-card p-6 text-sm text-brand-muted">
        No leads submitted yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm text-brand-muted">
        <p>{leadCountLabel}</p>
        {feedback ? (
          <p className={feedback.type === "success" ? "text-green-700" : "text-red-700"}>{feedback.message}</p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border border-brand-border bg-brand-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
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
                    <div className="space-y-1">
                      <select
                        aria-label={`Update status for ${lead.name}`}
                        className="w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-brand-text outline-none transition focus:border-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={updatingLeadId === lead.id}
                        onChange={onStatusSelect(lead.id)}
                        value={lead.status}
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
                      {updatingLeadId === lead.id ? <p className="text-xs text-brand-muted">Updating...</p> : null}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-brand-muted">{lead.source}</td>
                  <td className="px-4 py-4 align-top text-brand-muted">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
