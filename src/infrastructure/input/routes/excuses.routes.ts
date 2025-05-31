import { Router } from "express";
import { ValidatorMiddleware } from "../middlewares/validatorMiddleware";
import { ExcuseSchema } from "../schemas/excuseSchema";
import { ExcuseController } from "../controllers/excuse.controllers";
import { ExcuseUCAdapter } from "../../../domain/useCases/excuseUCAdapter";
import { ExcuseGatewayAdapter } from "../../output/persistence/gateway/excuseGatewayAdapter";
import { ExcuseRepository } from "../../output/persistence/repositories/excuseRepository";
import { ExceptionHandler } from "../../output/exceptionsHandler/exceptionHandler";

export class ExcuseRoutes {

  static get routes(): Router {
    const router = Router();

    const excuseRepository: ExcuseRepository = new ExcuseRepository();
  
    const excuseGateway: ExcuseGatewayAdapter = new ExcuseGatewayAdapter(excuseRepository);

    const errorFormatter: ExceptionHandler = new ExceptionHandler();

    const excuseUseCases = new ExcuseUCAdapter(excuseGateway, errorFormatter);

    const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware(ExcuseSchema);
    
    const excuseController: ExcuseController = new ExcuseController(excuseUseCases);

    router.get("/", excuseController.getExcuses);
    router.get("/:id", excuseController.getExcuseById);
    router.post("/", validatorMiddleware.validate, excuseController.addExcuse);
    router.put("/:id", validatorMiddleware.validate, excuseController.updateExcuse);
    router.delete("/:id", excuseController.deleteExcuse);

    return router;
  }
}
