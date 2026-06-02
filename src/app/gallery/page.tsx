import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProjectImageBlock } from "@/components/ui/ProjectImageBlock";
import { getProjectsGroupedByService } from "@/features/projects";

export default function GalleryPage() {
  const groupedProjects = getProjectsGroupedByService();

  return (
    <section className="space-y-10">
      <SectionHeading
        eyebrow="Gallery Proof"
        title="A visual archive of Wallora transformations."
        description="Gallery proof is grouped by service so visitors can quickly scan the kind of finish they want."
      />

      <div className="space-y-12">
        {Object.entries(groupedProjects).map(([serviceType, projects]) => (
          <section key={serviceType} className="space-y-5">
            <div className="flex items-end justify-between gap-4 border-b border-brand-border pb-3">
              <h2 className="text-2xl font-semibold">{serviceType}</h2>
              <p className="text-sm text-brand-muted">{projects.length} case studies</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.flatMap((project) =>
                project.galleryImages.slice(0, 2).map((image) => (
                  <ProjectImageBlock
                    key={`${project.id}-${image.src}`}
                    className="aspect-[4/3] min-h-0"
                    image={image}
                    label={`${project.city} - ${project.title}`}
                  />
                )),
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
