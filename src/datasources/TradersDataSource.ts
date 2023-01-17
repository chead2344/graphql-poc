import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { BlobClient } from "@azure/storage-blob";

type BlobTrader = {
  countryCode: string;
  email: string;
  entitlements: string[];
  userId: string;
};

const CACHE_KEY = "downloaded-accounts";
const CACHE_TTL_SECONDS = 60;

export default class TradersDataSource {
  constructor(
    private readonly cache: KeyValueCache<string>,
    private readonly client: BlobClient
  ) {}

  private async downloadData() {
    const cached = await this.cache.get(CACHE_KEY);
    if (cached) {
      return cached;
    }
    const raw = await this.client.downloadToBuffer();
    const data = raw.toString();
    await this.cache.set(CACHE_KEY, data, { ttl: CACHE_TTL_SECONDS });
    return data;
  }

  async getAll() {
    const data = await this.downloadData();
    const { accounts } = JSON.parse(data);
    return Object.values<BlobTrader>(accounts);
  }
}
