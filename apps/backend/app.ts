import "dotenv/config"
import express from "express";
import wss from "./src/ws/gateway";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const listener = app.listen(PORT);

listener.on("upgrade", () => wss.upgrade);