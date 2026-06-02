import { randomBytes } from "node:crypto";
import { ObjectId, type Collection, type WithId } from "mongodb";
import { type QuotationStatus } from "@/config/lifecycle";
import { getLeadById, isValidLeadId, updateLeadStatusById } from "@/features/leads";
import { getDb } from "@/lib/db";
import { calculateQuotationTotal } from "@/lib/quotations/calculate";
import type { QuotationModel } from "@/models/Quotation";
import type { CreateQuotationInput, PublicQuotation, Quotation } from "@/types/quotation";

let indexesEnsured = false;

export type CustomerQuotationStatus = Extract<QuotationStatus, "accepted" | "rejected">;

export type CustomerQuotationStatusUpdateResult =
  | { outcome: "updated"; quotation: PublicQuotation }
  | { outcome: "not_found" }
  | { outcome: "not_sent"; quotation: PublicQuotation };

async function getQuotationCollection(): Promise<Collection<QuotationModel>> {
  const db = await getDb();
  const collection = db.collection<QuotationModel>("quotations");

  if (!indexesEnsured) {
    await Promise.all([
      collection.createIndex({ quoteNumber: 1 }, { unique: true }),
      collection.createIndex({ leadId: 1 }),
      collection.createIndex({ publicShareToken: 1 }, { unique: true, sparse: true }),
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
    publicShareToken: document.publicShareToken,
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

function toPublicQuotation(quotation: Quotation, options: { includeId?: boolean } = { includeId: true }): PublicQuotation {
  return {
    id: options.includeId ? quotation.id : undefined,
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

export function generatePublicShareToken(): string {
  return randomBytes(32).toString("base64url");
}

async function ensurePublicShareToken(
  collection: Collection<QuotationModel>,
  document: WithId<QuotationModel>,
): Promise<WithId<QuotationModel>> {
  if (document.publicShareToken) return document;

  const token = generatePublicShareToken();
  const updated = await collection.findOneAndUpdate(
    { _id: document._id, publicShareToken: { $exists: false } },
    { $set: { publicShareToken: token, updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  if (updated) return updated;

  const refreshed = await collection.findOne({ _id: document._id });
  return refreshed ?? document;
}

function isValidPublicShareToken(token: string): boolean {
  return /^[A-Za-z0-9_-]{32,}$/.test(token);
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
  const tokenizedQuotations = await Promise.all(quotations.map((quotation) => ensurePublicShareToken(collection, quotation)));
  return tokenizedQuotations.map(toQuotation);
}

export async function getQuotationById(id: string): Promise<Quotation | null> {
  if (!isValidQuotationId(id)) return null;

  const collection = await getQuotationCollection();
  const quotation = await collection.findOne({ _id: new ObjectId(id) });
  if (!quotation) return null;

  return toQuotation(await ensurePublicShareToken(collection, quotation));
}

export async function getPublicQuotationById(id: string): Promise<PublicQuotation | null> {
  const quotation = await getQuotationById(id);
  return quotation ? toPublicQuotation(quotation) : null;
}

export async function getPublicQuotationByToken(token: string): Promise<PublicQuotation | null> {
  if (!isValidPublicShareToken(token)) return null;

  const collection = await getQuotationCollection();
  const quotation = await collection.findOne({ publicShareToken: token });
  return quotation ? toPublicQuotation(toQuotation(quotation), { includeId: false }) : null;
}

export async function createQuotation(input: CreateQuotationInput): Promise<Quotation | null> {
  if (!isValidLeadId(input.leadId)) return null;

  const lead = await getLeadById(input.leadId);
  if (!lead) return null;

  const collection = await getQuotationCollection();
  const now = new Date();
  const document: QuotationModel = {
    ...input,
    publicShareToken: generatePublicShareToken(),
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

export async function updateQuotationStatusByToken(
  token: string,
  status: CustomerQuotationStatus,
): Promise<CustomerQuotationStatusUpdateResult> {
  if (!isValidPublicShareToken(token)) return { outcome: "not_found" };

  const collection = await getQuotationCollection();
  const existing = await collection.findOne({ publicShareToken: token });

  if (!existing) return { outcome: "not_found" };

  const existingQuotation = toQuotation(existing);
  if (existingQuotation.status !== "sent") {
    return { outcome: "not_sent", quotation: toPublicQuotation(existingQuotation, { includeId: false }) };
  }

  const result = await collection.findOneAndUpdate(
    { _id: existing._id, status: "sent" },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  if (!result) return { outcome: "not_found" };

  if (status === "accepted") {
    await updateLeadStatusById(result.leadId, "converted");
  }

  return { outcome: "updated", quotation: toPublicQuotation(toQuotation(result), { includeId: false }) };
}
