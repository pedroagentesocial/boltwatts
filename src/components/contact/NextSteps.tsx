import type { Dictionary } from "../../i18n/config";

type Props = {
  dict: Dictionary;
};

export default function NextSteps({ dict }: Props) {
  return (
    <section className="py-14 border-t border-bw-lightgray" aria-labelledby="contact-next-steps-title">
      <h2 id="contact-next-steps-title" className="text-2xl font-semibold text-bw-navy">
        {dict.contactPage.nextSteps.title}
      </h2>
      <p className="mt-2 max-w-prose text-bw-gray">{dict.contactPage.nextSteps.subtitle}</p>

      <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dict.contactPage.nextSteps.items.map((item, index) => (
          <li key={item.title} className="rounded-2xl border border-bw-lightgray bg-white p-5 shadow-sm">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bw-lightblue text-xs font-semibold text-bw-navy">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-semibold text-bw-navy">{item.title}</h3>
            <p className="mt-2 text-sm text-bw-gray">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
