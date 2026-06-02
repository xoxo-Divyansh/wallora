import { ObjectId, type Collection, type WithId } from "mongodb";
import { type QuotationStatus } from "@/config/lifecycle";
import { getLeadById, isValidLeadId, updateLeadStatusById } from "@/features/leads";
import { getDb } from "@/lib/db";
import { calculateQuotationTotal } from "@/lib/quotations/calculate";
import type { QuotationModel } from "@/models/Quotation";
import type { CreateQuotationInput, PublicQuotation, Quotation } from "@/types/quotation";

let indexesEnsured = false;

async function getQuotationCollection(): Promise<Collection<QuotationModel>> {
  const db = await getDb();
  const collection = db.collection<QuotationModel>("quotations");

  if (!indexesEnsured) {
    await Promise.all([
      collection.createIndex({ quoteNumber: 1 }, { unique: true }),
      collection.createIndex({ leadId: 1 }),
      collection.createIndex({ status: 1 }),
      collection.createIndex({ createdAt: -1 }),
    ]);
    indexesEnsured = true;
  }

  return collection;
}

function toQuotation(document: WithId<QuotationModel>): Quotation {
  return {
    id: document._id.toString(),
    leadId: document.leadId,
    quoteNumber: document.quoteNumber,
    customerName: document.customerName,
    customerPhone: document.customerPhone,
    serviceType: document.serviceType,
    propertyType: document.propertyType,
    areaSize: document.areaSize,
    paintQuality: document.paintQuality,
    labourCost: document.labourCost,
    materialCost: document.materialCost,
    additionalCost: document.additionalCost,
    discount: document.discount,
    tax: document.tax,
    totalAmount: document.totalAmount,
    status: document.status,
    notes: document.notes,
    validUntil: document.validUntil?.toISOString(),
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
}

function toPublicQuotation(quotation: Quotation): PublicQuotation {
  return {
    id: quotation.id,
    quoteNumber: quotation.quoteNumber,
    customerName: quotation.customerName,
    customerPhone: quotation.customerPhone,
    serviceType: quotation.serviceType,
    propertyType: quotation.propertyType,
    areaSize: quotation.areaSize,
    paintQuality: quotation.paintQuality,
    labourCost: quotation.labourCost,
    materialCost: quotation.materialCost,
    additionalCost: quotation.additionalCost,
    discount: quotation.discount,
    tax: quotation.tax,
    totalAmount: quotation.totalAmount,
    status: quotation.status,
    notes: quotation.notes,
    validUntil: quotation.validUntil,
    createdAt: quotation.createdAt,
  };
}

function createQuoteNumber(date = new Date()): string {
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WQ-${stamp}-${suffix}`;
}

export function isValidQuotationId(id: string): boolean {
  return ObjectId.isValid(id);
}

export async function getQuotations(): Promise<Quotation[]> {
  const collection = await getQuotationCollection();
  const quotations = await collection.find().sort({ createdAt: -1 }).limit(100).toArray();
  return quotations.map(toQuotation);
}

export async function getQuotationById(id: string): Promise<Quotation | null> {
  if (!isValidQuotationId(id)) return null;

  const collection = await getQuotationCollection();
  const quotation = await collection.findOne({ _id: new ObjectId(id) });
  return quotation ? toQuotation(quotation) : null;
}

export async function getPublicQuotationById(id: string): Promise<PublicQuotation | null> {
  const quotation = await getQuotationById(id);
  return quotation ? toPublicQuotation(quotation) : null;
}

export async function createQuotation(input: CreateQuotationInput): Promise<Quotation | null> {
  if (!isValidLeadId(input.leadId)) return null;

  const lead = await getLeadById(input.leadId);
  if (!lead) return null;

  const collection = await getQuotationCollection();
  const now = new Date();
  const document: QuotationModel = {
    ...input,
    quoteNumber: createQuoteNumber(now),
    totalAmount: calculateQuotationTotal(input),
    status: "draft",
    validUntil: input.validUntil ? new Date(input.validUntil) : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(document);
  return toQuotation({ ...document, _id: result.insertedId });
}

export async function updateQuotationStatusById(id: string, status: QuotationStatus): Promise<Quotation | null> {
  if (!isValidQuotationId(id)) return null;

  const collection = await getQuotationCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  if (!result) return null;

  if (status === "sent") {
    await updateLeadStatusById(result.leadId, "quoted");
  }

  return toQuotation(result);
}
