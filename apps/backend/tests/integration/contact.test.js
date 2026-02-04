"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const db_js_1 = require("../../src/config/db.js");
const app_js_1 = __importDefault(require("../../src/app.js"));
(0, vitest_1.describe)("contact API", () => {
    (0, vitest_1.afterAll)(() => {
        db_js_1.prisma.contact.deleteMany({
            where: {
                email: {
                    contains: "@test.com",
                },
            },
        });
    });
    (0, vitest_1.describe)("POST /contact", () => {
        (0, vitest_1.it)("ingresar mensaje de contacto válido", async () => {
            const contactData = {
                name: "Test User",
                email: "test@test.com",
                message: "Este es un mensaje de prueba válido.",
            };
            const response = await (0, supertest_1.default)(app_js_1.default)
                .post("/api/v1/contact")
                .send(contactData);
            console.log(response.body);
            (0, vitest_1.expect)(response.status).toBe(201);
            (0, vitest_1.expect)(response.body.success).toBe(true);
            (0, vitest_1.expect)(response.body.message).toContain("enviado");
            (0, vitest_1.expect)(response.body.data).toHaveProperty("id");
            (0, vitest_1.expect)(response.body.data).toHaveProperty("createdAt");
        });
        (0, vitest_1.it)("guarda el contacto en la base de datos", async () => {
            const contactData = {
                name: "Test DB",
                email: "testdb@example.com",
                message: "Mensaje para verificar que se guarda en BD",
            };
            await (0, supertest_1.default)(app_js_1.default)
                .post("/api/v1/contact")
                .send(contactData)
                .expect(201);
            // Verificar en BD
            const saved = await db_js_1.prisma.contact.findFirst({
                where: { email: "testdb@example.com" },
            });
            (0, vitest_1.expect)(saved).not.toBeNull();
            (0, vitest_1.expect)(saved?.name).toBe("Test DB");
            (0, vitest_1.expect)(saved?.read).toBe(false); // Por defecto no leído
        });
    });
});
