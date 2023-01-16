import { blobStorageConnectionString } from "./config";
import TradersDataSource from "./datasources/TradersDataSource";

export interface Context {
  dataSources: {
    tradersAPI: TradersDataSource;
  };
}

export const context = async (): Promise<Context> => {
  return {
    dataSources: {
      tradersAPI: new TradersDataSource(blobStorageConnectionString),
    },
  };
};
