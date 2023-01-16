import { strict as assert } from "node:assert";

assert(
  typeof process.env.BLOB_STORAGE_CONNECTION_STRING === "string",
  "missing blob storage connection string"
);

export const blobStorageConnectionString =
  process.env.BLOB_STORAGE_CONNECTION_STRING;
