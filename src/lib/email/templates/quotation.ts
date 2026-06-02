import type { Quotation } from "@/types/quotation";

interface QuotationEmailInput {
  quotation: Quotation;
  shareUrl: string;
}

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildQuotationEmail({ quotation, shareUrl }: QuotationEmailInput) {
  const subject = `Wallora quotation ${quotation.quoteNumber}`;
  const totalAmount = formatCurrency(quotation.totalAmount);
  const validUntil = formatDate(quotation.validUntil);

  const text = [
    `Hi ${quotation.customerName},`,
    "",
    `Your Wallora quotation ${quotation.quoteNumber} is ready for review.`,
    `Service: ${quotation.serviceType}`,
    `Total amount: ${totalAmount}`,
    `Valid until: ${validUntil}`,
    "",
    `View Your Quotation: ${shareUrl}`,
    "",
    "This quotation is an estimated proposal. Final pricing may depend on site inspection and scope confirmation.",
    "",
    "Wallora",
  ].join("\n");

  const html = `
    <div style="margin:0;background:#f4f1ea;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#151515;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #ded7cc;border-radius:24px;overflow:hidden;">
        <div style="padding:28px 28px 18px;background:#fbf7ef;border-bottom:1px solid #ded7cc;">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#6f6a60;font-weight:700;">Wallora Quotation</p>
          <h1 style="margin:0;font-size:28px;line-height:1.15;color:#151515;">Your quotation is ready</h1>
          <p style="margin:12px 0 0;color:#6f6a60;font-size:15px;line-height:1.6;">Hi ${escapeHtml(quotation.customerName)}, please review your secure Wallora quotation.</p>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:10px 0;color:#6f6a60;">Quotation</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(quotation.quoteNumber)}</td></tr>
            <tr><td style="padding:10px 0;color:#6f6a60;">Service</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(quotation.serviceType)}</td></tr>
            <tr><td style="padding:10px 0;color:#6f6a60;">Total amount</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(totalAmount)}</td></tr>
            <tr><td style="padding:10px 0;color:#6f6a60;">Valid until</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(validUntil)}</td></tr>
          </table>
          <div style="margin:26px 0;">
            <a href="${escapeHtml(shareUrl)}" style="display:inline-block;background:#8b6f47;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;font-size:14px;">View Your Quotation</a>
          </div>
          <p style="margin:0;color:#6f6a60;font-size:13px;line-height:1.6;">This quotation is an estimated proposal. Final pricing may depend on site inspection and scope confirmation.</p>
        </div>
      </div>
    </div>
  `;

  return { subject, html, text };
}
