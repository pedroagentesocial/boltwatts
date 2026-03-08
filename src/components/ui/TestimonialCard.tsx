import type { ReactNode } from "react";
import { cx } from "./utils";

type Props = {
  quote: ReactNode;
  name: string;
  role?: string;
  className?: string;
};

export default function TestimonialCard({ quote, name, role, className }: Props) {
  return (
    <figure
      className={cx(
        "rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        className
      )}
    >
      <blockquote className="text-sm text-bw-gray">“{quote}”</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-bw-navy">
        {name}
        {role ? <span className="block text-xs font-medium text-bw-gray">{role}</span> : null}
      </figcaption>
    </figure>
  );
}
