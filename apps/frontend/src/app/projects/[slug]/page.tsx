import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { api, Project } from "@/services/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { deviconUrl } from "@/helpers/devicon";

interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = params;
  const project = await fetchProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.title,
    description: project.description,
  };
}

async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const response = await api.getProjectBySlug(slug);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

async function fetchOtherProjects(currentId: string): Promise<Project[]> {
  try {
    const response = await api.getProjects();
    return response.data.filter((p) => p.id !== currentId).slice(0, 3);
  } catch (error) {
    console.error("Error fetching other projects:", error);
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = params;
  const project = await fetchProject(slug);
  if (!project) notFound();

  const otherProjects = await fetchOtherProjects(project.id);

  return (
    <section className="min-h-screen py-24">
      <div className="container-custom max-w-4xl">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Volver a proyectos
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-primary font-mono text-sm">
            Proyecto {project.featured ? "· Destacado" : ""}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mt-2">
            {project.title}
          </h1>
        </div>

        {/* Image */}
        {project.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted mb-10">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              unoptimized
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {project.description}
        </div>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              Tecnologías utilizadas
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-muted text-muted-foreground"
                >
                  {deviconUrl(tech.icon) && (
                    <Image
                      src={deviconUrl(tech.icon)!}
                      alt={tech.name}
                      width={16}
                      height={16}
                      unoptimized
                      className={`shrink-0 ${
                        tech.icon === "express" ? "dark:filter dark:invert" : ""
                      }`}
                    />
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-primary/50 text-primary font-semibold hover:bg-primary/10 hover:border-primary transition-all duration-200 focus-ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Código fuente
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 glow-hover focus-ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
              </svg>
              Ver demo
            </a>
          )}
        </div>
      </div>

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <div className="container-custom mt-20 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-8">Otros proyectos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p, index) => (
              <ProjectCard key={p.id} project={p} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}