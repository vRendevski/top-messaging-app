import { Request, Response, NextFunction } from "express";
import { withValidation, validateAndPass } from "../middleware/validationMiddleware";
import { 
  EmptyParams, 
  EmptyQuery, 
  EmptyResponse, 
  EmptyResponseSchema 
} from "@vRendevski/shared/src/types/empty";
import { 
  RegisterRequestSchema,
  RegisterRequestBody, 
  LoginRequestSchema, 
} from "@vRendevski/shared/src/types/rest/auth";
import userService from "../service/UserService";
import passport from "passport";

const register = withValidation(RegisterRequestSchema, EmptyResponseSchema, async function (
  req: Request<EmptyParams, {}, RegisterRequestBody, EmptyQuery>,
  res: Response<EmptyResponse>,
  next: NextFunction
) 
{
  const { username, email, password } = req.body;
  await userService.createUser(username, email, password);
});

const login = [ validateAndPass(LoginRequestSchema), passport.authenticate("local") ];

export {
  register,
  login
}