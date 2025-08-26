import { Router } from "express";
import authRouter from "./authRouter";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;