import { ExcuseEntity } from "../models/excuse.model";
import { ExcuseModel } from "../models/mongo/excuse";
import mongoose from "mongoose";

export class ExcuseRepository {
    async createExcuse(excuse: ExcuseEntity): Promise<ExcuseEntity> {
        const objExcuse = new ExcuseModel(excuse);
        const savedExcuse = await objExcuse.save();
        return new ExcuseEntity(
            savedExcuse._id.toString(),
            savedExcuse.text,
            savedExcuse.createdAt
        );
    }

    async getExcuses(): Promise<ExcuseEntity[]> {
        const excuses = await ExcuseModel.find().exec();
        return excuses.map(
            (excuse) => new ExcuseEntity(excuse._id.toString(), excuse.text, excuse.createdAt)
        );
    }

    async getExcuseById(id: string): Promise<ExcuseEntity | null> {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null; 
        }

        const excuse = await ExcuseModel.findById(id).exec();
        if (!excuse) return null;
        return new ExcuseEntity(excuse._id.toString(), excuse.text, excuse.createdAt);
    }

    async updateExcuse(id: string, updatedText: string): Promise<ExcuseEntity | null> {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null; 
        }

        const updatedExcuse = await ExcuseModel.findByIdAndUpdate(
            id,
            { text: updatedText },
            { new: true }
        ).exec();
        if (!updatedExcuse) return null;
        return new ExcuseEntity(
            updatedExcuse._id.toString(),
            updatedExcuse.text,
            updatedExcuse.createdAt
        );
    }

    async deleteExcuse(id: string): Promise<boolean> {
        const result = await ExcuseModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async excuseExists(id: string): Promise<boolean> {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false; 
        }

        const excuse = await ExcuseModel.findById(id).exec();
        return excuse !== null;
    }
}