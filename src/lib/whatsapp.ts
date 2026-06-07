export const WALLORA_WHATSAPP_NUMBER = "+91 90000 00000";

const WALLORA_WHATSAPP_DIGITS = "919000000000";
const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Wallora, I want to know more about painting and interior finishing services.";

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WALLORA_WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}`;
}

export function createEstimatorWhatsAppMessage({
  serviceType,
  propertyType,
  areaSize,
  qualityTier,
  city,
  estimatedRange,
}: {
  serviceType: string;
  propertyType: string;
  areaSize: number;
  qualityTier: string;
  city?: string;
  estimatedRange?: string;
}) {
  const cityText = city ? ` in ${city}` : "";
  const estimateText = estimatedRange ? ` The estimator showed ${estimatedRange}.` : "";

  return `Hi Wallora, I checked an estimate for ${serviceType} for a ${propertyType}${cityText}, around ${areaSize} sq ft, ${qualityTier} finish.${estimateText} I would like to discuss the next step.`;
}

