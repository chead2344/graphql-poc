import {
  BlobClient,
  BlobServiceClient,
  ContainerClient,
} from "@azure/storage-blob";

type BlobTrader = {
  email: string;
};

// {
//   "countryCode": "US",
//   "email": "some.user.1656670819048.0232@shell.com",
//   "entitlements": [
//     "BITUMEN|Initial business group|SOU"
//   ],
//   "userId": ""
// }

export default class TradersDataSource {
  private blobClient: BlobClient;

  constructor(
    connectionString: string,
    containerName: string,
    blobName: string
  ) {
    this.blobClient = BlobServiceClient.fromConnectionString(connectionString)
      .getContainerClient(containerName)
      .getBlobClient(blobName);
  }

  async getAll() {
    const response = await this.blobClient.downloadToBuffer();
    const { accounts } = JSON.parse(response.toString());
    console.log(JSON.stringify(Object.values(accounts)[0], null, 2));
    return Object.values(accounts) as BlobTrader[];
  }

  async findByEmail(email: string) {
    const response = await this.blobClient.downloadToBuffer();
    const { accounts } = JSON.parse(response.toString());
    const traders = Object.values(accounts) as BlobTrader[];
    return traders.find((x) => x.email === email);
  }
}
