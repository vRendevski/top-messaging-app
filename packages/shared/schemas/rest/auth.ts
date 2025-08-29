import * as z from "zod";
import { EmptyParams, EmptyQuery, EmptyResponseSchema } from "./common/empty";

const AuthBodies = {
  register: z.object({
    email: z.email({ error: "Must provide a valid email" }),
    username: z.string()
      .min(5, { error: "Username must be at least 5 characters" })
      .max(16, { error: "Username must be at most 16 characters" }),
    password: z.string()
      .min(8, { error: "Password must contain at least 8 characters" })
      .regex(/[a-z]/, { error: "Password must contain at least one lowercase letter" })
      .regex(/[A-z]/, { error: "Password must contain at least one uppercase letter" })
      .regex(/\d/, { error: "Password must contain at least one number" })
  }),

  login: z.object({
    email: z.email({ error: "Must provide a valid email" }),
    password: z.string({ error: "Must enter your password" })
  })
}

export const AuthSchemas = {
  requests: {
    register: {
      params: EmptyParams,
      query: EmptyQuery,
      body: AuthBodies.register
    },
    login: {
      params: EmptyParams,
      query: EmptyQuery,
      body: AuthBodies.login 
    }
  },

  responses: {
    register: EmptyResponseSchema,
    login: EmptyResponseSchema
  }
}

export namespace AuthTypes {
  export type RegisterParams = z.infer<typeof AuthSchemas.requests.register.params>;
  export type RegisterQuery = z.infer<typeof AuthSchemas.requests.register.query>;
  export type RegisterBody = z.infer<typeof AuthSchemas.requests.register.body>;

  export type LoginParams = z.infer<typeof AuthSchemas.requests.login.params>;
  export type LoginQuery = z.infer<typeof AuthSchemas.requests.login.query>;
  export type LoginBody = z.infer<typeof AuthSchemas.requests.login.body>;

  export type RegisterResponse = z.infer<typeof AuthSchemas.responses.register>;
  
  export type LoginResponse = z.infer<typeof AuthSchemas.responses.login>;
}