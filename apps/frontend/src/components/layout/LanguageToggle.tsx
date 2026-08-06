"use client";

import { useState } from "react";

type Language = "es" | "en";

// CAMBIO: se quitan los emojis de bandera. En Windows los emojis 🇪🇸/🇺🇸 se
// renderizan como pares de letras ("ES"/"US"), por lo que junto al label se
// leía "ES ES" duplicado. Se usa ahora un ícono de globo + el code del idioma.
const languages: Record<Language, string> = {
  es: "ES",
  en: "EN",
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
        {/* Ícono de globo en lugar de bandera (evita el bug de render en Windows) */}
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
          className="text-muted-foreground"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden sm:inline text-muted-foreground">
          {languages[currentLang]}
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
                <span className="text-xs font-semibold tracking-wide">
                  {languages[lang]}
                </span>
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