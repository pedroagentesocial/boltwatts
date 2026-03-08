import type { ReactNode } from "react";
import { cx } from "./utils";
import Button from "./Button";

type Props = {
  title: string;
  text?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  children?: ReactNode;
};

export default function CTABox({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
  children,
}: Props) {
  return (
    <section
      className={cx(
        "rounded-2xl border border-bw-lightgray bg-bw-lightblue/40 p-6 sm:p-8",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-bw-navy">{title}</h3>
          {text ? <p className="text-bw-gray max-w-prose">{text}</p> : null}
          {children}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={primaryHref}>{primaryLabel}</Button>
          {secondaryLabel && secondaryHref ? (
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
