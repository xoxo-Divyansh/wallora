import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicQuotationById, isValidQuotationId } from "@/features/quotations";
import type { PublicQuotation } from "@/types/quotation";

interface QuotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

const ctaClass =
  "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition sm:w-auto";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatDate(value?: string) {
  if (!value) return "Not specified";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatLabel(value: string) {
  return value.replace(/_/g, " ");
}

function costRows(quotation: PublicQuotation) {
  return [
    { label: "Labour cost", value: quotation.labourCost },
    { label: "Material cost", value: quotation.materialCost },
    { label: "Additional cost", value: quotation.additionalCost },
    { label: "Tax", value: quotation.tax },
    { label: "Discount", value: -quotation.discount },
  ];
}

export async function generateMetadata({ params }: QuotePreviewPageProps): Promise<Metadata> {
  const { id } = await params;

  if (!isValidQuotationId(id)) {
    return { title: "Quotation Not Found | Wallora" };
  }

  const quotation = await getPublicQuotationById(id);

  if (!quotation) {
    return { title: "Quotation Not Found | Wallora" };
  }

  return {
    title: `${quotation.quoteNumber} | Wallora Quotation`,
    description: `Quotation preview for ${quotation.customerName} from Wallora.`,
  };
}

export default async function QuotePreviewPage({ params }: QuotePreviewPageProps) {
  const { id } = await params;
  if (!isValidQuotationId(id)) notFound();

  const quotation = await getPublicQuotationById(id);
  if (!quotation) notFound();

  const contactHref = `/contact?serviceType=${encodeURIComponent(quotation.serviceType)}&sourceDetail=quotation_preview`;
  const pdfHref = `/api/public/quotations/${quotation.id}/pdf`;

  return (
    <article className="mx-auto max-w-5xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-brand-border bg-[#fbf7ef] shadow-sm">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full border border-brand-border bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Wallora Quotation
              </p>
              <span className="rounded-full bg-brand-text px-4 py-2 text-xs font-semibold capitalize text-white">
                {formatLabel(quotation.status)}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-brand-muted">{quotation.quoteNumber}</p>
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-brand-text sm:text-5xl">
                Quotation summary for {quotation.customerName}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-brand-muted">
                A clean preview of your Wallora project estimate, prepared for review before final scope confirmation.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl bg-brand-text p-6 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Estimated Total</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.03em]">{formatCurrency(quotation.totalAmount)}</p>
            <dl className="mt-6 grid gap-4 text-sm text-white/75">
              <div>
                <dt>Valid until</dt>
                <dd className="mt-1 font-semibold text-white">{formatDate(quotation.validUntil)}</dd>
              </div>
              <div>
                <dt>Created on</dt>
                <dd className="mt-1 font-semibold text-white">{formatDate(quotation.createdAt)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold">Customer and Project</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="text-brand-muted">Customer name</dt>
              <dd className="mt-1 font-semibold">{quotation.customerName}</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Customer phone</dt>
              <dd className="mt-1 font-semibold">{quotation.customerPhone}</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Service type</dt>
              <dd className="mt-1 font-semibold">{quotation.serviceType}</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Property type</dt>
              <dd className="mt-1 font-semibold">{quotation.propertyType ?? "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Area size</dt>
              <dd className="mt-1 font-semibold">{quotation.areaSize ? `${quotation.areaSize} sq ft` : "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-brand-muted">Paint quality</dt>
              <dd className="mt-1 font-semibold capitalize">{quotation.paintQuality}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">Cost Breakdown</p>
              <h2 className="mt-2 text-2xl font-semibold">Quotation amount</h2>
            </div>
            <p className="text-2xl font-semibold text-brand-accent">{formatCurrency(quotation.totalAmount)}</p>
          </div>

          <div className="mt-6 divide-y divide-brand-border rounded-2xl border border-brand-border bg-brand-bg">
            {costRows(quotation).map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <span className="text-brand-muted">{row.label}</span>
                <span className={row.value < 0 ? "font-semibold text-green-700" : "font-semibold"}>
                  {formatCurrency(row.value)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <span className="font-semibold">Total amount</span>
              <span className="text-xl font-semibold">{formatCurrency(quotation.totalAmount)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold">Scope Notes</h2>
          <p className="mt-4 text-sm leading-7 text-brand-muted">
            {quotation.notes?.trim() || "No additional notes were added to this quotation."}
          </p>
        </div>

        <aside className="rounded-2xl border border-brand-border bg-[#efe3d1] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold">Important Disclaimer</h2>
          <p className="mt-3 text-sm leading-7 text-brand-muted">
            This is an estimated quotation for review. Final pricing, materials, and execution scope may change after site inspection,
            surface condition checks, and confirmed customer requirements.
          </p>
        </aside>
      </section>

      <section className="flex flex-col items-stretch justify-between gap-4 rounded-[2rem] bg-brand-text p-6 text-white sm:p-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Next step</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Review the scope with Wallora.</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">
            If anything needs adjustment, contact the team before confirming execution.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className={`${ctaClass} bg-brand-accent text-white hover:bg-[#7a603e]`} href={pdfHref}>
            Download PDF
          </Link>
          <Link className={`${ctaClass} bg-white text-brand-text hover:bg-[#efe3d1]`} href={contactHref}>
            Contact Wallora
          </Link>
          <Link className={`${ctaClass} border border-white/20 text-white hover:bg-white/10`} href="/services">
            Back to Services
          </Link>
        </div>
      </section>
    </article>
  );
}
