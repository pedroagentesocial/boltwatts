import { useState } from "react";
import type { Dictionary } from "../../i18n/config";

type Props = {
  dict: Dictionary;
};

export default function ContactFAQ({ dict }: Props) {
  const [openId, setOpenId] = useState(dict.contactPage.faq.items[0]?.id ?? "");

  return (
    <section className="py-14 border-t border-bw-lightgray" aria-labelledby="contact-faq-title">
      <h2 id="contact-faq-title" className="text-2xl font-semibold text-bw-navy">
        {dict.contactPage.faq.title}
      </h2>
      <p className="mt-2 max-w-prose text-bw-gray">{dict.contactPage.faq.subtitle}</p>

      <div className="mt-6 space-y-3">
        {dict.contactPage.faq.items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <article key={item.id} className="rounded-2xl border border-bw-lightgray bg-white">
              <button
                type="button"
                onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                <span className="font-semibold text-bw-navy">{item.q}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-bw-gray">
                  {isOpen ? dict.contactPage.faq.expandedLabel : dict.contactPage.faq.collapsedLabel}
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden px-5 pb-4 text-sm text-bw-gray">{item.a}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
