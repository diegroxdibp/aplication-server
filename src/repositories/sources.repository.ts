import { queryBuilder } from "../core/database";

export default class SourcesRepository {
  public static async setPath(path: string): Promise<any> {
    return queryBuilder.insert({ url: path }).into("sourceTable");
  }

  public static async getPath(): Promise<any> {
    return queryBuilder
      .select("*")
      .from("sourceTable")
      .orderBy("panel_id", "desc")
      .limit(1);
  }

  public static async getPathHistory(): Promise<any> {
    return queryBuilder
      .select("*")
      .from("sourceTable")
      .orderBy("panel_id", "desc");
  }
}