import { getQuotationById, isValidQuotationId } from "@/features/quotations";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "@/lib/api/response";
import { getAdminSessionFromRequest } from "@/lib/auth";

interface QuotationRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: QuotationRouteProps) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) return unauthorizedResponse("Authentication is required to view quotations.");

    const { id } = await params;
    if (!isValidQuotationId(id)) return badRequestResponse("Quotation id is invalid.");

    const quotation = await getQuotationById(id);
    if (!quotation) return notFoundResponse("Quotation was not found.");

    return successResponse(quotation, "Quotation fetched successfully.");
  } catch (error) {
    console.error("Failed to fetch quotation", error);
    return serverErrorResponse("Unable to fetch quotation.");
  }
}
