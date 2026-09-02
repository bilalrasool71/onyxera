import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless CSS marquee. The children are rendered twice and the track is
 * translated by exactly -50%, so the loop has no visible seam.
 */
export function Marquee({
  children,
  className,
  duration = "42s",
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("fade-x group relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-[marquee_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{
          ["--dur" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
