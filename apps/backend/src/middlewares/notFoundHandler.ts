import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export const notFoundHandler = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  next(
    AppError.notFound(
      `No se encontró la ruta ${req.originalUrl}`,
      'ROUTE_NOT_FOUND'  // ← código opcional para identificación
    )
  );
};