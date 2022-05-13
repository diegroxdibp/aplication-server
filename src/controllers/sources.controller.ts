import { Request, Response } from "express";
import SourcesRepository from "../repositories/sources.repository";

class SourcesController {
  public async setPath(req: Request, res: Response): Promise<Response> {
    const url = req.body.url;
    console.log("url: -->", url);
    const response = await SourcesRepository.setPath(url);
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "Could not set source",
      });
    }
    return res.json(`Commercial Panel source set to: ${url}`);
  }

  public async getPath(req: Request, res: Response): Promise<Response> {
    const response = await SourcesRepository.getPath();
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "No source found",
      });
    }
    return res.json(response[0]);
  }

  public async getPathHistory(req: Request, res: Response): Promise<Response> {
    const response = await SourcesRepository.getPathHistory();
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "No sources found",
      });
    }
    return res.json(response);
  }
}

export default new SourcesController();