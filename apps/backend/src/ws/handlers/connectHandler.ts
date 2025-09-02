import { ServerInstance, Socket } from "../types";
import { EventSchemas } from "@vRendevski/shared/schemas/ws/events";
import userService from "../../service/UserService";
import userSelect from "../../select/userSelect";

export async function handleConnect(io: ServerInstance, socket: Socket) {
  const allUsers = await userService.getAllUsers(userSelect.publicProfile);
  allUsers.forEach(async (user) => {
    if(user.id === socket.user.id) return;
    const connectedSockets = await io.fetchSockets();
    const isOnline = connectedSockets.some(socket => socket.data.userId === user.id);
    socket.emit(isOnline ? "addOnlineUser" : "addOfflineUser", { ...(isOnline 
        ? EventSchemas.addOnlineUser.parse({ id: user.id, username: user.username, unreadCount: 0 })
        : EventSchemas.addOfflineUser.parse({ id: user.id, username: user.username, unreadCount: 0 })
      )});
  })
  socket.broadcast.emit("addOnlineUser", { ...EventSchemas.addOnlineUser.parse({ id: socket.user.id, username: socket.user.username, unreadCount: 0 }) });
}