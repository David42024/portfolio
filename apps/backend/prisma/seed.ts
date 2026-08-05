import { readFileSync } from "fs";
import { resolve } from "path";
import { prisma } from "../src/config/db";

// Los datos se editan en prisma/seed-data.json y se aplican con npm run db:seed
const data = JSON.parse(
  readFileSync(resolve(__dirname, "seed-data.json"), "utf-8")
) as {
  technologies: { name: string; icon: string | null; color: string | null }[];
  skillCategories: { name: string; order: number }[];
  skills: { name: string; level: number; icon: string | null; category: string }[];
  projects: {
    slug: string;
    title: string;
    description: string;
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
    technologies: string[];
  }[];
  certificates: {
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl: string | null;
    imageUrl: string | null;
    skills: string[];
  }[];
  experiences: {
    company: string;
    position: string;
    description: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    current: boolean;
    order: number;
    technologies: string[];
  }[];
};

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.contact.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();

  console.log("🧹 Datos anteriores eliminados");

  // ==================== TECHNOLOGIES ====================
  const technologyRows = await Promise.all(
    data.technologies.map((t) =>
      prisma.technology.create({ data: { name: t.name, icon: t.icon, color: t.color } })
    )
  );
  const technologyByName = new Map(technologyRows.map((t) => [t.name, t]));
  console.log(`✅ ${technologyRows.length} tecnologías creadas`);

  // ==================== SKILL CATEGORIES ====================
  const categoryRows = await Promise.all(
    data.skillCategories.map((c) =>
      prisma.skillCategory.create({ data: { name: c.name, order: c.order } })
    )
  );
  const categoryByName = new Map(categoryRows.map((c) => [c.name, c]));
  console.log("✅ Categorías de skills creadas");

  // ==================== SKILLS ====================
  const skillRows = await Promise.all(
    data.skills.map((s) => {
      const category = categoryByName.get(s.category);
      if (!category) {
        throw new Error(`Skill "${s.name}" referencia una categoría inexistente: "${s.category}"`);
      }
      return prisma.skill.create({
        data: { name: s.name, level: s.level, icon: s.icon, categoryId: category.id },
      });
    })
  );
  const skillByName = new Map(skillRows.map((s) => [s.name, s]));
  console.log(`✅ ${skillRows.length} skills creadas`);

  // ==================== PROJECTS ====================
  const projects = await Promise.all(
    data.projects.map((p) =>
      prisma.project.create({
        data: {
          slug: p.slug,
          title: p.title,
          description: p.description,
          imageUrl: p.imageUrl,
          githubUrl: p.githubUrl,
          liveUrl: p.liveUrl,
          featured: p.featured,
          technologies: {
            connect: p.technologies.map((name) => {
              const tech = technologyByName.get(name);
              if (!tech) {
                throw new Error(`Proyecto "${p.slug}" referencia tecnología inexistente: "${name}"`);
              }
              return { id: tech.id };
            }),
          },
        },
      })
    )
  );
  console.log(`✅ ${projects.length} proyectos creados`);

  // ==================== CERTIFICATES ====================
  const certificates = await Promise.all(
    data.certificates.map((c) =>
      prisma.certificate.create({
        data: {
          title: c.title,
          issuer: c.issuer,
          issueDate: new Date(c.issueDate),
          credentialUrl: c.credentialUrl,
          imageUrl: c.imageUrl,
          skills: {
            connect: c.skills
              .map((name) => skillByName.get(name)?.id)
              .filter((id): id is string => Boolean(id))
              .map((id) => ({ id })),
          },
        },
      })
    )
  );
  console.log(`✅ ${certificates.length} certificados creados`);

  // ==================== EXPERIENCE ====================
  const experiences = await Promise.all(
    data.experiences.map((e) =>
      prisma.experience.create({
        data: {
          company: e.company,
          position: e.position,
          description: e.description,
          location: e.location,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
          current: e.current,
          order: e.order,
          technologies: {
            connect: e.technologies.map((name) => {
              const tech = technologyByName.get(name);
              if (!tech) {
                throw new Error(`Experiencia "${e.company}" referencia tecnología inexistente: "${name}"`);
              }
              return { id: tech.id };
            }),
          },
        },
      })
    )
  );
  console.log(`✅ ${experiences.length} experiencias creadas`);

  console.log("\n🎉 Seed completado exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });