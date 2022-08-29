import { STATUS } from '../enums/status.enum';
import { queryBuilder } from '../core/database';
import { User } from '../models/user';
export default class UsersRepository {
  public static async getAllUsers(): Promise<User> {
    return queryBuilder.select("*").from("userTable");
  }

  public static async byId(user_id: number): Promise<User> {
    return queryBuilder
      .select()
      .from("userTable")
      .where("user_id", "=", user_id)
      .first();
  }

  public static async byEmail(email: string): Promise<User[]> {
    return queryBuilder
      .select("*")
      .from("userTable")
      .where("email", "like", `${email}%`);
  }

  public static async deleteById(user_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("userTable")
      .where("user_id", "=", user_id);
  }

	public static async deleteByEmail (email: string): Promise<void> {
		return queryBuilder('userTable')
			.where('email', '=', email)
			.del();
	}

	public static async activateById (user_id: number): Promise<number> {
		return queryBuilder('userTable')
			.where('user_id', '=', user_id)
			.update({ status: STATUS.ACTIVE });
	}

	public static async activateByEmail (email: string): Promise<void> {
		return queryBuilder('userTable')
			.where('email', '=', email)
			.update({ status: STATUS.ACTIVE });
	}

	public static async deactivateById (user_id: number): Promise<number> {
		return queryBuilder('userTable')
			.where('user_id', '=', user_id)
			.update({ status: STATUS.INACTIVE });
	}

	public static async deactivateByEmail (email: string): Promise<void> {
		return queryBuilder('userTable')
			.where('email', '=', email)
			.update({ status: STATUS.INACTIVE });
	}

}
