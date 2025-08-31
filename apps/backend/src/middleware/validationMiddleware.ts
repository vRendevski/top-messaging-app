import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { createSuccessResponseSchema } from "@vRendevski/shared/schemas/rest";

type RequestShape = {
  params: z.ZodType,
  query: z.ZodType,
  body: z.ZodType,
};

export function withValidation<
  RequestSchemaType extends RequestShape,
  ResponseSchemaType extends z.ZodType,
  ResponseType extends z.infer<ResponseSchemaType>,
  RequestParamsType extends z.infer<RequestSchemaType["params"]>,
  RequestQueryType extends z.infer<RequestSchemaType["query"]>,
  RequestBodyType extends z.infer<RequestSchemaType["body"]>,
>
(
  requestSchema: RequestSchemaType,
  responseSchema: ResponseSchemaType,
  controller: (req: Request<RequestParamsType, {}, RequestQueryType, RequestBodyType>, res: Response<ResponseType>, next: NextFunction) => Promise<ResponseType>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = z.object(requestSchema).parse({
        params: req.params,
        query: req.query,
        body: req.body
      }) as any;

      if(requestData.params) Object.assign(req.params, requestData.params);
      if(requestData.query) Object.assign(req.query, requestData.query);
      if(requestData.body) Object.assign(req.body, requestData.body);

      const data = await Promise.resolve(controller(req as any, res, next));

      const response = createSuccessResponseSchema(responseSchema).parse({
        success: true,
        data: data
      });

      res.json(response);
      next();
    }
    catch(err){
      next(err);
    }
  }
}