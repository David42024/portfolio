import { Prisma, Skill, SkillCategory } from '../../prisma/generated/client'
import { prisma } from '../config/db';
import { BaseRepository } from './base.repository';


const skillWithCategories = {
  include: {
    category: true,
  },
} satisfies Prisma.SkillDefaultArgs;

export type SkillWithCategories =
  Prisma.SkillGetPayload<typeof skillWithCategories>;

  

export class SkillRepository extends BaseRepository<SkillWithCategories> {
    async findAll(): Promise<SkillWithCategories[]> {
        return prisma.skill.findMany({
            ...skillWithCategories,
            orderBy: { level: "desc" },
        });
    }
    async findCategories(): Promise<SkillCategory[]> {
        return prisma.skillCategory.findMany({
            orderBy: { order: "asc" },
        });
    }
    async findByCategory(categoryId: string): Promise<SkillWithCategories[]> {
        return prisma.skill.findMany({
            ...skillWithCategories,
            where: { categoryId },
            orderBy: { level: "desc" },
        });
    }
    async findById(id: string): Promise<SkillWithCategories | null> {
        return prisma.skill.findUnique({
            ...skillWithCategories,
            where: { id }
        });
    }
}