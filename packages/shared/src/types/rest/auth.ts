import * as z from "zod";

export const RegisterRequestSchema = z.object({
  body: z.object({
    email: z.email({ error: "Must provide a valid email" }),
    username: z.string()
      .min(5, { error: "Username must be at least 5 characters" })
      .max(16, { error: "Username must be at most 16 characters" }),
    password: z.string()
      .min(8, { error: "Password must contain at least 8 characters" })
      .regex(/[a-z]/, { error: "Password must contain at least one lowercase letter" })
      .regex(/[A-z]/, { error: "Password must contain at least one uppercase letter" })
      .regex(/\d/, { error: "Password must contain at least one number" })
  })
});

export type RegisterRequestBody = z.infer<typeof RegisterRequestSchema>["body"];

export const LoginRequestSchema = z.object({
  body: z.object({
    email: z.email({ error: "Must provide a valid email" }),
    password: z.string({ error: "Must enter your password" })
  }) 
});

export type LoginRequestBody = z.infer<typeof LoginRequestSchema>["body"];