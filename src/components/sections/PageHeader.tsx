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
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header className={cn("relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20", className)}>
      <div className="shell relative">
        {crumbs && (
          <Reveal>
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

        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          {eyebrow && (
            <Reveal>
              <span className={cn("eyebrow", centered && "justify-center")}>{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(2.25rem,5.6vw,4rem)] text-fg">{title}</h1>
          </Reveal>
          {intro && (
            <Reveal delay={160}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
                {intro}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={240}>{children}</Reveal>}
        </div>
      </div>
    </header>
  );
}
