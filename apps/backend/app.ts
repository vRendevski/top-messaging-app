import "dotenv/config"
import express from "express";
import sessionMiddleware from "./src/config/session";
import passport from "./src/config/passport";
import apiRouter from "./src/router/apiRouter";
import errorMiddleware from "./src/middleware/errorMiddleware";
import wss from "./src/ws/gateway";

const app = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.session());

app.use("/api", apiRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 8080;
const listener = app.listen(PORT);

listener.on("upgrade", () => wss.upgrade);