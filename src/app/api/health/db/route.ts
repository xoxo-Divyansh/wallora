import { NextResponse } from "next/server";
import { getDatabaseName, getMongoClient } from "@/lib/db";

export const dynamic = "force-dynamic";

interface DbHealthData {
  hasMongoUri: boolean;
  hasMongoDbName: boolean;
  databaseName: string | null;
  canPingDatabase: boolean;
  environment: string;
  timestamp: string;
}

function dbHealthResponse(success: boolean, message: string, data: DbHealthData, status = 200) {
  return NextResponse.json({ success, message, data }, { status });
}

export async function GET() {
  const hasMongoUri = Boolean(process.env.MONGODB_URI);
  const hasMongoDbName = Boolean(process.env.MONGODB_DB);
  const databaseName = hasMongoUri ? getDatabaseName() : null;
  const baseData = {
    hasMongoUri,
    hasMongoDbName,
    databaseName,
    canPingDatabase: false,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  } satisfies DbHealthData;

  if (!hasMongoUri) {
    return dbHealthResponse(false, "MongoDB URI is not configured.", baseData, 500);
  }

  try {
    const client = await getMongoClient();
    await client.db(databaseName ?? undefined).command({ ping: 1 });

    return dbHealthResponse(true, "MongoDB connection is healthy.", {
      ...baseData,
      canPingDatabase: true,
    });
  } catch (error) {
    console.error("Database health check failed", error);
    return dbHealthResponse(false, "MongoDB connection check failed. Review server logs for details.", baseData, 500);
  }
}
