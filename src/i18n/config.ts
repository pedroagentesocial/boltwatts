import { en } from "./en";
import { es } from "./es";

export const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
] as const;

export type Lang = typeof languages[number]["code"];
export const defaultLang: Lang = "en";

export const dictionaries = {
  en,
  es,
} as const;

export type Dictionary = typeof en | typeof es;

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}

// Centralized route map: route id -> localized slugs
export const routeMap = {
  home: { en: "", es: "" },
  services: { en: "services", es: "servicios" },
  industrial: { en: "industrial", es: "industrial" },
  projects: { en: "projects", es: "proyectos" },
  about: { en: "about", es: "nosotros" },
  financing: { en: "financing", es: "financiamiento" },
  maintenance: { en: "maintenance-plans", es: "planes-de-mantenimiento" },
  contact: { en: "contact", es: "contacto" },
  reviews: { en: "reviews", es: "resenas" },
  privacyPolicy: { en: "privacy-policy", es: "politica-de-privacidad" },
  termsAndConditions: { en: "terms-and-conditions", es: "terminos-y-condiciones" },
} as const;

type RouteId = keyof typeof routeMap;

function getBasePath() {
  const rawBase = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  return rawBase === "" ? "/" : rawBase;
}

export function withBasePath(path: string) {
  const base = getBasePath();
  if (base === "/") {
    return path;
  }
  return `${base}${path}`;
}

export function buildPath(lang: Lang, route: RouteId) {
  const slug = routeMap[route][lang];
  const path = `/${lang}/${slug}`.replace(/\/$/, "");
  return withBasePath(path);
}

// Switch current pathname to a target language, preserving route (if mapped)
export function switchLangPath(pathname: string, to: Lang): string {
  const base = getBasePath();
  const normalizedPathname =
    base !== "/" && pathname.startsWith(`${base}/`)
      ? pathname.slice(base.length)
      : pathname;
  // normalize leading slash
  const parts = normalizedPathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (parts.length === 0) return withBasePath(`/${to}`);
  const [, ...rest] = parts[0] === "en" || parts[0] === "es" ? parts : [to, ...parts];
  // Try to map the first content segment by routeMap definitions
  let content = rest;
  if (rest.length === 0) return withBasePath(`/${to}`);
  const first = rest[0];
  let mapped = first;
  for (const key of Object.keys(routeMap) as Array<keyof typeof routeMap>) {
    const slugs = routeMap[key];
    if (slugs.en === first || slugs.es === first) {
      mapped = slugs[to];
      break;
    }
  }
  content = [mapped, ...rest.slice(1)];
  const next = `/${to}/${content.join("/")}`.replace(/\/$/, "");
  return withBasePath(next);
}

export function isSupportedLang(value: string): value is Lang {
  return languages.some(l => l.code === value);
}
