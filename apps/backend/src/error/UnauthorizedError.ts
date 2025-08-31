import AppError from "./AppError";

class UnauthroizedError extends AppError {
  constructor(message: string, statusCode = 401) {
    super(message, statusCode);
  }
}

export default UnauthroizedError;