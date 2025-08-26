import { Prisma } from "../generated/prisma"

const userSelect = {
  publicProfile: {
    id: true,
    username: true,
  } satisfies Prisma.UserSelect,
  privateProfile: {
    id: true,
    username: true,
    email: true,
  } satisfies Prisma.UserSelect,
  auth: {
    id: true,
    username: true,
    email: true,
    password: true
  } satisfies Prisma.UserSelect
}

export default userSelect;