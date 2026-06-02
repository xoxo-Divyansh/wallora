import { getQuotationById, isValidQuotationId, markQuotationSentAfterEmail } from "@/features/quotations";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "@/lib/api/response";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { getEmailConfig, isEmailConfigured, sendEmail } from "@/lib/email";
import { buildQuotationEmail } from "@/lib/email/templates/quotation";

interface QuotationEmailRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: QuotationEmailRouteProps) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) return unauthorizedResponse("Authentication is required to send quotation emails.");

    if (!isEmailConfigured()) {
      return serverErrorResponse("Email delivery is not configured.");
    }

    const { id } = await params;
    if (!isValidQuotationId(id)) return badRequestResponse("Quotation id is invalid.");

    const quotation = await getQuotationById(id);
    if (!quotation) return notFoundResponse("Quotation was not found.");

    if (!quotation.customerEmail) {
      return badRequestResponse("Customer email is required before sending this quotation.");
    }

    if (quotation.status === "accepted" || quotation.status === "rejected" || quotation.status === "expired") {
      return badRequestResponse(`Quotation email cannot be sent because the quotation is ${quotation.status}.`);
    }

    if (!quotation.publicShareToken) {
      return serverErrorResponse("Secure quote token is not available for this quotation.");
    }

    const config = getEmailConfig();
    if (!config) return serverErrorResponse("Email delivery is not configured.");

    const shareUrl = `${config.appUrl}/quote/share/${quotation.publicShareToken}`;
    const email = buildQuotationEmail({ quotation, shareUrl });
    const result = await sendEmail({
      to: quotation.customerEmail,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (result.error) {
      console.error("Resend quotation email failed", result.error);
      return serverErrorResponse("Unable to send quotation email.");
    }

    const updatedQuotation = quotation.status === "draft" ? await markQuotationSentAfterEmail(id) : quotation;

    return successResponse(
      { quotation: updatedQuotation ?? quotation, shareUrl },
      quotation.status === "draft" ? "Quotation email sent and status updated to sent." : "Quotation email sent successfully.",
    );
  } catch (error) {
    console.error("Failed to send quotation email", error);
    return serverErrorResponse("Unable to send quotation email.");
  }
}
