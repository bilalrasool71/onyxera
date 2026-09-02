import { cn } from "@/lib/utils";

/*
 * The mark, redrawn as vector from the brand artwork:
 *
 *   · an open ring
 *   · a bold geometric X inside it
 *   · a blue growth arrow sweeping up from the lower left and breaking
 *     out through the upper right
 *
 * The ring and the X take `currentColor` so one file serves both lockups —
 * Deep Navy on the light ground, white on the navy one. The arrow stays brand
 * blue in both, as it does in the artwork. Used decoratively (404, hero,
 * mega-menu); the full lockup below is the real logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="presentation"
      aria-hidden="true"
      /* Sized by the caller. `cn` is a plain join with no tailwind-merge, so a
         default listed alongside the caller's class would be resolved by
         stylesheet order rather than yielding to it. */
      className={className || "h-10 w-10"}
    >
      {/* ring */}
      <circle
        cx="50"
        cy="50"
        r="33"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />

      {/* the X */}
      <g stroke="currentColor" strokeWidth="9.5" strokeLinecap="butt">
        <line x1="32" y1="30" x2="68" y2="70" />
        <line x1="68" y1="30" x2="32" y2="70" />
      </g>

      {/* growth arrow — tapered ribbon plus head, drawn over the X */}
      <g fill="var(--color-blue-400)">
        <path d="M10 85 C26 74 42 64 54 52 C62 44 69 36 74 30 L80 35 C74 42 67 50 58 59 C46 70 26 81 12 87 Z" />
        <path d="M86 16 L83 39 L64 26 Z" />
      </g>
    </svg>
  );
}

/* Sizes MUST be written out in full. Tailwind v4 scans source text statically,
   so a class built by interpolation — `h-[calc(2.5rem*${scale})]` — is never
   seen, no rule is emitted, and the image falls back to its intrinsic 530px
   width. Keep every class in this map a literal string. */
const SIZES = {
  sm: "h-7 w-auto",
  md: "h-9 w-auto sm:h-10",
  lg: "h-10 w-auto sm:h-11",
} as const;

type LogoProps = {
  className?: string;
  size?: keyof typeof SIZES;
};

/**
 * The supplied lockup, not a redraw. Both files are rendered and CSS shows the
 * one that suits the current palette — `logo-white` (navy artwork) on the light
 * ground, `logo-black` (white artwork) on the navy one. Doing it in CSS rather
 * than JS means the correct file is right on the very first paint.
 *
 * Both images are decorative; the accessible name comes from the `sr-only`
 * span, so exactly one name is announced whichever file is visible.
 */
export function Logo({ className, size = "md" }: LogoProps) {
  const h = SIZES[size];
  return (
    <span className={cn("inline-flex shrink-0 select-none items-center", className)}>
      <img
        src="/logo-black.png"
        alt=""
        width={530}
        height={128}
        className={cn("logo-on-dark", h)}
      />
      <img
        src="/logo-white.png"
        alt=""
        width={536}
        height={129}
        className={cn("logo-on-light", h)}
      />
      <span className="sr-only">OnyxEra Tech</span>
    </span>
  );
}
