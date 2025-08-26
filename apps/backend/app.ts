import "dotenv/config"
import express from "express";
import apiRouter from "./src/router/apiRouter";
import wss from "./src/ws/gateway";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

const PORT = process.env.PORT;
const listener = app.listen(PORT);

listener.on("upgrade", () => wss.upgrade);