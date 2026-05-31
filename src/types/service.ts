import type { EstimatorServiceType } from "@/lib/estimator";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
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
  sortOrder: number;
}
