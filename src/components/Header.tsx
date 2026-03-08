import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { buildPath, switchLangPath, type Lang, type Dictionary } from "../i18n/config";
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

  return (
    <header
      className={`sticky top-0 z-50 border-b border-bw-lightgray bg-white ${
        isScrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="container-responsive flex items-center justify-between py-4">
        <a href={buildPath(lang, "home")} className="flex items-center gap-3" aria-label={dict.common.brand}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-bw-primary text-white text-xs font-semibold">
            BW
          </span>
          <span className="text-base font-semibold text-bw-navy">{dict.common.brand}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-bw-navy hover:text-bw-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={buildPath(lang, "contact")}
            data-quote-open="true"
            className="inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {dict.common.cta.requestQuote}
          </a>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center rounded-md bg-bw-secondary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-secondary/60"
          >
            {dict.common.cta.call}
          </a>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-md border border-bw-lightgray px-3 py-1.5 text-sm font-medium text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-bw-lightgray text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? dict.common.accessibility.closeMenu : dict.common.accessibility.openMenu}
          >
            <span className="sr-only">{dict.common.accessibility.menuLabel}</span>
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-bw-navy transition ${isOpen ? "translate-y-2 rotate-45" : ""}`}></span>
              <span className={`h-0.5 w-5 bg-bw-navy transition ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-5 bg-bw-navy transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
            </div>
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-md border border-bw-lightgray px-3 py-1.5 text-sm font-medium text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
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
          className="container-responsive border-t border-bw-lightgray py-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-bw-navy hover:text-bw-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={buildPath(lang, "contact")}
              data-quote-open="true"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {dict.common.cta.requestQuote}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center rounded-md bg-bw-secondary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-secondary/60"
            >
              {dict.common.cta.call}
            </a>
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center justify-center rounded-md border border-bw-lightgray px-4 py-2 text-sm font-medium text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
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
