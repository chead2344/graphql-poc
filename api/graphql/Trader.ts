import { GraphQLError } from "graphql";
import { arg, extendType, list, nonNull, objectType } from "nexus";

export const Trader = objectType({
  name: "Trader",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
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
        id: arg({
          description: "The ID of the trader",
          type: nonNull("ID"),
        }),
      },
      resolve(_, { id }, { dataSources }) {
        const trader = dataSources.tradersAPI.findById(id);
        if (!trader) {
          throw new GraphQLError("trader not found");
        }
        return trader;
      },
    });
  },
});
