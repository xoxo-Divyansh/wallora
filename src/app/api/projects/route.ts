import { getProjects } from "@/features/projects";
import { successResponse } from "@/lib/api/response";

export async function GET() {
  return successResponse(getProjects(), "Projects fetched successfully.");
}
