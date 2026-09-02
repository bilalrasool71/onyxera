"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactReasons } from "@/lib/data/agency";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* There is no "sending" and no "error": the form has no server to talk to.
   `output: "export"` cannot emit a route handler, so the old POST to
   /api/contact was a guaranteed 404 whose catch block still rendered a green
   tick over the words "Message received." — a receipt for a message nobody
   received, on the site's primary conversion path. The mail hand-off is now
   the only path, and the confirmation says exactly that. */
type Status = "idle" | "sent";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/* Border colour is chosen in exactly one place below. `cn()` is a plain join
   with no tailwind-merge, so two competing `border-*` utilities would resolve
   by stylesheet order rather than argument order. */
const fieldClass =
  "w-full rounded-xl border bg-glass px-4 py-3 text-[0.9375rem] text-fg transition-all duration-300 placeholder:text-fg-faint";

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

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

    /* Compose the message and hand it straight to the visitor's mail client.
       Same details, one step further along — and nothing here claims to have
       delivered it. */
    const field = (k: string) => String(data.get(k) ?? "").trim();
    const lines = [
      `Name: ${field("name")}`,
      `Email: ${field("email")}`,
      field("company") && `Company: ${field("company")}`,
      field("service") && `Service: ${field("service")}`,
      "",
      field("message"),
    ].filter(Boolean);

    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(`Project enquiry — ${field("name")}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    setStatus("sent");
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
          Almost there — send it from your email client.
        </h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">
          We have opened your email app with the message ready to go. Press send
          there and it reaches us. If nothing opened, write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline underline-offset-4 hover:text-accent-strong"
          >
            {site.email}
          </a>{" "}
          instead.
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
          <select
            id="service"
            name="service"
            defaultValue="Not sure yet"
            className={cn(fieldClass, fieldRest)}
          >
            {contactReasons.map((r) => (
              <option key={r} value={r} className="bg-surface">
                {r}
              </option>
            ))}
          </select>
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
        <Button type="submit" size="lg" withArrow>
          Send message
        </Button>
      </div>
    </form>
  );
}
