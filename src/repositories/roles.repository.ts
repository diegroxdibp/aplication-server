import { ROLES } from '../enums/roles.enum';
import { queryBuilder } from '../core/database';

export default class RolesRepository {
	public static async byIdAdmin (user_id: number): Promise<number> {
		return queryBuilder
			.where('user_id', '=', user_id)
			.update({ role: ROLES.ADMIN })
			.from('userTable');
	}

	public static async byIdUser (user_id: number): Promise<number> {
		return queryBuilder
			.where('user_id', '=', user_id)
			.update({ role: ROLES.USER })
			.from('userTable');
	}
}
