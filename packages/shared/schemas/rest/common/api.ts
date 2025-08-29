import * as z from "zod";
import { EmptyData } from "./empty";

const ResponseSchema = z.object({
  success: z.boolean(),
  data: EmptyData
});

export const SuccessResponseSchema = ResponseSchema.extend({
  success: z.literal(true),
  data: EmptyData
});

export const createSuccessResponseSchema = <T extends z.ZodType>(schema: T) => {
  return SuccessResponseSchema.extend({ data: schema })
}

export const ErrorResponseSchema = ResponseSchema.extend({
  success: z.literal(false),
  data: z.object({
    message: z.string()
  })
});

export const createApiResponseSchema = <T extends z.ZodType>(schema: T) => {
  const responseSchema = SuccessResponseSchema.extend({ data: schema });
  return z.discriminatedUnion("success", [responseSchema, ErrorResponseSchema]);
}