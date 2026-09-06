import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { services } from "@/lib/data/services";
import { CityMark } from "@/components/ui/CityMark";
import { primaryOffice, site } from "@/lib/site";

/* Brief: "Also move all the legal pages just at the bottom". Company keeps the
   three navigational links; the five legal pages moved out of this column and
   into the bottom bar, which is where the reference footer puts them too. */
const company = [
  { label: "About", href: "/about" },
  { label: "Our Portfolio", href: "/our-portfolio" },
  { label: "All Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/* Doc 2, section 7: "Legal: Privacy Policy | Terms & Conditions | Disclaimer |
   Cookie Policy | Returns & Refunds", in that order. */
const legal = [
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
        <div className="grid gap-12 pt-16 pb-10 md:grid-cols-2 md:pt-20 lg:grid-cols-[1.4fr_1fr_1fr_1.15fr] lg:gap-12">
          {/* ---------- brand ---------- */}
          <div className="max-w-sm md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-fg-subtle">
              {site.description}
            </p>

            {/* The email moved into the "Get in touch" column, where the brief
                groups it with the phone and the addresses. Repeating it here
                put the same address on screen twice. */}

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

          {/* ---------- get in touch ----------
              Brief: "Remove address headings like: operating locations". The
              `· OPERATING LOCATION` / `· MAILING ADDRESS` qualifier that ran
              above each address is gone; the country name alone labels it, the
              way the reference footer does it.

              Those qualifiers still appear on the Contact page, which is where
              Doc 2 asks for them by name. Nothing here calls USA or Singapore
              an office or a registered address, so the rule that mattered is
              intact.

              Name, address and phone stay together: this is the block local
              search reads, and the same detail a Google Business Profile has
              to match exactly. */}
          <div>
            <ColHeading>Get in touch</ColHeading>

            <div className="space-y-3.5">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-start gap-3 text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-accent-icon" strokeWidth={1.7} />
                {site.email}
              </a>
              <a
                href={`tel:${primaryOffice.phoneHref}`}
                className="flex items-start gap-3 text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
              >
                <Phone className="mt-0.5 size-4 shrink-0 text-accent-icon" strokeWidth={1.7} />
                {primaryOffice.phone}
              </a>
              <p className="flex items-start gap-3 text-sm text-fg-muted">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent-icon" strokeWidth={1.7} />
                {site.hours}
              </p>
            </div>

          </div>
        </div>

        {/* ---------- locations ----------
            A row of three, not a stack inside the fourth column. Stacked, that
            column ran roughly twice the height of the other three and left a
            large well of empty footer under the brand, services and company
            lists. Side by side, the four columns above end together and the
            addresses use the width they were wasting. */}
        <div className="grid gap-8 border-t border-line py-9 sm:grid-cols-2 lg:grid-cols-3">
          {site.offices.map((o) => (
            <address key={o.label} className="not-italic">
              {/* The pin that used to sit here said "a location" three times
                  over; the skyline says which country before the label is
                  read. It stops at the country, deliberately: only the
                  Australian address is an operating location, so nothing in
                  this row is titled "office" and no drawing claims a building.

                  `bg-current` is the colour the mask paints — white on the
                  navy footer, navy on the light one, from one file. */}
              <CityMark
                countryCode={o.countryCode}
                className="block h-16 w-full max-w-[280px] bg-current opacity-75"
              />
              <span className="mt-5 block font-label text-[0.625rem] tracking-[0.16em] text-fg-body uppercase">
                {o.label}
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">
                {o.line1}
                <br />
                {o.line2}
              </span>
            </address>
          ))}
        </div>

        {/* ---------- bottom bar ----------
            Brief: "move all the legal pages just at the bottom". All five sit
            here now, on one line beside the copyright, exactly as the reference
            footer arranges them. */}
        <div className="flex flex-col gap-5 border-t border-line py-7 text-xs text-fg-faint lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {legal.map((l, i) => (
                <li key={l.href} className="flex items-center gap-2">
                  {/* Separator between items, never before the first. */}
                  {i > 0 && (
                    <span aria-hidden="true" className="text-line-strong">
                      |
                    </span>
                  )}
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
