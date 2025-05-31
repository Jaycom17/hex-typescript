import { Router } from "express";
import { ExcuseRoutes } from "./excuse.routes";
import { errorHandlerMiddleware } from "../../output/exceptionsHandler/exeptionMiddleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/excuses", ExcuseRoutes.routes);

    router.use(errorHandlerMiddleware);

    return router;
  }
}