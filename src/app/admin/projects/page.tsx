import { SectionHeading } from "@/components/sections/SectionHeading";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProjectsPage() {
  await requireAdminSession();

  return (
    <section className="space-y-6">
      <SectionHeading title="Project Presentations" description="Review the sample case studies and gallery proof shown to visitors." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Project editing and media uploads are planned for a future admin release. Current case studies are demo-safe sample presentations.
      </div>
    </section>
  );
}
