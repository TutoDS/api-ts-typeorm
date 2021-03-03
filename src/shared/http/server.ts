import { serverEnv } from '@config/environment';
import { errorHandler } from '@shared/middlewares/ErrorHandler';
import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const { port } = serverEnv;

const app = express();

app.use(cors())
	.use(express.json())
	.use('/api', routes)
	.use(errorHandler)
	.listen(port, () => {
		console.log(`Server running on port ${port} 😎`);
	});
