import { estimateCost } from "@/lib/estimator";
import { serverErrorResponse, successResponse, validationErrorResponse } from "@/lib/api/response";
import { validateEstimateInput } from "@/lib/validations/estimator";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validation = validateEstimateInput(payload);

    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    return successResponse(estimateCost(validation.data), "Estimate calculated successfully.");
  } catch (error) {
    console.error("Failed to calculate estimate", error);
    return serverErrorResponse("Unable to calculate estimate right now.");
  }
}
