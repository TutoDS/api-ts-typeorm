import { authEnv, serverEnv } from '@config/environment';
import { MailConfig } from '@config/mail/MailConfig';
import { AppError } from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { BaseUserService } from './BaseUserService';

type Request = {
	email: string;
};

class SendForgotPasswordService extends BaseUserService {
	tokenRepository = getCustomRepository(UserTokenRepository);

	public async execute({ email }: Request): Promise<void> {
		const user = await this.repository.findByEmail(email);

		if (!user) {
			throw new AppError(`Email incorrect or not exists!`, 400);
		}

		const userToken = await this.tokenRepository.generateToken(user.id);
		const emailTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot-password.hbs'
		);

		if (userToken) {
			await MailConfig.sendMail({
				to: { name: user.name, email: user.email },
				subject: 'Reset your password',
				templateData: {
					file: emailTemplate,
					variables: {
						name: user.name,
						link: `${serverEnv.host}:${serverEnv.port}/api/reset-password/${userToken.token}`,
						time: `${authEnv.emailToken.expires} ${authEnv.emailToken.time}`
					}
				}
			});
		}
	}
}

export { SendForgotPasswordService };
