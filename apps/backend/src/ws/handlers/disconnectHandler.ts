import { ServerInstance, Socket } from "../types";
import { EventSchemas } from "@vRendevski/shared/schemas/ws/events";

export async function registerDisconnectEvent(io: ServerInstance, socket: Socket) {
  socket.on("disconnect", () => handleDisconnect(io, socket));
}

function handleDisconnect(io: ServerInstance, socket: Socket) {
  io.emit("addOfflineUser", { ...EventSchemas.addOfflineUser.parse({ id: socket.user.id, username: socket.user.username, unreadCount: 0 }) });
}