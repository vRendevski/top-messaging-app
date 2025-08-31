import { Request, Response, NextFunction } from "express";
import UnauthroizedError from "../error/UnauthorizedError";

export function onlyPassAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
)
{
  try{
    if(!req.user) {
      throw new UnauthroizedError();
    }

    next();
  }
  catch(err) {
    next(err);
  }
}