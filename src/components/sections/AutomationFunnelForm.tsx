"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Send } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { preloadRecaptcha, submitLead } from "@/lib/formService";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* The consultation form on the funnel pages (/automation-funnel and
   /gohighlevel). Same CRM endpoint and the same status model as ContactForm —
   the fields differ (business name and a phone number instead of company and
   a service picker), which is why it is its own component rather than a prop
   on the other. The heading, the last field and the button label are the
   only things that change between the two pages, so they are props. */
type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "business" | "email" | "phone" | "website" | "message";
type Errors = Partial<Record<Field, string>>;

/* The card is white in both themes (it sits on the navy band), so every
   colour here is the approved design's own fixed value, not a theme token. */
/* The label sits *inside* the field, as the design draws it, and disappears
   once the visitor types: the control carries a single-space placeholder so
   `:placeholder-shown` is true only while it is empty. The red asterisk is a
   real element, which a placeholder attribute could not colour. */
const fieldClass =
  "peer w-full rounded-md border bg-[#f3f7fd] px-3.5 py-2.5 text-[0.9375rem] text-[#0b1f33] transition-all duration-300";
const fieldRest = "border-[#d6e2f3] focus:border-[#6a9bd1]";
const fieldInvalid = "border-[#e02424]";
const labelBase =
  "pointer-events-none absolute left-3.5 text-[0.9375rem] text-[#5b6b82] transition-opacity duration-150 peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0";
const labelClass = `${labelBase} top-1/2 -translate-y-1/2`;
/* Top-anchored: a textarea grows, so its label cannot sit at the vertical
   centre. Kept as its own string — `cn()` is a plain join with no merge, so
   two competing `top-*` utilities would be settled by stylesheet order. */
const textareaLabelClass = `${labelBase} top-3`;
const errorClass = "mt-1.5 flex items-center gap-1.5 text-xs text-[#e02424]";

const REQUIRED: Field[] = ["name", "business", "email", "phone", "website", "message"];

type Props = {
  title?: string;
  submitLabel?: string;
  /** Named in the CRM comment so the team can tell the two pages apart. */
  source?: string;
  /** Label of the last field. */
  detailLabel?: string;
  /** When given, the last field is a select over these instead of a textarea. */
  detailOptions?: string[];
  /** Shown when the textarea is left empty. */
  detailError?: string;
  /** Adds a required, full-width "Website URL" field above the last one. */
  websiteField?: boolean;
};

