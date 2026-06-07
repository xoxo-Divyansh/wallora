import { SectionHeading } from "@/components/sections/SectionHeading";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminServicesPage() {
  await requireAdminSession();

  return (
    <section className="space-y-6">
      <SectionHeading title="Service Categories" description="Review the service categories customers see on the public website." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Service editing is planned for a future admin release. Current services are curated for the client-ready demo.
      </div>
    </section>
  );
}
