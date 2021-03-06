import { AppError } from '@shared/errors/AppError';
import { UserShowType } from '@shared/types/User';
import { BaseUserService } from './BaseUserService';

type Request = {
	userId: string;
};

class ShowProfileService extends BaseUserService {
	public async execute({ userId }: Request): Promise<UserShowType> {
		const user = await this.repository.findById(userId);

		if (!user) {
			throw new AppError('User not found!', 404);
		}

		return {
			code: 200,
			user
		};
	}
}

export { ShowProfileService };
