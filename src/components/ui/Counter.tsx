"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Metric values are free-form strings written by hand, so the counter only
 * animates the ones that are genuinely a single number with decoration
 * around it. Everything else renders verbatim.
 *
 *   "140"       → 140
 *   "99.98%"    → 99.98 with two decimals, "%" suffix
 *   "1,900 hrs" → 1900, regrouped with a comma on the way up
 *   "<200ms"    → "<" prefix, 200, "ms" suffix
 *   "+184%"     → "+" prefix
 *
 * Rejected: "1.6× → 3.8×" and "6–14 wks" (two numbers), "SOC 2" (letters in
 * the prefix — counting "SOC 0…2" is nonsense), "#1" is allowed since the
 * prefix is punctuation.
 */
type Parsed = {
  prefix: string;
  number: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
};

const SHAPE = /^([^A-Za-z0-9]*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

export function parseMetric(raw: string): Parsed | null {
  const v = raw.trim();
  /* Transitions and ranges carry two values; a single counter cannot tell
     that story, so leave them alone. */
  if (/[→–]/.test(v)) return null;

  const m = SHAPE.exec(v);
  if (!m) return null;

  const [, prefix, digits, suffix] = m;
  if (/\d/.test(suffix)) return null;

  const number = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(number)) return null;

  return {
    prefix,
    number,
    decimals: (digits.split(".")[1] ?? "").length,
    grouped: digits.includes(","),
    suffix,
  };
}

function format(n: number, p: Parsed) {
  return p.grouped
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : n.toFixed(p.decimals);
}

const DURATION = 1500;

export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /* `null` means "show the source string". The server renders that, so the
     real figure is in the HTML for crawlers and for readers without JS —
     the count-up is an enhancement layered on afterwards. */
  const [tally, setTally] = useState<number | null>(null);

  useEffect(() => {
    const parsed = parseMetric(value);
    const el = ref.current;
    if (!parsed || !el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      /* IntersectionObserver does not deliver entries while the tab is hidden,
         and requestAnimationFrame is paused. Zeroing the figure here would
         strand it at "0+" until the tab was focused. */
      document.hidden
    ) {
      return;
    }

    let frame = 0;

    const run = () => {
      const started = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - started) / DURATION);
        /* easeOutCubic — fast off the mark, settles gently. */
        setTally(parsed.number * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(step);
        /* Land on the source string so the final frame is exact, whatever
           the formatting. */
        else setTally(null);
      };
      frame = requestAnimationFrame(step);
    };

    setTally(0);

    /* Already on screen when we mounted — there is no scroll event coming, so
       start straight away rather than waiting for an entry that never arrives. */
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      run();
      return () => {
        if (frame) cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  const parsed = parseMetric(value);
  const text =
    tally === null || !parsed
      ? value
      : `${parsed.prefix}${format(tally, parsed)}${parsed.suffix}`;

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the settled figure, not every interim frame. */}
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
