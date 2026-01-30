import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { cache } from "../../config/redis";

type AsyncRepoFunction<T> = (req: Request) => Promise<T>;
type CacheKeyFunction = (req: Request) => string;

interface handleFetchOptions {
    cacheKeyFn?: string | CacheKeyFunction;
    cacheTTL?: number;
}

const DEFAULT_TTL = 60 * 5; // 5 minutos

export const handleFetch =  <T>(
    repoFn: AsyncRepoFunction<T>,
    errorMessage: string,
    options?: handleFetchOptions
) => {
    return async (_req: Request, res: Response, next: NextFunction) => {
        try {

            const { cacheKeyFn, cacheTTL = DEFAULT_TTL } = options || {};

            // Una locura
            const resolvedKey = typeof cacheKeyFn === "function" ? cacheKeyFn(_req) : cacheKeyFn;

            if (resolvedKey) {
                const cachedData = await cache.get<T>(resolvedKey);
                if (cachedData) {
                    return res.json({
                        success: true,
                        data: cachedData,
                        count: Array.isArray(cachedData) ? cachedData.length : 1,
                        cached: true
                    });
                }
            }

            const data = await repoFn(_req);

            if (resolvedKey && data) {
                await cache.set<T>(resolvedKey, data, cacheTTL);
            }

            res.json({
                success: true,
                data,
                count: Array.isArray(data) ? data.length : 1,
                cached: false

            });
        } catch (error) {
            next(
                new AppError(`${errorMessage}: ${(error as Error).message}`, 500)
            );
        }
    }
}