import { getServiceBySlug } from "@/features/services";
import { notFoundResponse, successResponse } from "@/lib/api/response";

interface ServiceApiRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: ServiceApiRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return notFoundResponse("Service was not found.");
  }

  return successResponse(service, "Service fetched successfully.");
}
