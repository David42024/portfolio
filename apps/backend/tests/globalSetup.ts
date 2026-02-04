import "dotenv/config";
import { prisma } from "../src/config/db.js";

export default async function () {
  console.log("🌍 Setup global de tests");
  await prisma.$connect();

  return async () => {
    console.log("🧹 Teardown global de tests");
    await prisma.$disconnect();
  };
}