import { QUOTATION_STATUSES, type QuotationStatus } from "@/config/lifecycle";
import type { CustomerQuotationStatus } from "@/features/quotations/repository";
import type { CreateQuotationInput, PaintQuality } from "@/types/quotation";

export type QuotationValidationResult =
  | { success: true; data: CreateQuotationInput }
  | { success: false; errors: Record<string, string> };

const PAINT_QUALITIES = ["basic", "standard", "premium"] as const;

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function readMoney(value: unknown): number {
  const numberValue = readNumber(value);
  return numberValue === undefined ? 0 : numberValue;
}

function isPaintQuality(value: string | undefined): value is PaintQuality {
  return PAINT_QUALITIES.includes(value as PaintQuality);
}

export function isValidQuotationStatus(status: string): status is QuotationStatus {
  return QUOTATION_STATUSES.includes(status as QuotationStatus);
}

export function isValidCustomerQuotationStatus(status: string): status is CustomerQuotationStatus {
  return status === "accepted" || status === "rejected";
}

export function validateCreateQuotation(input: unknown): QuotationValidationResult {
  const payload = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const errors: Record<string, string> = {};

  const leadId = readString(payload.leadId);
  const customerName = readString(payload.customerName);
  const customerPhone = readString(payload.customerPhone);
  const customerEmail = readString(payload.customerEmail);
  const serviceType = readString(payload.serviceType);
  const paintQuality = readString(payload.paintQuality);
  const areaSize = readNumber(payload.areaSize);
  const labourCost = readMoney(payload.labourCost);
  const materialCost = readMoney(payload.materialCost);
  const additionalCost = readMoney(payload.additionalCost);
  const discount = readMoney(payload.discount);
  const tax = readMoney(payload.tax);

  if (!leadId) errors.leadId = "Lead is required.";
  if (!customerName) errors.customerName = "Customer name is required.";
  if (!customerPhone) errors.customerPhone = "Customer phone is required.";
  if (!serviceType) errors.serviceType = "Service type is required.";
  if (!isPaintQuality(paintQuality)) errors.paintQuality = "Paint quality is required.";
  if (areaSize !== undefined && areaSize <= 0) errors.areaSize = "Area size must be greater than 0.";

  for (const [key, value] of Object.entries({ labourCost, materialCost, additionalCost, discount, tax })) {
    if (value < 0) errors[key] = "Amount cannot be negative.";
  }

  if (labourCost + materialCost + additionalCost + tax <= 0) {
    errors.totalAmount = "At least one cost amount is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      leadId: leadId!,
      customerName: customerName!,
      customerPhone: customerPhone!,
      customerEmail,
      serviceType: serviceType!,
      propertyType: readString(payload.propertyType),
      areaSize,
      paintQuality: paintQuality as PaintQuality,
      labourCost,
      materialCost,
      additionalCost,
      discount,
      tax,
      notes: readString(payload.notes),
      validUntil: readString(payload.validUntil),
    },
  };
}
