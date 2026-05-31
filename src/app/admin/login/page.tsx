import { SectionHeading } from "@/components/sections/SectionHeading";

export default function AdminLoginPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Admin Login" description="Authentication UI placeholder (logic intentionally deferred)." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Credentials form and session logic will be implemented in the auth module.
      </div>
    </section>
  );
}
