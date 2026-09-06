import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  visual,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Optional figure for the right half of the fold. Without it the header
      keeps its original single-column layout, so no existing page moves. */
  visual?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header className={cn("relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20", className)}>
      <div className="shell relative">
        {crumbs && (
          <Reveal immediate>
            <nav aria-label="Breadcrumb" className={cn("mb-8", centered && "flex justify-center")}>
              <ol className="flex flex-wrap items-center gap-1.5 font-label text-[0.6875rem] tracking-wide text-fg-faint">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3 text-fg-faint" />}
                    {c.href ? (
                      <Link
                        href={c.href}
                        className="transition-colors duration-300 hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-accent">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        {/* Two columns only when a figure was passed. A centred header has no
            right column to fill, so it keeps the stacked path either way. */}
        <div
          className={cn(
            visual && !centered
              ? "grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16"
              : "contents",
          )}
        >
        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          {eyebrow && (
            <Reveal immediate>
              <span className={cn("eyebrow", centered && "justify-center")}>{eyebrow}</span>
            </Reveal>
          )}
          {/* Not wrapped in `Reveal` — see the note on the home page's h1.
              This is the LCP element on every page that uses this header, and
              an entrance animation on it disqualifies it from being credited
              at first paint. */}
          <h1 className="mt-5 text-[clamp(2.25rem,5.6vw,4rem)] text-fg">{title}</h1>
          {intro && (
            <Reveal delay={160} immediate>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
                {intro}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={240} immediate>{children}</Reveal>}
        </div>

        {visual && !centered && (
          <Reveal delay={200} immediate className="hidden lg:block">
            {visual}
          </Reveal>
        )}
        </div>
      </div>
    </header>
  );
}
