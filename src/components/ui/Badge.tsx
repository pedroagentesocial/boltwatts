import type { ReactNode } from "react";
import { cx } from "./utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-bw-lightgray bg-bw-lightblue/60 px-3 py-1 text-xs font-semibold text-bw-navy",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        className
      )}
    >
      {children}
    </span>
  );
}
