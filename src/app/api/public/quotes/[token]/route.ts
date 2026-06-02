import { getPublicQuotationByToken } from "@/features/quotations";
import { notFoundResponse, serverErrorResponse, successResponse } from "@/lib/api/response";

interface PublicQuoteTokenRouteProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: PublicQuoteTokenRouteProps) {
  try {
    const { token } = await params;
    const quotation = await getPublicQuotationByToken(token);

    if (!quotation) return notFoundResponse("Quotation was not found.");

    return successResponse(quotation, "Public quotation fetched successfully.");
  } catch (error) {
    console.error("Failed to fetch public quotation by token", error);
    return serverErrorResponse("Unable to fetch quotation.");
  }
}
