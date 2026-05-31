export const ESTIMATOR_SERVICE_TYPES = [
  "interior_painting",
  "exterior_painting",
  "texture_painting",
  "wallpaper",
  "waterproofing",
  "wood_polish",
  "false_ceiling",
] as const;

export const ESTIMATOR_PROPERTY_TYPES = ["apartment", "independent_house", "office", "shop", "villa"] as const;

export const ESTIMATOR_QUALITY_TIERS = ["basic", "standard", "premium"] as const;

export type EstimatorServiceType = (typeof ESTIMATOR_SERVICE_TYPES)[number];
export type EstimatorPropertyType = (typeof ESTIMATOR_PROPERTY_TYPES)[number];
export type EstimatorQualityTier = (typeof ESTIMATOR_QUALITY_TIERS)[number];

export interface EstimateInput {
  serviceType: EstimatorServiceType;
  propertyType: EstimatorPropertyType;
  areaSize: number;
  qualityTier: EstimatorQualityTier;
  city?: string;
  rooms?: number;
}

export interface EstimateOutput {
  minPrice: number;
  maxPrice: number;
  currency: "INR";
  estimatedTimeline: string;
  recommendedPackage: EstimatorQualityTier;
  includedServices: string[];
  assumptions: string[];
  disclaimer: string;
}

interface ServiceRule {
  label: string;
  minRate: number;
  maxRate: number;
  productivityPerDay: number;
  includedServices: string[];
}

export const SERVICE_LABELS: Record<EstimatorServiceType, string> = {
  interior_painting: "Interior Painting",
  exterior_painting: "Exterior Painting",
  texture_painting: "Texture Painting",
  wallpaper: "Wallpaper",
  waterproofing: "Waterproofing",
  wood_polish: "Wood Polish",
  false_ceiling: "False Ceiling",
};

const SERVICE_RULES: Record<EstimatorServiceType, ServiceRule> = {
  interior_painting: {
    label: SERVICE_LABELS.interior_painting,
    minRate: 24,
    maxRate: 38,
    productivityPerDay: 450,
    includedServices: ["Surface preparation", "Primer application", "Two coats of selected paint", "Basic site cleanup"],
  },
  exterior_painting: {
    label: SERVICE_LABELS.exterior_painting,
    minRate: 30,
    maxRate: 48,
    productivityPerDay: 380,
    includedServices: ["Exterior surface cleaning", "Crack filling guidance", "Weather coat application", "Basic site cleanup"],
  },
  texture_painting: {
    label: SERVICE_LABELS.texture_painting,
    minRate: 85,
    maxRate: 145,
    productivityPerDay: 160,
    includedServices: ["Wall preparation", "Texture material application", "Pattern finishing", "Basic masking"],
  },
  wallpaper: {
    label: SERVICE_LABELS.wallpaper,
    minRate: 65,
    maxRate: 120,
    productivityPerDay: 250,
    includedServices: ["Surface readiness check", "Wallpaper installation", "Edge finishing", "Basic cleanup"],
  },
  waterproofing: {
    label: SERVICE_LABELS.waterproofing,
    minRate: 55,
    maxRate: 95,
    productivityPerDay: 220,
    includedServices: ["Leakage area inspection", "Surface preparation", "Waterproofing coat application", "Curing guidance"],
  },
  wood_polish: {
    label: SERVICE_LABELS.wood_polish,
    minRate: 90,
    maxRate: 165,
    productivityPerDay: 140,
    includedServices: ["Wood surface sanding", "Polish/stain application", "Protective finishing", "Basic cleanup"],
  },
  false_ceiling: {
    label: SERVICE_LABELS.false_ceiling,
    minRate: 115,
    maxRate: 185,
    productivityPerDay: 120,
    includedServices: ["Ceiling layout estimate", "Material and labour estimate", "Finishing allowance", "Basic site cleanup"],
  },
};

const PROPERTY_MULTIPLIERS: Record<EstimatorPropertyType, number> = {
  apartment: 1,
  independent_house: 1.08,
  office: 1.12,
  shop: 0.95,
  villa: 1.18,
};

const QUALITY_MULTIPLIERS: Record<EstimatorQualityTier, number> = {
  basic: 0.9,
  standard: 1,
  premium: 1.35,
};

const METRO_CITIES = new Set(["bangalore", "bengaluru", "mumbai", "delhi", "pune", "hyderabad"]);

function roundToNearestHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

function getCityMultiplier(city?: string): number {
  if (!city) {
    return 1;
  }

  return METRO_CITIES.has(city.trim().toLowerCase()) ? 1.08 : 1;
}

function getRoomComplexity(rooms?: number): number {
  if (!rooms) {
    return 1;
  }

  return Math.min(1.15, 1 + rooms * 0.01);
}

export function estimateCost(input: EstimateInput): EstimateOutput {
  const serviceRule = SERVICE_RULES[input.serviceType];
  const propertyMultiplier = PROPERTY_MULTIPLIERS[input.propertyType];
  const qualityMultiplier = QUALITY_MULTIPLIERS[input.qualityTier];
  const cityMultiplier = getCityMultiplier(input.city);
  const roomComplexity = getRoomComplexity(input.rooms);
  const multiplier = propertyMultiplier * qualityMultiplier * cityMultiplier * roomComplexity;

  const minPrice = roundToNearestHundred(input.areaSize * serviceRule.minRate * multiplier);
  const maxPrice = roundToNearestHundred(input.areaSize * serviceRule.maxRate * multiplier);
  const baseDays = Math.max(1, Math.ceil(input.areaSize / serviceRule.productivityPerDay));
  const qualityBuffer = input.qualityTier === "premium" ? 1 : 0;
  const roomBuffer = input.rooms && input.rooms >= 4 ? 1 : 0;
  const minDays = Math.max(1, baseDays + qualityBuffer);
  const maxDays = minDays + Math.max(1, Math.ceil(baseDays * 0.35)) + roomBuffer;

  return {
    minPrice,
    maxPrice,
    currency: "INR",
    estimatedTimeline: `${minDays}-${maxDays} days`,
    recommendedPackage: input.qualityTier,
    includedServices: serviceRule.includedServices,
    assumptions: [
      `Estimate is based on approximately ${input.areaSize} sq ft of work area.`,
      `Rates are calculated for ${serviceRule.label} with ${input.qualityTier} quality materials.`,
      "Final pricing may change after site measurement, surface condition review, and brand selection.",
      input.city ? `City adjustment applied for ${input.city}.` : "No city-specific adjustment applied.",
    ],
    disclaimer:
      "This is an indicative estimate for planning only. A final quotation will be shared after a free site visit.",
  };
}
