import { Prisma, Project } from "../../prisma/generated/client.js";
import { BaseRepository } from "./base.repository.js";

const projectWithTechnologies = {
  include: {
    technologies: true,
  },
} satisfies Prisma.ProjectDefaultArgs;

export type ProjectWithTechnologies =
  Prisma.ProjectGetPayload<typeof projectWithTechnologies>;

export class ProjectRepository extends BaseRepository<ProjectWithTechnologies> {

  async findAll(): Promise<ProjectWithTechnologies[]> {
    return this.prisma.project.findMany({
      ...projectWithTechnologies,
      orderBy: { createdAt: "desc" },
    });
  }

  async findFeatured(): Promise<ProjectWithTechnologies[]> {
    return this.prisma.project.findMany({
      ...projectWithTechnologies,
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findBySlug(slug: string): Promise<ProjectWithTechnologies | null> {
    return this.prisma.project.findUnique({
      ...projectWithTechnologies,
      where: { slug }
    });
  }

  async findById(id: string): Promise<ProjectWithTechnologies | null> {
    return this.prisma.project.findUnique({
      ...projectWithTechnologies,
      where: { id },
    });
  }


  // testing

  async create(data: {
    slug: string;
    title: string;
    description: string;
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    technologyIds?: string[];
  }): Promise<ProjectWithTechnologies> {
    const { technologyIds, ...projectData } = data;

    return this.prisma.project.create({
      data: {
        ...projectData,
        technologies: technologyIds
          ? { connect: technologyIds.map((id) => ({ id })) }
          : undefined,
      },
      ...projectWithTechnologies,
    });
  }

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
  ): Promise<ProjectWithTechnologies> {
    const { technologyIds, ...projectData } = data;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        technologies: technologyIds
          ? { set: technologyIds.map((id) => ({ id })) }
          : undefined,
      },
      ...projectWithTechnologies,
    });
  }

  async delete(id: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.project.count();
  }
}
