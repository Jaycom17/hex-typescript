import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export class ValidatorMiddleware {
  constructor(private readonly schema: ZodSchema<any>) {}

  validate = (req: Request, res: Response, next: NextFunction): void => {
    const result = this.schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message
      }));

      res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
      return;
    }

    req.body = result.data;
    next();
  };
}
