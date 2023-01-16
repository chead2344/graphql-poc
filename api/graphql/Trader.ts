import { GraphQLError } from "graphql";
import { arg, extendType, list, nonNull, objectType } from "nexus";

export const Trader = objectType({
  name: "Trader",
  definition(t) {
    t.nonNull.string("countryCode", {
      description: "The country the trader operates in",
    });
    t.nonNull.string("email", {
      description: "The email address of the trader",
    });
    t.list.string("entitlements", {
      description:
        "The permissions associated to the trader, comprised of business entity, role and team",
    });
  },
});

export const TraderQuery = extendType({
  type: "Query",
  definition(t) {
    // TODO: Add pagination
    t.field("traders", {
      description: "Returns all traders",
      type: nonNull(list(nonNull("Trader"))),
      resolve(_source, _args, { dataSources }) {
        return dataSources.tradersAPI.getAll();
      },
    });
    t.field("trader", {
      type: "Trader",
      description: "Returns a single trader by their email address",
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
