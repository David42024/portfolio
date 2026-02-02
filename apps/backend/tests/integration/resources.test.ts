import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "../../src/config/db";
import request from "supertest";
import app from "../../src/app";


interface Skill {
    id: string;
    name: string;
    level: number;
    icon: string;
    categoryId: string;
}

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl: string;
    imageUrl: string;
    createdAt: string;
    skills: Skill[];
}

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

        // Create a test skill first
        const skill = await prisma.skill.findFirst();
        
        const certificateData = {
            title: "Test Certificate",
            issuer: "Test Issuer",
            issueDate: new Date("2023-01-01"),
            credentialUrl: "https://credentials.example.com/test",
            imageUrl: "https://example.com/certificate/test",
            skills: skill ? { connect: [{ id: skill.id }] } : undefined,
        };
        const certificate = await prisma.certificate.create({
            data: certificateData,
            include: { skills: true },
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
                (c: Certificate) => c.title === "Test Certificate"
            );

            expect(cert).toMatchObject({
                title: "Test Certificate",
                issuer: "Test Issuer",
                issueDate: expect.any(String),
            });
            expect(cert.skills[0]).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
            });
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