import { api, Certificate } from "@/services/api";

async function getCertificates(): Promise<Certificate[]> {
  try {
    const response = await api.getCertificates();
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
}

export async function CertificatesSection() {
  const certificates = await getCertificates();

  return (
    <section
      id="certificates"
      className="py-24 border-t border-border bg-card/30"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-primary font-mono text-sm">
            // Certificaciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Certificados y Logros
          </h2>
          <p className="text-muted-foreground mt-4">
            Certificaciones que validan mis conocimientos y compromiso con el
            aprendizaje continuo.
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No hay certificados disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CertificateCard({
  certificate,
  index,
}: {
  certificate: Certificate;
  index: number;
}) {
  return (
    <article
      className="group p-6 rounded-xl border border-border bg-card card-hover animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
        {certificate.title}
      </h3>

      <p className="text-muted-foreground mt-1">{certificate.issuer}</p>

      <p className="text-sm text-muted-foreground mt-2">
        {formatDate(certificate.issueDate)}
      </p>

      {/* Skills */}
      {certificate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {certificate.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      {/* Credential Link */}
      {certificate.credentialUrl && (
        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:underline"
        >
          Ver credencial
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
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" x2="21" y1="14" y2="3" />
          </svg>
        </a>
      )}
    </article>
  );
}