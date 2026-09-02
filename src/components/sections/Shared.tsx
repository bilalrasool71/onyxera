import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Hammer,
  LifeBuoy,
  PhoneCall,
  Rocket,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import type { CaseStudy } from "@/lib/data/case-studies";
import { clients } from "@/lib/data/agency";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Client logos                                                        */
/* ------------------------------------------------------------------ */

/**
 * Client logos — a single scrolling row.
 *
 * Each item stacks the mark over the client's name, so an unfamiliar logo still
 * reads and the two are unambiguously one unit.
 *
 * `Marquee` renders the children twice and translates the track by exactly
 * -50%, so the loop is seamless *in motion* whatever the widths. What the
 * widths decide is whether the join between the two copies is ever inside the
 * viewport — if one copy is narrower than the screen, the window always spans a
 * copy boundary and the same client is visible twice at once. Stacking the name
 * under the mark makes each item narrower than the old side-by-side pairing
 * did, so the width is pinned rather than left to the longest client name:
 *
 *     item pitch = clamp(9rem,15vw,26rem) + 2 × clamp(0.75rem,1.9vw,3rem)
 *     one copy   = 8 clients × pitch
 *
 *       viewport   pitch    copy     copy > viewport
 *        375px     168px   1344px    yes
 *        768px     172px   1374px    yes
 *       1280px     238px   1904px    yes
 *       1920px     357px   2856px    yes
 *       2560px     476px   3808px    yes
 *       3840px     512px   4096px    yes
 *
 * The `vw` term is what keeps that true as the screen grows: a fixed width
 * would hold only up to some particular monitor. Both are literal class strings
 * — an interpolated one would emit no rule at all.
 */
