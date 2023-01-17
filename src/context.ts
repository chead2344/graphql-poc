import { BlobServiceClient } from "@azure/storage-blob";
import { blobConnectionString, blobContainerName, blobName } from "./config";
import TradersDataSource from "./datasources/TradersDataSource";
import { server } from "./server";

export interface Context {
  dataSources: {
    tradersAPI: TradersDataSource;
  };
}

const blobClient = BlobServiceClient.fromConnectionString(blobConnectionString)
  .getContainerClient(blobContainerName)
  .getBlobClient(blobName);

export const context = async (): Promise<Context> => ({
  dataSources: {
    tradersAPI: new TradersDataSource(server.cache, blobClient),
  },
});
