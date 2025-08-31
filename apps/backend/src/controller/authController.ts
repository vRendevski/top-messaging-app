import { Request, Response, NextFunction } from "express";
import { withValidation } from "../middleware/validationMiddleware";
import { AuthTypes, AuthSchemas } from "@vRendevski/shared/schemas/rest";
import UnauthroizedError from "../error/UnauthorizedError";
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
  await userService.createUser(username, email, password);
});

const login = [ passport.authenticate("local"), withValidation(AuthSchemas.requests.login, AuthSchemas.responses.login, async function (
  req: Request<AuthTypes.LoginParams, {}, AuthTypes.LoginBody, AuthTypes.LoginQuery>,
  res: Response<AuthTypes.LoginResponse>,
  next: NextFunction
)
{ }
)];

const me = withValidation(AuthSchemas.requests.me, AuthSchemas.responses.me, async function(
  req: Request<AuthTypes.MeParams, {}, AuthTypes.MeBody, AuthTypes.MeQuery>,
  res: Response<AuthTypes.MeResponse>,
  next: NextFunction
)
{
  if(!req.user) {
    throw new UnauthroizedError("Not logged in");
  }

  return await userService.getUserById(req.user.id, userSelect.privateProfile);
});


export {
  register,
  login,
  me
}