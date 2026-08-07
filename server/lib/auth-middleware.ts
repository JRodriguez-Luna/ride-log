import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { ClientError } from './client-error.ts';

const secret = process.env.TOKEN_SECRET;
if (!secret) throw new Error('TOKEN_SECRET not found in .env');

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.get('authorization')?.split('Bearer ')[1];
  if (!token) {
    throw new ClientError(401, 'Authorization required.');
  }
  try {
    req.user = jwt.verify(token, secret) as Request['user'];
  } catch {
    throw new ClientError(401, 'Invalid or expired token');
  }
  next();
};
