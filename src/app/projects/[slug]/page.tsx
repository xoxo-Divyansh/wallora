import { SectionHeading } from "@/components/sections/SectionHeading";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-6">
      <SectionHeading title={`Project: ${slug.replace(/-/g, " ")}`} description="Dynamic case-study detail placeholder." />
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 text-brand-muted">
        Before/after assets, problem-solution narrative, and project metadata will be implemented in the projects feature module.
      </div>
    </section>
  );
}
