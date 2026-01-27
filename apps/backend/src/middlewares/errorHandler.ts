import {Response, Request, NextFunction} from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'development') {
        console.error('Error 💥:', err);

       res.status(statusCode).json({
            status,
            message,
            stack: err.stack,
            ...(err.isOperational === false && { error: err }) // Truco de ts para añadir propiedades condicionalmente
        });
    } else {
        // Producción: no mostrar stack trace ni detalles internos
        res.status(statusCode).json({
            status,
            message,
        });
    }
}