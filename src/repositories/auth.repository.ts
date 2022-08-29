import { createHash } from 'crypto';
import { User } from '../models/user';
import { queryBuilder } from '../core/database';
import { sign } from 'jsonwebtoken';
import { DEFAULT_USER_ROLE, DEFAULT_USER_STATUS } from '../app.constants';

export default class AuthRepository {
  public static async attemptLogin(email: string, password: string): Promise<string> {
    password = createHash("sha256").update(password).digest("hex");

    const user: User = await queryBuilder
      .select()
      .from("userTable")
      .where("email", "=", email)
      .andWhere("password", "=", password)
      .first();

	  if (user) {
		const token = sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
			email: user.email,
			user_id: user.user_id,
			role: user.role,
			status: user.status
		}, (process.env.TOKEN_SIGN_KEY as string));

      return token;
    }

    throw new Error("Bad credentials");
  }

  public static async checkEmailInUse(email: string): Promise<boolean> {
    const user: User = await queryBuilder
      .select()
      .from("userTable")
      .where("email", "=", email)
      .first();

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  public static async register(email: string, password: string): Promise<number> {
    password = createHash("sha256").update(password).digest("hex");
    const role = DEFAULT_USER_ROLE;
    const status = DEFAULT_USER_STATUS;
    const [user_id] = await queryBuilder
      .insert({
        email,
        password,
        role,
		status
      })
      .into("userTable");

    if (!user_id || user_id <= 0) {
      throw new Error("Problem registering user");
    }

    return user_id;
  }
}
