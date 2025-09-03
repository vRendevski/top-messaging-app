import { Request, Response, NextFunction } from "express";
import { withValidation } from "../middleware/validationMiddleware";
import { onlyPassAuthenticated } from "../middleware/authMiddleware";
import { AuthTypes, AuthSchemas } from "@vRendevski/shared/schemas/rest";
import { EventSchemas } from "@vRendevski/shared/schemas/ws/events";
import { type ServerInstance as WebSocketServer } from "../ws/types";
import userService from "../service/UserService";
import userSelect from "../select/userSelect";
import passport from "passport";

const register = withValidation(AuthSchemas.requests.register, AuthSchemas.responses.register, async function (
  req: Request<AuthTypes.RegisterParams, {}, AuthTypes.RegisterBody, AuthTypes.RegisterQuery>,
  res: Response<AuthTypes.RegisterResponse>,
  next: NextFunction
) 
{
  const { username, email, password } = req.body;
  const createdUser = await userService.createUser(username, email, password);

  const io: WebSocketServer = req.app.get("webSocketServer");
  const ioResponse = { id: createdUser.id, username };
  io.emit("user:new", EventSchemas.serverToClient.user.new.parse(ioResponse));
});

const login = [ passport.authenticate("local"), withValidation(AuthSchemas.requests.login, AuthSchemas.responses.login, async function (
  req: Request<AuthTypes.LoginParams, {}, AuthTypes.LoginBody, AuthTypes.LoginQuery>,
  res: Response<AuthTypes.LoginResponse>,
  next: NextFunction
)
{ }
)];

const me = [ onlyPassAuthenticated, withValidation(AuthSchemas.requests.me, AuthSchemas.responses.me, async function(
  req: Request<AuthTypes.MeParams, {}, AuthTypes.MeBody, AuthTypes.MeQuery>,
  res: Response<AuthTypes.MeResponse>,
  next: NextFunction
)
{
  return await userService.getUserById(req.user!.id, userSelect.privateProfile);
})];

const logout = [ onlyPassAuthenticated, async function (
  req: Request<AuthTypes.LogoutParams, {}, AuthTypes.LogoutBody, AuthTypes.LogoutQuery>,
  res: Response<AuthTypes.LogoutResponse>,
  next: NextFunction
)
{
  req.logout((err) => {
    if(err) {
      next(err);
      return;
    }
    res.status(200).end();
  });
}];

export {
  register,
  login,
  me,
  logout
}