import { createHash } from 'crypto';
import { User } from '../models/user';
import { queryBuilder } from '../core/database';
import { sign } from 'jsonwebtoken';

export default class AuthRepository {
	public static async attemptLogin (email: string, password: string): Promise<string> {
		password = createHash('sha256').update(password).digest('hex');

		const user: User = await queryBuilder
			.select()
			.from('userTable')
			.where('email', '=', email)
			.andWhere('password', '=', password)
			.first();

		if (user) {
			const token = sign({
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 31),
				email: user.email,
				user_id: user.user_id,
				role: user.role,
				status: user.status
			}, (process.env.DB_NAME as string));

			return token;
		}

		throw new Error('Bad credentials');
	}

	public static async checkEmailInUse (email: string): Promise<boolean> {
		const user: User = await queryBuilder
			.select()
			.from('userTable')
			.where('email', '=', email)
			.first();

		if (user) {
			return true;
		} else {
			return false;
		}
	}

	public static async register (email: string, password: string): Promise<number> {
		password = createHash('sha256').update(password).digest('hex');
		const role = 'user';
		const [user_id] = await queryBuilder.insert({
			email,
			password,
			role
		}).into('userTable');

		if (!user_id || user_id <= 0) {
			throw new Error('Problem registering user');
		}

		return user_id;
	}
}