export function ClientLogos({
  label = "Trusted by teams at",
}: {
  label?: string;
}) {
  return (
    <section className="band-accent relative overflow-hidden py-12 md:py-16">
      <div className="shell">
        <p className="mb-10 text-center font-label text-[0.75rem] font-semibold tracking-[0.22em] text-white uppercase">
          {label}
        </p>
      </div>

      <Marquee duration="72s">
        {clients.map((c) => (
          <span
            key={c.name}
            className="mx-[clamp(0.75rem,1.9vw,3rem)] flex w-[clamp(9rem,15vw,26rem)] shrink-0 flex-col items-center gap-4 md:gap-5"
          >
            {/* Each mark is square and fills its tile edge to edge, so the
                logo's own background becomes the tile — no mismatched inner
                border where artwork is grey or yellow rather than white. */}
            <span className="block size-[clamp(4.5rem,7.5vw,9rem)] shrink-0 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-white/25">
              <img
                src={c.logo}
                alt=""
                width={250}
                height={250}
                loading="lazy"
                decoding="async"
                className="size-full object-contain"
              />
            </span>
            {/* The name is the label here, so the image is decorative and
                carries an empty alt — otherwise both get announced.

                A fixed two-line box rather than `whitespace-nowrap`: the item is
                now only as wide as the tile needs, and "Department of Education
                SA" has to wrap somewhere. Holding the box height constant keeps
                every tile on one line across the row whether its name wraps or
                not. */}
            <span className="line-clamp-2 h-12 w-full text-center font-display text-sm leading-snug text-white md:text-base">
              {c.name}
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Metric strip                                                        */
/* ------------------------------------------------------------------ */

export function MetricStrip({
  metrics,
  className,
}: {
  metrics: { value: string; label: string }[];
  className?: string;
}) {
  /* Kept mutually exclusive — two competing `sm:grid-cols-*` utilities would
     be resolved by stylesheet order rather than by class order. */
  const columns =
    metrics.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";

  return (
    <dl className={cn("grid gap-4", columns, className)}>
      {metrics.map((m, i) => (
        <Reveal key={m.label} delay={i * 90} className="h-full">
          {/* `.card-stat`, not `.card`: the default surface is 1.11:1 against
              the dark ground and 1.03:1 against the light one, so the figures
              floated with no panel behind them. `.card-stat` is the brand-tinted
              glass with a blue edge, and it stands alone — the two are mutually
              exclusive rather than one overriding the other, which matters
              because `cn()` is a plain join with no tailwind-merge. It leaves
              `transform` alone, so `.card-hover` still supplies the lift. */}
          <div className="card-stat card-hover group h-full px-6 py-8 text-center md:px-7 md:py-10">
            <span
              aria-hidden="true"
              className="accent-line absolute inset-x-8 top-0 h-px"
            />
            <dt className="sr-only">{m.label}</dt>
            <dd>
              {/* Plain `--fg`, not `.accent-text`. The accent ramp bottoms out
                  at #3e68a1, which is 2.06:1 on the new stat surface — under
                  even the 3:1 floor large text gets. The card now carries the
                  brand colour and the figure carries the contrast: 11.67:1 in
                  dark, 14.29:1 in light. */}
              <Counter
                value={m.value}
                className="block font-display text-[2.125rem] leading-none font-semibold tracking-tight text-fg tabular-nums md:text-[2.625rem]"
              />
              <span className="mt-3 block text-sm leading-snug text-fg-muted">
                {m.label}
              </span>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered process                                                    */
/* ------------------------------------------------------------------ */

/* Process steps take a generic phase icon by position: the shape of an
   engagement is always talk → plan → build → ship → support, whatever the
   discipline, and `service.process` carries no icon of its own. */
const PHASE_ICONS = [PhoneCall, ClipboardList, Hammer, Rocket, LifeBuoy, Check];

export function ProcessSteps({
  steps,
}: {
  steps: { title: string; body: string; duration: string }[];
}) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, i) => {
        const Icon = PHASE_ICONS[Math.min(i, PHASE_ICONS.length - 1)];
        const last = i === steps.length - 1;

        return (
          <Reveal key={step.title} delay={i * 90} as="li" className="h-full">
            {/* `.card-brand` is now the brand ramp (#3573b6 → #2a5f9e), where
                white body type runs 4.91:1 at the light end and 6.50:1 at the
                dark one. The inner chips have to be measured *on top of* that,
                though, and they were lightening it: white over `bg-white/10`
                lands on #4981bd, which is 4.07:1 — fine for the icon as a
                graphic, but a fail for the duration label, which is text. They
                darken the surface now instead of lightening it, so both sit at
                6.69:1 at the card's lightest corner and 8.35:1 at its darkest. */}
            <div className="card-brand group relative flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-xl border border-white/30 bg-navy-900/25 text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                  <Icon className="size-5" strokeWidth={1.7} />
                </span>
                <span className="rounded-full border border-white/30 bg-navy-900/25 px-3 py-1 font-label text-[0.625rem] tracking-wide text-white">
                  {step.duration}
                </span>
              </div>

              {/* The step number is the point of a numbered list — it reads as
                  a figure now rather than a watermark. */}
              <span className="mt-6 block font-display text-4xl leading-none text-white tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 font-display text-lg text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-50">{step.body}</p>

              {/* Forward connector: horizontal between columns on xl, vertical
                  between stacked rows below it. Decorative only — the <ol>
                  already carries the ordering for assistive tech. */}
              {!last && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-5 hidden w-5 items-center xl:flex"
                  >
                    <span className="h-px flex-1 bg-accent/50" />
                    <ChevronRight className="-ml-1 size-4 shrink-0 text-accent" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-5 left-1/2 flex h-5 -translate-x-1/2 flex-col items-center xl:hidden"
                  >
                    <span className="w-px flex-1 bg-accent/50" />
                    <ChevronDown className="-mt-1 size-4 shrink-0 text-accent" />
                  </span>
                </>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

/* `TestimonialsSection` lived here and was imported by nothing. It also
   destructured `const [lead, ...rest] = testimonials` and handed `lead`
   straight to `TestimonialCard`, so an empty array — which is what every
   service now carries — would have rendered `undefined.quote`. Deleted rather
   than repaired; `TestimonialCard` itself is still used by work/[slug]. */

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function FaqSection({
  faqs,
  title = "Questions we get asked",
  intro,
  eyebrow = "FAQ",
}: {
  faqs: { q: string; a: string }[];
  title?: ReactNode;
  intro?: string;
  eyebrow?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(1.876rem,3.6vw,2.75rem)] text-fg">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 text-fg-muted">
              {intro ??
                "If something is not answered here, ask us directly — you will get a straight answer rather than a sales call."}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <a
              href={`mailto:${site.email}`}
              className="mt-7 inline-flex items-center gap-2 font-display text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              {site.email}
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={100}>
          {/* D4 — the open row reads as brand blue, closed rows stay neutral.
              `Accordion` owns the open/closed state and lives in a file this
              change does not touch, so the styling is driven from here through
              the one hook it exposes: its root `className`. `:has()` picks the
              row whose button is `aria-expanded="true"`, which is the same
              signal assistive tech uses, so the two can never drift apart.

              Every selector below out-specifies what it overrides — `.card` and
              the inline `text-*` utilities are all (0,1,0), these are (0,2,2)
              or higher — so none of it depends on stylesheet order, which is
              the only thing `cn()` would resolve by.

              White on `--brand-surface` is 4.91:1 and the answer copy 4.91:1;
              the plus glyph sits on a darkened chip at 6.69:1.

              If the open state ever moves into `Accordion` itself, delete this
              block rather than leaving both in place. */}
          <Accordion
            items={faqs}
            className={cn(
              "[&>div:has(button[aria-expanded=true])]:border-brand-line",
              "[&>div:has(button[aria-expanded=true])]:bg-brand-surface",
              "[&>div:has(button[aria-expanded=true])]:bg-none",
              "[&>div:has(button[aria-expanded=true])]:shadow-brand",
              "[&_button[aria-expanded=true]>span:first-child]:text-white",
              "[&_button[aria-expanded=true]>span:last-child]:border-white/45",
              "[&_button[aria-expanded=true]>span:last-child]:bg-navy-900/25",
              "[&_button[aria-expanded=true]>span:last-child]:text-white",
              "[&>div:has(button[aria-expanded=true])_p]:text-white",
            )}
          />
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverables checklist                                              */
/* ------------------------------------------------------------------ */

export function DeliverablesList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 45} as="li">
          <span className="flex items-start gap-3">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-accent-icon/50 bg-blue-400/12">
              <Check className="size-3 text-accent" strokeWidth={2.5} />
            </span>
            <span className="text-[0.9375rem] text-fg-body">{item}</span>
          </span>
        </Reveal>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Case study card                                                     */
/* ------------------------------------------------------------------ */

export function CaseStudyCard({
  study,
  index = 0,
}: {
  study: CaseStudy;
  index?: number;
}) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <Link
        href={`/work/${study.slug}`}
        className="card card-hover card-glow group flex h-full flex-col overflow-hidden"
      >
        {/* abstract cover — no stock photography, just brand geometry */}
        <div
          className="cover-art relative aspect-16/10 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(140deg, ${study.cover.from} 0%, #0b0b0d 58%, ${study.cover.to}22 100%)`,
          }}
        >
          {/* A screenshot of the delivered work when we have one; the abstract
              tint underneath remains the fallback. */}
          {study.coverImage && (
            <img
              src={study.coverImage.src}
              alt={study.coverImage.alt}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          )}
          <div className="dot-bg absolute inset-0 opacity-40" />
          <span
            className="absolute -right-6 -bottom-10 font-display text-[11rem] leading-none text-white/6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            aria-hidden="true"
          >
            {study.cover.glyph}
          </span>
          {/* Sits over artwork we do not control, so it carries its own solid
              ground rather than relying on the image behind it being dark. */}
          <span className="absolute top-5 left-5 rounded-full border border-white/25 bg-navy-950/85 px-3 py-1.5 font-label text-[0.625rem] font-medium tracking-[0.14em] text-white uppercase backdrop-blur-sm">
            {study.serviceName}
          </span>
          <span className="absolute right-5 bottom-5 grid size-10 place-items-center rounded-full border border-white/15 bg-navy-900/60 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-blue-500 group-hover:text-navy-900">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          {/* Client and category are different kinds of fact, so they no
              longer share one flat uppercase run. Anonymised studies name the
              client by their industry ("Web & software client"), which made
              the category an exact echo — it is dropped when that happens. */}
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-sm font-semibold text-fg">
              {study.client}
            </span>
            {!study.client
              .toLowerCase()
              .replace(/client/g, "")
              .trim()
              .startsWith(study.industry.toLowerCase().slice(0, 12)) && (
              <span className="font-label text-[0.625rem] tracking-[0.14em] text-fg-faint uppercase">
                {study.industry}
              </span>
            )}
          </p>
          <h3 className="mt-3 font-display text-lg leading-snug font-medium text-fg transition-colors duration-200 group-hover:text-accent-strong">
            {study.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-subtle">
            {study.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5">
            {study.results.slice(0, 2).map((r) => (
              <span key={r.label}>
                <span className="block font-display text-xl font-semibold text-accent">
                  {r.value}
                </span>
                <span className="mt-0.5 block text-[0.6875rem] text-fg-faint">
                  {r.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA                                                         */
/* ------------------------------------------------------------------ */

export function CtaBand({
  eyebrow = "Next step",
  title,
  intro,
  primaryLabel = "Start a project",
  secondaryHref = "/services",
  secondaryLabel = "See what we build",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <div className="card relative overflow-hidden px-7 py-16 text-center md:px-16 md:py-24">
            <div className="dot-bg pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow eyebrow-plain justify-center">{eyebrow}</span>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] text-fg">
                {title ?? (
                  <>
                    Let&rsquo;s build the thing
                    <span className="accent-text"> properly</span>.
                  </>
                )}
              </h2>
              <p className="mt-6 text-base text-fg-muted md:text-lg">
                {intro ??
                  "Tell us what you are trying to solve. Thirty minutes, no pitch deck — and if we are not the right people, we will say so and point you somewhere better."}
              </p>

              {/* One blue, one white — the site-wide CTA pairing. The white
                  half is a real variant rather than a `className` override:
                  `cn()` is a plain join, so stacking `btn-white` on top of
                  `btn-secondary` would leave the latter's border and blur in
                  place and resolve the colours by stylesheet order. */}
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg" withArrow>
                  {primaryLabel}
                </ButtonLink>
                <ButtonLink href={secondaryHref} size="lg" variant="white">
                  {secondaryLabel}
                </ButtonLink>
              </div>

              {/* A response-time SLA — "under 4 business hours" — used to sit
                  here, on all 27 pages, with a second wording on the contact
                  form and a third in the server handler. Nothing on the site
                  supports the figure, so it is removed rather than restated. If
                  the business confirms a real number, define it once in
                  src/lib/site.ts and import it at both call sites. */}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
