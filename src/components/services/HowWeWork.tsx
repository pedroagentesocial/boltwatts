import { useState } from "react";

type StepItem = {
  title: string;
  summary: string;
  details: string;
};

type Props = {
  title: string;
  subtitle: string;
  tabLabel: string;
  activeLabel: string;
  expectationsTitle: string;
  expectations: string[];
  steps: StepItem[];
};

export default function HowWeWork({
  title,
  subtitle,
  tabLabel,
  activeLabel,
  expectationsTitle,
  expectations,
  steps,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="services-process-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-bw-lightgray bg-gradient-to-br from-bw-lightblue via-white to-[#eaf2ff] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.12)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-bw-primary/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-bw-secondary/20 blur-3xl"></div>

        <div className="relative z-10">
          <h2 id="services-process-title" className="text-2xl font-semibold text-bw-navy">
            {title}
          </h2>
          <p className="mt-2 max-w-prose text-bw-gray">{subtitle}</p>
        </div>

        <div className="relative z-10 mt-6 hidden grid-cols-4 gap-3 md:grid" role="tablist" aria-label={tabLabel}>
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={index === activeStep}
              onClick={() => setActiveStep(index)}
              className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                index === activeStep
                  ? "border-bw-primary bg-white text-bw-navy shadow-sm"
                  : "border-bw-lightgray bg-white/70 text-bw-navy hover:border-bw-primary/40 hover:bg-white"
              }`}
            >
              <span className={`text-xs uppercase tracking-[0.2em] ${index === activeStep ? "text-bw-primary" : "text-bw-gray"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-semibold">{step.title}</p>
            </button>
          ))}
        </div>

        <div className="relative z-10 mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-bw-lightgray bg-white p-4 shadow-sm motion-safe:animate-in motion-safe:fade-in sm:p-6">
            <div className="space-y-2 md:hidden">
              {steps.map((step, index) => (
                <button
                  key={`mobile-${step.title}`}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
                    index === activeStep
                      ? "border-bw-primary bg-bw-lightblue/40 text-bw-navy"
                      : "border-bw-lightgray bg-white text-bw-gray"
                  }`}
                >
                  <span>{step.title}</span>
                  <span className="text-xs uppercase tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 md:mt-0">
              <p className="text-xs uppercase tracking-[0.2em] text-bw-primary">{activeLabel}</p>
              <h3 className="mt-2 text-xl font-semibold text-bw-navy">{steps[activeStep]?.title}</h3>
              <p className="mt-2 text-sm text-bw-gray">{steps[activeStep]?.summary}</p>
              <p className="mt-4 text-sm text-bw-navy">{steps[activeStep]?.details}</p>
            </div>
          </div>

          <aside className="rounded-2xl border border-bw-lightgray bg-bw-lightblue/40 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-bw-navy">{expectationsTitle}</h3>
            <ul className="mt-4 space-y-2 text-sm text-bw-gray">
              {expectations.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-bw-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
