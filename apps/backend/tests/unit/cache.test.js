"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// 1. Mocks de Redis (se mantienen igual)
const redisMocks = vitest_1.vi.hoisted(() => ({
    get: vitest_1.vi.fn(),
    setEx: vitest_1.vi.fn(),
    del: vitest_1.vi.fn(),
    connect: vitest_1.vi.fn(),
    disconnect: vitest_1.vi.fn(),
    keys: vitest_1.vi.fn(),
    on: vitest_1.vi.fn(),
}));
vitest_1.vi.mock("redis", () => ({
    createClient: vitest_1.vi.fn(() => ({
        ...redisMocks,
        on: redisMocks.on.mockReturnThis(),
    })),
}));
// 2. Mock de Env
vitest_1.vi.mock("../../src/config/env.js", () => ({
    env: {
        REDIS_URL: "redis://localhost:6379"
    }
}));
(0, vitest_1.describe)("Cache System", () => {
    (0, vitest_1.beforeEach)(async () => {
        vitest_1.vi.resetModules(); // <--- ESTO LIMPIA EL CLIENTE GLOBAL DE REDIS.TS
        vitest_1.vi.clearAllMocks();
        // Importamos de nuevo el mock de env para resetearlo
        const { env } = await Promise.resolve().then(() => __importStar(require("../../src/config/env.js")));
        env.REDIS_URL = "redis://localhost:6379";
    });
    (0, vitest_1.describe)("Métodos de Cache", () => {
        (0, vitest_1.it)("set(): guarda datos si hay conexión", async () => {
            // Import dinámico para que redisClient sea null al inicio
            const { cache, CACHE_KEYS } = await Promise.resolve().then(() => __importStar(require("../../src/config/redis.js")));
            redisMocks.setEx.mockResolvedValue("OK");
            const data = { id: 1 };
            await cache.set(CACHE_KEYS.PROJECTS, data, 100);
            (0, vitest_1.expect)(redisMocks.setEx).toHaveBeenCalled();
        });
        (0, vitest_1.it)("get(): retorna null y NO llama a Redis si REDIS_URL no existe", async () => {
            // 1. Quitamos la URL
            const { env } = await Promise.resolve().then(() => __importStar(require("../../src/config/env.js")));
            env.REDIS_URL = undefined;
            // 2. Importamos el cache (aquí redisClient empezará como null)
            const { cache } = await Promise.resolve().then(() => __importStar(require("../../src/config/redis.js")));
            const result = await cache.get("test-key");
            (0, vitest_1.expect)(result).toBeNull();
            // AHORA SÍ: Number of calls será 0
            (0, vitest_1.expect)(redisMocks.get).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)("get(): retorna datos parseados si la key existe", async () => {
            const { cache } = await Promise.resolve().then(() => __importStar(require("../../src/config/redis.js")));
            const mockData = { name: "Vitest" };
            redisMocks.get.mockResolvedValue(JSON.stringify(mockData));
            const result = await cache.get("test-key");
            (0, vitest_1.expect)(result).toEqual(mockData);
            (0, vitest_1.expect)(redisMocks.get).toHaveBeenCalledWith("test-key");
        });
        (0, vitest_1.it)("invalidateTag(): llama a del con el patrón correcto", async () => {
            const { cache, CACHE_TAGS } = await Promise.resolve().then(() => __importStar(require("../../src/config/redis.js")));
            redisMocks.keys.mockResolvedValue(["projects:1"]);
            await cache.invalidateTag(CACHE_TAGS.PROJECTS);
            (0, vitest_1.expect)(redisMocks.keys).toHaveBeenCalledWith("projects:*");
            (0, vitest_1.expect)(redisMocks.del).toHaveBeenCalled();
        });
    });
});
