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
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  size = "md",
  action,
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        action && !centered && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow && (
          <Reveal>
            <span className={cn("eyebrow", centered && "justify-center")}>{eyebrow}</span>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2 className={cn("mt-5 text-fg", SIZES[size])}>{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">{intro}</p>
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
