import type { EstimatorServiceType } from "@/lib/estimator";
import type { ServiceFaq } from "@/types/service";

export interface ServiceModel {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  timeline: string;
  idealFor: string[];
  includedServices: string[];
  processSteps: string[];
  benefits: string[];
  faqs: ServiceFaq[];
  estimatorServiceType?: EstimatorServiceType;
  ctaLabel: string;
  isActive: boolean;
}
