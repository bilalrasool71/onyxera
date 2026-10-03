"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Copy, Mail, MessageCircle, MessageSquareText, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { LogoMark } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Floating contact control: one button in the site's own button colour that
 * opens a small panel — the team it reaches, WhatsApp first, then the contact
 * form, then email.
 *
 * It shares the bottom-right corner with ScrollToTop. While that button is
 * hidden this one sits in the corner; once it appears, this one lifts by one
 * button plus a gap, so the two read as a single stack.
 *
 * On a desktop it opens when the mouse moves over it and closes shortly after
 * the mouse leaves; clicking it keeps it open. On a phone or tablet, which has
 * no hover, it opens and closes with a tap. It never opens by itself.
 *
 * Nothing third-party is loaded: WhatsApp is a plain link.
 */

/* api.whatsapp.com directly rather than wa.me, which only 302s here — every
   page linking to a redirect is flagged by site audits. */
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${site.whatsappHref}`;

type Method = "whatsapp" | "form" | "email" | "copy_email";
type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

function track(method: Method) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", "contact_click", { method, page_path: window.location.pathname });
}

/* Pages about one service or platform. On these the page title is the
   service's name, so it can go straight into the message. Everywhere else
   (home, about, portfolio, contact, legal) the title is a slogan or a page
   name that reads wrongly in "I'm interested in …", so a general line is used. */
const SERVICE_PAGES = [
  /^\/services\/[^/]+$/,
  /* The platform pages sit under /platforms; the five the SEO briefs renamed
     keep their own top level paths. Both lists are exact: the `-platform`
     pattern that stood here matched nothing after the rename, which quietly
     dropped the service name from the opening message on five pages. */
  /^\/platforms\/[^/]+$/,
  /^\/(automation-solutions|cybersecurity-solutions|custom-development-solutions|digital-marketing-services|seo-services)$/,
];

/** The service in view, e.g. "Odoo Business Systems", or null off service pages. */
function serviceInView(): string | null {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (!SERVICE_PAGES.some((re) => re.test(path))) return null;
  const title = document.title.split("|")[0]?.trim();
  return title && title !== site.name ? title : null;
}

function openingLine() {
  const service = serviceInView();
  return service
    ? `I'm interested in ${service}.`
    : "I came across your website and would like to discuss a project.";
}

/* Same distance ScrollToTop uses before it appears. */
const LIFT_AFTER = 0.9;

