import Link from "next/link";
import Image from "next/image";
import { Project } from "@/services/api";
import { deviconUrl } from "@/helpers/devicon";
import { TechOverflowBadge } from "@/components/ui/TechOverflowBadge";

// CAMBIO: tarjeta de proyecto extraída para reutilizarla en la home,
// en /projects y en la ficha de proyecto (muestra el enlace a la ficha).
export function ProjectCard({
  project,
  index = 0,
  showDetail = true,
}: {
  project: Project;
  index?: number;
  showDetail?: boolean;
}) {
  const imageUrl = project.imageUrl;

  return (
    <article
      className="group relative rounded-xl border border-border bg-card overflow-hidden card-hover animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            unoptimized
            sizes="(min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <span className="font-mono text-4xl text-primary/30">{"</>"}</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground mt-2 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
            >
              {deviconUrl(tech.icon) && (
                <Image
                  src={deviconUrl(tech.icon)!}
                  alt={tech.name}
                  width={16}
                  height={16}
                  unoptimized
                  className={`shrink-0 ${tech.icon === "express" ? "dark:filter dark:invert" : ""}`}
                />
              )}
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <TechOverflowBadge
              hiddenTechnologies={project.technologies.slice(4)}
            />
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Código
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
              </svg>
              Demo
            </a>
          )}
          {showDetail && (
            <Link
              href={`/projects/${project.slug}`}
              className="ml-auto inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Ver más
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}