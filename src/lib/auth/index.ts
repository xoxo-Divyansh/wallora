export interface AdminSession {
  userId: string;
  role: "super_admin" | "admin" | "editor";
}

export async function getAdminSession(): Promise<AdminSession | null> {
  return null;
}
