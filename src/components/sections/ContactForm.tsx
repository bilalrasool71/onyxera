"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactReasons } from "@/lib/data/agency";
import { preloadRecaptcha, submitLead } from "@/lib/formService";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* The form posts to the WebAppConsulting CRM, the same endpoint the sibling
   sites use, identified by this site's WebSiteId. Before that it opened the
   visitor's mail client and called it done — which lost the enquiry outright
   for anyone without a configured mail app, and recorded nothing either way.

   "error" exists because a submission can genuinely fail, and the visitor is
   then offered the mail route rather than a dead end. Nothing here claims a
   message arrived unless the API said so. */
type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/* Border colour is chosen in exactly one place below. `cn()` is a plain join
   with no tailwind-merge, so two competing `border-*` utilities would resolve
   by stylesheet order rather than argument order. */
const fieldClass =
  "w-full rounded-sm border bg-glass px-4 py-3 text-[0.9375rem] text-fg transition-all duration-300 placeholder:text-fg-faint";

/* `--line-strong` is a decorative hairline — 1.76:1 dark and 1.45:1 light
   against the field fill, where WCAG 1.4.11 asks 3:1 to bound a control. The
   fill itself is `--glass` (under 4% alpha), so the border is the only edge the
   field has. `--fg-faint` at 80% measures 4.8:1 dark / 3.3:1 light on the same
   fill. `focus:` is (0,2,0) against the resting (0,1,0), so it wins on
   specificity and needs no ordering assumption.

   No `focus:outline-none` here: it used to defeat the global `:focus-visible`
   rule outright (utilities beat base whatever the specificity), leaving a 1px
   border tint as the only focus indicator on all five controls. */
const fieldRest = "border-fg-faint/80 focus:border-accent-icon";
const fieldInvalid = "border-danger-line";

const labelClass =
  "mb-2 block font-label text-[0.625rem] tracking-[0.14em] text-fg-subtle uppercase";

