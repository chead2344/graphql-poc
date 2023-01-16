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
    private cache: KeyValueCache<string>,
    private client: BlobClient
  ) {}

  private async getCachedData() {
    const cached = await this.cache.get(CACHE_KEY);
    if (cached) {
      return cached;
    }
    const data = (await this.client.downloadToBuffer()).toString();
    await this.cache.set(CACHE_KEY, data, { ttl: CACHE_TTL_SECONDS });
    return data;
  }

  private async getTraders() {
    const data = await this.getCachedData();
    const { accounts } = JSON.parse(data);
    return Object.values<BlobTrader>(accounts);
  }

  getAll() {
    return this.getTraders();
  }

  async findByEmail(email: string) {
    const traders = await this.getTraders();
    return traders.find((x) => x.email === email);
  }
}
