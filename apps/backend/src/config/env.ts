import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Convierte strings vacíos a undefined para variables opcionales
const emptyToUndefined = (v: string | undefined) =>
  v === undefined || v.trim() === "" ? undefined : v;

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("4000").transform(Number),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  REVALIDATE_SECRET: z.string().default("misecretoxd"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  // Email (opcional)
  SMTP_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PORT: z.preprocess(
    emptyToUndefined,
    z.string().transform(Number).optional()
  ),
  SMTP_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PASS: z.preprocess(emptyToUndefined, z.string().optional()),
  CONTACT_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  RESEND_API_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
  CONTACT_EMAIL_FROM: z.preprocess(emptyToUndefined, z.string().optional()),
  // Rate limiting
  CONTACT_RATE_LIMIT_REQUESTS: z.string().optional().default("5"),
  CONTACT_RATE_LIMIT_WINDOW: z.string().optional().default("3600000"), // 1 hora
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variables de entorno inválidas:");
  console.error(parsed.error.format());

  if (process.env.NODE_ENV !== "test") {
    process.exit(1);
  }

  throw new Error("Invalid environment variables");
}

export const env = parsed.data;