import { Request, Response } from "express";
import FirstnameRepository from "../repositories/firstname.repository";

class FirstnameController {
  public async allFirstnames(req: Request, res: Response): Promise<Response> {
    const firstnames = await FirstnameRepository.allFirstnames();
    console.log(firstnames);
    if (!firstnames) {
      return res.status(404).json({
        code: 404,
        message: "No first names found!",
      });
    }
    return res.json(firstnames);
  }

  public async getFirstname(req: Request, res: Response): Promise<Response> {
    const firstname = req.params.firstname;
    const name = await FirstnameRepository.getFirstname(firstname);
    if (!name) {
      return res.status(404).json({
        code: 404,
        message: "No first name found!",
      });
    }
    return res.json(name);
  }

  public async randomFirstname(req: Request, res: Response): Promise<Response> {
    const firstname = await FirstnameRepository.randomFirstname();
    if (!firstname) {
      return res.status(404).json({
        code: 404,
        message: "No first name found!",
      });
    }
    return res.json(firstname);
  }

  public async addFirstname(req: Request, res: Response): Promise<Response> {
    const firstname = req.body.firstname;
    const name = await FirstnameRepository.getFirstname(firstname);
    if (name) {
      return res.status(409).json({
        code: 409,
        message: "Conflict! Already registered!",
      });
    } else {
      const response = await FirstnameRepository.addFirstname(firstname);
      return res.json(`Firstname ${firstname} has been added!`);
    }
  }
}

export default new FirstnameController();
