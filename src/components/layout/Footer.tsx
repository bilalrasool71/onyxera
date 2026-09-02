import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { services } from "@/lib/data/services";
import { site } from "@/lib/site";

/* Company and legal share one column in this layout — eight links read fine as
   a single list, and it frees the fourth column for the three locations. */
const company = [
  { label: "About", href: "/about" },
  { label: "Case studies", href: "/work" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Returns & Refunds", href: "/returns-refunds-policy" },
];

const COL_LINK =
  "text-sm text-fg-muted transition-colors duration-300 hover:text-accent";

/* Heading plus the rule beneath it. Written out rather than composed at the
   call site so Tailwind sees each class as a literal string. */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="font-label text-[0.8125rem] tracking-[0.14em] text-fg uppercase">
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="mt-3 mb-6 block h-px w-14 bg-accent-icon"
      />
    </>
  );
}

export function Footer() {
  /* Baked in at build time, so it refreshes on every deploy. */
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-bg">
      {/* Same brand edge the header carries, so the page is bracketed. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent)_50%,transparent)] opacity-60"
      />
      <div className="shell relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.15fr] lg:gap-12">
          {/* ---------- brand ---------- */}
          <div className="max-w-sm md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-fg-subtle">
              {site.description}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="group mt-6 inline-flex items-center gap-2.5 text-sm text-fg-body transition-colors duration-300 hover:text-accent"
            >
              <Mail className="size-4 shrink-0 text-accent-icon" strokeWidth={1.7} />
              {site.email}
            </a>

            <div className="mt-7 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${site.name} on ${s.label}`}
                  className="grid size-10 place-items-center rounded-full border border-line-strong bg-glass text-fg-muted transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent-icon/60 hover:bg-blue-400/12 hover:text-accent"
                >
                  <SocialIcon name={s.label} className="size-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- services ---------- */}
          <nav aria-label="Services">
            <ColHeading>Services</ColHeading>
            <ul className="space-y-3.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={COL_LINK}>
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- company + legal ---------- */}
          <nav aria-label="Company">
            <ColHeading>Company</ColHeading>
            <ul className="space-y-3.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={COL_LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- locations ----------
              Name, address and phone stay together: this is the block local
              search reads, and the same detail a Google Business Profile has
              to match exactly. */}
          <div>
            <ColHeading>Contact us</ColHeading>
            <div className="space-y-7">
              {site.offices.map((o) => (
                <address key={o.label} className="not-italic">
                  <p className="font-label text-[0.625rem] tracking-[0.16em] uppercase">
                    <span className="text-accent-icon">{o.label}</span>{" "}
                    <span className="text-fg-faint">· {o.kind}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {o.line1}
                    <br />
                    {o.line2}
                  </p>
                  <a
                    href={`tel:${o.phoneHref}`}
                    className="mt-1.5 inline-block text-sm text-fg-body transition-colors duration-300 hover:text-accent"
                  >
                    {o.phone}
                  </a>
                </address>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="flex flex-col gap-3 border-t border-line py-7 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>{site.hours}</span>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-accent"
            >
              Back to top
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
