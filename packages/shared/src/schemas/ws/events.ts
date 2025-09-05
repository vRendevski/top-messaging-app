import { z } from "zod";

export const EventSchemas = {
  serverToClient: {
    user: {
      seed: z.array(
        z.object({
          id: z.number(),
          username: z.string(),
          isOnline: z.boolean(),
          messages: z.array(
            z.object({
              id: z.number(),
              sentAt: z.date(),
              fromId: z.number(),
              fromUsername: z.string(),
              toId: z.number(),
              contents: z.string()
            })
          )
        })
      ),
      new: z.object({
        id: z.number(),
        username: z.string()
      }),
      presence: z.object({
        id: z.number(),
        isOnline: z.boolean()
      })
    },
    message: {
      receive: z.object({
        id: z.number(),
        sentAt: z.date(),
        fromId: z.number(),
        fromUsername: z.string(),
        toId: z.number(),
        contents: z.string(),
      }),
    }
  },
  clientToServer: {
    message: {
      send: z.object({
        toId: z.number(),
        message: z.string().max(1024)
      }),
    }
  }
}

export namespace EventTypes {
  export type UserSeed = z.infer<typeof EventSchemas.serverToClient.user.seed>;
  export type UserNew = z.infer<typeof EventSchemas.serverToClient.user.new>;
  export type UserPresence = z.infer<typeof EventSchemas.serverToClient.user.presence>;
  export type MessageReceive = z.infer<typeof EventSchemas.serverToClient.message.receive>;
  
  export type MessageSend = z.infer<typeof EventSchemas.clientToServer.message.send>;
}