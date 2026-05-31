import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  { title: "2BHK Wall Renewal", city: "Hyderabad", serviceType: "Interior Painting", slug: "2bhk-wall-renewal" },
  { title: "Exterior Protection Plan", city: "Mumbai", serviceType: "Exterior Painting", slug: "exterior-protection-plan" },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Projects" description="Case-study listing scaffold." />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
