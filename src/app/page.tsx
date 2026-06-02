import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { getFeaturedProjects } from "@/features/projects/repository";
import { getServices } from "@/features/services/repository";

const trustCards = ["Free Site Visit", "Transparent Estimate", "Professional Finish"];

const trustStats = [
  { value: "500+", label: "spaces planned" },
  { value: "7", label: "service categories" },
  { value: "Quote-led", label: "workflow" },
  { value: "Admin-managed", label: "execution" },
];

const steps = [
  {
    title: "Share Requirement",
    description: "Tell us your service, property type, area size, and finish expectations.",
  },
  {
    title: "Get Estimate or Visit",
    description: "Use the estimator instantly or book a free site visit for scope clarity.",
  },
  {
    title: "Receive Quotation",
    description: "Get a structured quote with labour, material, tax, discount, and validity.",
  },
  {
    title: "Execution and Handover",
    description: "Work moves through a managed admin workflow until final review.",
  },
];

const reasons = [
  "Transparent pricing before execution starts",
  "Clean site practices and finish-led planning",
  "Design guidance across paints, textures, and interior finishes",
  "Workflow-backed service management from lead to quotation",
];

const ctaClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2";

export default function HomePage() {
  const featuredServices = getServices().slice(0, 4);
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-[#fbf7ef] px-6 py-8 shadow-sm sm:px-10 lg:px-14 lg:py-14">
        <div className="absolute -right-24 top-8 h-64 w-64 rounded-full bg-[#e2c79d]/40 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#b9c3a4]/30 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl space-y-7">
            <p className="w-fit rounded-full border border-brand-border bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
              Premium wall and interior finishing
            </p>
            <div className="space-y-5">
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-brand-text sm:text-center sm:text-6xl lg:text-7xl">
                Planned finishes for homes that feel composed, warm, and deeply lived in.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
                Wallora brings painting, waterproofing, wallpaper, wood polish, and interior finishing into one clear workflow:
                estimate first, quote transparently, execute cleanly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={`${ctaClass} bg-brand-text text-white hover:bg-brand-accent`} href="/contact">
                Book Free Site Visit
              </Link>
              <Link className={`${ctaClass} border border-brand-border bg-white/80 text-brand-text hover:border-brand-accent`} href="/estimator">
                Estimate Your Project
              </Link>
            </div>

            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {trustCards.map((card) => (
                <div key={card} className="rounded-2xl border border-brand-border bg-white/75 p-4 shadow-sm backdrop-blur">
                  <p className="text-sm font-semibold text-brand-text">{card}</p>
                  <p className="mt-1 text-xs leading-5 text-brand-muted">Built into the Wallora service flow.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute left-3 top-8 h-72 w-[72%] rounded-[2rem] bg-gradient-to-br from-[#d8bea0] via-[#f1dfc5] to-[#fff8ed] shadow-2xl" />
            <div className="absolute right-0 top-0 h-52 w-52 rounded-[1.75rem] bg-gradient-to-br from-[#313126] to-[#8f7654] p-5 text-white shadow-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Palette note</p>
              <p className="mt-5 text-2xl font-semibold leading-tight">Soft neutrals, tactile textures, clean edges.</p>
            </div>
            <div className="absolute bottom-16 right-8 h-64 w-[68%] rounded-[2rem] bg-gradient-to-tr from-[#f8eee0] via-[#c7b08e] to-[#8f7654] shadow-2xl" />
            <div className="absolute bottom-0 left-0 grid w-[72%] grid-cols-2 gap-3 rounded-[1.75rem] border border-white/80 bg-white/80 p-3 shadow-xl backdrop-blur">
              <div className="h-28 rounded-2xl bg-[#b8aa91]" />
              <div className="h-28 rounded-2xl bg-[#e8d8bd]" />
              <div className="h-28 rounded-2xl bg-[#7f8068]" />
              <div className="h-28 rounded-2xl bg-[#2f332a]" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-[1.5rem] border border-brand-border bg-brand-text p-4 text-white sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title="Start with the finish your space actually needs."
            description="A focused preview of Wallora's core service lines, powered by the shared MVP service catalog."
          />
          <Link className="text-sm font-semibold text-brand-accent hover:text-brand-text" href="/services">
            View all services
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-brand-border bg-[#efe3d1] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Estimator</p>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Know your approximate project cost before booking.</h2>
          <p className="max-w-xl leading-7 text-brand-muted">
            Choose service type, property type, area, and quality tier to get a deterministic price range, timeline, inclusions,
            assumptions, and a booking CTA.
          </p>
          <Link className={`${ctaClass} bg-brand-accent text-white hover:bg-brand-text`} href="/estimator">
            Try Cost Estimator
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Area", "Quality", "Timeline"].map((item, index) => (
            <div key={item} className={`rounded-[1.5rem] bg-white/75 p-5 shadow-sm ${index === 1 ? "sm:mt-10" : ""}`}>
              <p className="text-sm font-semibold text-brand-text">{item}</p>
              <p className="mt-16 text-sm leading-6 text-brand-muted">Simple inputs, practical output, no payment step.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Project Proof"
            title="Realistic case studies that show the workflow in action."
            description="Featured transformations from the static project data layer, ready for real photography later."
          />
          <div className="flex gap-4 text-sm font-semibold">
            <Link className="text-brand-accent hover:text-brand-text" href="/projects">
              View projects
            </Link>
            <Link className="text-brand-accent hover:text-brand-text" href="/gallery">
              Open gallery
            </Link>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} image={project.afterImages[0] ?? project.galleryImages[0]} {...project} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="How It Works"
          title="A clear path from first message to finished handover."
          description="The homepage now reflects the actual product flow: lead capture, estimation, quotation, and managed execution."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-brand-border bg-brand-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-text text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-brand-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-[2rem] border border-brand-border bg-brand-card p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:p-10">
        <div>
          <SectionHeading
            eyebrow="Why Wallora"
            title="Premium feeling, practical operating discipline."
            description="The experience is designed around clarity for homeowners and control for the service team."
          />
        </div>
        <div className="grid gap-3">
          {reasons.map((reason) => (
            <div key={reason} className="rounded-2xl border border-brand-border bg-brand-bg px-5 py-4 text-sm font-medium text-brand-text">
              {reason}
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] bg-brand-text p-8 text-white sm:p-10 lg:p-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-accent/40 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Ready when you are</p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Plan the finish before the mess begins.</h2>
            <p className="leading-7 text-white/70">
              Book a free consultation or run an estimate first. Either way, Wallora keeps the scope visible and the next step clear.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className={`${ctaClass} bg-white text-brand-text hover:bg-[#efe3d1]`} href="/contact">
              Book Free Consultation
            </Link>
            <Link className={`${ctaClass} border border-white/20 text-white hover:bg-white/10`} href="/estimator">
              Estimate Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
