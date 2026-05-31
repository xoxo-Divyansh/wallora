import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ServiceCard } from "@/components/ui/ServiceCard";

const services = [
  { title: "Interior Painting", description: "Clean, modern finishes for everyday living spaces.", slug: "interior-painting" },
  { title: "Texture & Stencil", description: "Feature wall treatments with crafted visual depth.", slug: "texture-stencil" },
  { title: "Waterproofing", description: "Preventive and corrective protection for critical surfaces.", slug: "waterproofing" },
];

const projects = [
  { title: "3BHK Interior Refresh", city: "Bangalore", serviceType: "Interior Painting", slug: "3bhk-interior-refresh" },
  { title: "Monsoon Waterproof Upgrade", city: "Pune", serviceType: "Waterproofing", slug: "monsoon-waterproof-upgrade" },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6 rounded-2xl border border-brand-border bg-brand-card p-8">
        <SectionHeading
          eyebrow="Wallora"
          title="Transform your walls into spaces that feel alive."
          description="Scaffolded public foundation aligned with product architecture and conversion flow."
        />
        <div className="flex gap-3">
          <Button>Book Free Consultation</Button>
          <Button variant="secondary">Explore Services</Button>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading title="Core Services" description="MVP service discovery foundation." />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading title="Featured Projects" description="Project proof and case-study structure." />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
}
