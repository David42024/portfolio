import { api, SkillCategory } from "@/services/api";
import Image from "next/image";
import { deviconUrl } from "@/helpers/devicon";

async function getSkillsCategories(): Promise<SkillCategory[]> {
  try {
    const response = await api.getSkillsCategories();
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

// CAMBIO: los porcentajes se agrupan en niveles (Básico/Intermedio/Avanzado)
// que se perciben menos arbitrarios; la info subyacente (level) no cambia.
function levelBadge(level: number): { label: string; className: string } {
  if (level >= 70) {
    return {
      label: "Avanzado",
      className: "text-primary bg-primary/10 border-primary/20",
    };
  }
  if (level >= 40) {
    return {
      label: "Intermedio",
      className: "text-teal-600 dark:text-teal-300 bg-teal-500/10 border-teal-500/20",
    };
  }
  return {
    label: "Básico",
    className: "text-muted-foreground bg-muted border-border",
  };
}

export async function SkillsSection() {
  const categories = await getSkillsCategories();
  return (
    <section id="skills" className="py-24 border-t border-border bg-card/30">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-primary font-mono text-sm">Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Tecnologías y Herramientas
          </h2>
          <p className="text-muted-foreground mt-4">
            Las tecnologías con las que trabajo día a día para crear soluciones
            robustas y escalables.
          </p>
        </div>

        {/* CAMBIO: grid → columnas CSS (masonry) para que las categorías
            pequeñas no dejen huecos verticales desproporcionados. */}
        {categories.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
            {categories.map((category, index) => (
              <SkillCategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No hay skills disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <div
      className="p-6 rounded-xl border border-border bg-card animate-fade-in mb-8 break-inside-avoid"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {category.name}
      </h3>

      <div className="space-y-3">
        {category.skills.map((skill) => {
          const badge = levelBadge(skill.level);
          return (
            <div
              key={skill.id}
              className="flex items-center gap-2.5 py-2 px-3 rounded-lg border border-border/60 bg-background/40"
            >
              {deviconUrl(skill.icon) && (
                <Image
                  src={deviconUrl(skill.icon)!}
                  alt={skill.name}
                  width={18}
                  height={18}
                  unoptimized
                  className={`shrink-0 ${skill.icon === "express" ? "dark:filter dark:invert" : ""}`}
                />
              )}
              <span className="text-sm font-medium truncate">
                {skill.name}
              </span>
              <span
                className={`ml-auto shrink-0 inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}