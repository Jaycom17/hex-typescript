import { Server } from "./infrastructure/input/server/server";
import { AppRoutes } from "./infrastructure/input/routes/routes";
import { MongoDatabase } from "./config/database";
import { envs } from "./config/env";

(() => {
  main();
})();

async function main() {

  await MongoDatabase.connect({mongoUrl: envs.MONGO_URL!, dbName: envs.DB_NAME!});

  new Server({ port: 3000, routes: AppRoutes.routes }).start();
}
