import { updateQuotationStatusByToken } from "@/features/quotations";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse } from "@/lib/api/response";
import { isValidCustomerQuotationStatus } from "@/lib/validations/quotation";

interface PublicQuoteStatusRouteProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: PublicQuoteStatusRouteProps) {
  try {
    const { token } = await params;
    const payload = (await request.json()) as { status?: unknown };

    if (typeof payload.status !== "string" || !isValidCustomerQuotationStatus(payload.status)) {
      return badRequestResponse("Only accepted or rejected status can be submitted from the public quote page.");
    }

    const result = await updateQuotationStatusByToken(token, payload.status);

    if (result.outcome === "not_found") {
      return notFoundResponse("Quotation was not found.");
    }

    if (result.outcome === "not_sent") {
      return badRequestResponse(
        `This quotation cannot be ${payload.status} because its current status is ${result.quotation.status}.`,
        { status: result.quotation.status },
      );
    }

    return successResponse(result.quotation, `Quotation ${payload.status} successfully.`);
  } catch (error) {
    console.error("Failed to update public quotation status", error);
    return serverErrorResponse("Unable to update quotation status.");
  }
}
