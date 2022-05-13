import { queryBuilder } from "../core/database";
export default class FirstnameRepository {
  public static async allFirstnames(): Promise<any> {
    return queryBuilder.select("*").from("firstname_jap");
  }

  public static async randomFirstname(): Promise<any> {
    return queryBuilder
      .select("firstname")
      .from("firstname_jap")
      .orderByRaw("RAND()")
      .first();
  }

  public static async getFirstname(firstname: string): Promise<any> {
    return queryBuilder
      .select("*")
      .from("firstname_jap")
      .where("firstname", "=", firstname)
      .first();
  }

  public static async addFirstname(firstname: string): Promise<any> {
    return queryBuilder
      .insert({ firstname: firstname })
      .into("firstname_jap")
      .whereNot({ firstname: firstname });
  }

  public static async deleteById(user_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("userTable")
      .where("user_id", "=", user_id);
  }
}
