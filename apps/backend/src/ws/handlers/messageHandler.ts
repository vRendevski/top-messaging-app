import { type ServerInstance, type Socket } from "../types"
import { EventSchemas, EventTypes } from "@vRendevski/shared";
import messageService from "../../service/MessageService";

export function registerMessageHandler(io: ServerInstance, socket: Socket) {
  socket.on("message:send", (data, ack) => handleSendMessage(io, socket, data, ack));
}

async function handleSendMessage(io: ServerInstance, socket: Socket, dirtyData: EventTypes.MessageSend, ack: (data: EventTypes.MessageReceive) => void) {
  try {
    const data = EventSchemas.clientToServer.message.send.parse(dirtyData);
    const createdMessage = await messageService.createNewMessage(socket.user.id, data.toId, data.message);
    const allSockets = await io.fetchSockets();
    const targetSocket = allSockets.find(s => s.data.userId === createdMessage.toId);
    const response = { ...createdMessage, fromUsername: socket.user.username };
    if(targetSocket) targetSocket.emit("message:receive", EventSchemas.serverToClient.message.receive.parse(response));
    ack(EventSchemas.serverToClient.message.receive.parse(response));
  }
  catch(err){
    console.log(err);
    socket.disconnect();
  }
}
