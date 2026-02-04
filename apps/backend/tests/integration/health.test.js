"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const app_js_1 = __importDefault(require("../../src/app.js"));
const supertest_1 = __importDefault(require("supertest"));
(0, vitest_1.describe)("GET /api/v1/health", () => {
    (0, vitest_1.it)("debería responder con estado 200 y mensaje de salud", async () => {
        // Simular una petición HTTP al endpoint de salud
        const response = await (0, supertest_1.default)(app_js_1.default).get("/api/v1/health").expect(200);
        (0, vitest_1.expect)(response.body).toMatchObject({
            status: "ok",
            timestamp: vitest_1.expect.any(String),
            uptime: vitest_1.expect.any(Number),
            responseTime: vitest_1.expect.stringMatching(/^\d+ms$/),
            database: "connected"
        });
    });
    (0, vitest_1.it)("devuelve timestamp", async () => {
        const response = await (0, supertest_1.default)(app_js_1.default).get("/api/v1/health");
        (0, vitest_1.expect)(response.body).toHaveProperty("timestamp");
    });
});
