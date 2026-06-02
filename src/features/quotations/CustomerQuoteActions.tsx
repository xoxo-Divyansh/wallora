"use client";

import { useState } from "react";
import type { QuotationStatus } from "@/config/lifecycle";
import type { PublicQuotation } from "@/types/quotation";

interface CustomerQuoteActionsProps {
  token: string;
  initialStatus: QuotationStatus;
}

type Feedback = { type: "success" | "error"; message: string } | null;

export function CustomerQuoteActions({ token, initialStatus }: CustomerQuoteActionsProps) {
  const [status, setStatus] = useState<QuotationStatus>(initialStatus);
  const [updating, setUpdating] = useState<"accepted" | "rejected" | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function submitStatus(nextStatus: "accepted" | "rejected") {
    setUpdating(nextStatus);
    setFeedback(null);

    const response = await fetch(`/api/public/quotes/${token}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    const result = (await response.json()) as { message?: string; data?: PublicQuotation };

    if (!response.ok) {
      setFeedback({ type: "error", message: result.message ?? "Unable to update quotation status." });
      setUpdating(null);
      return;
    }

    setStatus(result.data?.status ?? nextStatus);
    setFeedback({
      type: "success",
      message: nextStatus === "accepted" ? "Quotation accepted. Wallora will follow up with the next steps." : "Quotation rejected. Wallora will review your feedback separately.",
    });
    setUpdating(null);
  }

  if (status !== "sent") {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm">
        <p className="text-sm font-semibold text-brand-text">Customer action unavailable</p>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          This quotation is currently marked as {status.replace(/_/g, " ")}. Only sent quotations can be accepted or rejected.
        </p>
        {feedback ? <p className={feedback.type === "success" ? "mt-3 text-sm text-green-700" : "mt-3 text-sm text-red-700"}>{feedback.message}</p> : null}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm">
      <p className="text-sm font-semibold text-brand-text">Ready to respond?</p>
      <p className="mt-2 text-sm leading-6 text-brand-muted">Accept or reject this quotation. This action can only be submitted while the quotation is sent.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7a603e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={updating !== null}
          onClick={() => void submitStatus("accepted")}
          type="button"
        >
          {updating === "accepted" ? "Accepting..." : "Accept Quote"}
        </button>
        <button
          className="inline-flex w-full items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-text transition hover:border-brand-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={updating !== null}
          onClick={() => void submitStatus("rejected")}
          type="button"
        >
          {updating === "rejected" ? "Rejecting..." : "Reject Quote"}
        </button>
      </div>
      {feedback ? <p className={feedback.type === "success" ? "mt-4 text-sm text-green-700" : "mt-4 text-sm text-red-700"}>{feedback.message}</p> : null}
    </div>
  );
}
