import { Request, Response, NextFunction } from "express";

export function adaptAuthExpressMiddlewareToSocketIo(
  middleware: (req: Request, res: Response, next: NextFunction) => void,
) 
{
  return (
    req: Request & { _query: Record<string, string> },
    res: Response,
    next: NextFunction,
  ) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      middleware(req, res, next);
    } else {
      next();
    }
  };
}
