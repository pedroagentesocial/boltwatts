import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "../../i18n/config";
import type { HubServiceCategory } from "../../data/hub";

type Props = {
  dict: Dictionary;
  contactPath: string;
  serviceCategories: HubServiceCategory[];
};

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  preferredContact: string;
  division: string;
  serviceCategory: string;
  addressOrZip: string;
  timeframe: string;
  budgetRange: string;
  message: string;
  honeypot: string;
};

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  preferredContact: "",
  division: "",
  serviceCategory: "",
  addressOrZip: "",
  timeframe: "",
  budgetRange: "",
  message: "",
  honeypot: "",
};

export default function ContactForm({ dict, contactPath, serviceCategories }: Props) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues | "rateLimit", string>>>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefilledFields, setPrefilledFields] = useState<Set<keyof FormValues>>(new Set());
  const [lastSubmitAt, setLastSubmitAt] = useState(0);
  const [externalConfirmUrl, setExternalConfirmUrl] = useState<string | null>(null);
  const hiddenRouteRef = useRef<HTMLAnchorElement | null>(null);

  const projectTypes = dict.home.quoteRouter.projectTypes;
  const projectTypeByDivision = {
    residential: projectTypes[0] ?? "",
    commercial: projectTypes[1] ?? "",
    industrial: projectTypes[2] ?? "",
  };

  const divisionLabelById = {
    residential: dict.contactPage.form.divisionOptions.residential,
    commercial: dict.contactPage.form.divisionOptions.commercial,
    industrial: dict.contactPage.form.divisionOptions.industrial,
  };

  const filteredServiceCategories = useMemo(
    () =>
      serviceCategories.filter((item) =>
        values.division ? item.division === values.division : item.division !== "specialty"
      ),
    [serviceCategories, values.division]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextValues = { ...initialValues };
    const highlighted = new Set<keyof FormValues>();

    const divisionParam = params.get("division");
    const serviceParam = params.get("service") || params.get("serviceCategory");
    const projectTypeParam = params.get("projectType");
    const contactMethodParam = params.get("contactMethod");
    const zipParam = params.get("zip");
    const descriptionParam = params.get("description");

    if (divisionParam && divisionParam in projectTypeByDivision) {
      nextValues.division = divisionParam;
      highlighted.add("division");
    } else if (projectTypeParam) {
      const resolvedDivision = (Object.entries(projectTypeByDivision).find(
        ([, label]) => label.toLowerCase() === projectTypeParam.toLowerCase()
      )?.[0] ?? "") as FormValues["division"];
      if (resolvedDivision) {
        nextValues.division = resolvedDivision;
        highlighted.add("division");
      }
    }

    if (serviceParam) {
      const matchedService = serviceCategories.find((item) => item.id === serviceParam);
      if (matchedService) {
        nextValues.serviceCategory = matchedService.id;
        nextValues.division = matchedService.division === "specialty" ? nextValues.division : matchedService.division;
        highlighted.add("serviceCategory");
      }
    }

    if (contactMethodParam && dict.contactPage.form.contactMethodOptions.includes(contactMethodParam)) {
      nextValues.preferredContact = contactMethodParam;
      highlighted.add("preferredContact");
    }
    if (zipParam) {
      nextValues.addressOrZip = zipParam;
      highlighted.add("addressOrZip");
    }
    if (descriptionParam) {
      nextValues.message = descriptionParam;
      highlighted.add("message");
    }

    setValues(nextValues);
    setPrefilledFields(highlighted);
  }, [dict.contactPage.form.contactMethodOptions, serviceCategories]);

  const getInputClass = (field: keyof FormValues) =>
    `mt-2 w-full rounded-xl border px-3 py-2.5 text-sm text-bw-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60 ${
      errors[field] ? "border-bw-secondary" : "border-bw-lightgray"
    } ${prefilledFields.has(field) ? "bg-bw-lightblue/30 ring-1 ring-bw-primary/30" : "bg-white"}`;

  const setFieldValue = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "division" ? { serviceCategory: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined, rateLimit: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues | "rateLimit", string>> = {};
    if (!values.fullName.trim()) nextErrors.fullName = dict.contactPage.form.validation.requiredField;
    if (!values.email.trim()) nextErrors.email = dict.contactPage.form.validation.requiredField;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = dict.contactPage.form.validation.invalidEmail;
    }
    if (!values.preferredContact) nextErrors.preferredContact = dict.contactPage.form.validation.requiredField;
    if (!values.division) nextErrors.division = dict.contactPage.form.validation.requiredField;
    if (!values.serviceCategory) nextErrors.serviceCategory = dict.contactPage.form.validation.requiredField;
    if (!values.timeframe) nextErrors.timeframe = dict.contactPage.form.validation.requiredField;
    if (!values.message.trim()) nextErrors.message = dict.contactPage.form.validation.requiredField;
    if (values.honeypot.trim()) nextErrors.honeypot = dict.contactPage.form.validation.honeypot;
    if (Date.now() - lastSubmitAt < 15000) nextErrors.rateLimit = dict.contactPage.form.validation.rateLimit;
    return nextErrors;
  };

  const selectedCategory = serviceCategories.find((item) => item.id === values.serviceCategory);

  const buildExternalUrl = (url: string, serviceSlug: string) => {
    const targetUrl = new URL(url);
    targetUrl.searchParams.set("utm_source", "boltwatts-hub");
    targetUrl.searchParams.set("utm_campaign", "contact");
    targetUrl.searchParams.set("utm_content", serviceSlug);
    return targetUrl.toString();
  };

  const handleRouteRequest = () => {
    if (!values.division || !values.serviceCategory) {
      setErrors((prev) => ({
        ...prev,
        division: !values.division ? dict.contactPage.form.validation.requiredField : prev.division,
        serviceCategory: !values.serviceCategory ? dict.contactPage.form.validation.requiredField : prev.serviceCategory,
      }));
      return;
    }
    if (selectedCategory?.destination.type === "external") {
      setExternalConfirmUrl(buildExternalUrl(selectedCategory.destination.url, selectedCategory.id));
      return;
    }
    hiddenRouteRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setExternalConfirmUrl(null);
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    setLastSubmitAt(Date.now());
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="contact-form-title">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="relative z-10 rounded-2xl border border-white/30 bg-white/95 p-6 shadow-[0_12px_32px_rgba(3,25,52,0.16)]">
            <h2 id="contact-form-title" className="text-2xl font-semibold text-bw-navy">
              {dict.contactPage.form.successTitle}
            </h2>
            <p className="mt-2 text-sm text-bw-gray">{dict.contactPage.form.successText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setValues(initialValues);
                  setFiles([]);
                  setErrors({});
                }}
                className="inline-flex items-center rounded-full border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.contactPage.form.reset}
              </button>
              <a
                href={contactPath}
                data-quote-open="true"
                data-project={projectTypeByDivision[values.division as keyof typeof projectTypeByDivision] || projectTypeByDivision.residential}
                data-service={values.serviceCategory}
                data-campaign="contact"
                data-content={values.serviceCategory}
                className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                {dict.contactPage.form.routeAnother}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 border-t border-bw-lightgray sm:py-14" aria-labelledby="contact-form-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 shadow-[0_24px_60px_rgba(3,25,52,0.34)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-2 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="relative z-10 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_12px_32px_rgba(3,25,52,0.16)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="contact-form-title" className="text-2xl font-semibold text-bw-navy">
            {dict.contactPage.form.title}
          </h2>
          <button
            type="button"
            onClick={handleRouteRequest}
            className="inline-flex items-center rounded-full border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
          >
            {dict.contactPage.form.routeRequest}
          </button>
          <a
            ref={hiddenRouteRef}
            href={contactPath}
            data-quote-open="true"
            data-project={projectTypeByDivision[values.division as keyof typeof projectTypeByDivision] || ""}
            data-service={values.serviceCategory}
            data-campaign="contact"
            data-content={values.serviceCategory}
            className="sr-only"
          >
            {dict.contactPage.form.routeRequest}
          </a>
        </div>
        <p className="mt-2 text-sm text-bw-gray">{dict.contactPage.form.requiredNote}</p>

        {externalConfirmUrl ? (
          <div className="mt-4 rounded-xl border border-bw-lightgray bg-bw-lightblue/40 p-4">
            <p className="text-sm text-bw-gray">{dict.contactPage.form.externalNote}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={externalConfirmUrl}
                className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                {dict.contactPage.form.externalContinue}
              </a>
              <button
                type="button"
                onClick={() => setExternalConfirmUrl(null)}
                className="inline-flex items-center rounded-full border border-bw-lightgray px-4 py-2 text-sm font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
              >
                {dict.contactPage.form.externalBack}
              </button>
            </div>
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="contact-full-name" className="text-sm font-semibold text-bw-navy">
              {dict.contactPage.form.fields.fullName}
            </label>
            <input
              id="contact-full-name"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={(event) => setFieldValue("fullName", event.target.value)}
              className={getInputClass("fullName")}
              aria-describedby={errors.fullName ? "contact-full-name-error" : undefined}
            />
            {errors.fullName ? <p id="contact-full-name-error" className="mt-1 text-xs text-bw-secondary">{errors.fullName}</p> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-phone" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.phone}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(event) => setFieldValue("phone", event.target.value)}
                className={getInputClass("phone")}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={(event) => setFieldValue("email", event.target.value)}
                className={getInputClass("email")}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email ? <p id="contact-email-error" className="mt-1 text-xs text-bw-secondary">{errors.email}</p> : null}
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-bw-navy">{dict.contactPage.form.fields.preferredContact}</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {dict.contactPage.form.contactMethodOptions.map((method) => (
                <label key={method} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${prefilledFields.has("preferredContact") ? "bg-bw-lightblue/30" : "bg-white"} ${values.preferredContact === method ? "border-bw-primary text-bw-navy" : "border-bw-lightgray text-bw-gray"}`}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={values.preferredContact === method}
                    onChange={() => setFieldValue("preferredContact", method)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
            {errors.preferredContact ? <p className="mt-1 text-xs text-bw-secondary">{errors.preferredContact}</p> : null}
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-division" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.division}
              </label>
              <select
                id="contact-division"
                name="division"
                value={values.division}
                onChange={(event) => setFieldValue("division", event.target.value)}
                className={getInputClass("division")}
                aria-describedby={errors.division ? "contact-division-error" : undefined}
              >
                <option value="">{dict.contactPage.form.selectPlaceholder}</option>
                <option value="residential">{divisionLabelById.residential}</option>
                <option value="commercial">{divisionLabelById.commercial}</option>
                <option value="industrial">{divisionLabelById.industrial}</option>
              </select>
              {errors.division ? <p id="contact-division-error" className="mt-1 text-xs text-bw-secondary">{errors.division}</p> : null}
            </div>

            <div>
              <label htmlFor="contact-service-category" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.serviceCategory}
              </label>
              <select
                id="contact-service-category"
                name="serviceCategory"
                value={values.serviceCategory}
                onChange={(event) => setFieldValue("serviceCategory", event.target.value)}
                className={getInputClass("serviceCategory")}
                aria-describedby={errors.serviceCategory ? "contact-service-error" : undefined}
              >
                <option value="">{dict.contactPage.form.selectPlaceholder}</option>
                {filteredServiceCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {dict.home.serviceCategories[category.id]}
                  </option>
                ))}
              </select>
              {errors.serviceCategory ? <p id="contact-service-error" className="mt-1 text-xs text-bw-secondary">{errors.serviceCategory}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-address-zip" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.addressOrZip}
              </label>
              <input
                id="contact-address-zip"
                name="addressOrZip"
                type="text"
                value={values.addressOrZip}
                onChange={(event) => setFieldValue("addressOrZip", event.target.value)}
                className={getInputClass("addressOrZip")}
              />
            </div>
            <div>
              <label htmlFor="contact-timeframe" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.timeframe}
              </label>
              <select
                id="contact-timeframe"
                name="timeframe"
                value={values.timeframe}
                onChange={(event) => setFieldValue("timeframe", event.target.value)}
                className={getInputClass("timeframe")}
              >
                <option value="">{dict.contactPage.form.selectPlaceholder}</option>
                {dict.contactPage.form.timeframeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.timeframe ? <p className="mt-1 text-xs text-bw-secondary">{errors.timeframe}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-budget" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.budget}
              </label>
              <select
                id="contact-budget"
                name="budgetRange"
                value={values.budgetRange}
                onChange={(event) => setFieldValue("budgetRange", event.target.value)}
                className={getInputClass("budgetRange")}
              >
                <option value="">{dict.contactPage.form.selectPlaceholder}</option>
                {dict.contactPage.form.budgetRanges.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-files" className="text-sm font-semibold text-bw-navy">
                {dict.contactPage.form.fields.files}
              </label>
              <input
                id="contact-files"
                name="files"
                type="file"
                accept=".pdf,image/*"
                multiple
                onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                className="mt-2 block w-full text-sm text-bw-gray file:mr-3 file:rounded-md file:border-0 file:bg-bw-lightblue file:px-3 file:py-1.5 file:font-semibold file:text-bw-navy"
              />
              {files.length > 0 ? (
                <ul className="mt-2 space-y-1 text-xs text-bw-gray">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>{file.name}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="text-sm font-semibold text-bw-navy">
              {dict.contactPage.form.fields.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(event) => setFieldValue("message", event.target.value)}
              className={getInputClass("message")}
            />
            {errors.message ? <p className="mt-1 text-xs text-bw-secondary">{errors.message}</p> : null}
          </div>

          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-company">{dict.contactPage.form.honeypotLabel}</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.honeypot}
              onChange={(event) => setFieldValue("honeypot", event.target.value)}
            />
          </div>

          {errors.rateLimit ? <p className="text-sm text-bw-secondary">{errors.rateLimit}</p> : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              {isSubmitting ? dict.contactPage.form.sending : dict.contactPage.form.submit}
            </button>
            <button
              type="button"
              onClick={() => {
                setValues(initialValues);
                setFiles([]);
                setErrors({});
                setExternalConfirmUrl(null);
              }}
              className="inline-flex items-center rounded-full border border-bw-lightgray px-5 py-2.5 text-sm font-semibold text-bw-navy hover:bg-bw-lightblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bw-primary/60"
            >
              {dict.contactPage.form.clear}
            </button>
          </div>
        </form>
        </div>
      </div>
    </section>
  );
}
