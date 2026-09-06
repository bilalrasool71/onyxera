import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/* Three display tiers, each spelled out in full. Tailwind v4 reads this file as
   static text, so the clamp must never be built by interpolation; the three are
   mutually exclusive, so `cn()` — a plain join with no merge — never has to
   resolve a conflict between them.

   `md` is the section-h2 default and is unchanged. `lg` is the display step
   ServicesGrid currently reaches in for with `[&_h2]:`; `sm` is the sub-h2 tier
   used inside long pages. All three were lifted from existing call sites rather
   than picked fresh, except that `sm` floors at Tailwind's --text-3xl
   (1.875rem) instead of the 1.876rem that had drifted into two of them. */
const SIZES = {
  sm: "text-[clamp(1.875rem,3.8vw,2.75rem)]",
  md: "text-[clamp(2rem,4.4vw,3.25rem)]",
  lg: "text-[clamp(2.35rem,5vw,3.85rem)]",
} as const;

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Display tier for the heading. */
  size?: keyof typeof SIZES;
  /** Sits to the right of the heading on wide screens — usually a link or button. */
  action?: ReactNode;
  /**
   * Lets the supporting line run the full width of the section instead of
   * stopping at the 42rem measure the heading uses. For one-line intros that
   * would otherwise break in half under a two-line title. The title itself
   * keeps its measure either way, so the heading wrap does not move.
   */
  introWide?: boolean;
  /**
   * `split` moves the intro and the action into a right-hand column beside the
   * title instead of stacking them under it. Use it on wide sections whose
   * heading otherwise leaves the whole top-right corner of the band empty.
   * Everything else stays `stacked`, which is the original layout.
   */
  layout?: "stacked" | "split";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  size = "md",
  action,
  introWide = false,
  layout = "stacked",
}: Props) {
  const centered = align === "center";

  /* Two real columns, bottom-aligned: the title holds the left, the supporting
     copy and the action hold the right. A centred heading has no right column
     to fill, so it keeps the stacked path. */
  if (layout === "split" && !centered) {
    return (
      <div className={cn("grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16", className)}>
        <div>
          {eyebrow && (
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h2 className={cn("mt-5 text-fg", SIZES[size])}>{title}</h2>
          </Reveal>
        </div>

        <div>
          {intro && (
            <Reveal delay={160}>
              <p className="text-base leading-relaxed text-fg-muted md:text-lg">{intro}</p>
            </Reveal>
          )}
          {action && (
            <Reveal delay={220} className={cn(intro && "mt-7 block")}>
              {action}
            </Reveal>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        action && !centered && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      {/* The 42rem measure used to sit on this wrapper, which meant the intro
          could never be wider than the title. It is now carried by the title and
          the intro separately — same result for every existing call site, but
          `introWide` can now release the intro alone.

          Both widths are written as mutually exclusive ternaries: cn() is a
          plain join with no tailwind-merge, so `cn("max-w-2xl","max-w-none")`
          would be settled by stylesheet order rather than argument order. */}
      <div className={cn(centered && "text-center")}>
        {eyebrow && (
          <Reveal>
            <span className={cn("eyebrow", centered && "justify-center")}>{eyebrow}</span>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2 className={cn("mt-5 max-w-2xl text-fg", SIZES[size], centered && "mx-auto")}>
            {title}
          </h2>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p
              className={cn(
                "mt-5 text-base leading-relaxed text-fg-muted md:text-lg",
                introWide ? "max-w-none" : "max-w-2xl",
                centered && "mx-auto",
              )}
            >
              {intro}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={220} className={cn(centered && "mx-auto")}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
