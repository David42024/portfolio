// Devicon no usa el sufijo "original" en todos: graphql solo es "plain" y
// AWS se renombró a "amazonwebservices" (disponible en la rama develop).
const SPECIAL: Record<string, string> = {
  graphql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon@develop/icons/amazonwebservices/amazonwebservices-original.svg",
};

export function deviconUrl(icon: string | null | undefined): string | null {
  if (!icon) return null;
  if (SPECIAL[icon]) return SPECIAL[icon];
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;
}