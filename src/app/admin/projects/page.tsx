import { SectionHeading } from "@/components/sections/SectionHeading";

export default function AdminProjectsPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Project Case Studies" description="Projects CRUD and publishing scaffold." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Project asset management and publication workflow will be implemented in `features/projects`.
      </div>
    </section>
  );
}
