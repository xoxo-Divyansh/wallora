import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { requireAdminSession } from "@/lib/auth";

const adminLinks = [
  { href: "/admin/leads", label: "Lead Pipeline", description: "Review new enquiries, update follow-up status, and create quotations." },
  { href: "/admin/quotations", label: "Quotation Workflow", description: "Create drafts, send secure quote links, and track customer decisions." },
  { href: "/admin/services", label: "Service Categories", description: "Review the service lines presented on the public website." },
  { href: "/admin/projects", label: "Project Presentations", description: "Review sample case studies used for customer proof and gallery sections." },
];

export default async function AdminDashboardPage() {
  await requireAdminSession();

  return (
    <section className="space-y-6">
      <SectionHeading
        title="Business Owner Dashboard"
        description="A simple control room for lead follow-up, quotation movement, and client-ready service presentations."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-xl border border-brand-border bg-brand-card p-5">
            <h3 className="text-lg font-semibold">{link.label}</h3>
            <p className="mt-2 text-sm leading-6 text-brand-muted">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
