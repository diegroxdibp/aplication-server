import { Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';

class UsersController {
	public async getAll (req: Request, res: Response): Promise<Response> {
		const users = await UsersRepository.getAllUsers();

		return res.json(users);
	}

	public async getUserById (req: Request, res: Response): Promise<Response> {
		const user_id = req.params.id;
		console.log('PARAMS -->', user_id);
		const user = await UsersRepository.byId(Number(user_id));
		console.log(user);
		if (!user) {
			return res.status(404).json({
				code: 404,
				message: 'User not found'
			});
		}
		return res.json(user);
	}

	public async getUserByEmail (req: Request, res: Response): Promise<Response> {
		const { email } = req.params;
		const user = await UsersRepository.byEmail(String(email));

		if (!user) {
			return res.status(404).json({
				code: 404,
				message: 'User not found'
			});
		}
		return res.json(user);
	}

	public async deletetUserById (req: Request, res: Response): Promise<Response> {
		const user_id = req.params.id;
		const user = await UsersRepository.deleteById(Number(user_id));
		console.log(user);
		if (user) {
			return res.status(200).json({
				code: 200,
				message: `User of ID ${user_id} deleted successfully!`
			});
		}
		return res.status(404).json({
			code: 404,
			message: `User of ID ${user_id} not found`
		});
	}

	public async deleteUserByEmail (req: Request, res: Response): Promise<Response> {
		const { email } = req.params;
		const user = await UsersRepository.byEmail(String(email));

		return res.json(user);
	}

	public async activateUserById (req: Request, res: Response): Promise<Response> {
		const user_id = req.params.id;
		const user = await UsersRepository.activateById(Number(user_id));
		if (!user) {
			return res.status(404).json(`User of ID ${user_id} not found`);
		}
		return res.status(200).json(`User of ID ${user_id} activated successfully!`);
	}

	public async activateUserByEmail (req: Request, res: Response): Promise<Response> {
		const { email } = req.params;
		const user = await UsersRepository.activateByEmail(String(email));

		return res.json(user);
	}

	public async deactivateUserById (req: Request, res: Response): Promise<Response> {
		const user_id = req.params.id;
		const user = await UsersRepository.deactivateById(Number(user_id));
		if (!user) {
			return res.status(404).json(`User of ID ${user_id} not found`);
		}
		return res.status(200).json(`User of ID ${user_id} deactivated successfully!`);
	}

	public async deactivateUserByEmail (req: Request, res: Response): Promise<Response> {
		const { email } = req.params;
		const user = await UsersRepository.deactivateByEmail(String(email));

		return res.json(user);
	}
}

export default new UsersController();
