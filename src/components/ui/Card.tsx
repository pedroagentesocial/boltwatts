import type { ReactNode } from "react";
import { cx } from "./utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-bw-lightgray bg-white p-6 shadow-sm",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        className
      )}
    >
      {children}
    </div>
  );
}
