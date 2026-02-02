import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("4000").transform(Number),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  REVALIDATE_SECRET: z.string().default("misecretoxd"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  // Email (opcional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
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