// scripts/guard-prod-db.mjs
// Guarda contra operaciones destructivas en la base de producción (Supabase pooled).
//
// Bloquea (exit 1) si DATABASE_URL apunta a producción (.pooler.supabase.com / :6543)
// a menos que se permita explícitamente con ALLOW_PROD_DB=1.
//
// Uso antepuesto a comandos peligrosos:
//   node scripts/guard-prod-db.mjs "--" prisma db push ...
// Permitir (cuidado): ALLOW_PROD_DB=1 node scripts/guard-prod-db.mjs ...
import { spawnSync } from "node:child_process";

const url = process.env.DATABASE_URL || "";
const isProd = /pooler\.supabase\.com|:6543/.test(url);
const allowed = process.env.ALLOW_PROD_DB === "1";

if (isProd && !allowed) {
  console.error(
    "\n⛔ GUARD: DATABASE_URL apunta a PRODUCCIÓN (Supabase).\n" +
      "   Operación potencialmente destructiva bloqueada.\n" +
      "   Para ejecutarla igual contra producción setea:\n" +
      "     ALLOW_PROD_DB=1\n"
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const dashIdx = args.indexOf("--");
if (dashIdx !== -1 && args.length > 1) {
  const cmd = args[dashIdx + 1];
  const rest = args.slice(dashIdx + 2);
  const res = spawnSync(cmd, rest, { stdio: "inherit", shell: true });
  process.exit(res.status ?? 1);
}

process.exit(0);