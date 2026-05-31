import {
  ESTIMATOR_PROPERTY_TYPES,
  ESTIMATOR_QUALITY_TIERS,
  ESTIMATOR_SERVICE_TYPES,
  type EstimateInput,
  type EstimatorPropertyType,
  type EstimatorQualityTier,
  type EstimatorServiceType,
} from "@/lib/estimator";

export type EstimatorValidationResult =
  | { success: true; data: EstimateInput }
  | { success: false; errors: Record<string, string> };

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function isSupportedServiceType(value: string | undefined): value is EstimatorServiceType {
  return ESTIMATOR_SERVICE_TYPES.includes(value as EstimatorServiceType);
}

function isSupportedPropertyType(value: string | undefined): value is EstimatorPropertyType {
  return ESTIMATOR_PROPERTY_TYPES.includes(value as EstimatorPropertyType);
}

function isSupportedQualityTier(value: string | undefined): value is EstimatorQualityTier {
  return ESTIMATOR_QUALITY_TIERS.includes(value as EstimatorQualityTier);
}

export function validateEstimateInput(input: unknown): EstimatorValidationResult {
  const payload = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const errors: Record<string, string> = {};

  const serviceType = readString(payload.serviceType);
  const propertyType = readString(payload.propertyType);
  const qualityTier = readString(payload.qualityTier);
  const areaSize = readNumber(payload.areaSize);
  const rooms = readNumber(payload.rooms);
  const city = readString(payload.city);

  if (!isSupportedServiceType(serviceType)) {
    errors.serviceType = "Select a supported service.";
  }

  if (!isSupportedPropertyType(propertyType)) {
    errors.propertyType = "Select a supported property type.";
  }

  if (!isSupportedQualityTier(qualityTier)) {
    errors.qualityTier = "Select a supported quality tier.";
  }

  if (areaSize === undefined || areaSize <= 0) {
    errors.areaSize = "Area size must be greater than 0.";
  }

  if (rooms !== undefined && (rooms <= 0 || !Number.isInteger(rooms))) {
    errors.rooms = "Rooms must be a whole number greater than 0.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      serviceType: serviceType as EstimatorServiceType,
      propertyType: propertyType as EstimatorPropertyType,
      qualityTier: qualityTier as EstimatorQualityTier,
      areaSize: areaSize!,
      city,
      rooms,
    },
  };
}
