import { Router } from "express";
import { register, login, me, logout } from "../controller/authController";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", me);
authRouter.post("/logout", logout);

export default authRouter;