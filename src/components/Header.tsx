import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { buildPath, switchLangPath, withBasePath, type Lang, type Dictionary } from "../i18n/config";
import { siteConfig } from "../config/site";

type Props = {
  lang: Lang;
  dict: Dictionary;
  currentPath: string;
};

export default function Header({ lang, dict, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const otherLang: Lang = lang === "en" ? "es" : "en";
  const nextPath = switchLangPath(currentPath, otherLang);
  const onToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      localStorage.setItem("prefLang", otherLang);
    } catch {}
    window.location.assign(nextPath);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("prefLang", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const container = mobileNavRef.current;
    if (!container) return;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>("a, button")
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusable.length) {
      focusable[0].focus();
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const navLinks = useMemo(() => {
    const home = buildPath(lang, "home");
    return [
      { label: dict.common.nav.home, href: home },
      { label: dict.common.nav.services, href: buildPath(lang, "services") },
      { label: dict.common.nav.industrial, href: buildPath(lang, "industrial") },
      { label: dict.common.nav.projects, href: buildPath(lang, "projects") },
      { label: dict.common.nav.about, href: buildPath(lang, "about") },
      { label: dict.common.nav.contact, href: buildPath(lang, "contact") },
    ];
  }, [dict, lang]);

  const normalizePath = (value: string) => {
    const [raw] = value.split("?");
    const trimmed = raw.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  };

  const currentNormalizedPath = normalizePath(currentPath);
  const isLinkActive = (href: string) => {
    const normalizedHref = normalizePath(href);
    return currentNormalizedPath === normalizedHref;
  };
  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/25 bg-bw-navy text-white ${
        isScrolled ? "shadow-[0_14px_34px_rgba(3,25,52,0.35)]" : "shadow-none"
      }`}
    >
      <div className="relative flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href={buildPath(lang, "home")} className="flex items-center" aria-label={dict.common.brand}>
            <img src={withBasePath("/images/logo.png")} alt={dict.common.brand} className="h-12 w-auto object-contain brightness-0 invert" />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-3 lg:flex">
            {navLinks.map(link => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition motion-safe:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                    isActive
                      ? "bg-white text-bw-navy shadow-sm"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={buildPath(lang, "contact")}
            data-quote-open="true"
            className="inline-flex items-center rounded-full border border-red-300/40 bg-red-500/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            {dict.common.cta.requestQuote}
          </a>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center rounded-full border border-white/45 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            {dict.common.cta.call}
          </a>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={
              lang === "en"
                ? dict.common.language.switchTo.replace("{{lang}}", dict.common.language.es)
                : dict.common.language.switchTo.replace("{{lang}}", dict.common.language.en)
            }
            aria-pressed="false"
            data-current-lang={lang}
          >
            <span className="sr-only">{dict.common.accessibility.languageLabel}</span>
            <span>{lang.toUpperCase()}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? dict.common.accessibility.closeMenu : dict.common.accessibility.openMenu}
          >
            <span className="sr-only">{dict.common.accessibility.menuLabel}</span>
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-white transition ${isOpen ? "translate-y-2 rotate-45" : ""}`}></span>
              <span className={`h-0.5 w-5 bg-white transition ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-5 bg-white transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
            </div>
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={
              lang === "en"
                ? dict.common.language.switchTo.replace("{{lang}}", dict.common.language.es)
                : dict.common.language.switchTo.replace("{{lang}}", dict.common.language.en)
            }
            aria-pressed="false"
            data-current-lang={lang}
          >
            <span>{lang.toUpperCase()}</span>
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-all duration-200 motion-reduce:transition-none ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={mobileNavRef}
          className="w-full border-t border-white/25 px-4 py-4 sm:px-6 lg:px-8 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {navLinks.map(link => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                    isActive
                      ? "bg-white text-bw-navy"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={buildPath(lang, "contact")}
              data-quote-open="true"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-red-300/40 bg-red-500/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              {dict.common.cta.requestQuote}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              {dict.common.cta.call}
            </a>
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label={
                lang === "en"
                  ? dict.common.language.switchTo.replace("{{lang}}", dict.common.language.es)
                  : dict.common.language.switchTo.replace("{{lang}}", dict.common.language.en)
              }
              aria-pressed="false"
              data-current-lang={lang}
            >
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
