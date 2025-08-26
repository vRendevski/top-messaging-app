import * as z from "zod";

export const ErrorResponseSchema = z.object({
  status: z.literal("error"),
  message: z.string()
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;