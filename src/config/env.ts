import dotenv from 'dotenv';

dotenv.config();

export const envs = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
}