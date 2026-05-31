import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: [],
    meta: { message: "Service listing placeholder." },
  });
}
