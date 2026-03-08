import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "../../i18n/config";
import type { HubService, HubServiceCategory } from "../../data/hub";

type Props = {
  dict: Dictionary;
  serviceCategories: HubServiceCategory[];
  services: HubService[];
  contactPath: string;
};

export default function QuoteRouterModal({
  dict,
  serviceCategories,
  services,
  contactPath,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const [utmCampaign, setUtmCampaign] = useState("quote-router");
  const [utmContent, setUtmContent] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const categoryOptions = useMemo(() => {
    return serviceCategories.map((category) => ({
      id: category.id,
      label: dict.home.serviceCategories[category.id],
    }));
  }, [dict, serviceCategories]);

  const resetForm = () => {
    setProjectType("");
    setServiceCategory("");
    setContactMethod("");
    setZip("");
    setDescription("");
    setExternalUrl(null);
    setError("");
    setUtmCampaign("quote-router");
    setUtmContent("");
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-quote-open]");
      if (!trigger) return;
      event.preventDefault();
      resetForm();
      const campaign = trigger.getAttribute("data-campaign") || "quote-router";
      const content = trigger.getAttribute("data-content") || "";
      setUtmCampaign(campaign);
      setUtmContent(content);
      setIsOpen(true);
      const project = trigger.getAttribute("data-project") || "";
      const serviceId = trigger.getAttribute("data-service") || "";
      if (project) {
        setProjectType(project);
      }
      if (serviceId) {
        const service = services.find((item) => item.id === serviceId);
        if (service) {
          setServiceCategory(service.categoryId);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [services]);

  useEffect(() => {
    if (!isOpen) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const items = focusable ? Array.from(focusable).filter((el) => !el.hasAttribute("disabled")) : [];
    if (items.length) {
      items[0].focus();
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        resetForm();
        return;
      }
      if (event.key !== "Tab" || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const buildExternalUrl = (url: string, content: string, campaign: string) => {
    const targetUrl = new URL(url);
    targetUrl.searchParams.set("utm_source", "boltwatts-hub");
    targetUrl.searchParams.set("utm_campaign", campaign);
    targetUrl.searchParams.set("utm_content", content);
    return targetUrl.toString();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!formRef.current?.reportValidity()) {
      setError(dict.home.quoteRouter.validation.required);
      return;
    }
    const category = serviceCategories.find((item) => item.id === serviceCategory);
    if (!category) {
      setError(dict.home.quoteRouter.validation.required);
      return;
    }
    if (category.destination.type === "external") {
      const content = utmContent || category.id;
      setExternalUrl(buildExternalUrl(category.destination.url, content, utmCampaign));
      return;
    }
    const params = new URLSearchParams();
    params.set("projectType", projectType);
    params.set("serviceCategory", serviceCategory);
    params.set("contactMethod", contactMethod);
    if (zip) params.set("zip", zip);
    if (description) params.set("description", description);
    const query = params.toString();
    window.location.assign(query ? `${contactPath}?${query}` : contactPath);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bw-navy/70 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-router-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl rounded-2xl border border-bw-lightgray bg-white p-6 shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="quote-router-title" className="text-2xl font-semibold text-bw-navy">
              {dict.home.quoteRouter.title}
            </h2>
            <p className="mt-2 text-sm text-bw-gray">{dict.home.quoteRouter.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              resetForm();
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bw-lightgray text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            aria-label={dict.home.quoteRouter.close}
          >
            ×
          </button>
        </div>

        <form ref={formRef} className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-sm font-semibold text-bw-navy">
              {dict.home.quoteRouter.fields.projectType}
            </legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {dict.home.quoteRouter.projectTypes.map((type) => (
                <label key={type} className="inline-flex items-center gap-2 text-sm text-bw-gray">
                  <input
                    type="radio"
                    name="projectType"
                    value={type}
                    checked={projectType === type}
                    onChange={() => setProjectType(type)}
                    required
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-bw-navy" htmlFor="quote-service">
                {dict.home.quoteRouter.fields.serviceCategory}
              </label>
              <select
                id="quote-service"
                name="serviceCategory"
                value={serviceCategory}
                onChange={(event) => setServiceCategory(event.target.value)}
                required
                className="mt-2 w-full rounded-md border border-bw-lightgray px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                <option value="" disabled>
                  {dict.home.quoteRouter.placeholders.select}
                </option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-bw-navy" htmlFor="quote-contact">
                {dict.home.quoteRouter.fields.contactMethod}
              </label>
              <select
                id="quote-contact"
                name="contactMethod"
                value={contactMethod}
                onChange={(event) => setContactMethod(event.target.value)}
                required
                className="mt-2 w-full rounded-md border border-bw-lightgray px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                <option value="" disabled>
                  {dict.home.quoteRouter.placeholders.select}
                </option>
                {dict.home.quoteRouter.contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-bw-navy" htmlFor="quote-zip">
                {dict.home.quoteRouter.fields.zip}
              </label>
              <input
                id="quote-zip"
                name="zip"
                type="text"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                placeholder={dict.home.quoteRouter.placeholders.zip}
                className="mt-2 w-full rounded-md border border-bw-lightgray px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-bw-navy" htmlFor="quote-description">
                {dict.home.quoteRouter.fields.description}
              </label>
              <input
                id="quote-description"
                name="description"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={dict.home.quoteRouter.placeholders.description}
                required
                className="mt-2 w-full rounded-md border border-bw-lightgray px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-bw-secondary">{error}</p> : null}

          {externalUrl ? (
            <div className="mt-2 rounded-xl border border-bw-lightgray bg-bw-lightblue/40 p-4">
              <p className="text-sm text-bw-gray">{dict.home.quoteRouter.externalNote}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={externalUrl}
                  className="inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                >
                  {dict.home.quoteRouter.continue}
                </a>
                <button
                  type="button"
                  onClick={() => setExternalUrl(null)}
                  className="inline-flex items-center rounded-md border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
                >
                  {dict.home.quoteRouter.back}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-bw-primary px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.home.quoteRouter.submit}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="inline-flex items-center rounded-md border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.home.quoteRouter.cancel}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
