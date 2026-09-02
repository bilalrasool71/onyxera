"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating scroll-to-top control.
 *
 * The ring around it is the page's read position, so the button reports
 * progress as well as offering the action — on a long case study or legal page
 * that is genuinely useful, and it earns the pixels it occupies.
 *
 * It appears only once there is something to scroll back from, and it eases the
 * scroll here rather than through a global `scroll-behavior: smooth`, which
 * fought Next's route-change scroll and left readers part-way down a new page.
 */
export function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      /* Roughly one viewport down — far enough that returning to the top is a
         real journey, not a nudge. */
      setShown(y > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  /* r=17 in a 40x40 box: circumference 2*pi*17 = 106.8. */
  const CIRC = 106.8;

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      /* Hidden from the tab order until it is on screen, so it never becomes a
         focus stop pointing at something the reader cannot see. */
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={
        shown
          ? "group fixed right-5 bottom-5 z-40 grid size-12 translate-y-0 place-items-center rounded-full border border-line-strong bg-bg/90 text-fg-body opacity-100 shadow-lifted backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent-icon/60 hover:text-accent md:right-8 md:bottom-8"
          : "pointer-events-none group fixed right-5 bottom-5 z-40 grid size-12 translate-y-3 place-items-center rounded-full border border-line-strong bg-bg/90 text-fg-body opacity-0 shadow-lifted backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:right-8 md:bottom-8"
      }
    >
      {/* Progress ring. -rotate-90 puts zero at twelve o'clock. */}
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full -rotate-90"
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="var(--line)"
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <ArrowUp
        className="relative size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </button>
  );
}
