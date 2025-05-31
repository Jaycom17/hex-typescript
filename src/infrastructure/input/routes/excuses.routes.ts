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

    const excuseGateway: ExcuseGatewayAdapter = new ExcuseGatewayAdapter(
      excuseRepository
    );

    const errorFormatter: ExceptionHandler = new ExceptionHandler();

    const excuseUseCases = new ExcuseUCAdapter(excuseGateway, errorFormatter);

    const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware(
      ExcuseSchema
    );

    const excuseController: ExcuseController = new ExcuseController(
      excuseUseCases
    );
    /**
     * @swagger
     * components:
     *   schemas:
     *     Excuse:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           description: ID de la excusa
     *         text:
     *           type: string
     *           description: Texto de la excusa
     *         createdAt:
     *           type: string
     *           format: date-time
     *           description: Fecha de creación de la excusa
     *       example:
     *         id: "12345"
     *         text: "No pude asistir porque tenía una cita médica"
     *         createdAt: "2023-10-01T12:00:00Z"
     *       description: "Modelo de excusa"
     *     ExcuseInput:
     *       type: object
     *       properties:
     *         text:
     *           type: string
     *       required:
     *         - text
     *       example:
     *         text: "No pude asistir porque tenía una cita médica"
     *       description: "Datos necesarios para crear una excusa"
     */

    /**
     * @swagger
     * /excuses:
     *   get:
     *     summary: Obtener todas las excusas
     *     tags:
     *       - Excusas
     *     responses:
     *       200:
     *         description: Lista de excusas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Excuse'
     */
    router.get("/", excuseController.getExcuses);
    /**
     * @swagger
     * /excuses/{id}:
     *   get:
     *     summary: Obtener una excusa por ID
     *     tags:
     *      - Excusas
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la excusa
     *     responses:
     *       200:
     *         description: Detalles de la excusa
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Excuse'
     */
    router.get("/:id", excuseController.getExcuseById);
    /**
     * @swagger
     * /excuses:
     *   post:
     *     summary: Crear una nueva excusa
     *     tags:
     *      - Excusas
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ExcuseInput'
     *     responses:
     *       201:
     *         description: Excusa creada exitosamente
     */
    router.post("/", validatorMiddleware.validate, excuseController.addExcuse);
    /**
     * @swagger
     * /excuses/{id}:
     *   put:
     *     summary: Actualizar una excusa existente
     *     tags:
     *      - Excusas
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la excusa a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ExcuseInput'
     *     responses:
     *       200:
     *         description: Excusa actualizada exitosamente
     */
    router.put(
      "/:id",
      validatorMiddleware.validate,
      excuseController.updateExcuse
    );
    /**
     * @swagger
     * /excuses/{id}:
     *   delete:
     *     summary: Eliminar una excusa por ID
     *     tags:
     *       - Excusas
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la excusa a eliminar
     *     responses:
     *       204:
     *         description: Excusa eliminada exitosamente
     */
    router.delete("/:id", excuseController.deleteExcuse);

    return router;
  }
}
