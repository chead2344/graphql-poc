import { strict as assert } from "node:assert";

assert(process.env.BLOB_CONNECTION_STRING, "missing blob connection string");
export const blobStorageConnectionString = process.env.BLOB_CONNECTION_STRING;

assert(process.env.BLOB_CONTAINER_NAME, "missing blob container name");
export const blobContainerName = process.env.BLOB_CONTAINER_NAME;

assert(process.env.BLOB_NAME, "missing blob name");
export const blobName = process.env.BLOB_NAME;
