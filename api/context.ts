import { BlobServiceClient } from "@azure/storage-blob";
import { blobContainerName, blobName, blobConnectionString } from "./config";
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

export const context = async (): Promise<Context> => {
  return {
    dataSources: {
      tradersAPI: new TradersDataSource(server.cache, blobClient),
    },
  };
};
