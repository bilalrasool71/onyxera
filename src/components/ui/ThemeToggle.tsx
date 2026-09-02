"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_KEY = "onyxera-theme";

type Theme = "light" | "dark";

/**
 * Reads the theme the inline boot script already committed to <html>, so the
 * button never disagrees with what is on screen.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "light" ? "light" : "dark");
    read();

    /* The header renders a toggle for each breakpoint, so both instances watch
       <html> rather than trusting their own state to stay in sync. */
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const root = document.documentElement;
    /* Derived from the DOM, which is the single source of truth. */
    const next: Theme = root.dataset.theme === "light" ? "dark" : "light";

    /* Suppress colour transitions for the duration of the swap, then release
       on the next frame so hover and focus animations work again. */
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    setTheme(next);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-switching")),
    );
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Private mode — the choice simply will not persist. */
    }
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      /* Rendered on the server before `theme` is known; the label is filled in
         after mount so it always matches the icon shown. */
      aria-label={
        theme === null
          ? "Toggle colour theme"
          : `Switch to ${isLight ? "dark" : "light"} theme`
      }
      title={theme === null ? undefined : `Switch to ${isLight ? "dark" : "light"} theme`}
      className={cn(
        "group relative grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent-icon/50 hover:text-accent",
        className,
      )}
    >
      <span className="relative block size-[1.125rem]">
        <Sun
          className={cn(
            "absolute inset-0 size-[1.125rem] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isLight ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
          )}
          strokeWidth={1.75}
        />
        <Moon
          className={cn(
            "absolute inset-0 size-[1.125rem] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isLight ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
          strokeWidth={1.75}
        />
      </span>
    </button>
  );
}

/**
 * Runs before first paint so the correct palette is committed with no flash.
 * Order of precedence: stored choice, then system preference, then dark.
 */
export const themeBootScript = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
