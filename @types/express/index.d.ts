import { UserModel } from '../../src/domain';
import { Express } from 'express';

declare global {
	namespace Express {
		interface Request {
			user: UserModel
			device?: {
				id: number
				serial: string
			}
		}
	}
}
