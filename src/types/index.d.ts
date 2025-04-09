// types/multer.d.ts
import 'express';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
      user: {
				id: number;
        password?: string;
        cpf: string;
        name: string;
        email: string;
        phone: string;
        active: boolean;
        created_at: Date;
        updated_at: Date;
			}
    }
  }
}
