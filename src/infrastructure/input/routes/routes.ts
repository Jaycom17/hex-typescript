import { Router } from "express";
import { ExcuseRoutes } from "./excuse.routes";
import { errorHandlerMiddleware } from "../middlewares/exeptionMiddleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/excuse", ExcuseRoutes.routes);

    router.use(errorHandlerMiddleware);

    return router;
  }
}