"use client";

import { useState } from "react";

type Language = "es" | "en";

const languages: Record<Language, { label: string; flag: string }> = {
  es: { label: "ES", flag: "🇪🇸" },
  en: { label: "EN", flag: "🇺🇸" },
};

export function LanguageToggle() {
  // TODO: Integrar con i18n (next-intl o similar)
  const [currentLang, setCurrentLang] = useState<Language>("es");
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
    // TODO: Cambiar idioma real de la aplicación
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-muted transition-colors focus-ring text-sm font-medium"
        aria-label="Cambiar idioma"
      >
        <span className="text-base">{languages[currentLang].flag}</span>
        <span className="hidden sm:inline text-muted-foreground">
          {languages[currentLang].label}
        </span>
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
          className={`text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 py-1 min-w-[120px] rounded-lg border border-border bg-card shadow-lg z-50 animate-fade-in">
            {(Object.keys(languages) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                  ${
                    currentLang === lang
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted"
                  }`}
              >
                <span className="text-base">{languages[lang].flag}</span>
                <span>{languages[lang].label}</span>
                {currentLang === lang && (
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
                    className="ml-auto"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}