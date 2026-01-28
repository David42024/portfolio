export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight animate-fade-in delay-100">
              Hola, soy{" "}
              <span className="text-gradient">David Lucano</span>
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-200">
              <span className="text-foreground font-medium">Backend Developer</span>{" "}
              especializado en crear APIs robustas y arquitecturas escalables.
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 animate-fade-in delay-300">
              {["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in delay-400">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-hover focus-ring"
              >
                Ver Proyectos
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-lg border border-border bg-card hover:border-primary/50 font-semibold transition-all focus-ring"
              >
                Contactar
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 animate-fade-in delay-500">
              <a
                href="#projects"
                className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-sm">Scroll</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-bounce"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section id="projects" className="py-24 border-t border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-bold">Proyectos</h2>
          <p className="text-muted-foreground mt-2">
            Próximamente...
          </p>
        </div>
      </section>

      <section id="skills" className="py-24 border-t border-border bg-card/30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold">Skills</h2>
          <p className="text-muted-foreground mt-2">
            Próximamente...
          </p>
        </div>
      </section>

      <section id="experience" className="py-24 border-t border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-bold">Experiencia</h2>
          <p className="text-muted-foreground mt-2">
            Próximamente...
          </p>
        </div>
      </section>

      <section id="certificates" className="py-24 border-t border-border bg-card/30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold">Certificados</h2>
          <p className="text-muted-foreground mt-2">
            Próximamente...
          </p>
        </div>
      </section>

      <section id="contact" className="py-24 border-t border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-bold">Contacto</h2>
          <p className="text-muted-foreground mt-2">
            Próximamente...
          </p>
        </div>
      </section>
    </>
  );
}