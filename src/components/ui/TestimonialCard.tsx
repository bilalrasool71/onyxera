import { Quote } from "lucide-react";
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
    <figure
      className={cn(
        "card card-hover card-glow flex h-full flex-col p-7 md:p-8",
        featured && "md:p-10",
        className,
      )}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <Quote
          className={cn("size-7 shrink-0 text-accent-quiet", featured && "size-9")}
          strokeWidth={1.5}
        />
        {tag && (
          <span className="rounded-full border border-line-strong px-3 py-1 font-label text-[0.5625rem] tracking-[0.14em] text-fg-subtle uppercase">
            {tag}
          </span>
        )}
      </div>

      <blockquote
        className={cn(
          "flex-1 text-fg-body",
          featured
            ? "font-display text-xl leading-[1.45] font-normal tracking-[-0.02em] md:text-2xl"
            : "text-[0.9375rem] leading-relaxed",
        )}
      >
        {t.quote}
      </blockquote>

      {t.metric && (
        <div className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-accent-icon/50 bg-blue-400/12 px-3.5 py-1.5">
          <span className="size-1.5 rounded-full bg-blue-400" />
          <span className="font-label text-[0.6875rem] tracking-wide text-accent-strong">
            {t.metric}
          </span>
        </div>
      )}

      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
        <span
          /* Was a gold gradient — the only warm colour anywhere in a navy and
             blue palette, and it read as a mistake beside everything else.
             Rebased on the brand ramp; navy-900 type still clears AA on it. */
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-blue-300)_0%,var(--color-blue-100)_45%,var(--color-blue-200)_100%)] font-display text-xs font-semibold tracking-wide text-navy-900"
          aria-hidden="true"
        >
          {t.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-medium text-fg">
            {t.name}
          </span>
          <span className="block truncate text-[0.8125rem] text-fg-subtle">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
