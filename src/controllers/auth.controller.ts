import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import LoggerRepository from '../repositories/logger.repository';
import AuthRepository from '../repositories/auth.repository';
import { Metadata } from '../models/metadata';
import { verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { STATUS } from '../enums/status.enum';

dotenv.config();
class AuthController {
	public async login (req: Request, res: Response): Promise<Response> {
		try {
			console.log(req.body);
			const token = await AuthRepository.attemptLogin(req.body.email, req.body.password);
			const { email, role, status }: User = (verify(token, (process.env.TOKEN_SIGN_KEY as string)) as User);

			if (status === STATUS.INACTIVE) {
				return res.status(401).json({
					message: 'Account disabled',
					code: 401
				});
			}

			const metadata: Metadata = { method: req.method, url: req.url, headers: req.rawHeaders };
			await LoggerRepository.addToLoginLogs(email, metadata);

			return res.json({ email, role, STATUS, token });
		} catch (err: any) {
			return res.status(401).json({
				message: 'Unauthorized',
				code: 401,
				error: err.message
			});
		}
	}

	public async signUp (req: Request, res: Response): Promise<Response> {
		try {
			console.log(req.body);
			const { password } = req.body;
			const emailInUse = await AuthRepository.checkEmailInUse(req.body.email);

			if (emailInUse) {
				return res.status(409).json({
					message: 'Email already in use!',
					code: 409
				});
			}

			await AuthRepository.register(req.body.email, password);
			const token = await AuthRepository.attemptLogin(req.body.email, password);
			const { email, role }: User = (verify(token, (process.env.TOKEN_SIGN_KEY as string)) as User);
			return res.json({ email, role, token });
		} catch (err: any) {
			return res.status(400).json({
				message: 'Bad request',
				code: 400,
				error: err.message
			});
		}
	}
}

export default new AuthController();
