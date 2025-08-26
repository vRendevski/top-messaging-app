import { PrismaClient } from "../generated/prisma";

if(process.env.DATABASE_URL === undefined) {
  throw new Error("You need to provide a DATABASE_URL in .env");
}

const client = new PrismaClient();

export default client;