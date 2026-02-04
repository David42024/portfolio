import { describe, it, expect } from "vitest";
import app from "../../src/app.js";
import request from "supertest";


describe("GET /api/v1/health", () => {
    it("debería responder con estado 200 y mensaje de salud", async () => {
        // Simular una petición HTTP al endpoint de salud
        const response = await request(app).get("/api/v1/health").expect(200);
        expect(response.body).toMatchObject({
        status: "ok",
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        responseTime: expect.stringMatching(/^\d+ms$/),
        database: "connected"
        });
    });

    it("devuelve timestamp", async () => {
        const response = await request(app).get("/api/v1/health");

        expect(response.body).toHaveProperty("timestamp");
    });
});