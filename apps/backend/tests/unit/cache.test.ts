import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Tests para la funcionalidad de caché sin conectar a Redis real
 * 
 * vi.mock: Simula el módulo redis para evitar conexiones reales
 * vi.fn: Crea funciones simuladas para los métodos de caché
 * 
 */

const mockRedisClient = {
    get: vi.fn(),
    setEx: vi.fn(),
    del: vi.fn(),
    connect: vi.fn(),
    keys: vi.fn(),
    disconnect: vi.fn(),
};

// Cada vez que alguien haga import { createClient } from "redis" usa una versión falsa
vi.mock("redis", () => ({
    createClient: vi.fn(() => ({
        ...mockRedisClient,
        on: vi.fn().mockReturnThis(),
    })),
}));

import { cache, CACHE_KEYS, CACHE_TAGS } from "../../src/config/redis";

describe("CACHE KEYS", () => {
    it("Posee las keys correctas", () => {
        expect(CACHE_KEYS.PROJECTS).toBe("projects");
        expect(CACHE_KEYS.CERTIFICATES).toBe("certificates");
        expect(CACHE_KEYS.SKILLS).toBe("skills");
        expect(CACHE_KEYS.EXPERIENCES).toBe("experiences");
    })
    it("PROJECT genera key dinámica", () => {
    const key = CACHE_KEYS.PROJECT("mi-proyecto");

        expect(key).toBe("projects:mi-proyecto");
    });
    it("keys siguen patrón de su tag", () => {
        expect(CACHE_KEYS.PROJECTS).toContain("projects");
        expect(CACHE_KEYS.PROJECTS_FEATURED).toContain("projects");
        expect(CACHE_KEYS.SKILLS).toContain("skills");
        expect(CACHE_KEYS.SKILLS_CATEGORIES).toContain("skills");
    });
});

describe("CACHE_TAGS", () => {
  it("tiene los tags correctos", () => {
    expect(CACHE_TAGS.PROJECTS).toBe("projects");
    expect(CACHE_TAGS.SKILLS).toBe("skills");
    expect(CACHE_TAGS.CERTIFICATES).toBe("certificates");
    expect(CACHE_TAGS.EXPERIENCES).toBe("experiences");
  });

  it("todos los tags son strings válidos", () => {
    Object.values(CACHE_TAGS).forEach((tag) => {
      expect(typeof tag).toBe("string");
      expect(tag.length).toBeGreaterThan(0);
    });
  });
});

describe("Cache Helpers", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("cache.get retorna null si no hay cliente", async () => {
        const result = await cache.get("test-key");
        
        // Sin REDIS_URL, retorna null
        expect(result).toBeNull();
    });

    it("set(): guarda valor en caché", async () => {
        await expect(cache.set(CACHE_KEYS.PROJECTS, [{ id: 1, name: "Test" }], 120)).resolves.toBeUndefined();
    
        expect(mockRedisClient.setEx).toHaveBeenCalledWith(
            CACHE_KEYS.PROJECTS,
            120,
            JSON.stringify([{ id: 1, name: "Test" }])
        );
    });

    
});