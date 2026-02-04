import { Prisma} from '../../prisma/generated/client.js'
import { prisma } from '../config/db.js';
import { BaseRepository } from './base.repository.js';

const experienceWithTechnologies = {
    include: {
        technologies: true,
    },
} satisfies Prisma.ExperienceDefaultArgs;

export type ExperienceWithTechnologies =
    Prisma.ExperienceGetPayload<typeof experienceWithTechnologies>;

export class ExperienceRepository extends BaseRepository<ExperienceWithTechnologies> {
    async findAll(): Promise<ExperienceWithTechnologies[]> {
        return prisma.experience.findMany({
            ...experienceWithTechnologies,
            orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: string): Promise<ExperienceWithTechnologies | null> {
        return prisma.experience.findUnique({
            ...experienceWithTechnologies,
            where: { id }
        });
    }
}