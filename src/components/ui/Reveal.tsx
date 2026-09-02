"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/* One observer for the whole document, not one per node. Reveal wraps nearly
   every element on the site — the heaviest page mounts around 57 of them — and
   they all ask the same question with the same options, so a single shared
   observer answers all of them.

   Callbacks live in a WeakMap keyed by the element: a node that unmounts before
   it ever intersects is not retained, and the effect cleanup drops its entry so
   a fired callback can never reach an unmounted component. */
const pending = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const show = pending.get(entry.target);
        /* Reveal is one-way: stop watching the moment it fires, which is what
           the old per-node `observer.disconnect()` did. */
        pending.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
        show?.();
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  return sharedObserver;
}

/**
 * Fades and lifts content into view once. Deliberately tiny — a shared observer,
 * unobserved the moment it fires, and a no-op under reduced motion.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Show immediately rather than trapping content at opacity 0 when the
       observer is unavailable or motion is unwanted. */
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = getObserver();
    pending.set(node, () => setShown(true));
    observer.observe(node);

    return () => {
      pending.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", shown && "reveal-visible", className)}
    >
      {children}
    </Tag>
  );
}
