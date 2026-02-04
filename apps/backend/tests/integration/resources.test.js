"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const db_js_1 = require("../../src/config/db.js");
const supertest_1 = __importDefault(require("supertest"));
const app_js_1 = __importDefault(require("../../src/app.js"));
(0, vitest_1.describe)("Certificates API ", () => {
    let testCertificateId;
    (0, vitest_1.beforeAll)(async () => {
        // 1. Limpieza de seguridad
        await db_js_1.prisma.certificate.deleteMany({
            where: { title: { startsWith: "Test" } },
        });
        // 2. CREAR una skill de prueba explícitamente (no usar findFirst)
        // Usamos upsert o create para asegurar que tengamos un ID válido
        const skill = await db_js_1.prisma.skill.create({
            data: {
                name: "Test Skill",
                level: 5,
                icon: "test-icon",
                // Si tienes categorías, asegúrate de que exista una o crea una aquí
                category: {
                    create: { name: "Test Category" }
                }
            }
        });
        // 3. Crear el certificado vinculado a esa nueva skill
        const certificateData = {
            title: "Test Certificate",
            issuer: "Test Issuer",
            issueDate: new Date("2023-01-01"),
            credentialUrl: "https://credentials.example.com/test",
            imageUrl: "https://example.com/certificate/test",
            skills: {
                connect: [{ id: skill.id }]
            },
        };
        const certificate = await db_js_1.prisma.certificate.create({
            data: certificateData,
            include: { skills: true },
        });
        testCertificateId = certificate.id;
    });
    (0, vitest_1.afterAll)(async () => {
        await db_js_1.prisma.certificate.deleteMany({
            where: {
                title: {
                    startsWith: "Test",
                },
            },
        });
    });
    (0, vitest_1.describe)("GET /certificates", () => {
        (0, vitest_1.it)("obtiene la lista de certificados", async () => {
            const response = await (0, supertest_1.default)(app_js_1.default)
                .get("/api/v1/certificates")
                .expect(200);
            (0, vitest_1.expect)(response.body.success).toBe(true);
            (0, vitest_1.expect)(Array.isArray(response.body.data)).toBe(true);
            (0, vitest_1.expect)(response.body.data.length).toBeGreaterThan(0);
        });
        (0, vitest_1.it)("certificados tienen estructura correcta", async () => {
            const response = await (0, supertest_1.default)(app_js_1.default)
                .get("/api/v1/certificates")
                .expect(200);
            const cert = response.body.data.find((c) => c.title === "Test Certificate");
            (0, vitest_1.expect)(cert).toMatchObject({
                title: "Test Certificate",
                issuer: "Test Issuer",
                issueDate: vitest_1.expect.any(String),
            });
            (0, vitest_1.expect)(cert.skills[0]).toMatchObject({
                id: vitest_1.expect.any(String),
                name: vitest_1.expect.any(String),
            });
        });
    });
    (0, vitest_1.describe)("GET /api/v1/certificates/:id", () => {
        (0, vitest_1.it)("devuelve certificado por id", async () => {
            const response = await (0, supertest_1.default)(app_js_1.default)
                .get(`/api/v1/certificates/${testCertificateId}`)
                .expect(200);
            (0, vitest_1.expect)(response.body.success).toBe(true);
            (0, vitest_1.expect)(response.body.data.title).toBe("Test Certificate");
            (0, vitest_1.expect)(response.body.data.issuer).toBe("Test Issuer");
        });
        // Implementar necesario
        (0, vitest_1.it)("devuelve 404 si no existe", async () => {
            const response = await (0, supertest_1.default)(app_js_1.default)
                .get("/api/v1/certificates/id-inexistente")
                .expect(404);
            (0, vitest_1.expect)(response.body.success).toBe(false);
        });
    });
});
