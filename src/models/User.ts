import type { UserRole } from "@/types/user";

export interface UserModel {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
}
