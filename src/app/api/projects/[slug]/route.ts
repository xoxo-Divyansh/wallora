import { getProjectBySlug } from "@/features/projects";
import { notFoundResponse, successResponse } from "@/lib/api/response";

interface ProjectApiRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: ProjectApiRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return notFoundResponse("Project was not found.");
  }

  return successResponse(project, "Project fetched successfully.");
}
