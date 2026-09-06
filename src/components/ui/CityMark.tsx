import type { CSSProperties } from "react";

/*
 * City silhouettes for the footer's location row.
 *
 * Keyed by country, not by city, and that is the point: the label beside each
 * one reads AUSTRALIA, UNITED STATES, SINGAPORE. A drawing under a country
 * name works the way a flag does — it says which country, not which street.
 * That matters here, because only the Australian address is a physical
 * operating location; the other two are mailing addresses, and nothing in this
 * row may imply otherwise (see the note on `offices` in src/lib/site.ts).
 *
 * Rendered as a CSS mask over `bg-current`, not as an <img>.
 *
 * The artwork arrives as a white silhouette on black. Converted so that its
 * luminance becomes the alpha channel, the file carries the shape and nothing
 * else — and a mask takes its colour from the element, so one file is white on
 * the navy footer and navy on the light one. An <img> could not do that: it
 * would be a fixed white picture, invisible against the light theme, and would
 * have needed a second file and a second download to cover both.
 */

const SKYLINES: Record<string, string> = {
  AU: "/images/skyline-au.webp",
  US: "/images/skyline-us.webp",
  SG: "/images/skyline-sg.webp",
};

export function CityMark({ countryCode, className }: { countryCode: string; className?: string }) {
  const src = SKYLINES[countryCode];
  /* A country with no artwork renders nothing, rather than an empty box. */
  if (!src) return null;

  /* Prefixed as well as standard: `mask-image` is unprefixed in current
     Chrome, Firefox and Safari, but the -webkit- form is what older WebKit
     still reads, and the cost of carrying both is four extra declarations. */
  const mask: CSSProperties = {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "left bottom",
    maskPosition: "left bottom",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return <span aria-hidden="true" className={className} style={mask} />;
}
