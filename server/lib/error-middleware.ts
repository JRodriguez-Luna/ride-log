/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { ClientError } from './client-error.ts'

export const errorMiddleware = (
  err: unknown, // comes from any next(error) in any route, or any synchronousely in route handler
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else if (err instanceof jwt.JsonWebTokenError) { // throws error on verification
    // catching this error so it becomes a 401 instead to the generic branch
    // this is triggered by the jwt.verify()
    res.status(401).json({ error: 'invalid access token' });
  } else {
    console.error(err); // everything unanticipated
    res.status(500).json({
      error: 'an unexpected error occurred',
      message: err instanceof Error ? err.message : undefined,
    })
  }
};