import { redirect } from "next/navigation";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AdminLoginForm } from "@/features/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <section className="mx-auto max-w-xl space-y-7">
      <SectionHeading title="Admin Login" description="Sign in to manage leads and operations." />
      <AdminLoginForm />
    </section>
  );
}
