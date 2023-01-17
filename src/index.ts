import "dotenv/config";
import { startStandaloneServer } from "@apollo/server/standalone";
import { context } from "./context";
import { server } from "./server";

(async () => {
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at ${url}`);
})();
