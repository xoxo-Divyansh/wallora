import { SectionHeading } from "@/components/sections/SectionHeading";

export default function GalleryPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Gallery" description="Transformation gallery route scaffold." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Gallery blocks, category filters, and media integration will be connected in the projects/content module.
      </div>
    </section>
  );
}
