import { SectionHeading } from "@/components/sections/SectionHeading";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminServicesPage() {
  await requireAdminSession();

  return (
    <section className="space-y-6">
      <SectionHeading title="Service Catalog" description="Service CRUD scaffold." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Service management forms and persistence will be implemented in `features/services`.
      </div>
    </section>
  );
}
