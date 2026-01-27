export class AppError extends Error {
    
    static readonly BAD_REQUEST = 400;
    static readonly UNAUTHORIZED = 401;
    static readonly FORBIDDEN = 403;
    static readonly NOT_FOUND = 404;
    static readonly CONFLICT = 409;
    static readonly INTERNAL_SERVER_ERROR = 500;
    
    statusCode: number;
    status: string;
    isOperational: boolean;
    code?: string; // Optional error code for more specific error identification

    constructor(message: string, statusCode: number, code?: string){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 4xx -> fail, 5xx -> error
        this.isOperational = true; // To distinguish operational errors from programming errors
        if (code) {
            this.code = code;
        }

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string, code?: string) {
        return new AppError(message, AppError.BAD_REQUEST, code);
    }

    static unauthorized(message: string, code?: string) {
        return new AppError(message, AppError.UNAUTHORIZED, code);
    }

    static forbidden(message: string, code?: string) {
        return new AppError(message, AppError.FORBIDDEN, code);
    }

    static notFound(message: string, code?: string) {
        return new AppError(message, AppError.NOT_FOUND, code);
    }

    static conflict(message: string, code?: string) {
        return new AppError(message, AppError.CONFLICT, code);
    }

    static internalServerError(message: string, code?: string) {
        return new AppError(message, AppError.INTERNAL_SERVER_ERROR, code);
    }
}