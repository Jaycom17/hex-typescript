import { Excuse } from "../models/excuse";

import { ExcuseUCIntPort } from "../../application/input/excuseUCIntPort";
import { ExcuseGatewayIntPort } from "../../application/output/excuseGatewayIntPort";
import { ErrorFormatterIntPort } from "../../application/output/errorFormaterIntPort";

export class ExcuseUCAdapter implements ExcuseUCIntPort {
  constructor(
    private excuseGateway: ExcuseGatewayIntPort,
    private errorFormatter: ErrorFormatterIntPort
  ) {}

  async getExcuses(): Promise<Excuse[]> {
    return this.excuseGateway.getExcuses();
  }

  async getExcuseById(id: string): Promise<Excuse | null> {
    if (!(await this.excuseGateway.excuseExists(id))) {
      this.errorFormatter.errorExistsEntity(
        `Excuse with id ${id} does not exist.`
      );
      return null;
    }

    return this.excuseGateway.getExcuseById(id);
  }

  async addExcuse(excuse: Excuse): Promise<Excuse> {
    return this.excuseGateway.addExcuse(excuse);
  }

  async updateExcuse(id: string, excuse: Excuse): Promise<Excuse | null> {
    if (!(await this.excuseGateway.excuseExists(id))) {
      this.errorFormatter.errorExistsEntity(
        `Excuse with id ${id} does not exist.`
      );
      return null;
    }

    return this.excuseGateway.updateExcuse(id, excuse);
  }

  async deleteExcuse(id: string): Promise<void> {
    if (!(await this.excuseGateway.excuseExists(id))) {
      this.errorFormatter.errorExistsEntity(
        `Excuse with id ${id} does not exist.`
      );
      return;
    }

    return this.excuseGateway.deleteExcuse(id);
  }
}
