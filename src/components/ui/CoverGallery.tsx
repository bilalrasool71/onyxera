"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = { src: string; alt: string };

/**
 * The cover of a case-study card.
 *
 * With two or more images it advances on hover and opens a lightbox on click.
 * With one it is a plain image, and with none the caller's abstract tint shows
 * through — only two engagements have a real image set, so the component
 * degrades instead of faking a carousel out of a single picture.
 *
 * The card itself is a `<Link>`, so the lightbox trigger cannot be a nested
 * button. Instead the whole cover is an overlay button rendered *beside* the
 * link content, and it intercepts the click before navigation.
 */
export function CoverGallery({
  images,
  interval = 1100,
}: {
  images: GalleryImage[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  /* Only the first frame is in the markup until someone reaches for the rest.
     Every image here is stacked at the same position, so `loading="lazy"`
     cannot tell them apart — a card near the top of the page pulled its whole
     set, five 1200x750 photographs, on a connection that had not finished the
     fold yet. On a phone that is pure waste: the carousel advances on hover,
     and a phone never hovers. Arming happens a beat before anything needs the
     second frame, so nothing flashes. */
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const many = images.length > 1;

  /* The card applies transform: translateY(-4px) on hover, and a transformed
     ancestor becomes the containing block for position: fixed — so the dialog
     was being positioned inside the card and clipped by its overflow-hidden.
     Portalling to <body> takes it out of that stacking context entirely. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Advance only while pointing at the card, and never when the viewer has
     asked for reduced motion. */
  useEffect(() => {
    if (!many || !hovering || open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [many, hovering, open, images.length, interval]);

  const step = useCallback(
    (d: number) => setIndex((i) => (i + d + images.length) % images.length),
    [images.length],
  );

  /* Lightbox: trap Escape and the arrows, lock the page, restore focus. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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

  if (!images.length) return null;

  const shown = armed || open ? images : images.slice(0, 1);

  return (
    <>
      <div
        className="absolute inset-0"
        onMouseEnter={() => {
          setArmed(true);
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
          setIndex(0);
        }}
      >
        {shown.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={i === 0 ? img.alt : ""}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            aria-hidden={i !== index}
            className={
              i === index
                ? "absolute inset-0 size-full object-cover object-center opacity-100 transition-opacity duration-300"
                : "absolute inset-0 size-full object-cover object-center opacity-0 transition-opacity duration-300"
            }
          />
        ))}

        {many && (
          <>
            {/* Sits above the card link so a click opens the gallery instead of
                navigating. Keyboard users reach the case study through the
                card's own heading link, and this through its label. */}
            <button
              ref={openerRef}
              type="button"
              aria-label={`Open image gallery, ${images.length} images`}
              /* Touch has no hover, so the lightbox is the only way in — arm
                 on the press rather than waiting for the click. */
              onPointerDown={() => setArmed(true)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(true);
              }}
              className="absolute inset-0 z-10 cursor-zoom-in"
            />
            <span className="pointer-events-none absolute bottom-5 left-5 z-20 flex gap-1.5">
              {images.map((img, i) => (
                <span
                  key={img.src}
                  className={
                    i === index
                      ? "block h-1.5 w-5 rounded-full bg-white transition-all duration-300"
                      : "block size-1.5 rounded-full bg-white/50 transition-all duration-300"
                  }
                />
              ))}
            </span>
          </>
        )}
      </div>

      {open && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Case study images"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close gallery"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10 md:left-8"
          >
            <ChevronLeft className="size-5" />
          </button>

          <figure
            className="max-h-[86vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index].src}
              alt={images[index].alt}
              width={1200}
              height={750}
              className="max-h-[78vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {images[index].alt} · {index + 1} of {images.length}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10 md:right-8"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
