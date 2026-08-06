"use client";

import { useState } from "react";
import Image from "next/image";
import { deviconUrl } from "@/helpers/devicon";

interface TechOverflowBadgeProps {
  hiddenTechnologies: { id: string; name: string; icon: string | null }[];
}

// CAMBIO: el badge "+N" deja de ser un número estático y muestra un tooltip
// con las tecnologías ocultas al hacer hover (o click en táctiles).
export function TechOverflowBadge({
  hiddenTechnologies,
}: TechOverflowBadgeProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${hiddenTechnologies.length} tecnologías más`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
      >
        +{hiddenTechnologies.length}
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg border border-border bg-card shadow-xl z-20 animate-fade-in"
        >
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            Tecnologías
          </span>
          <span className="grid gap-0.5">
            {hiddenTechnologies.map((tech) => {
              const iconUrl = deviconUrl(tech.icon);
              return (
                <span
                  key={tech.id}
                  className="flex items-center gap-1.5 text-xs text-foreground"
                >
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt=""
                      width={14}
                      height={14}
                      unoptimized
                      className={`shrink-0 ${
                        tech.icon === "express" ? "dark:filter dark:invert" : ""
                      }`}
                    />
                  )}
                  {tech.name}
                </span>
              );
            })}
          </span>
        </span>
      )}
    </span>
  );
}