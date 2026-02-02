import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "../../src/config/db";
import request from "supertest";
import app from "../../src/app";
import { response } from "express";


describe("Certificates API ", () => { 
    let testCertificateId: string;

    beforeAll(async () => {
        await prisma.certificate.deleteMany({
            where: {
                title: {
                    startsWith: "Test",
                },
            },
        });

        const certificateData = {
            title: "Test Certificate",
            issuer: "Test Issuer",
            issueDate: new Date("2023-01-01"),
            imageUrl: "https://example.com/certificate/test",
        };
        const certificate = await prisma.certificate.create({
            data: certificateData,
        });
        testCertificateId = certificate.id;
    });


    afterAll(async () => {
        await prisma.certificate.deleteMany({
            where: {
                title: {
                    startsWith: "Test",
                },
            },
        });
    });

    describe("GET /certificates", () => {
        it("obtiene la lista de certificados", async () => {
            const response = await request(app)
                .get("/api/v1/certificates")
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    
        it("certificados tienen estructura correcta", async () => {
            const response = await request(app)
                .get("/api/v1/certificates")
                .expect(200);

            const cert = response.body.data.find(
                (c: any) => c.title === "Test Certificate"
            );

            expect(cert).toBeDefined();
            expect(cert).toHaveProperty("title");
            expect(cert).toHaveProperty("issuer");
            expect(cert).toHaveProperty("issueDate");
            expect(cert).toHaveProperty("skills");
        });

    });

    describe("GET /api/v1/certificates/:id", () => {
        it("devuelve certificado por id", async () => {
        const response = await request(app)
            .get(`/api/v1/certificates/${testCertificateId}`)
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe("Test Certificate");
        expect(response.body.data.issuer).toBe("Test Issuer");
        });

        // Implementar necesario
        it("devuelve 404 si no existe", async () => {
            const response = await request(app)
                .get("/api/v1/certificates/id-inexistente")
                .expect(404);

            expect(response.body.success).toBe(false);
        });
    });
});