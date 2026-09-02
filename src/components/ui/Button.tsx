import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "white";
type Size = "md" | "lg";

/* One class per variant, each spelled out in full: Tailwind reads this file as
   static text, and the classes are mutually exclusive so `cn()` — a plain join
   with no merge — never has to resolve a conflict. `white` is the other half of
   every CTA pair; its colours come from `--btn-white-fill` / `--btn-white-fg`
   in globals.css, which are defined in both themes, so no `dark:` is involved. */
const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  white: "btn-white",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn("btn group", variants[variant], size === "lg" && "btn-lg", className)}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
      )}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "btn group disabled:pointer-events-none disabled:opacity-55",
        variants[variant],
        size === "lg" && "btn-lg",
        className,
      )}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
      )}
    </button>
  );
}

/** Understated tertiary action — a blue underline that draws in on hover. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-display text-sm font-medium text-accent transition-colors duration-300 hover:text-accent-strong",
        className,
      )}
    >
      <span className="relative">
        {children}
        {/* The rule tracks `--accent`, the same token as the text above it.
            Literal `blue-400` held in both themes only by luck: `--accent`
            steps down to blue-700 on the light ground (see globals.css — the
            brand blue is 2.7:1 there), so a hard-coded underline washed out
            under much darker type. */}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
      </span>
      <ArrowRight className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
    </Link>
  );
}
