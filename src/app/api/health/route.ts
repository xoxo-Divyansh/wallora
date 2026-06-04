import { successResponse } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse(
    {
      app: "Wallora",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
    "Wallora API is healthy",
  );
}
