import { Request, Response } from "express";
import LastnameRepository from "../repositories/lastname.repository";
import FirstnameRepository from "../repositories/firstname.repository";
import RolesRepository from "../repositories/roles.repository";

class LastnameController {
  public async allLastnames(req: Request, res: Response): Promise<Response> {
    const lastnames = await LastnameRepository.allLastnames();
    if (!lastnames) {
      return res.status(404).json({
        code: 404,
        message: "No first names found!",
      });
    }
    return res.json(lastnames);
  }

  public async getLastname(req: Request, res: Response): Promise<Response> {
    const lastname = req.params.lastname;
    const name = await LastnameRepository.getLastname(lastname);
    if (!name) {
      return res.status(404).json({
        code: 404,
        message: "No last name found!",
      });
    }
    return res.json(name);
  }

  public async randomLastname(req: Request, res: Response): Promise<Response> {
    const lastname = await LastnameRepository.randomLastname();
    if (!lastname) {
      return res.status(404).json({
        code: 404,
        message: "No first name found!",
      });
    }
    return res.json(lastname);
  }

  public async makeUserById(req: Request, res: Response): Promise<Response> {
    const user_id = req.params.id;
    console.log("PARAMS -->", user_id);
    const response = await RolesRepository.byIdUser(Number(user_id));
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }
    return res.json(`Role from user of ID ${user_id} has been set as user!`);
  }

  public async addLastname(req: Request, res: Response): Promise<Response> {
    const lastname = req.body.lastname;
    const name = await LastnameRepository.getLastname(lastname);
    if (name) {
      return res.status(409).json({
        code: 409,
        message: "Conflict! Already registered!",
      });
    } else {
      const response = await LastnameRepository.addLastname(lastname);
      return res.json(`Lastname ${lastname} has been added!`);
    }
  }
}

export default new LastnameController();
