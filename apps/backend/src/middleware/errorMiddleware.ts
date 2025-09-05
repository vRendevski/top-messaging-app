import { Request, Response, NextFunction } from "express";
import AppError from "../error/AppError";
import { ErrorResponseSchema } from "@vRendevski/shared";

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.statusCode ?? 500;
  let errorMessage = "Something went wrong";

  console.log(error);
  
  if(error instanceof AppError) {
    errorMessage = error.message;
  }

  const response = ErrorResponseSchema.parse({ 
    success: false,
    data: {
      message: errorMessage
    }
  });

  res.status(statusCode).json(response);
}

export default errorMiddleware;