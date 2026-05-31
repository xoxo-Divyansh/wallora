import { jwtVerify, SignJWT } from "jose";
import type { UserRole } from "@/types/user";

export const ADMIN_SESSION_COOKIE = "wallora_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export interface AdminSession {
  userId: string;
  email: string;
  role: UserRole;
}

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required for admin authentication.");
  }

  return new TextEncoder().encode(secret);
}

export async function signAdminSession(session: AdminSession): Promise<string> {
  return new SignJWT({ email: session.email, role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE}s`)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string | undefined): Promise<AdminSession | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    if (!payload.sub || typeof payload.email !== "string" || payload.role !== "admin") {
      return null;
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: "admin",
    };
  } catch {
    return null;
  }
}
