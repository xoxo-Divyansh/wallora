import { getServices } from "@/features/services";
import { successResponse } from "@/lib/api/response";

export async function GET() {
  return successResponse(getServices(), "Services fetched successfully.");
}
