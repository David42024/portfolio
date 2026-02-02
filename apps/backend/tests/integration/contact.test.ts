import {describe, it, expect, afterAll} from "vitest";
import request from "supertest";
import { prisma } from "../../src/config/db";
import app from "../../src/app";

describe("contact API", () => {
    afterAll(() => {
        prisma.contact.deleteMany({
            where: {
                email: {
                    contains: "@test.com",
                },
            },
        });
    });

    describe("POST /contact", () => {
        it ("ingresar mensaje de contacto válido", async () => {
            const contactData = {
                name: "Test User",
                email: "test@test.com",
                message: "Este es un mensaje de prueba válido.",
            };

            const response = await request(app)
                .post("/api/v1/contact")
                .send(contactData)

            console.log(response.body);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toContain("enviado");
            expect(response.body.data).toHaveProperty("id");
            expect(response.body.data).toHaveProperty("createdAt");

        }); 

        it("guarda el contacto en la base de datos", async () => {
            const contactData = {
                name: "Test DB",
                email: "testdb@example.com",
                message: "Mensaje para verificar que se guarda en BD",
            };

            await request(app)
                .post("/api/v1/contact")
                .send(contactData)
                .expect(201);

            // Verificar en BD
            const saved = await prisma.contact.findFirst({
                where: { email: "testdb@example.com" },
            });

            expect(saved).not.toBeNull();
            expect(saved?.name).toBe("Test DB");
            expect(saved?.read).toBe(false); // Por defecto no leído
            });
    });
});