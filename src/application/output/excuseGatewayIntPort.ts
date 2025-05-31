import { Excuse } from "../../domain/models/excuse";

export interface ExcuseGatewayIntPort {
    getExcuses(): Promise<Excuse[]>;
    getExcuseById(id: string): Promise<Excuse | null>;
    addExcuse(excuse: Excuse): Promise<Excuse>;
    updateExcuse(id: string, excuse: Excuse): Promise<Excuse | null>;
    deleteExcuse(id: string): Promise<void>;
    excuseExists(id: string): Promise<boolean>;
}