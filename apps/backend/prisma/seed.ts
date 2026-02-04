import { PrismaClient } from './generated';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpiar datos existentes
  await prisma.contact.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();

  console.log("🧹 Datos anteriores eliminados");

  // ==================== TECHNOLOGIES ====================
  const technologies = await Promise.all([
    prisma.technology.create({
      data: { name: "Node.js", icon: "nodejs", color: "#339933" },
    }),
    prisma.technology.create({
      data: { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    }),
    prisma.technology.create({
      data: { name: "Express", icon: "express", color: "#000000" },
    }),
    prisma.technology.create({
      data: { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    }),
    prisma.technology.create({
      data: { name: "Redis", icon: "redis", color: "#DC382D" },
    }),
    prisma.technology.create({
      data: { name: "Docker", icon: "docker", color: "#2496ED" },
    }),
    prisma.technology.create({
      data: { name: "Prisma", icon: "prisma", color: "#2D3748" },
    }),
    prisma.technology.create({
      data: { name: "Next.js", icon: "nextjs", color: "#000000" },
    }),
    prisma.technology.create({
      data: { name: "React", icon: "react", color: "#61DAFB" },
    }),
    prisma.technology.create({
      data: { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
    }),
    prisma.technology.create({
      data: { name: "Git", icon: "git", color: "#F05032" },
    }),
    prisma.technology.create({
      data: { name: "AWS", icon: "aws", color: "#FF9900" },
    }),
  ]);

  console.log(`✅ ${technologies.length} tecnologías creadas`);

  // ==================== SKILL CATEGORIES ====================
  const backendCategory = await prisma.skillCategory.create({
    data: { name: "Backend", order: 1 },
  });

  const frontendCategory = await prisma.skillCategory.create({
    data: { name: "Frontend", order: 2 },
  });

  const databaseCategory = await prisma.skillCategory.create({
    data: { name: "Base de Datos", order: 3 },
  });

  const devopsCategory = await prisma.skillCategory.create({
    data: { name: "DevOps", order: 4 },
  });

  const toolsCategory = await prisma.skillCategory.create({
    data: { name: "Herramientas", order: 5 },
  });

  console.log("✅ Categorías de skills creadas");

  // ==================== SKILLS ====================
  const skills = await Promise.all([
    // Backend
    prisma.skill.create({
      data: {
        name: "Node.js",
        level: 90,
        icon: "nodejs",
        categoryId: backendCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "TypeScript",
        level: 85,
        icon: "typescript",
        categoryId: backendCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "Express",
        level: 90,
        icon: "express",
        categoryId: backendCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "REST APIs",
        level: 95,
        icon: "api",
        categoryId: backendCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "GraphQL",
        level: 70,
        icon: "graphql",
        categoryId: backendCategory.id,
      },
    }),

    // Frontend
    prisma.skill.create({
      data: {
        name: "React",
        level: 80,
        icon: "react",
        categoryId: frontendCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "Next.js",
        level: 75,
        icon: "nextjs",
        categoryId: frontendCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "Tailwind CSS",
        level: 85,
        icon: "tailwindcss",
        categoryId: frontendCategory.id,
      },
    }),

    // Database
    prisma.skill.create({
      data: {
        name: "PostgreSQL",
        level: 85,
        icon: "postgresql",
        categoryId: databaseCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "Redis",
        level: 75,
        icon: "redis",
        categoryId: databaseCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "Prisma",
        level: 85,
        icon: "prisma",
        categoryId: databaseCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "MongoDB",
        level: 70,
        icon: "mongodb",
        categoryId: databaseCategory.id,
      },
    }),

    // DevOps
    prisma.skill.create({
      data: {
        name: "Docker",
        level: 80,
        icon: "docker",
        categoryId: devopsCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "GitHub Actions",
        level: 75,
        icon: "githubactions",
        categoryId: devopsCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "AWS",
        level: 65,
        icon: "aws",
        categoryId: devopsCategory.id,
      },
    }),

    // Tools
    prisma.skill.create({
      data: {
        name: "Git",
        level: 90,
        icon: "git",
        categoryId: toolsCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "Linux",
        level: 80,
        icon: "linux",
        categoryId: toolsCategory.id,
      },
    }),
    prisma.skill.create({
      data: {
        name: "VS Code",
        level: 95,
        icon: "vscode",
        categoryId: toolsCategory.id,
      },
    }),
  ]);

  console.log(`✅ ${skills.length} skills creadas`);

  // ==================== PROJECTS ====================
  const [nodejs, typescript, express, postgresql, redis, docker, prismaT, nextjs, react, tailwind] = technologies;

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        slug: "api-ecommerce",
        title: "API E-Commerce",
        description:
          "API REST completa para plataforma de comercio electrónico con autenticación JWT, gestión de productos, carrito de compras y pasarela de pagos.",
        imageUrl: "/images/projects/ecommerce-api.jpg",
        githubUrl: "https://github.com/tuusuario/ecommerce-api",
        liveUrl: "https://api.ecommerce-demo.com",
        featured: true,
        technologies: {
          connect: [
            { id: nodejs.id },
            { id: typescript.id },
            { id: express.id },
            { id: postgresql.id },
            { id: redis.id },
            { id: docker.id },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        slug: "task-management-system",
        title: "Sistema de Gestión de Tareas",
        description:
          "Aplicación full-stack para gestión de proyectos y tareas con autenticación, roles de usuario, notificaciones en tiempo real y reportes.",
        imageUrl: "/images/projects/task-system.jpg",
        githubUrl: "https://github.com/tuusuario/task-management",
        liveUrl: "https://tasks-demo.com",
        featured: true,
        technologies: {
          connect: [
            { id: nodejs.id },
            { id: typescript.id },
            { id: nextjs.id },
            { id: prismaT.id },
            { id: postgresql.id },
            { id: tailwind.id },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        slug: "real-time-chat",
        title: "Chat en Tiempo Real",
        description:
          "Aplicación de chat con WebSockets, salas privadas y grupales, envío de archivos y notificaciones push.",
        imageUrl: "/images/projects/chat-app.jpg",
        githubUrl: "https://github.com/tuusuario/realtime-chat",
        featured: false,
        technologies: {
          connect: [
            { id: nodejs.id },
            { id: typescript.id },
            { id: react.id },
            { id: redis.id },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        slug: "portfolio-website",
        title: "Portfolio Personal",
        description:
          "Este portfolio - desarrollado con Next.js, TypeScript y un backend en Express. Incluye panel de administración y API documentada.",
        imageUrl: "/images/projects/portfolio.jpg",
        githubUrl: "https://github.com/tuusuario/portfolio",
        liveUrl: "https://tuportfolio.com",
        featured: true,
        technologies: {
          connect: [
            { id: nextjs.id },
            { id: typescript.id },
            { id: express.id },
            { id: prismaT.id },
            { id: postgresql.id },
            { id: tailwind.id },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ ${projects.length} proyectos creados`);

  // ==================== CERTIFICATES ====================
  const nodeSkill = skills.find((s) => s.name === "Node.js");
  const tsSkill = skills.find((s) => s.name === "TypeScript");
  const awsSkill = skills.find((s) => s.name === "AWS");
  const dockerSkill = skills.find((s) => s.name === "Docker");

  const certificates = await Promise.all([
    prisma.certificate.create({
      data: {
        title: "Node.js Application Developer",
        issuer: "OpenJS Foundation",
        issueDate: new Date("2024-03-15"),
        credentialUrl: "https://openjsf.org/certification/verify/abc123",
        imageUrl: "/images/certificates/nodejs-cert.jpg",
        skills: {
          connect: nodeSkill ? [{ id: nodeSkill.id }] : [],
        },
      },
    }),
    prisma.certificate.create({
      data: {
        title: "AWS Certified Developer Associate",
        issuer: "Amazon Web Services",
        issueDate: new Date("2024-01-20"),
        credentialUrl: "https://aws.amazon.com/verification/abc123",
        imageUrl: "/images/certificates/aws-cert.jpg",
        skills: {
          connect: awsSkill ? [{ id: awsSkill.id }] : [],
        },
      },
    }),
    prisma.certificate.create({
      data: {
        title: "Docker Certified Associate",
        issuer: "Docker Inc.",
        issueDate: new Date("2023-11-10"),
        credentialUrl: "https://credentials.docker.com/abc123",
        imageUrl: "/images/certificates/docker-cert.jpg",
        skills: {
          connect: dockerSkill ? [{ id: dockerSkill.id }] : [],
        },
      },
    }),
    prisma.certificate.create({
      data: {
        title: "Professional TypeScript Development",
        issuer: "Udemy",
        issueDate: new Date("2023-08-05"),
        credentialUrl: "https://udemy.com/certificate/abc123",
        imageUrl: "/images/certificates/typescript-cert.jpg",
        skills: {
          connect: tsSkill ? [{ id: tsSkill.id }] : [],
        },
      },
    }),
  ]);

  console.log(`✅ ${certificates.length} certificados creados`);

  // ==================== EXPERIENCE ====================
  const experiences = await Promise.all([
    prisma.experience.create({
      data: {
        company: "Tech Solutions S.A.C.",
        position: "Backend Developer Senior",
        description:
          "Desarrollo y mantenimiento de APIs REST para aplicaciones empresariales. Implementación de arquitectura de microservicios. Optimización de consultas SQL y caché con Redis. Mentoring a desarrolladores junior.",
        location: "Trujillo, Perú",
        startDate: new Date("2023-06-01"),
        current: true,
        order: 1,
        technologies: {
          connect: [
            { id: nodejs.id },
            { id: typescript.id },
            { id: postgresql.id },
            { id: redis.id },
            { id: docker.id },
          ],
        },
      },
    }),
    prisma.experience.create({
      data: {
        company: "Startup Innovadora",
        position: "Full Stack Developer",
        description:
          "Desarrollo de plataforma SaaS desde cero. Implementación de sistema de autenticación y autorización. Integración con APIs de terceros (Stripe, SendGrid). Despliegue en AWS.",
        location: "Remoto",
        startDate: new Date("2021-09-01"),
        endDate: new Date("2023-05-31"),
        current: false,
        order: 2,
        technologies: {
          connect: [
            { id: nodejs.id },
            { id: react.id },
            { id: postgresql.id },
          ],
        },
      },
    }),
    prisma.experience.create({
      data: {
        company: "Agencia Digital XYZ",
        position: "Junior Developer",
        description:
          "Desarrollo de sitios web y aplicaciones para clientes. Mantenimiento de proyectos existentes. Colaboración en equipo usando metodologías ágiles.",
        location: "Trujillo, Perú",
        startDate: new Date("2020-03-01"),
        endDate: new Date("2021-08-31"),
        current: false,
        order: 3,
        technologies: {
          connect: [
            { id: nodejs.id },
            { id: react.id },
          ],
        },
      },
    }),
  ]);

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