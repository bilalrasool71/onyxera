import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /**
   * Play the entrance on page load instead of on scroll, driven entirely by
   * CSS.
   *
   * Set this on anything inside the first viewport. The scroll path parks its
   * content at `opacity: 0` in the server HTML and only clears it once the
   * bundle has downloaded, hydrated and the observer has fired — so a hero
   * heading was not merely un-animated before hydration, it was *invisible*,
   * and Chrome will not count an invisible element as the Largest Contentful
   * Paint. It pushed LCP out to hydration time plus the stagger plus the
   * 0.85s transition. Above the fold there is nothing to wait for anyway:
   * the element is on screen the moment the page is, so the animation can
   * start with the first frame and LCP lands with first paint.
   */
  immediate?: boolean;
};

/* NOTE: do not wrap the page's LCP element — its `h1` — in this at all, with
   or without `immediate`. Chromium's paint-timing detector skips an element
   that is animating when it is first painted, and it does not revisit it, so
   the heading is disqualified from being the Largest Contentful Paint and the
   metric falls to whatever paints next. Even a lift at full opacity does it:
   removing the one on the home page h1 moved mobile Performance from 80 to 92.
   Animate its siblings instead. */

/**
 * Fades and lifts content into view once.
 *
 * A server component: it renders a class and a custom property, nothing more.
 * The scroll watching lives in one place — `RevealObserver`, mounted once in
 * the root layout — rather than in each of these.
 *
 * That split matters more than it looks. This wraps nearly every element on
 * the site; the heaviest page mounts around 57 of them. As a client component
 * each one was its own hydration root and its own entry in the RSC payload,
 * all to ask the same question with the same options. One observer over a
 * `.reveal` selector answers all of them, and the wrapper costs nothing but
 * markup.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  immediate = false,
}: RevealProps) {
  return (
    <Tag
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn(
        immediate ? "reveal-now" : "reveal",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
