"use client";

import { useId, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { principles } from "@/lib/data/agency";
import { cn } from "@/lib/utils";

/**
 * Six principles used to sit as six equal paragraphs, which is six things
 * competing to be read first — so none of them were. The titles carry the
 * argument on their own, so they become the scannable layer and the prose
 * moves behind a click.
 *
 * Every panel stays in the markup rather than being swapped in on select, so
 * the copy is still there for crawlers; a `<noscript>` rule in the root layout
 * reveals all of them when there is no JavaScript to drive the tabs.
 */
/* The data is imported rather than passed in: each principle carries a Lucide
   icon, and a component cannot cross the server-to-client prop boundary. */
export function Principles() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;

  /* Selection follows focus — the standard pattern for tabs whose panels are
     already in the document and cost nothing to show. */
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = principles.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-14 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Our principles"
        className="flex flex-col gap-1.5"
      >
        {principles.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={tabId(i)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(i)}
              /* Roving tabindex: one stop for the whole list, arrows move within. */
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                /* The indicator is a border on the pill itself, so it follows
                   the corner radius the whole way round. A straight absolute
                   rule cannot — its ends sat outside the curve. Border is
                   always present and only changes colour, so nothing reflows
                   between states. */
                "group relative flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-5",
                /* Selected was blue type on a 12%-blue wash: blue-on-blue on the
                   dark ground, and in the light theme that wash is a pale tint
                   no white could sit on. It becomes a real brand fill instead —
                   `--brand-surface` is one value in both themes precisely so
                   white can ride on it (4.91:1), the same fill `.card-brand`
                   and `.band-accent` use. Branches are mutually exclusive: cn()
                   is a plain join, so two competing `bg-` classes would resolve
                   by stylesheet order, not argument order. */
                selected
                  ? "border-white/30 bg-brand-surface text-white"
                  : "border-transparent text-fg-body hover:border-accent-icon/50 hover:bg-glass hover:text-fg",
              )}
            >
              <span
                className={cn(
                  "font-label text-[0.625rem] tracking-[0.2em] tabular-nums transition-colors duration-200",
                  /* Full white, not white/70: anything under 100% drops below
                     4.5:1 on this fill (white/90 measures 4.31:1). Size and
                     tracking carry the hierarchy instead of opacity. */
                  selected ? "text-white" : "text-fg-faint",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 font-display text-[0.9375rem] leading-snug md:text-base">
                {p.title}
              </span>
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  selected
                    ? "translate-x-0 text-white opacity-100"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                )}
              />
            </button>
          );
        })}
      </div>

      <div>
        {principles.map((p, i) => (
          <div
            key={p.title}
            id={panelId(i)}
            role="tabpanel"
            aria-labelledby={tabId(i)}
            /* The panel holds an icon, a heading and a paragraph — nothing
               focusable — so without a tab stop of its own Tab jumps straight
               from the tablist past the copy it just revealed. `hidden` keeps
               the other five out of the sequence. */
            tabIndex={0}
            hidden={i !== active}
            data-principle-panel=""
            className="card h-full p-8 md:p-10"
          >
            <span className="grid size-14 place-items-center rounded-xl border border-line-strong bg-glass text-accent">
              <p.icon className="size-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-7 font-display text-xl text-fg md:text-2xl">
              {p.title}
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-subtle md:text-base">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
