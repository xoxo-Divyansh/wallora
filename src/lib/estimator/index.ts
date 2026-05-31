export interface EstimateInput {
  propertyType: string;
  serviceType: string;
  qualityTier: "basic" | "standard" | "premium";
  areaSize: number;
}

export interface EstimateOutput {
  estimateMin: number;
  estimateMax: number;
  currency: "INR";
  timelineDays: string;
  recommendedPackage: "basic" | "standard" | "premium";
}

export function estimateCost(input: EstimateInput): EstimateOutput {
  void input;

  return {
    estimateMin: 0,
    estimateMax: 0,
    currency: "INR",
    timelineDays: "0-0",
    recommendedPackage: "standard",
  };
}
