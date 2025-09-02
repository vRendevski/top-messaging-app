import { z } from "zod";

export const EventSchemas = {
  addOnlineUser: z.object({
    id: z.number(),
    username: z.string(),
    unreadCount: z.number()
  }),
  addOfflineUser: z.object({
    id: z.number(),
    username: z.string(),
    unreadCount: z.number()
  })
}

export namespace EventTypes {
  export type AddOnlineUser = z.infer<typeof EventSchemas.addOnlineUser>;
  export type AddOfflineUser = z.infer<typeof EventSchemas.addOfflineUser>;
}