import { SectionHeading } from "@/components/sections/SectionHeading";
import { EstimatorForm } from "@/features/estimator/EstimatorForm";

export default function EstimatorPage() {
  return (
    <section className="space-y-6">
      <SectionHeading
        title="Cost Estimator"
        description="Get an indicative planning range before booking a free Wallora site visit."
      />
      <EstimatorForm />
    </section>
  );
}
