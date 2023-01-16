const traders = [
  {
    id: "1",
    name: "Barry Chuckle",
  },
];

export default class TradersDataSource {
  private connectionString;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  getAll() {
    return traders;
  }

  findById(id: string) {
    return traders.find((_) => _.id === id);
  }
}
