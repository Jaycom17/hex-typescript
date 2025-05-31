import { z } from 'zod';

export const ExcuseSchema = z.object({
    text: z.string().min(1, "Text is required").max(500, "Text must be less than 500 characters"),
});