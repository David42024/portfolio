import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";

const ssl =
  process.env.NODE_ENV === "production" &&
  process.env.DATABASE_SSL_CA_PATH &&
  fs.existsSync(process.env.DATABASE_SSL_CA_PATH)
    ? {
        ca: fs.readFileSync(process.env.DATABASE_SSL_CA_PATH),
      }
    : false;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl,
});

export const prisma = new PrismaClient({
  adapter,
});
