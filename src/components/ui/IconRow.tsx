import type { ReactNode } from "react";
import { cx } from "./utils";

type IconItem = {
  icon?: ReactNode;
  label: string;
};

type Props = {
  items: IconItem[];
  className?: string;
};

export default function IconRow({ items, className }: Props) {
  return (
    <div
      role="list"
      className={cx(
        "grid gap-3 sm:grid-cols-2",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} role="listitem" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bw-lightblue text-bw-navy">
            {item.icon ?? <span className="h-2 w-2 rounded-full bg-bw-primary"></span>}
          </span>
          <span className="text-sm font-medium text-bw-navy">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