const errorClass = "mt-2 flex items-center gap-1.5 text-xs text-danger";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  /* Kept so the visitor can retry or fall back to email without retyping. */
  const draft = useRef<{ subject: string; body: string }>({ subject: "", body: "" });

  /* Fetched on mount rather than on submit: the badge Google requires is then
     visible from the start, and the first submission is not waiting on a
     script download. */
  useEffect(() => {
    preloadRecaptcha();
  }, []);

  /* Focus targets: the first invalid control on a failed submit, the
     confirmation heading once the form is swapped out. Without these a screen
     reader user gets no signal at all — `noValidate` also suppresses the
     browser's own messages. */
  const fields = useRef<Record<string, HTMLElement | null>>({});
  const confirmation = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") confirmation.current?.focus();
  }, [status]);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const msg = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "That email address does not look right.";
    /* Required, but no minimum length — however short the message, it is the
       visitor's to judge. */
    if (msg.length === 0) next.message = "Please tell us what you need.";

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);

    const found = validate(data);
    setErrors(found);

    const firstInvalid = (["name", "email", "message"] as const).find(
      (k) => found[k],
    );
    if (firstInvalid) {
      fields.current[firstInvalid]?.focus();
      return;
    }

    const field = (k: string) => String(data.get(k) ?? "").trim();

    /* The CRM takes one free-text comment, so the two optional fields are
       labelled and folded into it rather than dropped. */
    const meta = [
      field("company") && `Company: ${field("company")}`,
      field("service") && `Service: ${field("service")}`,
    ].filter(Boolean) as string[];
    /* A blank line between the labelled fields and the message, but only when
       there are labelled fields to separate. */
    const comment = [...meta, ...(meta.length ? [""] : []), field("message")].join("\n");

    draft.current = {
      subject: `Project enquiry from ${field("name")}`,
      body: [`Name: ${field("name")}`, `Email: ${field("email")}`, "", comment].join("\n"),
    };

    setStatus("sending");
    try {
      await submitLead({
        fullName: field("name"),
        email: field("email"),
        /* No phone field on this form; the CRM accepts the lead without one. */
        phone: "",
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
        className="card flex flex-col items-center p-10 text-center md:p-14"
      >
        <span className="grid size-14 place-items-center rounded-full bg-blue-400/12 text-accent">
          <Send className="size-7" strokeWidth={1.6} />
        </span>
        <h2
          ref={confirmation}
          tabIndex={-1}
          className="mt-7 font-display text-2xl font-medium text-fg"
        >
          Message received.
        </h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">
          It is with the team now. If you would rather add anything, write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline underline-offset-4 hover:text-accent-strong"
          >
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-display text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
        >
          Write another message
        </button>
      </div>
    );
  }

  if (status === "error") {
    /* The submission failed, so the message did not reach anyone. Rather than
       leave the visitor to retype it, the mail link below carries what they
       already wrote. */
    return (
      <div
        role="alert"
        className="card flex flex-col items-center p-10 text-center md:p-14"
      >
        <span className="grid size-14 place-items-center rounded-full bg-danger/12 text-danger">
          <AlertCircle className="size-7" strokeWidth={1.6} />
        </span>
        <h2
          ref={confirmation}
          tabIndex={-1}
          className="mt-7 font-display text-2xl font-medium text-fg"
        >
          That did not go through.
        </h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">
          Something on our side failed, so the message has not reached us. Try
          again, or send it by email — the link below already has what you
          wrote.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Button type="button" size="lg" onClick={() => setStatus("idle")}>
            Try again
          </Button>
          <a
            href={
              `mailto:${site.email}` +
              `?subject=${encodeURIComponent(draft.current.subject)}` +
              `&body=${encodeURIComponent(draft.current.body)}`
            }
            className="font-display text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
          >
            Send it by email instead
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            ref={(el) => {
              fields.current.name = el;
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldClass, errors.name ? fieldInvalid : fieldRest)}
          />
          {errors.name && (
            <p id="name-error" role="alert" className={errorClass}>
              <AlertCircle className="size-3.5 shrink-0" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            ref={(el) => {
              fields.current.email = el;
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, errors.email ? fieldInvalid : fieldRest)}
          />
          {errors.email && (
            <p id="email-error" role="alert" className={errorClass}>
              <AlertCircle className="size-3.5 shrink-0" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={cn(fieldClass, fieldRest)}
          />
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            What do you need?
          </label>
          {/* The browser's own arrow sat hard against the edge and made the
              control a few px shorter than the inputs beside it. It is hidden
              and replaced with a chevron in the site's colours, inset like
              the text. */}
          <div className="relative">
            <select
              id="service"
              name="service"
              defaultValue="Not sure yet"
              className={cn(fieldClass, fieldRest, "cursor-pointer appearance-none pr-11")}
            >
              {contactReasons.map((r) => (
                <option key={r} value={r} className="bg-surface">
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-subtle"
              strokeWidth={2}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            What are you trying to solve? *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="The messy version is fine. What is happening, what have you already tried, and what would a good outcome look like?"
            ref={(el) => {
              fields.current.message = el;
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              fieldClass,
              "resize-y",
              errors.message ? fieldInvalid : fieldRest,
            )}
          />
          {errors.message && (
            <p id="message-error" role="alert" className={errorClass}>
              <AlertCircle className="size-3.5 shrink-0" /> {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* The old line promised a reply "within four business hours". Nothing
            on the site supports that figure, so it is gone rather than
            restated with a different invented number. */}
        <p className="max-w-xs text-xs leading-relaxed text-fg-faint">
          Your message comes straight to the team. No mailing list, no sequence.
        </p>
        <Button type="submit" size="lg" withArrow disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>

      {/* reCAPTCHA v3 has no checkbox and its floating badge is hidden (it sat
          over the contact button), so Google's required disclosure is shown
          here instead. */}
      <p className="mt-5 text-xs leading-relaxed text-fg-faint">
        Protected by reCAPTCHA. The Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors duration-300 hover:text-accent"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors duration-300 hover:text-accent"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}
