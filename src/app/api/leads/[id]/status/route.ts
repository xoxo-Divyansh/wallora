import type { LeadStatus } from "@/config/lifecycle";
import { isValidLeadId, updateLeadStatusById } from "@/features/leads";
import { badRequestResponse, notFoundResponse, serverErrorResponse, successResponse } from "@/lib/api/response";
import { isValidLeadStatus } from "@/lib/validations/status";

interface LeadStatusRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: LeadStatusRouteProps) {
  try {
    const { id } = await params;

    if (!isValidLeadId(id)) {
      return badRequestResponse("Lead id is invalid.");
    }

    const payload = (await request.json()) as { status?: unknown };

    if (typeof payload.status !== "string" || !isValidLeadStatus(payload.status)) {
      return badRequestResponse("Lead status is invalid.");
    }

    const lead = await updateLeadStatusById(id, payload.status as LeadStatus);

    if (!lead) {
      return notFoundResponse("Lead was not found.");
    }

    return successResponse(lead, "Lead status updated successfully.");
  } catch (error) {
    console.error("Failed to update lead status", error);
    return serverErrorResponse("Unable to update lead status.");
  }
}
