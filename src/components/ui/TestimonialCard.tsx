import { Stars } from "@/components/ui/Stars";
import type { Testimonial } from "@/lib/data/services";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  t,
  className,
  featured = false,
  tag,
}: {
  t: Testimonial;
  className?: string;
  featured?: boolean;
  /** Optional service label, used on pages that mix quotes from every discipline. */
  tag?: string;
}) {
  return (
    /* Brief: "Testimonials colors should be changed white" — white in BOTH
       themes, opened by gold stars instead of the quote glyph, so the site has
       one testimonial treatment rather than two. Colours come from the
       --quote-* tokens in globals.css, shared with ClientStorySlider. */
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg p-7 shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-8",
        featured && "md:p-10",
        className,
      )}
      style={{ backgroundColor: "var(--quote-surface)" }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <Stars className="shrink-0" />
        {tag && (
          <span
            className="rounded-full border px-3 py-1 font-label text-[0.5625rem] tracking-[0.14em] uppercase"
            style={{ borderColor: "var(--quote-line)", color: "var(--quote-meta)" }}
          >
            {tag}
          </span>
        )}
      </div>

      <blockquote
        className={cn(
          "flex-1",
          featured
            ? "font-display text-xl leading-[1.45] font-normal tracking-[-0.02em] md:text-2xl"
            : "text-[0.9375rem] leading-relaxed",
        )}
        style={{ color: featured ? "var(--quote-fg)" : "var(--quote-body)" }}
      >
        {t.quote}
      </blockquote>

      {t.metric && (
        <div
          className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5"
          style={{ borderColor: "var(--quote-line)" }}
        >
          <span className="size-1.5 rounded-full" style={{ backgroundColor: "var(--quote-meta)" }} />
          <span
            className="font-label text-[0.6875rem] tracking-wide"
            style={{ color: "var(--quote-meta)" }}
          >
            {t.metric}
          </span>
        </div>
      )}

      <figcaption
        className="mt-7 flex items-center gap-3.5 border-t pt-6"
        style={{ borderColor: "var(--quote-line)" }}
      >
        {/* No real portraits exist for these people, so the initials disc
            stays. It is flat brand blue now rather than the old gold gradient:
            gold is reserved for the stars, and the gradient is gone site-wide. */}
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-200 font-display text-xs font-semibold tracking-wide text-navy-900"
          aria-hidden="true"
        >
          {t.initials}
        </span>
        <span className="min-w-0">
          <span
            className="block truncate font-display text-sm font-medium"
            style={{ color: "var(--quote-fg)" }}
          >
            {t.name}
          </span>
          <span className="block truncate text-[0.8125rem]" style={{ color: "var(--quote-body)" }}>
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
