import { Request, Response, NextFunction } from "express";
import AppError from "../error/AppError";
import { ZodError, treeifyError } from "zod";
import { ErrorResponseSchema } from "@vRendevski/shared/src/types/error";

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.statusCode ?? 500;
  let errorMessage = "Something went wrong";
  
  if(error instanceof AppError) {
    errorMessage = error.message;
  }

  if(error instanceof ZodError) {
    errorMessage = treeifyError(error).errors[0];
  }

  const response = ErrorResponseSchema.parse({ 
    success: "error",
    message: errorMessage
  });

  res.status(statusCode).json(response);
}

export default errorMiddleware;