import AppError from "./AppError";

class BadRequestError extends AppError {
  constructor(message = "Bad Request", statusCode = 400){
    super(message, statusCode);
  }
}

export default BadRequestError;