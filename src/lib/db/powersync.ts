import { PowerSyncDatabase, Schema, Table, column } from "@powersync/web";
import { logger } from "@/src/lib/services/logger";

// The local SQLite schema mapping for PowerSync
// Define the tables we want to sync locally from our Neon database
export const AppSchema = new Schema({
  User: new Table({
    email: column.text,
    name: column.text,
    createdAt: column.text,
  }),
  Order: new Table({
    userId: column.text,
    total: column.real,
    status: column.text,
    createdAt: column.text,
  }),
});

// Singleton PowerSync instance
export const db = new PowerSyncDatabase({
  database: {
    dbFilename: "ekart.sqlite",
  },
  schema: AppSchema,
});

// We need an authentication connector so PowerSync can securely fetch data from your Neon DB
export class BackendConnector {
  async fetchCredentials() {
    // This endpoint should return a JWT securely signed with your PowerSync key
    const response = await fetch("/api/auth/powersync");

    if (!response.ok) {
      throw new Error("Failed to fetch PowerSync token");
    }

    const body = await response.json();
    return {
      endpoint: process.env.NEXT_PUBLIC_POWERSYNC_URL || "",
      token: body.token,
    };
  }

  async uploadData(database: PowerSyncDatabase) {
    // Placeholder for two-way sync (client → server) offline mutations.
    // This method is intentionally typed so `strict` TS mode surfaces further issues.
    logger.debug("BackendConnector.uploadData called");
  }
}

export const connector = new BackendConnector();