export function ContactDock() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  /* True once a click has opened it, so moving the mouse away does not close it. */
  const [pinned, setPinned] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const close = () => {
    setOpen(false);
    setPinned(false);
  };

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > window.innerHeight * LIFT_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* A new page closes it. */
  useEffect(() => {
    setOpen(false);
    setPinned(false);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /* Mouse only — touch has no hover, and a tap fires pointerenter too. */
  const onEnter = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" || pinned) return;
    /* A short grace period so crossing the gap up to the panel keeps it open. */
    closeTimer.current = window.setTimeout(() => setOpen(false), 200);
  };
  const onToggle = () => {
    if (open && pinned) close();
    else if (open) setPinned(true);
    else {
      setOpen(true);
      setPinned(true);
    }
  };

  /* Escape and a click outside both close it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const whatsappHref = () =>
    `${WHATSAPP_URL}&text=${encodeURIComponent(
      `Hi ${site.name}, ${openingLine()} `,
    )}`;

  const mailHref = () => {
    const service = serviceInView();
    const subject = service ? `Enquiry from ${site.domain} – ${service}` : `Enquiry from ${site.domain}`;
    const body = `Hi ${site.name},\n\n${openingLine()} Here's a bit about my business:\n\n`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      track("copy_email");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard blocked — the address is on screen to select by hand. */
    }
  };

  const tab = open ? 0 : -1;
  const row =
    "group/row flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      ref={root}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={cn(
        "fixed right-5 bottom-5 z-40 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:right-8 md:bottom-8",
        /* One 48px button plus a 12px gap. */
        lifted && "-translate-y-[60px]",
      )}
    >
      {/* ---------------- panel ---------------- */}
      <div
        id={panelId}
        role="dialog"
        aria-label="Contact Onyxera Tech"
        aria-hidden={!open}
        className={cn(
          "absolute right-0 bottom-full w-[20.5rem] max-w-[calc(100vw-2.5rem)] pb-3 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-md border border-line-strong bg-surface shadow-lifted">
          {/* Who the visitor is reaching, with a close control. */}
          <div className="flex items-center gap-3 border-b border-line py-3.5 pr-2.5 pl-4">
            {/* The mark on its own, no disc behind it — the status line below
                carries the one "online" dot. */}
            <span className="shrink-0 text-fg">
              <LogoMark className="size-11" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-sm font-medium text-fg">{site.name} Team</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-subtle">
                <span className="relative flex size-1.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
                </span>
                Online &middot; Here to help
              </span>
            </span>
            <button
              type="button"
              onClick={close}
              tabIndex={tab}
              aria-label="Close contact options"
              className="grid size-8 shrink-0 place-items-center rounded-xs text-fg-subtle transition-colors duration-200 hover:bg-glass hover:text-fg"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={2} />
            </button>
          </div>

          <div className="p-2">
            {/* WhatsApp — the primary action, so it carries the tint. */}
            <a
              href={WHATSAPP_URL}
              onClick={(e) => {
                /* Built at click time so the message names the page in view. */
                e.currentTarget.href = whatsappHref();
                track("whatsapp");
              }}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              className={cn(row, "bg-blue-400/12 hover:bg-blue-400/20")}
            >
              <FaWhatsapp aria-hidden="true" className="size-5 shrink-0" style={{ color: "#25d366" }} />
              <span className="min-w-0 flex-1 font-display text-sm font-medium text-accent-strong">
                Chat on WhatsApp
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 shrink-0 text-accent transition-transform duration-200 group-hover/row:translate-x-0.5"
              />
            </a>

            {/* The contact form — works on every device, every time. */}
            <Link
              href="/contact"
              onClick={() => {
                track("form");
                close();
              }}
              tabIndex={tab}
              className={cn(row, "mt-1 hover:bg-glass")}
            >
              <MessageSquareText
                aria-hidden="true"
                className="size-[1.125rem] shrink-0 text-fg-muted"
                strokeWidth={1.75}
              />
              <span className="min-w-0 flex-1 text-sm text-fg transition-colors duration-300 group-hover/row:text-accent-strong">
                Send us a message
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 shrink-0 text-fg-subtle transition-all duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-accent"
              />
            </Link>

            <div className="mx-3 my-1 h-px bg-line" />

            {/* Email: opens the mail app with the subject and a first line
                filled in; Copy covers desktops with no mail app set up. */}
            <div className={cn(row, "pr-2 hover:bg-glass")}>
              <a
                href={`mailto:${site.email}`}
                onClick={(e) => {
                  e.currentTarget.href = mailHref();
                  track("email");
                }}
                tabIndex={tab}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <Mail aria-hidden="true" className="size-[1.125rem] shrink-0 text-fg-muted" strokeWidth={1.75} />
                <span className="truncate text-sm text-fg transition-colors duration-300 group-hover/row:text-accent-strong">
                  {site.email}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                tabIndex={tab}
                aria-label={copied ? "Email address copied" : "Copy email address"}
                className="flex shrink-0 items-center gap-1 rounded-xs px-2 py-1 text-xs font-medium text-accent transition-colors duration-200 hover:bg-blue-400/18"
              >
                {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close contact options" : "Contact us"}
        className="grid size-12 place-items-center rounded-full bg-[#6a9bd1] text-[color:var(--btn-fg)] shadow-lifted transition-colors duration-300 hover:bg-[#4f81bc]"
      >
        <span className="relative grid size-5 place-items-center">
          <MessageCircle
            aria-hidden="true"
            className={cn(
              "absolute size-5 transition-all duration-200",
              open ? "scale-50 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100",
            )}
            strokeWidth={2}
          />
          <X
            aria-hidden="true"
            className={cn(
              "absolute size-5 transition-all duration-200",
              open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-45 opacity-0",
            )}
            strokeWidth={2}
          />
        </span>
      </button>
    </div>
  );
}
