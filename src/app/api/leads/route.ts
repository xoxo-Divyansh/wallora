import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      data: null,
      meta: {
        message: "Lead intake placeholder. Validation and persistence will be implemented in Phase 3.",
      },
    },
    { status: 501 },
  );
}
