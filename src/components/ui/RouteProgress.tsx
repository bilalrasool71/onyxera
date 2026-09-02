"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * A hairline progress bar across the top of the viewport during navigation.
 *
 * The site is a static export and every `<Link>` prefetches on hover, so most
 * navigations are already fast — the problem is that nothing acknowledges the
 * click, which reads as an unresponsive page. This closes that gap: it starts
 * on any same-origin link click and finishes when the route actually changes.
 *
 * It deliberately never reaches 100% on its own. The width eases toward 90% and
 * stops; only a real route change completes it, so the bar can never claim to
 * have finished something that is still running.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const raf = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (raf.current) {
      clearInterval(raf.current);
      raf.current = null;
    }
  };

  /* Start on any click that will actually navigate this site. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      /* Let the browser keep its own behaviour for modified clicks. */
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      /* Same page, or only the hash differs — nothing will load. */
      if (url.pathname === window.location.pathname) return;

      clearAll();
      setActive(true);
      setWidth(8);

      /* Ease toward 90% and stop. Only a real route change finishes it. */
      raf.current = setInterval(() => {
        setWidth((w) => (w >= 90 ? w : w + (90 - w) * 0.18));
      }, 120);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      clearAll();
    };
  }, []);

  /* The route changed — snap to full, then fade out. */
  useEffect(() => {
    if (!active) return;
    clearAll();
    setWidth(100);
    timers.current.push(
      setTimeout(() => setActive(false), 220),
      setTimeout(() => setWidth(0), 460),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
    >
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--accent-icon),var(--accent))] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${width}%`, opacity: active ? 1 : 0 }}
      />
    </div>
  );
}
