import { SectionHeading } from "@/components/sections/SectionHeading";
import { EstimatorForm } from "@/features/estimator/EstimatorForm";
import type { EstimatorServiceType } from "@/lib/estimator";

interface EstimatorPageProps {
  searchParams: Promise<{ serviceType?: string }>;
}

export default async function EstimatorPage({ searchParams }: EstimatorPageProps) {
  const { serviceType } = await searchParams;

  return (
    <section className="space-y-6">
      <SectionHeading
        title="Cost Estimator"
        description="Get an indicative planning range before booking a free Wallora site visit."
      />
      <EstimatorForm defaultServiceType={serviceType as EstimatorServiceType | undefined} />
    </section>
  );
}
