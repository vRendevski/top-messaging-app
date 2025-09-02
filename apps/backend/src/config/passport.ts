import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userService from "../service/UserService";
import userSelect from "../select/userSelect";

declare global {
  namespace Express {
    interface User {
      id: number,
      username: string,
      email: string,
      password: string,
    }
  }
}

declare module "socket.io" {
  interface Socket {
    user: Express.User
  }
}

passport.use(new LocalStrategy(
  { 
    usernameField: "email", 
    passwordField: "password"
  },
  async (email, password, done) => {
    try{
      const user = await userService.getUserByEmail(email, userSelect.auth);
      const isPasswordValid = await userService.validateUserPassword(user, password);
      if(!isPasswordValid) {
        done(null, false);
        return;
      }

      done(null, user);
    }
    catch(err) {
      done(err, false);
    }
  }
));

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try{
    const user = await userService.getUserById(id, userSelect.auth);
    done(null, user);
  }
  catch(err) {
    done(err, false);
  }
})

export default passport;