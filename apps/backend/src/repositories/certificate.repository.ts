import { Prisma, Certificate} from '../../prisma/generated/client'
import { prisma } from '../config/db';
import { BaseRepository } from './base.repository';

 

export class CertificateRepository extends BaseRepository<Certificate> {
    async findAll(): Promise<Certificate[]> {
        return prisma.certificate.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: string): Promise<Certificate | null> {
        return prisma.certificate.findUnique({
            where: { id }
        });
    }
}