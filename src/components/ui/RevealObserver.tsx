"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* One observer for the whole document, not one per node. `Reveal` wraps nearly
   every element on the site and they all ask the same question with the same
   options, so a single shared observer answers all of them — and `Reveal`
   itself gets to stay a server component. */
const OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px",
};

/**
 * Reveals `.reveal` elements as they scroll into view. Mounted once, in the
 * root layout. Renders nothing.
 */
export function RevealObserver() {
  /* Client navigation swaps the tree without remounting this, so re-scan
     whenever the route changes. */
  const pathname = usePathname();

  useEffect(() => {
    const showAll = (nodes: Iterable<Element>) => {
      for (const n of nodes) n.classList.add("reveal-visible");
    };

    const find = (root: ParentNode) =>
      root.querySelectorAll(".reveal:not(.reveal-visible)");

    /* Show immediately rather than trapping content at opacity 0 when the
       observer is unavailable or motion is unwanted. */
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      showAll(find(document));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        /* Reveal is one-way: stop watching the moment it fires. */
        observer.unobserve(entry.target);
        entry.target.classList.add("reveal-visible");
      }
    }, OPTIONS);

    const watch = (root: ParentNode) => {
      for (const node of find(root)) observer.observe(node);
    };

    watch(document);

    /* Anything mounted after this effect — a panel opened by a tab, a gallery
       lightbox — would otherwise sit at opacity 0 forever, because nothing
       else is watching for it now that the wrappers themselves are inert. */
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof Element)) continue;
          if (added.classList.contains("reveal")) observer.observe(added);
          watch(added);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
