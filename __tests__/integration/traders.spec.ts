import { strict as assert } from "node:assert";
import TradersDataSource from "../../src/datasources/TradersDataSource";
import { server } from "../../src/server";

it("should return all traders", async () => {
  // ARRANGE
  const tradersAPI: any = {
    getAll: jest.fn().mockResolvedValue([
      {
        email: "barry.chuckle@chucklevision.net",
        countryCode: "US",
        entitlements: ["write", "read"],
      },
      {
        email: "bruce-forsythe@gmail.net",
        countryCode: "EN",
      },
    ]),
  };

  const contextValue = {
    dataSources: {
      tradersAPI,
    },
  };

  // ACT
  const response = await server.executeOperation(
    {
      query: `
        query GetAllTraders {
          traders {
            email
            countryCode
            entitlements
          }
        }
    `,
    },
    { contextValue }
  );

  // ASSERT
  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.traders).toEqual([
    {
      countryCode: "US",
      email: "barry.chuckle@chucklevision.net",
      entitlements: ["write", "read"],
    },
    {
      countryCode: "EN",
      email: "bruce-forsythe@gmail.net",
      entitlements: null,
    },
  ]);
});
