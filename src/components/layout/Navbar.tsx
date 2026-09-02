"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { services } from "@/lib/data/services";
import { mainNav, site } from "@/lib/site";
import { cn, numberWord } from "@/lib/utils";

/* One shape for every nav item. The active state is that same pill with a
   soft blue tint and blue text — no outline, so it never competes with the
   blue "Start a project" CTA sitting next to it. */
const NAV_PILL =
  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300";
const NAV_ACTIVE = "bg-blue-400/12 text-accent";
const NAV_IDLE = "text-fg-body hover:bg-glass hover:text-fg";

const SERVICES_MENU_ID = "services-menu";

/* Everything the browser would put in the tab order. Used to cycle focus while
   the mobile panel is open; `tabindex="-1"` entries are dropped afterwards. */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]",
].join(",");

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  /* Distinguishes "the menu just closed" from the first render, so focus is
     only ever handed back to the trigger that opened it. */
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reset transient UI whenever the route changes. */
  useEffect(() => {
    setMenuOpen(false);
    setDropdown(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setDropdown(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Move focus into the panel when it opens and hand it back to the trigger
     when it closes — otherwise focus is left on a button the panel now covers,
     or lost to <body> entirely. One frame of delay because the panel is
     `visibility:hidden` until the class flip lands, and a hidden element
     cannot take focus. */
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const id = requestAnimationFrame(() => panelRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [menuOpen]);

  /* Focus containment. The panel is a full-screen 98%-opaque overlay, so the
     page behind it must stay unreachable: tabbing cycles through the header
     controls that sit above the panel (logo, theme toggle, close) and the
     panel's own links, and nothing else. `aria-modal` does the equivalent for
     assistive tech. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      /* Below `lg` only. If the viewport was resized past the breakpoint while
         the menu was open the panel is display:none — nothing to trap. */
      if (!panel || panel.getClientRects().length === 0) return;

      const items = [
        ...(headerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
        ...panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter(
        (el) =>
          el.tabIndex >= 0 &&
          /* Drops the desktop nav (display:none here) and the collapsed
             services panel, so the cycle matches what is on screen. */
          el.getClientRects().length > 0 &&
          getComputedStyle(el).visibility !== "hidden",
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside =
        !!active &&
        (panel.contains(active) || !!headerRef.current?.contains(active));

      if (!inside) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(true);
  };
  const closeDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(false), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* The bar reads as its own surface at every scroll position — a hairline
          plus a faint wash even at the top, so it never dissolves into the
          hero behind it. Scrolling only deepens what is already there. */}
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-line-strong bg-bg/85 shadow-soft backdrop-blur-xl"
            : "border-line bg-bg/45 backdrop-blur-md",
        )}
      >
        {/* Brand hairline along the bottom edge, brightest under the centre. */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 -bottom-px h-px transition-opacity duration-300",
            "bg-[linear-gradient(90deg,transparent,var(--accent)_50%,transparent)]",
            scrolled ? "opacity-70" : "opacity-40",
          )}
        />
        {/* Named so a landmark list can tell this apart from the two labelled
            navs in the footer. */}
        <nav
          aria-label="Primary"
          className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20"
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <Logo size="lg" />
          </Link>

          {/* ---------- desktop ---------- */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Deliberately not `relative`: the panel positions against the
                fixed <header> so it can centre on the page gutter. Anchored to
                this trigger it ran 90px past the nav's right edge at 1024px. */}
            <div
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
              /* Tabbing out of the panel should close it, not leave it hanging
                 open behind the next focused element. */
              onBlur={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node | null))
                  return;
                setDropdown(false);
              }}
            >
              <button
                type="button"
                onClick={() => setDropdown((v) => !v)}
                aria-expanded={dropdown}
                aria-controls={SERVICES_MENU_ID}
                className={cn(
                  NAV_PILL,
                  isActive("/services") || dropdown ? NAV_ACTIVE : NAV_IDLE,
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    dropdown && "rotate-180",
                  )}
                />
              </button>

              <div
                id={SERVICES_MENU_ID}
                aria-hidden={!dropdown}
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  dropdown
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0",
                )}
              >
                <div className="shell flex justify-center pt-3">
                  <div className="pointer-events-auto flex w-full max-w-[50rem] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-lifted">
                    <div className="min-w-0 flex-1 p-2">
                      {/* auto-rows-fr so the three rows share whatever height the
                        aside sets — otherwise the column ends in dead space. */}
                      <div className="grid h-full auto-rows-fr grid-cols-2 gap-1">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="group relative flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent-icon/50 hover:bg-glass"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong bg-glass text-accent transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-accent-icon/60 group-hover:bg-blue-400/18">
                              <s.icon className="size-4" strokeWidth={1.75} />
                            </span>
                            <span className="min-w-0 flex-1 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                              <span className="flex items-center gap-1.5">
                                <span className="font-display text-sm font-medium text-fg transition-colors duration-300 group-hover:text-accent-strong">
                                  {s.navLabel}
                                </span>
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="size-3.5 -translate-x-1 text-accent opacity-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-fg-subtle">
                                {s.tagline}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Anyone who cannot pick a service from this list does not
                      need a better list — they need a conversation. */}
                    <aside className="relative flex w-[15rem] shrink-0 overflow-hidden border-l border-line bg-bg p-5 xl:w-[16rem]">
                      {/* LogoMark is already role="presentation" aria-hidden. */}
                      <LogoMark className="pointer-events-none absolute -right-8 -bottom-9 size-28 opacity-[0.05]" />
                      <div className="relative flex h-full flex-col">
                        <span className="eyebrow eyebrow-plain">
                          Not sure which one?
                        </span>
                        <p className="mt-3 font-display text-[1.0625rem] leading-snug font-medium text-fg">
                          Describe the problem, not the service.
                        </p>
                        {/* /contact is a message form, not a booking widget —
                            so this promises a reply, not a slot in a calendar.
                            No price either: nothing can be quoted before the
                            scope is known. */}
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-subtle">
                          A couple of lines is enough. The lead who would run
                          the work comes back with a recommendation — even if it
                          is not us.
                        </p>
                        <div className="mt-auto pt-4">
                          <ButtonLink href="/contact" className="w-full">
                            Tell us the problem
                          </ButtonLink>
                          <div className="mt-3 flex flex-col gap-2">
                            <Link
                              href="/services"
                              className="group flex items-center justify-center gap-1.5 text-[0.8125rem] font-medium text-fg-muted transition-colors duration-300 hover:text-accent"
                            >
                              Compare all {numberWord(services.length)}
                              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                            {/* Real client work is the strongest thing on the
                                site — the menu should not be a dead end that
                                only offers a sales call. */}
                            <Link
                              href="/work"
                              className="group flex items-center justify-center gap-1.5 text-[0.8125rem] font-medium text-fg-muted transition-colors duration-300 hover:text-accent"
                            >
                              See client results
                              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>

            {mainNav
              .filter((l) => l.href !== "/services")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    NAV_PILL,
                    isActive(link.href) ? NAV_ACTIVE : NAV_IDLE,
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <ButtonLink href="/contact" withArrow>
              Start a project
            </ButtonLink>
          </div>

          {/* ---------- mobile triggers ---------- */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-300 hover:border-accent-icon/50 hover:text-accent"
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ---------- mobile panel ---------- */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        /* Only while it is actually on screen — a closed panel must not be
           telling assistive tech to ignore the rest of the page. */
        aria-modal={menuOpen || undefined}
        aria-label="Menu"
        /* Focus lands here on open so the dialog is announced before its
           contents; -1 keeps it out of the tab order itself. */
        tabIndex={-1}
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-bg/98 backdrop-blur-xl transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none lg:hidden",
          /* `invisible` keeps the closed panel out of the tab order instead of
             leaving focusable links stranded behind a transparent overlay. */
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="shell flex-1 overflow-y-auto pt-28 pb-12">
          {/* `aria-modal` hides the header — and with it the X button — from
              assistive tech, so the dialog carries its own close. Kept out of
              the tab order because it is invisible: sighted keyboard users
              reach the real X in the header, which the trap includes. */}
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="sr-only"
          >
            Close menu
          </button>

          <p className="eyebrow mb-5">Services</p>
          <div className="flex flex-col">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                style={{
                  transitionDelay: menuOpen ? `${120 + i * 45}ms` : "0ms",
                }}
                className={cn(
                  "flex items-center gap-4 border-b border-line py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
              >
                <s.icon
                  className="size-5 shrink-0 text-accent-icon"
                  strokeWidth={1.75}
                />
                <span className="font-display text-lg font-medium text-fg">
                  {s.navLabel}
                </span>
                <ArrowUpRight className="ml-auto size-4 text-fg-faint" />
              </Link>
            ))}
          </div>

          <p className="eyebrow mt-10 mb-5">Company</p>
          <div className="flex flex-col">
            {mainNav.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  transitionDelay: menuOpen ? `${420 + i * 45}ms` : "0ms",
                }}
                className={cn(
                  "border-b border-line py-4 font-display text-lg font-medium text-fg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ButtonLink
            href="/contact"
            size="lg"
            className="mt-10 w-full"
            withArrow
          >
            Start a project
          </ButtonLink>

          <a
            href={`mailto:${site.email}`}
            className="mt-6 block text-center text-sm text-fg-subtle transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
