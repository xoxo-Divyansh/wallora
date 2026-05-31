import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: [],
    meta: { message: "Quotations API placeholder." },
  });
}

export async function POST() {
  return NextResponse.json(
    {
      data: null,
      meta: { message: "Quotation creation placeholder." },
    },
    { status: 501 },
  );
}
