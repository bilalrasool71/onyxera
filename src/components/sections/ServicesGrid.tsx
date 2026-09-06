import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { services, type Service } from "@/lib/data/services";
import { cn, numberWord } from "@/lib/utils";

/**
 * `wide` carries the summary; `compact` drops it once a cell is actually narrow
 * (lg and up) and keeps it below that. The services mosaic no longer builds a
 * narrow cell — every tile is the same size — but the variant stays for reuse.
 */
type Variant = "wide" | "compact";

/**
 * One uniform tile per service.
 *
 * The feature cell used to run `lg:row-span-2`: double the height of its
 * neighbours carrying the same three lines of copy, so the bottom half of the
 * card was dead whitespace. Every cell now spans two columns of a 4/6-column
 * track and exactly one row, with `auto-rows-fr` holding all rows to a single
 * height — same width, same height, everywhere.
 *
 *   md (4 cols)   [0][1] / [2][3] / [ 4 ]
 *   lg (6 cols)   [0][1][2] / [  3  ][  4  ]
 *
 * On lg the last two tiles span THREE columns each, not two. As span-2 pushed
 * in with `lg:col-start-2` they were narrower than the three above them and
 * floated in the middle of the band with dead track either side. At half the
 * track each, the short final row is exactly as wide as the full row above it
 * and the grid squares off.
 *
 * Every class here is a literal: Tailwind scans source as text, so an index may
 * *pick* a class but never build one.
 */
const cellSpan = [
  "md:col-span-2 lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
  "md:col-span-2 lg:col-span-3",
  "md:col-span-2 lg:col-span-3",
];

const cellOffset = [
  "",
  "",
  "",
  "",
  /* md only: that row holds one tile, so centre it — then hand it back to the
     flow at lg, where it is half of a full-width pair. */
  "md:col-start-2 lg:col-start-auto",
];

export function ServiceCard({
  service,
  index = 0,
  variant = "wide",
  className,
}: {
  service: Service;
  index?: number;
  variant?: Variant;
  className?: string;
}) {
  const Icon = service.icon;
  const isCompact = variant === "compact";

  return (
    <Reveal delay={index * 70} className={cn("h-full", className)}>
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "card card-hover card-glow group flex h-full flex-col",
          isCompact ? "p-6" : "p-7 md:p-8",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "grid place-items-center rounded-xl border border-line-strong bg-glass text-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-accent-icon/50 group-hover:bg-blue-400/12",
              isCompact ? "size-11" : "size-12",
            )}
          >
            <Icon className={isCompact ? "size-4.5" : "size-5"} strokeWidth={1.6} />
          </span>
          <span className="font-label text-[0.625rem] tracking-[0.2em] text-fg-faint transition-colors duration-300 group-hover:text-accent-quiet">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Three tiers, in the order the brief asks for: name white, tagline
            brand blue, summary white again. `--fg` and `--fg-body` are white on
            the dark ground and navy on the light one, so this is one class per
            tier and no `dark:` variant anywhere. */}
        <h3
          className={cn(
            "font-display text-fg transition-colors duration-200 group-hover:text-accent-strong",
            isCompact ? "mt-6 text-lg" : "mt-7 text-xl",
          )}
        >
          {service.navLabel}
        </h3>
        <p className="mt-1.5 font-label text-[0.6875rem] tracking-wide text-accent-icon">
          {service.tagline}
        </p>

        {/* `flex-1` lets the summary absorb the slack in a taller row, which
            keeps the link below pinned to the bottom of every card. */}
        <p
          className={cn(
            "mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg-body",
            isCompact && "lg:hidden",
          )}
        >
          {service.summary}
        </p>

        <span
          className={cn(
            "flex items-center gap-2 font-display text-sm text-fg transition-colors duration-200 group-hover:text-accent",
            isCompact ? "mt-6" : "mt-7",
          )}
        >
          {isCompact ? "Explore" : "Explore service"}
          <ArrowUpRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * The section's own compare link, written out rather than reusing `TextLink`.
 * `TextLink` paints itself `text-accent`, and `cn()` is a plain join with no
 * tailwind-merge — a `text-fg` passed through `className` would land in the
 * same layer and lose or win on stylesheet order, not argument order. Mutually
 * exclusive markup is the reliable way to make this one white.
 */
function CompareServicesLink() {
  return (
    <Link
      href="/services"
      className="group inline-flex items-center gap-2 font-display text-sm font-medium text-fg transition-colors duration-300 hover:text-accent-strong"
    >
      <span className="relative">
        Compare all services
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
      </span>
      <ArrowRight className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
    </Link>
  );
}

export function ServicesGrid({
  className,
  withHeading = true,
}: {
  className?: string;
  withHeading?: boolean;
}) {
  return (
    <section className={cn("section", className)} id="services">
      <div className="shell">
        {withHeading && (
          /* The display tier is set inside SectionHeading, so the step up runs
             through descendant selectors: `[&_h2]` is (0,1,1) against the
             component's own (0,1,0) class and wins on specificity rather than
             on order, which `cn()` cannot promise. */
          <SectionHeading
            /* Split, so the supporting line and the compare link occupy the
               right half instead of leaving the top-right of the band empty. */
            layout="split"
            className="[&_.eyebrow]:text-[0.8125rem] [&_h2]:text-[clamp(2.35rem,5vw,3.85rem)]"
            eyebrow="What we do"
            title={
              <>
                Five disciplines that
                <span className="accent-text"> stop working against each other</span>.
              </>
            }
            intro="Most companies buy these services from separate vendors and spend their own time making them agree. We run them as one practice, so the site the designers build is the site the SEO team optimised and the marketers send traffic to."
            action={<CompareServicesLink />}
          />
        )}

        <div className="mt-14 grid gap-4 md:auto-rows-fr md:grid-cols-4 lg:grid-cols-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.slug}
              service={s}
              index={i}
              className={cn(cellSpan[i], cellOffset[i])}
            />
          ))}
        </div>

        {/* Closes the section rather than leaving the grid to trail off. */}
        <Reveal delay={160}>
          <div className="card mt-4 flex flex-col items-start gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <p className="font-display text-lg text-fg md:text-xl">
                Not sure which one you need?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-subtle">
                Describe the problem rather than the service. We will tell you
                which discipline solves it, or that none of them do.
              </p>
            </div>
            {/* One blue, one white. */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/contact" withArrow>
                Book an intro call
              </ButtonLink>
              <ButtonLink href="/services" variant="white">
                Compare all {numberWord(services.length)}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
