"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  /* Unique per instance — several accordions can share a page. */
  const uid = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;
        return (
          <div
            key={item.q}
            className={cn(
              "card overflow-hidden transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isOpen ? "border-accent-icon/40" : "hover:border-line-strong",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors duration-300 hover:text-accent-strong md:px-7"
              >
                <span
                  className={cn(
                    "font-sans text-base font-semibold transition-colors duration-300 md:text-lg",
                    isOpen ? "text-accent-strong" : "text-fg",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen
                      ? "rotate-135 border-accent/60 bg-blue-400/12 text-accent"
                      : "border-line-strong text-fg-muted group-hover:border-accent-icon/50 group-hover:text-accent",
                  )}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                /* `invisible` (not `hidden`) keeps the collapse animation while
                   still dropping the answer out of the accessibility tree. */
                isOpen
                  ? "visible grid-rows-[1fr] opacity-100"
                  : "invisible grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl px-6 pr-12 pb-6 text-[0.9375rem] leading-relaxed text-fg-muted md:px-7">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
