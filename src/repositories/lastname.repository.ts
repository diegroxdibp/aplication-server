import { queryBuilder } from "../core/database";
export default class LastnameRepository {
  // public static async getAllUsers(): Promise<User> {
  //   return queryBuilder.select("*").from("userTable");
  // }

  public static async allLastnames(): Promise<any> {
    return queryBuilder.select("*").from("lastname_jap");
  }

  public static async randomLastname(): Promise<any> {
    return queryBuilder
      .select("lastname")
      .from("lastname_jap")
      .orderByRaw("RAND()")
      .first();
  }

  public static async getLastname(lastname: string): Promise<any> {
    return queryBuilder
      .select("*")
      .from("lastname_jap")
      .where("lastname", "=", lastname)
      .first();
  }

  public static async addLastname(lastname: string): Promise<any> {
    return queryBuilder
      .insert({ lastname: lastname })
      .into("lastname_jap")
      .whereNot({ lastname: lastname });
  }

  public static async deleteById(user_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("userTable")
      .where("user_id", "=", user_id);
  }
}
