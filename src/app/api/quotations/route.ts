import { createQuotation, getQuotations } from "@/features/quotations";
import { createdResponse, serverErrorResponse, successResponse, unauthorizedResponse, validationErrorResponse } from "@/lib/api/response";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { validateCreateQuotation } from "@/lib/validations/quotation";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) return unauthorizedResponse("Authentication is required to view quotations.");

    const quotations = await getQuotations();
    return successResponse(quotations, "Quotations fetched successfully.");
  } catch (error) {
    console.error("Failed to fetch quotations", error);
    return serverErrorResponse("Unable to fetch quotations.");
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) return unauthorizedResponse("Authentication is required to create quotations.");

    const payload = await request.json();
    const validation = validateCreateQuotation(payload);

    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const quotation = await createQuotation(validation.data);

    if (!quotation) {
      return validationErrorResponse({ leadId: "Lead was not found." });
    }

    return createdResponse(quotation, "Quotation created successfully.");
  } catch (error) {
    console.error("Failed to create quotation", error);
    return serverErrorResponse("Unable to create quotation.");
  }
}
