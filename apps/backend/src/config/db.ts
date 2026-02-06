import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // 👈 fuerza a NO usar certs locales
});

export const prisma = new PrismaClient({ adapter });
