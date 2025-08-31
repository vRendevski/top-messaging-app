import http from "http";
import { Server } from "socket.io";
import { adaptAuthExpressMiddlewareToSocketIo } from "./utils/middlewareAdapter";
import sessionMiddleware from "../config/session";
import passport from "../config/passport";
import { onlyPassAuthenticated } from "../middleware/authMiddleware";

export const startWebSocketServer = (listener: http.Server) => {
  const io = new Server(listener);

  io.engine.use(adaptAuthExpressMiddlewareToSocketIo(sessionMiddleware));
  io.engine.use(adaptAuthExpressMiddlewareToSocketIo(passport.session()));
  io.engine.use(adaptAuthExpressMiddlewareToSocketIo(onlyPassAuthenticated));

  return io;
}