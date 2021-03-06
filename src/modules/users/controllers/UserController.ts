import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { ListUserService } from '../services/ListUserService';
import { ShowUserService } from '../services/ShowUserService';
import { UpdateUserService } from '../services/UpdateUserService';

class UserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listUsers = new ListUserService();

		const result = await listUsers.execute();

		return res.status(result.code).json(classToClass(result));
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const showUser = new ShowUserService();
		const { id } = req.params;

		const result = await showUser.execute({ id });

		return res.status(result.code).json(classToClass(result));
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const createUser = new CreateUserService();
		const { name, email, password } = req.body;

		const result = await createUser.execute({
			name,
			email,
			password
		});

		return res.status(result.code).json(classToClass(result));
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const updateUser = new UpdateUserService();
		const { name, email, password } = req.body;
		const { id } = req.params;

		const result = await updateUser.execute({
			id,
			name,
			email,
			password
		});

		return res.status(result.code).json(classToClass(result));
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const deleteUser = new DeleteUserService();
		const { id } = req.params;

		const result = await deleteUser.execute({
			id
		});

		return res.status(result.code).json(classToClass(result));
	}
}

export { UserController };
