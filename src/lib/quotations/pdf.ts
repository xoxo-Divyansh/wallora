import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PublicQuotation } from "@/types/quotation";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const BRAND_TEXT = rgb(0.08, 0.08, 0.08);
const BRAND_MUTED = rgb(0.42, 0.39, 0.34);
const BRAND_ACCENT = rgb(0.55, 0.44, 0.28);
const BRAND_BG = rgb(0.96, 0.94, 0.9);
const CARD_BG = rgb(1, 1, 1);
const BORDER = rgb(0.86, 0.83, 0.78);

interface TextFonts {
  regular: Awaited<ReturnType<PDFDocument["embedFont"]>>;
  bold: Awaited<ReturnType<PDFDocument["embedFont"]>>;
}

function formatCurrency(value: number) {
  const sign = value < 0 ? "- " : "";
  const amount = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
  return `${sign}Rs. ${amount}`;
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

function sanitizeText(value: string) {
  return value.replace(/[\u2013\u2014]/g, "-").replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"');
}

function drawText(page: ReturnType<PDFDocument["addPage"]>, text: string, x: number, y: number, size: number, font: TextFonts["regular"], color = BRAND_TEXT) {
  page.drawText(sanitizeText(text), { x, y, size, font, color });
}

function drawWrappedText(
  page: ReturnType<PDFDocument["addPage"]>,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  size: number,
  font: TextFonts["regular"],
  color = BRAND_MUTED,
  lineHeight = size + 6,
) {
  const words = sanitizeText(text).split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);

  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - index * lineHeight, size, font, color });
  });

  return y - lines.length * lineHeight;
}

