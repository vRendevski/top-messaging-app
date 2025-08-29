import { Request, Response, NextFunction } from "express";
import { withValidation, validateAndPass } from "../middleware/validationMiddleware";
import { AuthTypes, AuthSchemas } from "@vRendevski/shared/schemas/rest";
import userService from "../service/UserService";
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

const login = [ validateAndPass(AuthSchemas.requests.login), passport.authenticate("local"), (req: Request, res: Response) => res.status(200).end() ];

export {
  register,
  login
}