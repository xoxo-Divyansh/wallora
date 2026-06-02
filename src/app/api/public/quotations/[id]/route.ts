import { getPublicQuotationById, isValidQuotationId } from "@/features/quotations";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse } from "@/lib/api/response";

interface PublicQuotationRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: PublicQuotationRouteProps) {
  try {
    const { id } = await params;
    if (!isValidQuotationId(id)) return badRequestResponse("Quotation id is invalid.");

    const quotation = await getPublicQuotationById(id);
    if (!quotation) return notFoundResponse("Quotation was not found.");

    return successResponse(quotation, "Public quotation fetched successfully.");
  } catch (error) {
    console.error("Failed to fetch public quotation", error);
    return serverErrorResponse("Unable to fetch quotation.");
  }
}
