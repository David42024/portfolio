import { api, Experience } from "@/services/api";

async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await api.getExperiences();
    return response.data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    month: "short",
    year: "numeric",
  });
}

export async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-primary font-mono text-sm">// Experiencia</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Trayectoria Profesional
          </h2>
          <p className="text-muted-foreground mt-4">
            Mi recorrido profesional y las empresas donde he contribuido a
            construir productos increíbles.
          </p>
        </div>

        {/* Timeline */}
        {experiences.length > 0 ? (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No hay experiencias disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  isEven,
}: {
  experience: Experience;
  index: number;
  isEven: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col md:flex-row items-start gap-8 animate-fade-in ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10">
        {experience.current && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
        )}
      </div>

      {/* Date - Mobile */}
      <div className="md:hidden pl-8 text-sm text-muted-foreground">
        {formatDate(experience.startDate)} -{" "}
        {experience.current ? "Presente" : formatDate(experience.endDate!)}
      </div>

      {/* Content */}
      <div
        className={`flex-1 pl-8 md:pl-0 ${
          isEven ? "md:pr-12 md:text-right" : "md:pl-12"
        }`}
      >
        {/* Date - Desktop */}
        <div className="hidden md:block text-sm text-muted-foreground mb-2">
          {formatDate(experience.startDate)} -{" "}
          {experience.current ? "Presente" : formatDate(experience.endDate!)}
        </div>

        <div
          className={`p-6 rounded-xl border border-border bg-card ${
            isEven ? "md:ml-auto" : ""
          } max-w-xl`}
        >
          {/* Current badge */}
          {experience.current && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Actual
            </span>
          )}

          <h3 className="text-xl font-semibold">{experience.position}</h3>

          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <span className="font-medium text-foreground">
              {experience.company}
            </span>
            {experience.location && (
              <>
                <span>•</span>
                <span className="text-sm">{experience.location}</span>
              </>
            )}
          </div>

          <p
            className={`text-muted-foreground mt-4 ${
              isEven ? "md:text-right" : ""
            }`}
          >
            {experience.description}
          </p>

          {/* Technologies */}
          {experience.technologies.length > 0 && (
            <div
              className={`flex flex-wrap gap-2 mt-4 ${
                isEven ? "md:justify-end" : ""
              }`}
            >
              {experience.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}