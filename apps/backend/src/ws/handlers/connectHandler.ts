import { ServerInstance, Socket } from "../types";
import { EventSchemas } from "@vRendevski/shared/schemas/ws/events";
import userService from "../../service/UserService";
import userSelect from "../../select/userSelect";
import messageService from "../../service/MessageService";
import { messageSelect } from "../../select/messageSelect";

export async function handleConnect(io: ServerInstance, socket: Socket) {
  try {
    const allUsers = await userService.getAllUsers(userSelect.publicProfile);
    const allSockets = await io.fetchSockets();
    const seedResponse = await Promise.all(allUsers
      .filter(s => s.id !== socket.user.id)
      .map(async (user) => {
        const isOnline = undefined !== allSockets.find(s => s.data.userId === user.id);
        const messages = (await messageService.getConversationBetweenUsers(socket.user.id, user.id, messageSelect.withFromUser))
          .map(message => ({ ...message, fromUsername: message.from.username, from: undefined }));
        return { ...user, isOnline, messages };
    }));
    socket.emit("user:seed", EventSchemas.serverToClient.user.seed.parse(seedResponse))

    const presenceResponse = { id: socket.user.id, isOnline: true };
    socket.broadcast.emit("user:presence", EventSchemas.serverToClient.user.presence.parse(presenceResponse));
  }
  catch(err){
    console.log(err);
    socket.disconnect();
  }
}