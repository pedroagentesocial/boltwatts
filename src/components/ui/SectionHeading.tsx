import type { ReactNode } from "react";
import { cx } from "./utils";

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ title, subtitle, eyebrow, align = "left", className }: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div
      className={cx(
        "flex flex-col gap-2",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        alignClass,
        className
      )}
    >
      {eyebrow ? <p className="font-script text-xs uppercase tracking-[0.3em] text-bw-gray">{eyebrow}</p> : null}
      <h2 className="text-2xl sm:text-3xl font-semibold text-bw-navy">{title}</h2>
      {subtitle ? <p className="text-bw-gray max-w-prose">{subtitle}</p> : null}
    </div>
  );
}
