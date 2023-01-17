import { strict as assert } from "node:assert";
import TradersDataSource from "../../src/datasources/TradersDataSource";
import { server } from "../../src/server";

it("should return a trader by their email address", async () => {
  // ARRANGE
  const tradersAPI: Partial<TradersDataSource> = {
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
      tradersAPI: tradersAPI as any,
    },
  };

  // ACT
  const response = await server.executeOperation(
    {
      query: `
        query($email: String!) {
          trader(email: $email) {
            email
            countryCode
            entitlements
          }
        }
    `,
      variables: {
        email: "bruce-forsythe@gmail.net",
      },
    },
    { contextValue }
  );

  // ASSERT
  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.trader).toMatchInlineSnapshot(`
{
  "countryCode": "EN",
  "email": "bruce-forsythe@gmail.net",
  "entitlements": null,
}
`);
});
