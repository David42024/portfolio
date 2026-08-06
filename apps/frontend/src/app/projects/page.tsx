import Link from "next/link";
import { Metadata } from "next";
import { api, Project } from "@/services/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Todos los proyectos de David Lucano: APIs, aplicaciones full-stack y arquitecturas escalables.",
};

async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await api.getProjects();
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="min-h-screen py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="mb-6">
            <Link
              href="/"
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
              Volver al inicio
            </Link>
          </div>

          <span className="text-primary font-mono text-sm">Proyectos</span>
          <h1 className="text-3xl sm:text-5xl font-bold mt-2">
            Todos los proyectos
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Una colección completa de proyectos en los que he trabajado, desde
            APIs robustas hasta aplicaciones full-stack.
          </p>
        </div>

        {/* Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
            }
            title="No hay proyectos disponibles."
            description="Cuando agregues proyectos, aparecerán aquí."
          />
        )}
      </div>
    </section>
  );
}