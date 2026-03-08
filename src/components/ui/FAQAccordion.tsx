import { cx } from "./utils";

type Item = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

type Props = {
  items: Item[];
  className?: string;
};

export default function FAQAccordion({ items, className }: Props) {
  return (
    <div
      className={cx(
        "space-y-3",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1",
        className
      )}
    >
      {items.map((item, index) => (
        <details
          key={`${item.question}-${index}`}
          open={item.defaultOpen}
          className="group rounded-xl border border-bw-lightgray bg-white p-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 rounded-md">
            <span>{item.question}</span>
            <span className="text-bw-primary transition group-open:rotate-45 motion-reduce:transition-none">+</span>
          </summary>
          <div className="mt-3 text-sm text-bw-gray group-open:motion-safe:animate-in group-open:motion-safe:fade-in group-open:motion-safe:slide-in-from-bottom-1">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
