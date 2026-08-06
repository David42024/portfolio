import Link from "next/link";
import { api, Project } from "@/services/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";


async function getProjects(): Promise<Project[]> {
  try {
    const response = await api.getFeaturedProjects();
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <span className="text-primary font-mono text-sm">Proyectos</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Trabajo Destacado
          </h2>
          <p className="text-muted-foreground mt-4">
            Una selección de proyectos en los que he trabajado, desde APIs
            robustas hasta aplicaciones full-stack.
          </p>
        </div>

        {/* Projects Grid */}
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
            description="Cuando agregues proyectos destacados, aparecerán aquí."
          />
        )}

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Ver todos los proyectos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}