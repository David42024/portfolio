import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { getRedisClientSync } from "../config/redis.js";
import { env } from "../config/env.js";

const CONTACT_LIMIT = parseInt(env.CONTACT_RATE_LIMIT_REQUESTS || "5", 10);
const CONTACT_WINDOW = parseInt(env.CONTACT_RATE_LIMIT_WINDOW || "3600000", 10);

// Factory para crear el middleware con manejo dinámico de Redis
export const contactRateLimit = (req: any, res: any, next: any) => {
  const redisClient = getRedisClientSync();

  if (!redisClient) {
    // Si Redis no está disponible, continuar sin rate limit
    return next();
  }

  const limiter = rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: "contact-rate-limit:",
    }),
    windowMs: CONTACT_WINDOW,
    max: CONTACT_LIMIT,
    message: "Demasiadas solicitudes de contacto. Intenta de nuevo más tarde.",
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      return env.NODE_ENV === "test";
    },
    keyGenerator: (req) => {
      const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
        req.ip ||
        "unknown";
      return ip;
    },
  });

  return limiter(req, res, next);
};
