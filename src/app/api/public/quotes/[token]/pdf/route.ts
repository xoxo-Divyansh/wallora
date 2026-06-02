import { getPublicQuotationByToken } from "@/features/quotations";
import { notFoundResponse, serverErrorResponse } from "@/lib/api/response";
import { generateQuotationPdf } from "@/lib/quotations/pdf";

interface PublicQuotePdfTokenRouteProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

function safeFilenamePart(value: string) {
  return value.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase();
}

export async function GET(_request: Request, { params }: PublicQuotePdfTokenRouteProps) {
  try {
    const { token } = await params;
    const quotation = await getPublicQuotationByToken(token);

    if (!quotation) return notFoundResponse("Quotation was not found.");

    const pdfBytes = await generateQuotationPdf(quotation);
    const pdfBody = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
    const filename = `wallora-quotation-${safeFilenamePart(quotation.quoteNumber)}.pdf`;

    return new Response(pdfBody, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Failed to generate token quotation PDF", error);
    return serverErrorResponse("Unable to generate quotation PDF.");
  }
}
