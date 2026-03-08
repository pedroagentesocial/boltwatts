import { useMemo, useState } from "react";
import { siteConfig } from "../../config/site";
import { withBasePath } from "../../i18n/config";
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
  const [isBadgeBroken, setIsBadgeBroken] = useState(false);
  const canMove = items.length > 1;
  const activeCard = items[activeIndex] ?? items[0];
  const visibleItems = useMemo(() => items.slice(0, 5), [items]);

  const move = (direction: -1 | 1) => {
    if (!canMove) return;
    setActiveIndex((prev) => (prev + direction + visibleItems.length) % visibleItems.length);
  };

  return (
    <section className="py-14 border-t border-bw-lightgray" aria-labelledby="testimonials-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="testimonials-title" className="text-2xl font-semibold text-bw-navy">
            {title}
          </h2>
          <p className="mt-2 text-bw-gray">{subtitle}</p>
          <p className="mt-2 text-sm text-bw-gray">
            {reviewsMicrocopy} (
            <a
              href={siteConfig.GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={reviewsAriaLabel}
              className="font-semibold text-bw-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {reviewsLinkLabel}
            </a>
            ).
          </p>
        </div>
        <div className="w-full sm:w-auto sm:pl-4">
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <a
              href={siteConfig.GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={reviewsAriaLabel}
              className="inline-flex items-center gap-2 rounded-full border border-bw-lightgray bg-white px-3 py-1.5 text-xs font-semibold text-bw-navy shadow-sm transition motion-safe:duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {isBadgeBroken ? (
                <>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-bw-lightblue text-[10px] font-bold text-bw-navy">
                    G
                  </span>
                  <span>{reviewsBadgeLabel}</span>
                </>
              ) : (
                <img
                  src={withBasePath("/images/logos/google-reviews.svg")}
                  alt={reviewsBadgeLabel}
                  loading="lazy"
                  decoding="async"
                  className="h-5 w-auto"
                  onError={() => setIsBadgeBroken(true)}
                />
              )}
            </a>
            <div className="flex items-center gap-2" aria-label={ariaLabel}>
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={previousLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bw-lightgray bg-white text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canMove}
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={nextLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bw-lightgray bg-white text-bw-navy transition hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canMove}
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
          <div className="mb-4 flex items-center gap-1 text-bw-secondary" aria-label={starsLabel}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <p className="text-lg leading-relaxed text-bw-navy">“{activeCard.quote}”</p>
          <div className="mt-5">
            <p className="text-sm font-semibold text-bw-navy">{activeCard.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-bw-gray">{activeCard.projectType}</p>
          </div>
          <a
            href={contactPath}
            data-quote-open="true"
            data-project={quoteProjectType}
            data-service={quoteServiceId}
            data-campaign={quoteCampaign}
            data-content={quoteContent}
            className="mt-6 inline-flex items-center rounded-md bg-bw-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {visibleItems.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                index === activeIndex
                  ? "border-bw-primary ring-1 ring-bw-primary/40"
                  : "border-bw-lightgray hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <ImageCard
                src={item.avatar}
                alt={item.name}
                fallbackLabel={placeholderLabel}
                className="h-12 w-12 rounded-full border border-bw-lightgray"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-bw-navy">{item.name}</p>
                <p className="truncate text-xs uppercase tracking-[0.18em] text-bw-gray">{item.projectType}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
