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
      resolve() {
        return [
          {
            id: "1",
            name: "Barry Chuckle",
          },
        ];
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
      resolve(_, { id }) {
        if (id !== "1") {
          throw new GraphQLError("trader not found");
        }
        return {
          id: "1",
          name: "Barry Chuckle",
        };
      },
    });
  },
});
