import { Request, Response, NextFunction } from "express";
import { CustumError } from "../../output/exceptionsHandler/customErrors/customErrors";

export const errorHandlerMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof CustumError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    error: {
      message
    },
  });
};
