import { IProductChanged } from '@interfaces/IProduct';
import { AppError } from '@shared/errors/AppError';
import { BaseProductRepository } from './BaseProductRepository';

interface IRequest {
	name: string;
	price: number;
	quantity: number;
}

class CreateProductService extends BaseProductRepository {
	public async execute({
		name,
		price,
		quantity
	}: IRequest): Promise<IProductChanged> {
		const productExists = await this.repository.fidByName(name);

		if (productExists) {
			throw new AppError(`Already exists on product with name ${name}!`);
		}

		const product = this.repository.create({
			name,
			price,
			quantity
		});

		try {
			await this.repository.save(product);
		} catch (err) {
			throw new AppError(err.message, 400);
		}

		return {
			message: 'Product created with success!',
			code: 201,
			product
		};
	}
}

export { CreateProductService };