export function AutomationFunnelForm({
  title = "Get Your Free Automation Consultation",
  submitLabel = "Get My Free Consultation",
  source = "Automation Funnel page",
  detailLabel = "What are you looking to automate?",
  detailOptions,
  detailError = "Please tell us what you are looking to automate.",
  websiteField = false,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const draft = useRef<{ subject: string; body: string }>({ subject: "", body: "" });
  const fields = useRef<Record<string, HTMLElement | null>>({});
  const confirmation = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    preloadRecaptcha();
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") confirmation.current?.focus();
  }, [status]);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const v = (k: Field) => String(data.get(k) ?? "").trim();

    if (v("name").length < 2) next.name = "Please tell us your name.";
    if (v("business").length === 0) next.business = "Please tell us your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email")))
      next.email = "That email address does not look right.";
    if (v("phone").replace(/[^\d]/g, "").length < 6)
      next.phone = "Please add a phone number we can reach you on.";
    if (websiteField && v("website").length < 4)
      next.website = "Please add your website address.";
    if (v("message").length === 0)
      next.message = detailOptions ? "Please choose an option." : detailError;
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);

    const firstInvalid = REQUIRED.find((k) => found[k]);
    if (firstInvalid) {
      fields.current[firstInvalid]?.focus();
      return;
    }

    const field = (k: Field) => String(data.get(k) ?? "").trim();

    /* One free-text comment on the CRM side, so the business name and the
       question are labelled and folded into it. */
    const comment = [
      `Business: ${field("business")}`,
      ...(websiteField ? [`Website: ${field("website")}`] : []),
      `Source: ${source}`,
      "",
      field("message"),
    ].join("\n");

    draft.current = {
      subject: `Automation consultation request from ${field("name")}`,
      body: [
        `Name: ${field("name")}`,
        `Email: ${field("email")}`,
        `Phone: ${field("phone")}`,
        "",
        comment,
      ].join("\n"),
    };

    setStatus("sending");
    try {
      await submitLead({
        fullName: field("name"),
        email: field("email"),
        phone: field("phone"),
        comment,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] md:p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-[#e6f0ff] text-[#1a6df5]">
          <Send className="size-7" strokeWidth={1.6} />
        </span>
        <h3
          ref={confirmation}
          tabIndex={-1}
          className="mt-6 font-display text-2xl font-semibold text-[#0b1f33]"
        >
          Request received.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#3c5a7e]">
          It is with the team now. If you would rather add anything, write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-[#4f81bc] underline underline-offset-4 hover:text-[#3e68a1]"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        role="alert"
        className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] md:p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-[#e02424]/10 text-[#e02424]">
          <AlertCircle className="size-7" strokeWidth={1.6} />
        </span>
        <h3
          ref={confirmation}
          tabIndex={-1}
          className="mt-6 font-display text-2xl font-semibold text-[#0b1f33]"
        >
          That did not go through.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#3c5a7e]">
          Something on our side failed, so the request has not reached us. Try
          again, or send it by email — the link below already has what you
          wrote.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-md bg-[#6a9bd1] px-5 py-2.5 font-display text-sm font-semibold text-[color:var(--btn-fg)] transition-colors hover:bg-[#4f81bc]"
          >
            Try again
          </button>
          <a
            href={
              `mailto:${site.email}` +
              `?subject=${encodeURIComponent(draft.current.subject)}` +
              `&body=${encodeURIComponent(draft.current.body)}`
            }
            className="text-sm font-medium text-[#4f81bc] underline-offset-4 hover:underline"
          >
            Send it by email instead
          </a>
        </div>
      </div>
    );
  }

  const input = (
    key: Field,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <div className="relative">
        <input
          id={`af-${key}`}
          name={key}
          placeholder=" "
          ref={(el) => {
            fields.current[key] = el;
          }}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `af-${key}-error` : undefined}
          className={cn(fieldClass, errors[key] ? fieldInvalid : fieldRest)}
          {...props}
        />
        <label htmlFor={`af-${key}`} className={labelClass}>
          {label} <span className="text-[#e02424]">*</span>
        </label>
      </div>
      {errors[key] && (
        <p id={`af-${key}-error`} role="alert" className={errorClass}>
          <AlertCircle className="size-3.5 shrink-0" /> {errors[key]}
        </p>
      )}
    </div>
  );

  const submit = (
    <div className={cn(detailOptions ? "flex flex-col justify-end" : "mt-4")}>
      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "group flex w-full items-center justify-center gap-2.5 rounded-md bg-[#6a9bd1] px-6 py-3.5 font-display text-[0.9375rem] font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc] disabled:pointer-events-none disabled:opacity-55",
          /* Lines up with the select: its label sits above it. */
          detailOptions && "mt-[1.625rem] py-2.5 text-sm whitespace-nowrap",
        )}
      >
        {status === "sending" ? "Sending…" : submitLabel}
        <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );

  /* The two lines under the form. With a select as the last field the button
     sits in the right-hand cell of a two-column row, and these used to sit
     under it in that same cell — half the form's width, so both wrapped onto
     two lines. They are rendered after the grid instead, where each fits on
     one line. */
  const notes = (
    <>
      <p className={cn("mt-3 text-[0.8125rem] text-[#6b7a90]", detailOptions ? "text-left" : "text-center")}>
        We respect your information. No spam, ever.
      </p>
      {/* reCAPTCHA v3 has no checkbox and its floating badge is hidden (it sat
          over the contact button), so Google's required disclosure is shown
          here instead. */}
      <p
        className={cn(
          "mt-2 text-[0.6875rem] leading-relaxed text-[#8a97a8]",
          detailOptions ? "text-left" : "text-center",
        )}
      >
        Protected by reCAPTCHA. The Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors duration-300 hover:text-[#4f81bc]"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors duration-300 hover:text-[#4f81bc]"
        >
          Terms
        </a>{" "}
        apply.
      </p>
    </>
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl bg-white p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] md:p-7"
    >
      <h3 className="font-display text-lg font-bold text-[#0b1f33] md:text-xl">
        {title}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {input("name", "Your Name", { type: "text", autoComplete: "name" })}
        {input("business", "Business Name", {
          type: "text",
          autoComplete: "organization",
        })}
        {input("email", "Work Email", { type: "email", autoComplete: "email" })}
        {input("phone", "Phone Number", { type: "tel", autoComplete: "tel" })}
        {websiteField && (
          <div className="sm:col-span-2">
            {input("website", "Website URL", { type: "text", inputMode: "url", autoComplete: "url" })}
          </div>
        )}

        {detailOptions ? (
          <div>
            {/* A select shows its placeholder option itself, so the label sits
                above it rather than inside. */}
            <label htmlFor="af-message" className="mb-1.5 block text-[0.8125rem] font-bold whitespace-nowrap text-[#0b1f33]">
              {detailLabel} <span className="text-[#e02424]">*</span>
            </label>
            <select
              id="af-message"
              name="message"
              defaultValue=""
              ref={(el) => {
                fields.current.message = el;
              }}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "af-message-error" : undefined}
              className={cn(fieldClass, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%230b1f3a%22 stroke-width=%221.8%22/></svg>')] bg-[length:12px_8px] bg-[position:right_0.875rem_center] bg-no-repeat pr-9", errors.message ? fieldInvalid : fieldRest)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {detailOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {errors.message && (
              <p id="af-message-error" role="alert" className={errorClass}>
                <AlertCircle className="size-3.5 shrink-0" /> {errors.message}
              </p>
            )}
          </div>
        ) : (
        <div className="sm:col-span-2">
          <div className="relative">
            <textarea
              id="af-message"
              name="message"
              rows={2}
              placeholder=" "
              ref={(el) => {
                fields.current.message = el;
              }}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "af-message-error" : undefined}
              className={cn(fieldClass, "resize-y", errors.message ? fieldInvalid : fieldRest)}
            />
            <label htmlFor="af-message" className={textareaLabelClass}>
              {detailLabel} <span className="text-[#e02424]">*</span>
            </label>
          </div>
          {errors.message && (
            <p id="af-message-error" role="alert" className={errorClass}>
              <AlertCircle className="size-3.5 shrink-0" /> {errors.message}
            </p>
          )}
        </div>
        )}
        {detailOptions && submit}
      </div>

      {/* With a select as the last field the button sits beside it, in the
          right-hand cell of the same row, as the design draws it; with the
          textarea it spans the full width underneath. The notes always span
          the full width, so neither line wraps. */}
      {!detailOptions && submit}
      {notes}
    </form>
  );
}
