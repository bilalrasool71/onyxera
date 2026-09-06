"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { ProofShot } from "@/lib/data/case-studies";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * The measured evidence behind a case study: audit, performance and Search
 * Console screenshots, captioned with the figure each one carries.
 *
 * Two things drive the layout. The screenshots are dense dashboards, so they
 * are given real width — two per row at most, never a three-up thumbnail strip
 * nothing can be read in. And the caption sits *outside* the image rather than
 * over it, because the number in the shot is the point and it has to survive a
 * phone screen where the screenshot itself is barely legible.
 *
 * `before` is optional: growth engagements have no meaningful "was" to show, and
 * the section then renders as a single labelled group instead of a comparison.
 */
export function ProofGallery({
  before,
  after,
}: {
  before?: ProofShot[];
  after?: ProofShot[];
}) {
  /* One flat list drives the lightbox so the arrows walk the whole section,
     before into after, rather than dead-ending at the end of a group. */
  const all = [...(before ?? []), ...(after ?? [])];

  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + all.length) % all.length)),
    [all.length],
  );

  /* Escape and the arrow keys, page scroll locked, focus returned to whichever
     thumbnail opened the dialog. Same contract as CoverGallery. */
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      openerRef.current?.focus();
    };
  }, [open, step]);

  if (all.length === 0) return null;

  const groups = [
    { label: "Before", tone: "before" as const, shots: before ?? [] },
    { label: "After", tone: "after" as const, shots: after ?? [] },
  ].filter((g) => g.shots.length > 0);

  const shot = open === null ? null : all[open];

  return (
    <>
      <div className="mt-14 space-y-14">
        {groups.map((group) => (
          <div key={group.label}>
            {/* The group label only earns its keep when there are two groups to
                tell apart; a lone "After" heading above the only set on the page
                is noise. */}
            {groups.length > 1 && (
              <Reveal>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 font-label text-[0.6875rem] tracking-[0.16em] uppercase",
                      group.tone === "before"
                        ? "border-line-strong text-fg-faint"
                        : "border-accent-icon/50 bg-blue-400/12 text-accent-strong",
                    )}
                  >
                    {group.label}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>
              </Reveal>
            )}

            {/* Flex-wrap with a centred last row, not a grid. A group can hold
                any count — three, five, six — and in a two-column grid an odd
                one hugs the left edge and leaves a card-sized hole beside it.
                Wrapping centres the short row instead, so the block closes
                cleanly whatever the count. */}
            <div
              className={cn(
                "flex flex-wrap justify-center gap-5",
                groups.length > 1 && "mt-8",
              )}
            >
              {group.shots.map((s, i) => {
                const index = all.indexOf(s);
                /* An odd group leaves one card over. Rather than centre it at
                   half width with air either side, it takes the whole row — a
                   dashboard screenshot is only ever more readable wider. A
                   portrait shot is the exception: full width would blow a phone
                   screenshot up to nothing but letterboxing. */
                const isLoneLast =
                  i === group.shots.length - 1 &&
                  group.shots.length % 2 === 1 &&
                  !s.portrait;
                return (
                  <Reveal
                    key={s.src}
                    delay={i * 70}
                    className={
                      isLoneLast ? "w-full" : "w-full sm:w-[calc(50%-0.625rem)]"
                    }
                  >
                    <figure className="card card-hover group flex h-full flex-col overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          openerRef.current = null;
                          setOpen(index);
                        }}
                        aria-label={`Enlarge: ${s.caption}`}
                        className="relative block w-full cursor-zoom-in border-b border-line bg-white"
                      >
                        {/* `object-contain`, never `cover`. These are evidence:
                            a 2.6:1 landing page or a portrait phone shot pushed
                            into a 16/10 cover box loses whichever edge does not
                            fit, and on the widest ones that took the headline
                            off the left of the frame. Contained, the whole shot
                            is visible and the box letterboxes instead. */}
                        <img
                          src={s.src}
                          alt={s.alt}
                          width={1600}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className={cn(
                            "w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]",
                            /* A full-width card at 16/10 would stand 750px
                               tall and swallow the row below it, so the wide
                               one gets a wide box. */
                            isLoneLast ? "aspect-21/9" : "aspect-16/10",
                            "object-contain object-center p-3",
                          )}
                        />
                        <span className="pointer-events-none absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-navy-900/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <ZoomIn className="size-4" strokeWidth={1.8} />
                        </span>
                      </button>

                      <figcaption className="flex flex-1 flex-col p-6">
                        <span className="font-label text-[0.625rem] tracking-[0.18em] text-accent-icon uppercase">
                          {s.source}
                        </span>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-body">
                          {s.caption}
                        </p>
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Portalled to <body>: `.card-hover` puts a transform on the card, and a
          transformed ancestor becomes the containing block for position: fixed,
          which would trap the dialog inside the card and clip it. */}
      {shot &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={shot.caption}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <div
              className="flex max-h-full w-full max-w-6xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="min-h-0 w-full flex-1 rounded-lg bg-white object-contain"
              />
              <div className="mt-4 flex items-start justify-between gap-6">
                <p className="text-sm leading-relaxed text-white/90">
                  <span className="mr-2 font-label text-[0.625rem] tracking-[0.18em] text-blue-300 uppercase">
                    {shot.source}
                  </span>
                  {shot.caption}
                </p>
                <span className="shrink-0 font-label text-xs text-white/60">
                  {open! + 1} / {all.length}
                </span>
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10"
            >
              <X className="size-5" />
            </button>

            {all.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next image"
                  className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
