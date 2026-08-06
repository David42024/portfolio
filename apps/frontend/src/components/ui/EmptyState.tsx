interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

// CAMBIO: estado vacío reutilizable con ícono, jerarquía tipográfica propia
// y borde punteado, en lugar del texto plano centrado.
export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-border bg-card/40">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}