import { queryBuilder } from "../core/database";

export default class CommentsRepository {
  public static async getAllComments(): Promise<any> {
    return queryBuilder.select("*").from("comments");
  }
  public static async addComment(
    author: string,
    comment: string
  ): Promise<any> {
    return queryBuilder
      .insert({ author: author, comment: comment })
      .into("comments");
  }

  public static async removeComment(comment_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("comments")
      .where("comment_id", "=", comment_id);
  }
}
