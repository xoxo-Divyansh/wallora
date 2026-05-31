import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, signAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { badRequestResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: unknown; password?: unknown };

    if (typeof payload.email !== "string" || typeof payload.password !== "string") {
      return badRequestResponse("Email and password are required.");
    }

    const session = await verifyAdminCredentials(payload.email, payload.password);

    if (!session) {
      return unauthorizedResponse("Invalid email or password.");
    }

    const token = await signAdminSession(session);
    const response = successResponse({ email: session.email, role: session.role }, "Logged in successfully.");

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return serverErrorResponse("Unable to log in right now.");
  }
}
