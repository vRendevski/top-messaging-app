import http from "http";
import { Server } from "./types";
import { adaptAuthExpressMiddlewareToSocketIo } from "./utils/middlewareAdapter";
import sessionMiddleware from "../config/session";
import passport from "../config/passport";
import { onlyPassAuthenticated } from "../middleware/authMiddleware";
import { handleConnect } from "./handlers/connectHandler";
import { registerDisconnectEvent } from "./handlers/disconnectHandler";
import { registerMessageHandler } from "./handlers/messageHandler";

export const startWebSocketServer = (listener: http.Server) => {
  const io = new Server(listener);

  io.engine.use(adaptAuthExpressMiddlewareToSocketIo(sessionMiddleware));
  io.engine.use(adaptAuthExpressMiddlewareToSocketIo(passport.session()));
  io.engine.use(adaptAuthExpressMiddlewareToSocketIo(onlyPassAuthenticated));
  
  io.on("connection", async (socket) => {
    socket.user = (socket.request as any).user;
    socket.data.userId = socket.user.id;
    try {
      await handleConnect(io, socket);
      await registerDisconnectEvent(io, socket);
      await registerMessageHandler(io, socket);
    }
    catch {
      socket.disconnect();
    }
  });

  return io;
}