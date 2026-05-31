import { createLead, getLeads } from "@/features/leads";
import {
  createdResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api/response";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { validateCreateLead } from "@/lib/validations/lead";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await getAdminSessionFromRequest(request);

    if (!session) {
      return unauthorizedResponse("Authentication is required to view leads.");
    }

    const leads = await getLeads();
    return successResponse(leads, "Leads fetched successfully.");
  } catch (error) {
    console.error("Failed to fetch leads", error);
    return serverErrorResponse("Unable to fetch leads.");
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validation = validateCreateLead(payload);

    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const lead = await createLead(validation.data);
    return createdResponse(lead, "Lead created successfully.");
  } catch (error) {
    console.error("Failed to create lead", error);
    return serverErrorResponse("Unable to create lead right now.");
  }
}
