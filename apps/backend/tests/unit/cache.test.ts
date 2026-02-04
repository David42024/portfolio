import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mocks de Redis (se mantienen igual)
const redisMocks = vi.hoisted(() => ({
  get: vi.fn(),
  setEx: vi.fn(),
  del: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  keys: vi.fn(),
  on: vi.fn(),
}));

vi.mock("redis", () => ({
  createClient: vi.fn(() => ({
    ...redisMocks,
    on: redisMocks.on.mockReturnThis(),
  })),
}));

// 2. Mock de Env
vi.mock("../../src/config/env.js", () => ({
  env: {
    REDIS_URL: "redis://localhost:6379"
  }
}));

describe("Cache System", () => {
  
  beforeEach(async () => {
    vi.resetModules(); // <--- ESTO LIMPIA EL CLIENTE GLOBAL DE REDIS.TS
    vi.clearAllMocks();
    
    // Importamos de nuevo el mock de env para resetearlo
    const { env } = await import("../../src/config/env.js");
    env.REDIS_URL = "redis://localhost:6379";
  });

  describe("Métodos de Cache", () => {
    
    it("set(): guarda datos si hay conexión", async () => {
      // Import dinámico para que redisClient sea null al inicio
      const { cache, CACHE_KEYS } = await import("../../src/config/redis.js");
      
      redisMocks.setEx.mockResolvedValue("OK");
      const data = { id: 1 };

      await cache.set(CACHE_KEYS.PROJECTS, data, 100);

      expect(redisMocks.setEx).toHaveBeenCalled();
    });

    it("get(): retorna null y NO llama a Redis si REDIS_URL no existe", async () => {
      // 1. Quitamos la URL
      const { env } = await import("../../src/config/env.js");
      env.REDIS_URL = undefined;

      // 2. Importamos el cache (aquí redisClient empezará como null)
      const { cache } = await import("../../src/config/redis.js");

      const result = await cache.get("test-key");

      expect(result).toBeNull();
      // AHORA SÍ: Number of calls será 0
      expect(redisMocks.get).not.toHaveBeenCalled();
    });

    it("get(): retorna datos parseados si la key existe", async () => {
      const { cache } = await import("../../src/config/redis.js");
      
      const mockData = { name: "Vitest" };
      redisMocks.get.mockResolvedValue(JSON.stringify(mockData));

      const result = await cache.get("test-key");

      expect(result).toEqual(mockData);
      expect(redisMocks.get).toHaveBeenCalledWith("test-key");
    });

    it("invalidateTag(): llama a del con el patrón correcto", async () => {
      const { cache, CACHE_TAGS } = await import("../../src/config/redis.js");
      
      redisMocks.keys.mockResolvedValue(["projects:1"]);
      
      await cache.invalidateTag(CACHE_TAGS.PROJECTS);

      expect(redisMocks.keys).toHaveBeenCalledWith("projects:*");
      expect(redisMocks.del).toHaveBeenCalled();
    });
  });
});