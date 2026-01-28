import { Prisma, Project } from '../../prisma/generated/client'
import { prisma } from '../config/db';


const projectWithTechnologies = {
  include: {
    technologies: true,
  },
} satisfies Prisma.ProjectDefaultArgs;

export type ProjectWithTechnologies =
  Prisma.ProjectGetPayload<typeof projectWithTechnologies>;

  

export const projectRepository = {
    findAll: async () => {
        return prisma.project.findMany({
            ...projectWithTechnologies,
            orderBy: { createdAt: "desc" },
        });
    },
    findFeatured: async () => {
        return prisma.project.findMany({
            ...projectWithTechnologies,
            where: { featured: true },
            orderBy: { createdAt: "desc" },
        });
    },
    findBySlug: async (slug: string) => {
        return prisma.project.findMany({
            ...projectWithTechnologies,
            where: { slug },
            orderBy: { createdAt: "desc" },
        });
    },
    findById: async (id: string) => {
        return prisma.project.findMany({
            ...projectWithTechnologies,
            where: { id },
            orderBy: { createdAt: "desc" },
        });
    },


    //Por testear

    async create(data: {
        slug: string;
        title: string;
        description: string;
        imageUrl?: string;
        githubUrl?: string;
        liveUrl?: string;
        featured?: boolean;
        technologyIds?: string[];
    }): Promise<Project> {
        const { technologyIds, ...projectData } = data;

        return prisma.project.create({
        data: {
            ...projectData,
            technologies: technologyIds
            ? { connect: technologyIds.map((id) => ({ id })) }
            : undefined,
        },
        ...projectWithTechnologies,
        });
    },

    async update(
        id: string,
        data: {
        slug?: string;
        title?: string;
        description?: string;
        imageUrl?: string;
        githubUrl?: string;
        liveUrl?: string;
        featured?: boolean;
        technologyIds?: string[];
        }
    ): Promise<Project> {
        const { technologyIds, ...projectData } = data;

        return prisma.project.update({
        where: { id },
        data: {
            ...projectData,
            technologies: technologyIds
            ? { set: technologyIds.map((id) => ({ id })) }
            : undefined,
        },
        ...projectWithTechnologies,
        });
    },

    async delete(id: string): Promise<Project> {
        return prisma.project.delete({
        where: { id },
        });
    },

    async count(): Promise<number> {
        return prisma.project.count();
    },
};