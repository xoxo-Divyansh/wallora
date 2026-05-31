import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  signAdminSession,
  verifySessionToken,
  type AdminSession,
} from "./session";
import { ADMIN_SESSION_COOKIE, verifySessionToken, type AdminSession } from "./session";

function getConfiguredAdminEmail(): string {
  const email = process.env.ADMIN_EMAIL;

  if (!email) {
    throw new Error("ADMIN_EMAIL is required for admin authentication.");
  }

  return email.toLowerCase();
}

function getConfiguredPasswordHash(): string {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!passwordHash) {
    throw new Error("ADMIN_PASSWORD_HASH is required for admin authentication.");
  }

  return passwordHash;
}

export async function verifyAdminCredentials(email: string, password: string): Promise<AdminSession | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const adminEmail = getConfiguredAdminEmail();

  if (normalizedEmail !== adminEmail) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, getConfiguredPasswordHash());

  if (!isValidPassword) {
    return null;
  }

  return {
    userId: adminEmail,
    email: adminEmail,
    role: "admin",
  };
}

function getCookieFromHeader(cookieHeader: string | null, name: string): string | undefined {
  return cookieHeader
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function getAdminSessionFromRequest(request: Request): Promise<AdminSession | null> {
  return verifySessionToken(getCookieFromHeader(request.headers.get("cookie"), ADMIN_SESSION_COOKIE));
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