function drawCard(page: ReturnType<PDFDocument["addPage"]>, x: number, y: number, width: number, height: number, fill = CARD_BG) {
  page.drawRectangle({ x, y, width, height, color: fill, borderColor: BORDER, borderWidth: 1 });
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

export async function generateQuotationPdf(quotation: PublicQuotation): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const fonts: TextFonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };

  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: BRAND_BG });

  drawText(page, "Wallora", MARGIN, PAGE_HEIGHT - 58, 24, fonts.bold, BRAND_TEXT);
  drawText(page, "Premium painting and interior finishing", MARGIN, PAGE_HEIGHT - 78, 10, fonts.regular, BRAND_MUTED);
  drawText(page, "Quotation", PAGE_WIDTH - MARGIN - 96, PAGE_HEIGHT - 58, 20, fonts.bold, BRAND_ACCENT);

  drawCard(page, MARGIN, PAGE_HEIGHT - 196, PAGE_WIDTH - MARGIN * 2, 92, CARD_BG);
  drawText(page, quotation.quoteNumber, MARGIN + 18, PAGE_HEIGHT - 132, 11, fonts.bold, BRAND_MUTED);
  drawText(page, `Status: ${formatLabel(quotation.status)}`, PAGE_WIDTH - MARGIN - 156, PAGE_HEIGHT - 132, 11, fonts.bold, BRAND_ACCENT);
  drawText(page, `Quotation summary for ${quotation.customerName}`, MARGIN + 18, PAGE_HEIGHT - 158, 20, fonts.bold, BRAND_TEXT);
  drawWrappedText(
    page,
    "This quotation is prepared for review before final site inspection and scope confirmation.",
    MARGIN + 18,
    PAGE_HEIGHT - 178,
    PAGE_WIDTH - MARGIN * 2 - 36,
    10,
    fonts.regular,
  );

  const leftX = MARGIN;
  const rightX = PAGE_WIDTH / 2 + 8;
  const cardTop = PAGE_HEIGHT - 228;
  const cardHeight = 212;
  const cardWidth = PAGE_WIDTH / 2 - MARGIN - 8;

  drawCard(page, leftX, cardTop - cardHeight, cardWidth, cardHeight);
  drawText(page, "Customer and Project", leftX + 16, cardTop - 28, 15, fonts.bold);

  const details = [
    ["Customer name", quotation.customerName],
    ["Customer phone", quotation.customerPhone],
    ["Service type", quotation.serviceType],
    ["Property type", quotation.propertyType ?? "Not specified"],
    ["Area size", quotation.areaSize ? `${quotation.areaSize} sq ft` : "Not specified"],
    ["Paint quality", quotation.paintQuality],
  ];

  let detailY = cardTop - 52;
  for (const [label, value] of details) {
    drawText(page, label, leftX + 16, detailY, 8, fonts.regular, BRAND_MUTED);
    drawText(page, String(value), leftX + 16, detailY - 14, 10, fonts.bold, BRAND_TEXT);
    detailY -= 31;
  }

  drawCard(page, rightX, cardTop - cardHeight, cardWidth, cardHeight);
  drawText(page, "Cost Breakdown", rightX + 16, cardTop - 28, 15, fonts.bold);
  drawText(page, "Estimated Total", rightX + 16, cardTop - 58, 9, fonts.regular, BRAND_MUTED);
  drawText(page, formatCurrency(quotation.totalAmount), rightX + 16, cardTop - 84, 24, fonts.bold, BRAND_ACCENT);

  let rowY = cardTop - 112;
  for (const row of costRows(quotation)) {
    drawText(page, row.label, rightX + 16, rowY, 9, fonts.regular, BRAND_MUTED);
    const value = formatCurrency(row.value);
    const textWidth = fonts.bold.widthOfTextAtSize(value, 9);
    drawText(page, value, rightX + cardWidth - 16 - textWidth, rowY, 9, fonts.bold, row.value < 0 ? rgb(0.1, 0.45, 0.22) : BRAND_TEXT);
    rowY -= 22;
  }

  page.drawLine({ start: { x: rightX + 16, y: rowY + 6 }, end: { x: rightX + cardWidth - 16, y: rowY + 6 }, thickness: 1, color: BORDER });
  drawText(page, "Total amount", rightX + 16, rowY - 12, 11, fonts.bold, BRAND_TEXT);
  const total = formatCurrency(quotation.totalAmount);
  drawText(page, total, rightX + cardWidth - 16 - fonts.bold.widthOfTextAtSize(total, 11), rowY - 12, 11, fonts.bold, BRAND_TEXT);

  const notesY = cardTop - cardHeight - 34;
  drawCard(page, MARGIN, notesY - 118, PAGE_WIDTH - MARGIN * 2, 118);
  drawText(page, "Scope Notes", MARGIN + 18, notesY - 28, 15, fonts.bold);
  drawWrappedText(page, quotation.notes?.trim() || "No additional notes were added to this quotation.", MARGIN + 18, notesY - 50, PAGE_WIDTH - MARGIN * 2 - 36, 10, fonts.regular);

  const metaY = notesY - 154;
  drawCard(page, MARGIN, metaY - 64, PAGE_WIDTH - MARGIN * 2, 64, rgb(0.94, 0.89, 0.82));
  drawText(page, `Valid until: ${formatDate(quotation.validUntil)}`, MARGIN + 18, metaY - 26, 10, fonts.bold, BRAND_TEXT);
  drawText(page, `Created date: ${formatDate(quotation.createdAt)}`, MARGIN + 18, metaY - 44, 10, fonts.bold, BRAND_TEXT);

  const disclaimer = "This quotation is an estimated proposal. Final pricing may vary after site inspection and scope confirmation.";
  drawWrappedText(page, disclaimer, MARGIN, 96, PAGE_WIDTH - MARGIN * 2, 10, fonts.regular, BRAND_MUTED);
  page.drawLine({ start: { x: MARGIN, y: 72 }, end: { x: PAGE_WIDTH - MARGIN, y: 72 }, thickness: 1, color: BORDER });
  drawText(page, "Wallora - Premium painting and interior finishing", MARGIN, 50, 9, fonts.regular, BRAND_MUTED);
  drawText(page, "Contact Wallora to confirm final scope and execution schedule.", MARGIN, 34, 9, fonts.regular, BRAND_MUTED);

  return pdf.save();
}
