import { Request, Response, NextFunction } from "express";
import { ExcuseUCIntPort } from "../../../application/input/excuseUCIntPort";

export class ExcuseController {
  constructor(private readonly excuseUseCases: ExcuseUCIntPort) {}

  getExcuses = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const excuses = await this.excuseUseCases.getExcuses();
      res.json(excuses);
    } catch (err) {
      next(err);
    }
  };

  getExcuseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const excuse = await this.excuseUseCases.getExcuseById(id);
      res.json(excuse);
    } catch (err) {
      next(err);
    }
  };

  addExcuse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const excuse = req.body;
      const createdExcuse = await this.excuseUseCases.addExcuse(excuse);
      res.status(201).json(createdExcuse);
    } catch (err) {
      next(err);
    }
  };

  updateExcuse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const excuse = req.body;
      const updatedExcuse = await this.excuseUseCases.updateExcuse(id, excuse);
      res.json(updatedExcuse);
    } catch (err) {
      next(err);
    }
  };

  deleteExcuse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.excuseUseCases.deleteExcuse(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

