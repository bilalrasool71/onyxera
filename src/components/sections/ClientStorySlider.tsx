"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { clientStories } from "@/lib/data/agency";
import { cn } from "@/lib/utils";

const INTERVAL = 6000;

/**
 * The client's own words about their own projects. Looping carousel; the loop
 * wraps the index rather than cloning slides, so the DOM stays honest for
 * assistive tech and every quote is in the HTML for crawlers.
 *
 * Data is imported rather than passed in — this is a client component, and
 * keeping the import here avoids threading it through a server boundary.
 */
export function ClientStorySlider({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);
  /* Kept apart from `paused`: that one is the transient hover/focus pause, this
     one is the reader's own decision and has to survive the pointer leaving.
     WCAG 2.2.2 wants a mechanism a touch user can actually reach. */
  const [stopped, setStopped] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  useEffect(() => {
    setCanAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const pages = Math.max(1, clientStories.length - perView + 1);
  const clamped = Math.min(index, pages - 1);

  const go = useCallback(
    (next: number) => setIndex(((next % pages) + pages) % pages),
    [pages],
  );

  useEffect(() => {
    if (!canAutoplay || paused || stopped || pages < 2) return;
    /* setInterval rather than rAF: it is throttled in a hidden tab but not
       paused, so the carousel resumes cleanly when the tab comes back. */
    const id = setInterval(() => setIndex((i) => (i + 1) % pages), INTERVAL);
    return () => clearInterval(id);
  }, [canAutoplay, paused, stopped, pages]);

  /* Only offered once autoplay is genuinely running: `canAutoplay` is false
     until the reduced-motion check has run on the client, and a single page
     never moves, so a pause control there would be a button that does nothing. */
  const showPlayPause = canAutoplay && pages > 1;

  return (
    <div
      className={cn("relative", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(clamped + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(clamped - 1);
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${clamped * (100 / perView)}%)` }}
        >
          {clientStories.map((s, i) => {
            const visible = i >= clamped && i < clamped + perView;
            return (
              <div
                key={s.client}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${clientStories.length}`}
                aria-hidden={!visible}
              >
                <figure className="card card-hover card-glow flex h-full flex-col p-7 md:p-8">
                  <Quote
                    aria-hidden="true"
                    className="size-7 shrink-0 text-accent-quiet"
                    strokeWidth={1.6}
                  />
                  <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-fg-body">
                    {s.quote}
                  </blockquote>
                  <figcaption className="mt-7 border-t border-line pt-5">
                    <span className="block font-display text-base text-fg">
                      {s.client}
                    </span>
                    <span className="mt-1.5 block font-label text-[0.6875rem] tracking-wide text-accent-icon">
                      {s.project}
                    </span>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(clamped - 1)}
          aria-label="Previous projects"
          className="grid size-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 hover:border-accent-icon/60 hover:text-accent"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* The dot is still 6px, but the button around it is not: `p-2.5` makes
            each target 26x26, clearing the 24px WCAG 2.5.8 floor, and the row
            drops its gap so the dots do not drift apart to compensate. The
            inactive fill moves off `--line-strong` (1.76:1 dark / 1.45:1 light
            on the ground — under the 3:1 that 1.4.11 asks of the only
            indicator of carousel position) onto `--fg-faint`, 8.52:1 / 4.75:1. */}
        <div className="flex items-center">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === clamped}
              className="group grid place-items-center rounded-full p-2.5"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i === clamped
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-fg-faint group-hover:bg-accent-quiet",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(clamped + 1)}
          aria-label="Next projects"
          className="grid size-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 hover:border-accent-icon/60 hover:text-accent"
        >
          <ChevronRight className="size-4" />
        </button>

        {showPlayPause && (
          <button
            type="button"
            onClick={() => {
              const next = !stopped;
              setStopped(next);
              /* The pointer is still over the carousel and the button still has
                 focus, so neither the mouseleave nor the blur that would clear
                 the transient pause is coming. Without this, pressing play
                 looks like it does nothing. */
              if (!next) setPaused(false);
            }}
            aria-label={stopped ? "Play the carousel" : "Pause the carousel"}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 hover:border-accent-icon/60 hover:text-accent"
          >
            {stopped ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
