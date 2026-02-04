import { Prisma } from '../../prisma/generated/client';
import { prisma } from '../config/db.js';
import { BaseRepository } from './base.repository.js';

const certificateWithSkills = {
    include: {
        skills: true,
    },
} satisfies Prisma.CertificateDefaultArgs;

export type CertificateWithSkills =
    Prisma.CertificateGetPayload<typeof certificateWithSkills>;

export class CertificateRepository extends BaseRepository<CertificateWithSkills> {
    async findAll(): Promise<CertificateWithSkills[]> {
        return prisma.certificate.findMany({
            ...certificateWithSkills,
            orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: string): Promise<CertificateWithSkills | null> {
        return prisma.certificate.findUnique({
            ...certificateWithSkills,
            where: { id }
        });
    }
}