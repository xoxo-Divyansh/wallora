import { Db, MongoClient } from "mongodb";

const DB_NAME = "wallora";

type CachedMongo = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

const globalForMongo = globalThis as typeof globalThis & {
  _walloraMongo?: CachedMongo;
};

const cached = globalForMongo._walloraMongo ?? {
  client: null,
  promise: null,
};

if (!globalForMongo._walloraMongo) {
  globalForMongo._walloraMongo = cached;
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is required to connect to the database.");
  }

  return uri;
}

export function getDatabaseName(): string {
  return process.env.MONGODB_DB ?? DB_NAME;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = new MongoClient(getMongoUri()).connect();
  }

  cached.client = await cached.promise;
  return cached.client;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(getDatabaseName());
}

export async function connectToDatabase(): Promise<void> {
  await getDb();
}
