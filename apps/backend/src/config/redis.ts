import { env } from "./env";
import {createClient, RedisClientType} from "redis";

let redisClient: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType | null >{
    if (!env.REDIS_URL) {
        console.warn("⚠️ REDIS_URL no está definido. Redis no se utilizará.");
        return null;
    }

    if (!redisClient) {
        redisClient = createClient({
            url: env.REDIS_URL,
        });
    

        redisClient.on("error", (err) => {
            console.error("❌ Error en Redis:", err);
        })

        redisClient.on("connect", () => {
            console.log("✅ Conectado a Redis");
        });

        await redisClient.connect();
    }
    return redisClient;
}

export async function disconnectRedis(): Promise<void> {
    if (redisClient) {
        await redisClient.disconnect();
        redisClient = null;
        console.log("🔌 Desconectado de Redis");
    }
}

const DEFAULT_TTL = 60 * 5;

export const cache = {
    async get<T>(key: string): Promise<T | null> {
        const client = await getRedisClient();
        if (!client) return null;
        
        try{
            const data = await client.get(key);
            return data ? JSON.parse(data) as T : null;
        }
        catch (error) {
            console.error(`❌ Error obteniendo cache de Redis, key: ${key}`, error);
            return null;
        }
    },
    
    async set<T>(key: string, value: T, ttl: number = DEFAULT_TTL): Promise<void> {
        const client = await getRedisClient();
        if (!client) return;

        try {
        await client.setEx(key, ttl, JSON.stringify(value));
        } catch (error) {
        console.error(`Error setting cache key ${key}:`, error);
        }
    },

    async del(key: string): Promise<void> {
        const client = await getRedisClient();
        if (!client) return;

        try {
        await client.del(key);
        } catch (error) {
        console.error(`Error deleting cache key ${key}:`, error);
        }
    },

    async delByPattern(pattern: string): Promise<void> {
        const client = await getRedisClient();
        if (!client) return;

        try {
        const keys = await client.keys(pattern);
        if (keys.length > 0) {
            await client.del(keys);
        }
        } catch (error) {
        console.error(`Error deleting cache pattern ${pattern}:`, error);
        }
    },

    // Invalidar por tag
    async invalidateTag(tag: string): Promise<void> {
        await this.delByPattern(`${tag}:*`);
    },

};

export const CACHE_KEYS = {
  PROJECTS: "projects",
  PROJECTS_FEATURED: "projects:featured",
  PROJECT: (slug: string) => `projects:${slug}`,
  SKILLS: "skills",
  SKILLS_CATEGORIES: "skills:categories",
  CERTIFICATES: "certificates",
  EXPERIENCES: "experiences",
} as const;

export const CACHE_TAGS = {
  PROJECTS: "projects",
  SKILLS: "skills",
  CERTIFICATES: "certificates",
  EXPERIENCES: "experiences",
} as const;