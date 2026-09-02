import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Michroma, Montserrat, Schibsted_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { themeBootScript } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

/* Brand primary — Michroma. One weight only, and very wide, so it is used for
   the wordmark, display headings and short labels rather than running text. */
const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* Display face for headings. Commissioned for a Nordic news group, so it reads
   as editorial rather than startup-generic, and it is nowhere near as saturated
   as Space Grotesk had become. Six weights at normal width, so headings keep
   real hierarchy and run at full size — unlike Michroma, which has one weight
   and is 1.63x wider, and forced every heading to shrink. */
const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/* Brand secondary — Montserrat. Body copy, sub-headings and UI. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "software agency",
    "web application development",
    "website design",
    "SEO agency",
    "digital marketing",
    "business automation",
    "cyber security",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  /* No `robots` key on purpose. index/follow is already the crawler default, so
     the tag added nothing — but it was inherited by the not-found page and
     landed after that page's own `noindex`, giving every 404 two contradictory
     robots directives. Leave it off; pages that need noindex set it themselves. */
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1f33" },
  ],
  colorScheme: "light dark",
};

/* Google Analytics 4. `afterInteractive` keeps it off the critical path so it
   cannot delay first paint. Note this sets the _ga cookies described in the
   Cookie Policy — keep the two in step. */
const GA_MEASUREMENT_ID = "G-5ZLFDQZ95F";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  /* Links the site to the verified social profiles. Google reads this when
     associating a Business Profile with a website. */
  sameAs: site.socials.map((s) => s.href),
  /* Both locations, so search engines see the real footprint. */
  address: site.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.line1,
    addressLocality: o.locality,
    ...(o.region ? { addressRegion: o.region } : {}),
    postalCode: o.postalCode,
    addressCountry: o.countryCode,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${schibstedGrotesk.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Commits the palette to <html> before first paint — no theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {/* Reveal animations are JS-driven; without scripting the content must
            still be fully visible to readers and crawlers. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}
            /* Nothing can drive the principle tabs, so show every panel. */
            [data-principle-panel]{display:block!important;margin-bottom:1rem}
            [role="tablist"][aria-label="Our principles"]{display:none}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-bg">
        {/* Bypass Blocks (WCAG 2.4.1) — the header is ~14 tab stops on every
            page. Parked off-screen with a transform rather than
            `sr-only focus:not-sr-only`, because `not-sr-only` restores
            `position: static`; the `focus:fixed` needed to undo that carries
            the same specificity, so the two would be settled by stylesheet
            order. A plain base class beaten by a `focus:` variant is decided by
            specificity instead, which cannot drift between builds. */}
        <a
          href="#main"
          className="fixed top-4 left-4 z-[70] -translate-y-24 rounded-lg border border-line-strong bg-bg px-4 py-2 font-label text-sm text-fg transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>

        {/* Ambient brand wash — fixed so it never scrolls out of alignment.
            `.ambient` dials it back in the light theme. */}
        <div
          className="ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="grid-bg fade-b absolute inset-x-0 top-0 h-[70vh] opacity-60" />
        </div>

        <RouteProgress />
        <Navbar />
        {/* `tabIndex={-1}` so the skip link actually moves focus here, not just
            the scroll position. `scroll-padding-top` in globals.css keeps the
            fixed header from covering the landing point. */}
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
