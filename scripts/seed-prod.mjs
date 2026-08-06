// Seed contra Supabase (producción) usando la URL del session pooler (DIRECT_URL).
// Ejecuta: cd apps/backend && npm run db:seed:prod
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { resolve } from "path";
import { spawnSync } from "child_process";

const backendDir = resolve(fileURLToPath(new URL("../apps/backend", import.meta.url)));
config({ path: resolve(backendDir, ".env") });

const sessionUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!sessionUrl) {
  console.error("❌ No se encontró DIRECT_URL/DATABASE_URL en apps/backend/.env");
  process.exit(1);
}

process.env.DATABASE_URL = sessionUrl;
const masked = sessionUrl.replace(/:[^:@/]+@/, ":****@");
console.log(`🌱 Seeding Supabase (session pooler) -> ${masked}`);

const result = spawnSync("npx", ["prisma", "db", "seed"], {
  cwd: backendDir,
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
