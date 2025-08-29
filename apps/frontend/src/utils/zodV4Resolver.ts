import * as z from "zod"
import { ZodError } from "zod"

export function zodV4Resolver<T>(schema: z.ZodType<T>) {
  return async (values: unknown) => {
    try {
      const data = schema.parse(values)
      return { values: data, errors: {} }
    } catch (err) {
      if (err instanceof ZodError) {
        const flat = z.flattenError(err);
        const formatted = Object.fromEntries(
          Object.entries(flat.fieldErrors).map(([key, val]) => [
            key,
            {
              message: Array.isArray(val) ? val[0] : undefined,
            },
          ])
        );
        return { values: {}, errors: formatted }
      }
      throw err 
    }
  }
}