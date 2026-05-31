import { NextResponse } from "next/server";
import { createLead, getLeads } from "@/features/leads";
import { validateCreateLead } from "@/lib/validations/lead";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ data: leads });
  } catch (error) {
    console.error("Failed to fetch leads", error);

    return NextResponse.json(
      {
        error: {
          code: "LEADS_FETCH_FAILED",
          message: "Unable to fetch leads.",
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validation = validateCreateLead(payload);

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

    const lead = await createLead(validation.data);
    return NextResponse.json({ data: lead }, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead", error);

    return NextResponse.json(
      {
        error: {
          code: "LEAD_CREATE_FAILED",
          message: "Unable to create lead right now.",
        },
      },
      { status: 500 },
    );
  }
}
