import type { QuotationStatus } from "@/config/lifecycle";
import { isValidQuotationId, updateQuotationStatusById } from "@/features/quotations";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "@/lib/api/response";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { isValidQuotationStatus } from "@/lib/validations/quotation";

interface QuotationStatusRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: QuotationStatusRouteProps) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) return unauthorizedResponse("Authentication is required to update quotations.");

    const { id } = await params;
    if (!isValidQuotationId(id)) return badRequestResponse("Quotation id is invalid.");

    const payload = (await request.json()) as { status?: unknown };
    if (typeof payload.status !== "string" || !isValidQuotationStatus(payload.status)) {
      return badRequestResponse("Quotation status is invalid.");
    }

    const quotation = await updateQuotationStatusById(id, payload.status as QuotationStatus);
    if (!quotation) return notFoundResponse("Quotation was not found.");

    return successResponse(quotation, "Quotation status updated successfully.");
  } catch (error) {
    console.error("Failed to update quotation status", error);
    return serverErrorResponse("Unable to update quotation status.");
  }
}
