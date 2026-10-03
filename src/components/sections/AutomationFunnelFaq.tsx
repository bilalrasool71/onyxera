"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { withLinks } from "@/lib/prose";

type Item = { q: string; a: string };

/* The FAQ on /automation-funnel: two columns of compact light-blue rows, every
   row closed until it is opened. Colours are the approved design's own fixed
   values, not theme tokens — the page looks the same in both themes.
   `Accordion` opens its first item by default and would have done so once per
   column, which is not what the design shows. */
export function AutomationFunnelFaq({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
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
              "rounded-md border transition-colors duration-200",
              isOpen ? "border-[#bfd6fb] bg-[#e4efff]" : "border-transparent bg-[#eef5ff] hover:border-[#bfd6fb]",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5"
              >
                <span className="text-[0.9375rem] leading-snug font-medium text-[#0b1f33]">
                  {item.q}
                </span>
                <Plus
                  strokeWidth={2.5}
                  className={cn(
                    "mt-px size-5 shrink-0 text-[#1a6df5] transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300",
                isOpen
                  ? "visible grid-rows-[1fr] opacity-100"
                  : "invisible grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                {/* A hairline above the answer. On a phone the answer runs to
                    five or six lines directly under a question that is already
                    three, and without it the two read as one block of text. */}
                <p className="mx-4 border-t border-[#cfe0fb] pt-3 pb-4 text-[0.875rem] leading-relaxed text-[#3c5a7e] sm:mx-5 sm:text-[0.9375rem]">
                  {withLinks(item.a)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
