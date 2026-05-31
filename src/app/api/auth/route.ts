import { badRequestResponse } from "@/lib/api/response";

export async function POST() {
  return badRequestResponse("Use /api/auth/login or /api/auth/logout.");
}
