import { ExcuseGatewayIntPort } from "../../../../application/output/excuseGatewayIntPort";
import { Excuse } from "../../../../domain/models/excuse";
import { ExcuseEntity } from "../models/excuse.model";
import { ExcuseRepository } from "../repositories/excuseRepository";
import { excuseMapper } from "../mappers/excuseMapper";

export class ExcuseGatewayAdapter implements ExcuseGatewayIntPort {
    constructor(private readonly excuseRepository: ExcuseRepository){}

    async getExcuses(): Promise<Excuse[]> {

        let objResult: Excuse[] = [];

        const objExcuses: ExcuseEntity[] = await this.excuseRepository.getExcuses();

        if (objExcuses.length > 0) {
            objResult = objExcuses.map((excuseEntity) => 
                excuseMapper.map(excuseEntity, Excuse, ExcuseEntity)
            );
        }

        return objResult;

    }

    async getExcuseById(id: string): Promise<Excuse | null> {
        let objResult: Excuse | null = null;

        const objExcuse: ExcuseEntity | null = await this.excuseRepository.getExcuseById(id);

        if (objExcuse) {
            objResult = excuseMapper.map(objExcuse, Excuse, ExcuseEntity);
        }
        
        return objResult;
    }

    async addExcuse(excuse: Excuse): Promise<Excuse> {
        const objExcuseEntity = excuseMapper.map(excuse, ExcuseEntity, Excuse);

        return this.excuseRepository.createExcuse(objExcuseEntity)
            .then((createdExcuseEntity) => 
                excuseMapper.map(createdExcuseEntity, Excuse, ExcuseEntity)
            );
    }

    async updateExcuse(id: string, excuse: Excuse): Promise<Excuse | null> {
        const objExcuseEntity = excuseMapper.map(excuse, ExcuseEntity, Excuse);

        return this.excuseRepository.updateExcuse(id, objExcuseEntity.text)
            .then((updatedExcuseEntity) => {
                if (updatedExcuseEntity) {
                    return excuseMapper.map(updatedExcuseEntity, Excuse, ExcuseEntity);
                }
                return null;
            });
    }
    
    async deleteExcuse(id: string): Promise<void> {
        await this.excuseRepository.deleteExcuse(id);
    }

    async excuseExists(id: string): Promise<boolean> {
        return this.excuseRepository.excuseExists(id)
            .then((exists) => exists);
    }
}