import type { CreateLeadInput } from "@/types/lead";

export type LeadValidationResult =
  | { success: true; data: CreateLeadInput }
  | { success: false; errors: Record<string, string> };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,20}$/;

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

export function validateCreateLead(input: unknown): LeadValidationResult {
  const payload = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const errors: Record<string, string> = {};

  const name = readString(payload.name);
  const phone = readString(payload.phone);
  const email = readString(payload.email);
  const city = readString(payload.city);
  const serviceType = readString(payload.serviceType);
  const areaSize = readNumber(payload.areaSize);
  const preferredDate = readString(payload.preferredDate);

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!city) {
    errors.city = "City is required.";
  }

  if (!serviceType) {
    errors.serviceType = "Service type is required.";
  }

  if (areaSize !== undefined && areaSize <= 0) {
    errors.areaSize = "Area size must be greater than 0.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: name!,
      phone: phone!,
      email,
      city: city!,
      address: readString(payload.address),
      serviceType: serviceType!,
      propertyType: readString(payload.propertyType),
      areaSize,
      budgetRange: readString(payload.budgetRange),
      preferredDate,
      message: readString(payload.message),
      source: readString(payload.source) ?? "contact",
      sourceDetail: readString(payload.sourceDetail),
    },
  };
}
