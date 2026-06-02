import { getPublicQuotationById, isValidQuotationId } from "@/features/quotations";
import { badRequestResponse, notFoundResponse, serverErrorResponse } from "@/lib/api/response";
import { generateQuotationPdf } from "@/lib/quotations/pdf";

interface PublicQuotationPdfRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

function safeFilenamePart(value: string) {
  return value.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase();
}

export async function GET(_request: Request, { params }: PublicQuotationPdfRouteProps) {
  try {
    const { id } = await params;
    if (!isValidQuotationId(id)) return badRequestResponse("Quotation id is invalid.");

    const quotation = await getPublicQuotationById(id);
    if (!quotation) return notFoundResponse("Quotation was not found.");

    const pdfBytes = await generateQuotationPdf(quotation);
    const pdfBody = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
    const filename = `wallora-quotation-${safeFilenamePart(quotation.quoteNumber || quotation.id)}.pdf`;

    return new Response(pdfBody, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Failed to generate quotation PDF", error);
    return serverErrorResponse("Unable to generate quotation PDF.");
  }
}
