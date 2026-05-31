import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

const services = [
  { title: "Interior Painting", description: "Surface prep, primer, and premium wall coats.", slug: "interior-painting" },
  { title: "Exterior Painting", description: "Weather-resistant exterior treatment and repainting.", slug: "exterior-painting" },
  { title: "Wallpaper", description: "Design-led wallpaper installation for modern homes.", slug: "wallpaper" },
];

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Services" description="SEO-ready service listing scaffold." />
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} {...service} />
        ))}
      </div>
    </section>
  );
}
