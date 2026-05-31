import { getAdminSessionFromRequest } from "@/lib/auth";
import { successResponse, unauthorizedResponse } from "@/lib/api/response";

export async function GET(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return unauthorizedResponse("Authentication is required.");
  }

  return successResponse({ email: session.email, role: session.role }, "Admin session is active.");
}
