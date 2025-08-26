import db from "../db/prisma";
import bcrypt from "bcryptjs";
import BadRequestError from "../error/BadRequestError";
import { Prisma } from "../generated/prisma";

class UserService {
  async getUserByEmail<S extends Prisma.UserSelect>(email: string, select: S) {
    return await db.user.findUniqueOrThrow({
      where: { email },
      select
    });
  }

  async getUserById<S extends Prisma.UserSelect>(id: number, select: S) {
    return await db.user.findUniqueOrThrow({
      where: { id },
      select
    });
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    const user = await db.user.findUnique({
      where: { email }
    });

    return user !== null;
  }

  async userExistsByUsername(username: string): Promise<boolean> {
    const user = await db.user.findUnique({
      where: { username }
    });

    return user !== null;
  }

  async createUser(username: string, email: string, cleartextPassword: string) {
    const existsByEmail = await this.userExistsByEmail(email);
    const existsByUsername = await this.userExistsByUsername(username);
    if(existsByEmail || existsByUsername) {
      throw new BadRequestError("User with such credentials already exists.");
    }

    const SALT_LEN = 10;
    const hashedPassword = await bcrypt.hash(cleartextPassword, SALT_LEN);
    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });
  }

  async validateUserPassword<UserType extends { password: string }>(user: UserType, cleartextPassword: string) {
    return await bcrypt.compare(cleartextPassword, user.password)
  }
}

const userService = new UserService();

export default userService;