import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

// El adapter pg interpreta sslmode=require como verify-full y rechaza certs
// self-signed de Supabase. Se quita el parametro para que aplique el
// ssl:{rejectUnauthorized:false} explícito de abajo.
function stripSslMode(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.delete("sslmode");
    return u.toString();
  } catch {
    return url;
  }
}

const adapterConnectionString = connectionString
  ? stripSslMode(connectionString)
  : undefined;

const connectionUrl = adapterConnectionString
  ? new URL(adapterConnectionString)
  : null;
const isLocal = connectionUrl
  ? ["localhost", "127.0.0.1", "::1"].includes(connectionUrl.hostname)
  : false;
const useSsl = !isLocal;

const adapter = new PrismaPg({
  connectionString: adapterConnectionString as string,
  ssl: useSsl
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export const prisma = new PrismaClient({
  adapter,
});