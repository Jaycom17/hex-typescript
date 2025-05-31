import { Excuse } from "../../domain/models/excuse";

export interface ExcuseUCIntPort {
    getExcuses(): Promise<Excuse[]>;
    getExcuseById(id: string): Promise<Excuse | null>;
    addExcuse(excuse: Excuse): Promise<Excuse>;
    updateExcuse(id: string, excuse: Excuse): Promise<Excuse | null>;
    deleteExcuse(id: string): Promise<void>;
}
