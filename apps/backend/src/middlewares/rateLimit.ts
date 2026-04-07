import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

const CONTACT_LIMIT = parseInt(env.CONTACT_RATE_LIMIT_REQUESTS || "5", 10);
const CONTACT_WINDOW = parseInt(env.CONTACT_RATE_LIMIT_WINDOW || "3600000", 10);

// Se crea una sola vez al arrancar la app para evitar ERR_ERL_CREATED_IN_REQUEST_HANDLER
export const contactRateLimit = rateLimit({
  windowMs: CONTACT_WINDOW,
  max: CONTACT_LIMIT,
  message: "Demasiadas solicitudes de contacto. Intenta de nuevo más tarde.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => {
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
