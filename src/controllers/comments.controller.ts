import { Request, Response } from "express";
import CommentsRepository from "../repositories/comments.repository";
import SourcesRepository from "../repositories/comments.repository";

class CommentsController {
  public async getAllComments(req: Request, res: Response): Promise<Response> {
    const response = await CommentsRepository.getAllComments();
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "No comments found!",
      });
    }
    return res.json(response);
  }

  public async addComment(req: Request, res: Response): Promise<Response> {
    const { author, comment } = req.body;
    const response = await CommentsRepository.addComment(author, comment);
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "Could not add comment!",
      });
    }
    return res.json(`Comment added!`);
  }

  public async removeComment(req: Request, res: Response): Promise<Response> {
    const comment_id = req.params.comment_id;
    const response = await CommentsRepository.removeComment(Number(comment_id));
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "Could not remove comment!",
      });
    }
    return res.json(`Comment removed!`);
  }
}

export default new CommentsController();
