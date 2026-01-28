import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";

type AsyncRepoFunction<T> = (req: Request) => Promise<T>;

export const handleFetch =  <T>(
    repoFn: AsyncRepoFunction<T>,
    errorMessage: string
) => {
    return async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await repoFn(_req);
            res.json({
                success: true,
                data,
                count: Array.isArray(data) ? data.length : 1
            });
        } catch (error) {
            next(
                new AppError(`${errorMessage}: ${(error as Error).message}`, 500)
            );
        }
    }
}