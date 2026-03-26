import type { Dictionary } from "../../i18n/config";

type Props = {
  dict: Dictionary;
};

export default function NextSteps({ dict }: Props) {
  return (
    <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="contact-next-steps-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-300/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 id="contact-next-steps-title" className="text-2xl font-semibold text-bw-navy">
            {dict.contactPage.nextSteps.title}
          </h2>
          <p className="mt-2 max-w-prose text-bw-gray">{dict.contactPage.nextSteps.subtitle}</p>

          <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dict.contactPage.nextSteps.items.map((item, index) => (
              <li key={item.title} className="rounded-2xl border border-bw-lightgray bg-white p-5 shadow-[0_12px_32px_rgba(3,25,52,0.12)] transition motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_16px_40px_rgba(3,25,52,0.18)]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bw-lightblue text-xs font-semibold text-bw-navy">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-bw-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-bw-gray">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
