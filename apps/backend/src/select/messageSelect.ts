import { Prisma } from "@prisma/client"

export const messageSelect = {
  primitives: {
    id: true,
    sentAt: true,
    contents: true,
    fromId: true,
    toId: true
  } satisfies Prisma.MessageSelect,
  withFromUser: {
    id: true,
    sentAt: true,
    contents: true,
    fromId: true,
    toId: true,
    from: true
  } satisfies Prisma.MessageSelect
}