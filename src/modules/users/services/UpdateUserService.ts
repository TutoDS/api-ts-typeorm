import { AppError } from '@shared/errors/AppError';
import { UserChangedType } from '@shared/types/User';
import { BaseUserService } from './BaseUserService';

type Request = {
	id: string;
	name: string;
	email: string;
	password: string;
};

class UpdateUserService extends BaseUserService {
	public async execute({
		id,
		name,
		email,
		password
	}: Request): Promise<UserChangedType> {
		const user = await this.repository.findById(id);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		const userExists = await this.repository.findByEmail(email);

		if (userExists && email !== user.email) {
			throw new AppError(
				'There is already one user with this email.',
				403
			);
		}

		user.name = name;
		user.email = email;
		user.password = password;

		try {
			await this.repository.save(user);
		} catch (err) {
			throw new AppError(err.message, 400);
		}

		return {
			message: 'User updated with success!',
			code: 201,
			user
		};
	}
}

export { UpdateUserService };
