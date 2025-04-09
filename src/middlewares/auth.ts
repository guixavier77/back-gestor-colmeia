import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction) {

  const headerType = req.headers.authorization?.split(' ')[0];

  
  if(headerType !== 'Bearer') {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Invalid authorization type' });
  }
  
  const token = req.headers.authorization?.split(' ')[1];
  const secret = process.env.JWT_SECRET || '';

  if (token) {

    try {
      const user:any = verify(token ?? '', secret);

      req.user = user;

      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Sessão inválida ou expirada.'})
    }

  } else {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Token não encontrado' });
  }

}
