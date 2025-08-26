import { Request, Response, NextFunction } from "express";
import { ZodAny, ZodType, ZodObject } from "zod";
import * as z from "zod";

interface RequestSchemaShape {
  params: ZodObject,
  query: ZodObject,
  body: ZodObject,
}

export function withValidation<
  RequestSchemaType extends ZodObject<Partial<RequestSchemaShape>> | ZodAny,
  ResponseSchemaType extends ZodType,
  RequestParamsType extends ("params" extends keyof RequestSchemaType ? z.infer<RequestSchemaType>["params"] : unknown),
  RequestQueryType extends ("query" extends keyof RequestSchemaType ? z.infer<RequestSchemaType>["query"] : unknown),
  RequestBodyType extends ("body" extends keyof RequestSchemaType ? z.infer<RequestSchemaType>["body"] : unknown),
  ResponseType extends z.infer<ResponseSchemaType>
>
(
  requestSchema: RequestSchemaType,
  responseSchema: ResponseSchemaType,
  controller: (req: Request<RequestParamsType, {}, RequestQueryType, RequestBodyType>, res: Response<ResponseType>, next: NextFunction) => ResponseType
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = requestSchema.parse({
        params: req.params,
        query: req.query,
        body: req.body
      });

      req.params = requestData.params;
      req.query = requestData.query;
      req.body = requestData.body;

      const dirtyResponse = await controller(req as any, res, next);

      const responseData = responseSchema.parse(dirtyResponse) as ResponseType;

      res.json(responseData);
      next();
    }
    catch(err){
      next(err);
    }
  }
}

export function validateAndPass<
  RequestSchemaType extends ZodObject<Partial<RequestSchemaShape>> | ZodAny
>(requestSchema: RequestSchemaType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = requestSchema.parse({
        params: req.params,
        query: req.query,
        body: req.body
      });

      req.params = requestData.params;
      req.query = requestData.query;
      req.body = requestData.body;

      next();
    }
    catch(err) {
      next(err);
    }
  }
}