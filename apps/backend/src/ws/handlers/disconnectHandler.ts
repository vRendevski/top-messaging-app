import { ServerInstance, Socket } from "../types";
import { EventSchemas } from "@vRendevski/shared";

export async function registerDisconnectEvent(io: ServerInstance, socket: Socket) {
  socket.on("disconnect", () => handleDisconnect(io, socket));
}

function handleDisconnect(io: ServerInstance, socket: Socket) {
  try {
    const response = { id: socket.user.id, isOnline: false };
    io.emit("user:presence", EventSchemas.serverToClient.user.presence.parse(response));
  }
  catch(err) {
    console.log(err);
    socket.disconnect();
  }
}