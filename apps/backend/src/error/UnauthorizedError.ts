import AppError from "./AppError";

class UnauthroizedError extends AppError {
  constructor(message: string = "Unauthorized", statusCode = 401) {
    super(message, statusCode);
  }
}

export default UnauthroizedError;