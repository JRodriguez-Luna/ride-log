import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;
if (!secret) throw new Error('TOKEN_SECRET not found in .env');

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.get('authorization')?.split('Bearer ')[1];
  if (!token) {
    throw new Error('Authorization required.');
  }
  req.user = jwt.verify(token, secret) as Request['user'];
  console.log('req.user:', req.user)
  next();
};
