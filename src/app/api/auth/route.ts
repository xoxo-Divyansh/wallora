import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      data: null,
      meta: { message: "Auth API placeholder. Login logic intentionally not implemented in scaffold phase." },
    },
    { status: 501 },
  );
}
