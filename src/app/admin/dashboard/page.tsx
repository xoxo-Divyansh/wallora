import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";

const adminLinks = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/quotations", label: "Quotations" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
];

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Admin Dashboard" description="Operations dashboard scaffold." />
      <div className="grid gap-4 md:grid-cols-2">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-xl border border-brand-border bg-brand-card p-5">
            <h3 className="text-lg font-semibold">{link.label}</h3>
            <p className="mt-2 text-sm text-brand-muted">Module placeholder route</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
