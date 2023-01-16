import { GraphQLError } from "graphql";
import { arg, extendType, list, nonNull, objectType } from "nexus";

export const Trader = objectType({
  name: "Trader",
  definition(t) {
    t.nonNull.string("countryCode");
    t.nonNull.string("email");
    t.list.string("entitlements");
  },
});

export const TraderQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("traders", {
      type: nonNull(list(nonNull("Trader"))),
      resolve(_source, _args, { dataSources }) {
        return dataSources.tradersAPI.getAll();
      },
    });
    t.field("trader", {
      type: "Trader",
      args: {
        email: arg({
          description: "The email of the trader",
          type: nonNull("String"),
        }),
      },
      async resolve(_, { email }, { dataSources }) {
        const trader = await dataSources.tradersAPI.findByEmail(email);
        if (!trader) {
          throw new GraphQLError("trader not found");
        }
        return trader;
      },
    });
  },
});
