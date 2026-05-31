import { ObjectId, type Collection, type WithId } from "mongodb";
import { getDb } from "@/lib/db";
import type { LeadModel } from "@/models/Lead";
import type { LeadStatus } from "@/config/lifecycle";
import type { CreateLeadInput, Lead } from "@/types/lead";

let indexesEnsured = false;

async function getLeadCollection(): Promise<Collection<LeadModel>> {
  const db = await getDb();
  const collection = db.collection<LeadModel>("leads");

  if (!indexesEnsured) {
    await Promise.all([
      collection.createIndex({ status: 1 }),
      collection.createIndex({ createdAt: -1 }),
      collection.createIndex({ city: 1 }),
      collection.createIndex({ status: 1, createdAt: -1 }),
      collection.createIndex({ phone: 1, serviceType: 1, city: 1 }),
    ]);
    indexesEnsured = true;
  }

  return collection;
}

function toLead(document: WithId<LeadModel>): Lead {
  return {
    id: document._id.toString(),
    name: document.name,
    phone: document.phone,
    email: document.email,
    city: document.city,
    address: document.address,
    serviceType: document.serviceType,
    propertyType: document.propertyType,
    areaSize: document.areaSize,
    budgetRange: document.budgetRange,
    preferredDate: document.preferredDate?.toISOString(),
    message: document.message,
    status: document.status,
    source: document.source,
    sourceDetail: document.sourceDetail,
    assignedTo: document.assignedTo,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const collection = await getLeadCollection();
  const now = new Date();
  const document: LeadModel = {
    ...input,
    preferredDate: input.preferredDate ? new Date(input.preferredDate) : undefined,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(document);
  return toLead({ ...document, _id: result.insertedId });
}

export async function getLeads(): Promise<Lead[]> {
  const collection = await getLeadCollection();
  const leads = await collection.find().sort({ createdAt: -1 }).limit(100).toArray();
  return leads.map(toLead);
}

export async function updateLeadStatusById(id: string, status: LeadStatus): Promise<Lead | null> {
  const collection = await getLeadCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  return result ? toLead(result) : null;
}

export function isValidLeadId(id: string): boolean {
  return ObjectId.isValid(id);
}
