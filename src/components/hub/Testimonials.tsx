import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "../../config/site";
import ImageCard from "./ImageCard";

type TestimonialItem = {
  quote: string;
  name: string;
  projectType: string;
  avatar: string;
};

type Props = {
  title: string;
  subtitle: string;
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  ctaLabel: string;
  contactPath: string;
  placeholderLabel: string;
  starsLabel: string;
  items: TestimonialItem[];
  quoteProjectType?: string;
  quoteServiceId?: string;
  quoteCampaign?: string;
  quoteContent?: string;
  reviewsBadgeLabel: string;
  reviewsMicrocopy: string;
  reviewsLinkLabel: string;
  reviewsAriaLabel: string;
};

export default function Testimonials({
  title,
  subtitle,
  ariaLabel,
  previousLabel,
  nextLabel,
  ctaLabel,
  contactPath,
  placeholderLabel,
  starsLabel,
  items,
  quoteProjectType,
  quoteServiceId,
  quoteCampaign,
  quoteContent,
  reviewsBadgeLabel,
  reviewsMicrocopy,
  reviewsLinkLabel,
  reviewsAriaLabel,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleItems = useMemo(() => {
    if (items.length === 0) return [];
    const targetCount = Math.max(8, items.length);
    return Array.from({ length: targetCount }, (_, index) => items[index % items.length]);
  }, [items]);
  const canMove = visibleItems.length > 1;
  const activeCard = visibleItems[activeIndex] ?? visibleItems[0];
  const orderedItems = useMemo(
    () =>
      visibleItems.map((_, index) => {
        const absoluteIndex = (activeIndex + index) % visibleItems.length;
        return {
          absoluteIndex,
          item: visibleItems[absoluteIndex],
        };
      }),
    [activeIndex, visibleItems]
  );

  const move = (direction: -1 | 1) => {
    if (!canMove) return;
    setActiveIndex((prev) => (prev + direction + visibleItems.length) % visibleItems.length);
  };

  useEffect(() => {
    if (!canMove) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleItems.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [canMove, visibleItems.length]);

  if (visibleItems.length === 0) return null;

  return (
    <section className="py-12 border-t border-bw-lightgray bg-white sm:py-16" aria-labelledby="testimonials-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-bw-navy via-[#0b4a9f] to-[#0a6bff] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.28)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 left-6 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-5">
          <div>
            <h2 id="testimonials-title" className="text-2xl font-semibold text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-white/85">{subtitle}</p>
            <p className="mt-2 text-sm text-white/80">
              {reviewsMicrocopy} (
              <a
                href={siteConfig.GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={reviewsAriaLabel}
                className="font-semibold text-white underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                {reviewsLinkLabel}
              </a>
              ).
            </p>
          </div>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto" aria-label={ariaLabel}>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={previousLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canMove}
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={nextLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canMove}
            >
              &#8250;
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <article className="rounded-3xl border border-white/30 bg-white/95 p-5 shadow-[0_14px_40px_rgba(3,25,52,0.16)] backdrop-blur-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-bw-secondary" aria-label={starsLabel}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-bw-lightgray bg-white px-3 py-1 text-[11px] font-semibold text-bw-navy">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-bw-lightblue text-[10px] font-bold text-bw-navy">G</span>
                <span>{reviewsBadgeLabel}</span>
              </span>
            </div>
            <p key={`quote-${activeIndex}`} className="text-base leading-relaxed text-bw-navy motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 sm:text-lg">
              “{activeCard.quote}”
            </p>
            <div key={`person-${activeIndex}`} className="mt-5 flex items-center gap-3 motion-safe:animate-in motion-safe:fade-in">
              <ImageCard
                src={activeCard.avatar}
                alt={activeCard.name}
                fallbackLabel={placeholderLabel}
                className="h-12 w-12 rounded-full border border-bw-lightgray"
              />
              <div>
                <p className="text-sm font-semibold text-bw-navy">{activeCard.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-bw-gray">{activeCard.projectType}</p>
              </div>
            </div>
            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-bw-lightgray">
              <div
                className="h-full rounded-full bg-bw-primary transition-all duration-700"
                style={{ width: `${((activeIndex % visibleItems.length) + 1) / visibleItems.length * 100}%` }}
              ></div>
            </div>
            <a
              href={contactPath}
              data-quote-open="true"
              data-project={quoteProjectType}
              data-service={quoteServiceId}
              data-campaign={quoteCampaign}
              data-content={quoteContent}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 sm:w-auto"
            >
              {ctaLabel}
            </a>
          </article>

          <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-3 backdrop-blur-md sm:p-4">
            <div className="grid max-h-[320px] gap-3 overflow-y-auto pr-1 sm:max-h-none sm:grid-cols-2 sm:overflow-visible sm:pr-0">
              {orderedItems.slice(0, 6).map(({ absoluteIndex, item }, index) => (
                <button
                  key={`${item.name}-${item.projectType}-${absoluteIndex}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(absoluteIndex)}
                  className={`group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition motion-safe:duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:p-3 ${
                    absoluteIndex === activeIndex
                      ? "border-white/70 bg-white text-bw-navy shadow-lg"
                      : "border-white/35 bg-white/15 text-white hover:-translate-y-0.5 hover:bg-white/25"
                  }`}
                >
                  <ImageCard
                    src={item.avatar}
                    alt={item.name}
                    fallbackLabel={placeholderLabel}
                    className="h-11 w-11 rounded-full border border-white/40"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className={`truncate text-xs uppercase tracking-[0.14em] ${absoluteIndex === activeIndex ? "text-bw-gray" : "text-white/80"}`}>
                      {item.projectType}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
