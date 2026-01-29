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

  
const categoryWithSkills = {
  include: {
    skills: true,
  },
} satisfies Prisma.SkillCategoryDefaultArgs;

export type SkillCategoryWithSkills =
  Prisma.SkillCategoryGetPayload<typeof categoryWithSkills>;


export class SkillRepository extends BaseRepository<SkillWithCategories> {
    async findAll(): Promise<SkillWithCategories[]> {
        return prisma.skill.findMany({
            ...skillWithCategories,
            orderBy: { level: "desc" },
        });
    }
    async findCategories(): Promise<SkillCategoryWithSkills[]> {
        return prisma.skillCategory.findMany({
            orderBy: { order: "asc" },
            ...categoryWithSkills,
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