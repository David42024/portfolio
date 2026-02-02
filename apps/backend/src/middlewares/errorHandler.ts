import { Response, Request, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = err instanceof AppError ? err.status : 'error';
  const message = err.message || 'Internal Server Error';

  const isDevelopment = process.env.NODE_ENV === 'development';

  const response = {
    success: false,
    status,
    message,
    ...(isDevelopment && { stack: err.stack }),
    ...(err instanceof AppError && err.code && { code: err.code }),
  };

  res.status(statusCode).json(response);
};