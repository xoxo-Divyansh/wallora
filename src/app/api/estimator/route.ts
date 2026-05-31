import { NextResponse } from "next/server";
import { estimateCost } from "@/lib/estimator";
import { validateEstimateInput } from "@/lib/validations/estimator";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validation = validateEstimateInput(payload);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Please check the highlighted fields.",
            fields: validation.errors,
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ data: estimateCost(validation.data) });
  } catch (error) {
    console.error("Failed to calculate estimate", error);

    return NextResponse.json(
      {
        error: {
          code: "ESTIMATE_FAILED",
          message: "Unable to calculate estimate right now.",
        },
      },
      { status: 500 },
    );
  }
}
