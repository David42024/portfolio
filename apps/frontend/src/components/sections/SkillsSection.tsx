import { api, SkillCategory } from "@/services/api";

async function getSkillsCategories(): Promise<SkillCategory[]> {
  try {
    const response = await api.getSkillsCategories();
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
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

        {/* Skills Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            
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
      className="p-6 rounded-xl border border-border bg-card animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {category.name}
      </h3>

      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-xs text-muted-foreground">
                {skill.level}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}