import { Prisma } from "../generated/prisma";
import db from "../db/prisma";
import BadRequestError from "../error/BadRequestError";
import userService from "./UserService";

class MessageService {
  async getConversationBetweenUsers<S extends Prisma.MessageSelect>(userOneId: number, userTwoId: number, select: S) {
    return await db.message.findMany({
      select,
      where: {
        OR: [
          { fromId: userOneId, toId: userTwoId },
          { fromId: userTwoId, toId: userOneId }
        ]
      },
      orderBy: {
        sentAt: "asc"
      }
    })
  }

  async createNewMessage(fromId: number, toId: number, contents: string) {
    const userFromExists = await userService.userExistsById(fromId);
    const userToExists = await userService.userExistsById(toId);
    if(!userFromExists || !userToExists) {
      throw new BadRequestError();
    }

    return await db.message.create({
      data: {
        fromId,
        toId,
        contents 
      }
    })
  }
}

const messageService = new MessageService();

export default messageService;