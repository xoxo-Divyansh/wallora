import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { successResponse } from "@/lib/api/response";

export async function POST() {
  const response = successResponse(null, "Logged out successfully.");

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
