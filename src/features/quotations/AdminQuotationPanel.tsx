"use client";

import { FormEvent, useMemo, useState } from "react";
import { QUOTATION_STATUSES, type QuotationStatus } from "@/config/lifecycle";
import type { Lead } from "@/types/lead";
import type { Quotation } from "@/types/quotation";

interface AdminQuotationPanelProps {
  initialLeads: Lead[];
  initialQuotations: Quotation[];
  selectedLeadId?: string;
}

type Feedback = { type: "success" | "error"; message: string } | null;

const inputClass =
  "w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-brand-text outline-none transition focus:border-brand-accent disabled:cursor-not-allowed disabled:opacity-60";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatStatus(status: QuotationStatus) {
  return status.replace(/_/g, " ");
}

export function AdminQuotationPanel({ initialLeads, initialQuotations, selectedLeadId }: AdminQuotationPanelProps) {
  const [leads] = useState(initialLeads);
  const [quotations, setQuotations] = useState(initialQuotations);
  const [leadId, setLeadId] = useState(selectedLeadId ?? initialLeads[0]?.id ?? "");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const selectedLead = useMemo(() => leads.find((lead) => lead.id === leadId), [leadId, leads]);

  async function handleCreateQuotation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId,
        customerName: formData.get("customerName"),
        customerPhone: formData.get("customerPhone"),
        serviceType: formData.get("serviceType"),
        propertyType: formData.get("propertyType"),
        areaSize: formData.get("areaSize"),
        paintQuality: formData.get("paintQuality"),
        labourCost: formData.get("labourCost"),
        materialCost: formData.get("materialCost"),
        additionalCost: formData.get("additionalCost"),
        discount: formData.get("discount"),
        tax: formData.get("tax"),
        notes: formData.get("notes"),
        validUntil: formData.get("validUntil"),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setFeedback({ type: "error", message: result.message ?? "Unable to create quotation." });
      setSubmitting(false);
      return;
    }

    setQuotations((current) => [result.data, ...current]);
    setFeedback({ type: "success", message: "Draft quotation created." });
    setSubmitting(false);
  }

  async function handleStatusChange(id: string, status: QuotationStatus) {
    const previous = quotations;
    setUpdatingId(id);
    setFeedback(null);
    setQuotations((current) => current.map((quote) => (quote.id === id ? { ...quote, status } : quote)));

    const response = await fetch(`/api/quotations/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();

    if (!response.ok) {
      setQuotations(previous);
      setFeedback({ type: "error", message: result.message ?? "Unable to update quotation status." });
      setUpdatingId(null);
      return;
    }

    setQuotations((current) => current.map((quote) => (quote.id === id ? result.data : quote)));
    setFeedback({ type: "success", message: status === "sent" ? "Quotation sent and lead marked quoted." : "Quotation status updated." });
    setUpdatingId(null);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <form onSubmit={handleCreateQuotation} className="grid gap-4 rounded-lg border border-brand-border bg-brand-card p-5">
        <h2 className="text-xl font-semibold">Create Quotation</h2>

        <label className="space-y-2 text-sm font-medium">
          Lead
          <select className={inputClass} onChange={(event) => setLeadId(event.target.value)} value={leadId}>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} - {lead.serviceType}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          <label className="space-y-2 text-sm font-medium">
            Customer Name
            <input className={inputClass} key={`name-${leadId}`} name="customerName" defaultValue={selectedLead?.name} />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Customer Phone
            <input className={inputClass} key={`phone-${leadId}`} name="customerPhone" defaultValue={selectedLead?.phone} />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Service
            <input className={inputClass} key={`service-${leadId}`} name="serviceType" defaultValue={selectedLead?.serviceType} />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Property Type
            <input className={inputClass} key={`property-${leadId}`} name="propertyType" defaultValue={selectedLead?.propertyType} />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Area Size
            <input className={inputClass} key={`area-${leadId}`} min="1" name="areaSize" type="number" defaultValue={selectedLead?.areaSize} />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Paint Quality
            <select className={inputClass} name="paintQuality" defaultValue="standard">
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Labour
            <input className={inputClass} min="0" name="labourCost" placeholder="25000" type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Material
            <input className={inputClass} min="0" name="materialCost" placeholder="30000" type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Additional
            <input className={inputClass} min="0" name="additionalCost" placeholder="0" type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Discount
            <input className={inputClass} min="0" name="discount" placeholder="0" type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Tax
            <input className={inputClass} min="0" name="tax" placeholder="0" type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Valid Until
            <input className={inputClass} name="validUntil" type="date" />
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium">
          Notes
          <textarea className={`${inputClass} min-h-24 resize-y`} name="notes" />
        </label>

        {feedback ? (
          <p className={feedback.type === "success" ? "text-sm text-green-700" : "text-sm text-red-700"}>{feedback.message}</p>
        ) : null}

        <button className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={submitting || !leadId} type="submit">
          {submitting ? "Creating..." : "Create Draft"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quotation List</h2>
        {quotations.length === 0 ? (
          <div className="rounded-lg border border-brand-border bg-brand-card p-5 text-sm text-brand-muted">No quotations created yet.</div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-brand-border bg-brand-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-stone-100 text-xs uppercase text-brand-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Quote</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {quotations.map((quote) => (
                    <tr key={quote.id}>
                      <td className="px-4 py-4 align-top font-medium">{quote.quoteNumber}</td>
                      <td className="px-4 py-4 align-top text-brand-muted">
                        <div className="font-medium text-brand-text">{quote.customerName}</div>
                        <div>{quote.customerPhone}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-brand-muted">
                        <div>{quote.serviceType}</div>
                        {quote.propertyType ? <div>{quote.propertyType}</div> : null}
                      </td>
                      <td className="px-4 py-4 align-top font-semibold">{formatCurrency(quote.totalAmount)}</td>
                      <td className="px-4 py-4 align-top">
                        <select
                          className={inputClass}
                          disabled={updatingId === quote.id}
                          onChange={(event) => void handleStatusChange(quote.id, event.target.value as QuotationStatus)}
                          value={quote.status}
                        >
                          {QUOTATION_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
