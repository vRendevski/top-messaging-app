import "dotenv/config"
import express from "express";
import { createServer } from "http";
import { startWebSocketServer } from "./src/ws/gateway";
import sessionMiddleware from "./src/config/session";
import passport from "./src/config/passport";
import apiRouter from "./src/router/apiRouter";
import errorMiddleware from "./src/middleware/errorMiddleware";

const app = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.session());

app.use("/api", apiRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 8080;
const listener = createServer(app);
const webSocketServer = startWebSocketServer(listener);
app.set("webSocketServer", webSocketServer);
listener.listen(PORT);