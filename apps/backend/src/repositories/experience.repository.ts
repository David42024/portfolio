import { Prisma, Certificate, Experience} from '../../prisma/generated/client'
import { prisma } from '../config/db';
import { BaseRepository } from './base.repository';

export class ExperienceRepository extends BaseRepository<Experience> {
    async findAll(): Promise<Experience[]> {
        return prisma.experience.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: string): Promise<Experience | null> {
        return prisma.experience.findUnique({
            where: { id }
        });
    }
}