import { NextResponse } from "next/server";
import type { LeadStatus } from "@/config/lifecycle";
import { isValidLeadId, updateLeadStatusById } from "@/features/leads";
import { isValidLeadStatus } from "@/lib/validations/status";

interface LeadStatusRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: LeadStatusRouteProps) {
  try {
    const { id } = await params;

    if (!isValidLeadId(id)) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Lead id is invalid.",
          },
        },
        { status: 400 },
      );
    }

    const payload = (await request.json()) as { status?: unknown };

    if (typeof payload.status !== "string" || !isValidLeadStatus(payload.status)) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Lead status is invalid.",
          },
        },
        { status: 400 },
      );
    }

    const lead = await updateLeadStatusById(id, payload.status as LeadStatus);

    if (!lead) {
      return NextResponse.json(
        {
          error: {
            code: "LEAD_NOT_FOUND",
            message: "Lead was not found.",
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: lead });
  } catch (error) {
    console.error("Failed to update lead status", error);

    return NextResponse.json(
      {
        error: {
          code: "LEAD_STATUS_UPDATE_FAILED",
          message: "Unable to update lead status.",
        },
      },
      { status: 500 },
    );
  }
}
