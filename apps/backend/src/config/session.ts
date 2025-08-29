import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool } from "pg";

if(process.env.COOKIE_SECRET === undefined) {
  throw new Error("You need to provide a COOKIE_SECRET in .env");
}

if(process.env.DATABASE_URL === undefined) {
  throw new Error("You need to provide DATABASE_URL in .env");
}

const PgSession = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgSession({ 
    pool: new Pool({ connectionString: process.env.DATABASE_URL }), 
    createTableIfMissing: true
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
});

export default sessionMiddleware;