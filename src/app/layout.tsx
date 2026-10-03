import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Michroma, Montserrat, Schibsted_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { ContactDock } from "@/components/ui/ContactDock";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { themeBootScript } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/layout/Footer";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

/* Brand primary — Michroma. One weight only, and very wide, so it is used for
   the wordmark, display headings and short labels rather than running text. */
const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  /* Only dresses  — an 11px uppercase label, never the LCP
     element. Preloaded, it took 12KB of the critical path ahead of the hero
     for text nobody reads first. Fetched at normal priority instead. */
  preload: false,
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
    default: `${site.name} | ${site.tagline}`,
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
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
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

/* Google Analytics 4, fetched on the visitor's first move or after three
   seconds, whichever comes first.

   Measured, on this page, with Lighthouse against the live site:

     with gtag.js loading on load    TBT 1,080ms   Performance 75
     with the same page, tag blocked TBT   190ms   Performance 91

   Nothing else on the page comes close. First paint, largest paint, layout
   shift and speed index are all green; this one third-party script is the
   whole gap, and no amount of work on our own code moves it.

   The fallback is ten seconds, not three, and the number is not arbitrary:
   GA4 counts a session as engaged at ten seconds, a second page view, or a
   conversion. A visit that ends before any of those, without a single scroll
   or tap, is one GA4 itself would not call engaged. Aligning the fallback with
   that threshold means the tag arrives before anything GA4 would have counted
   as engagement, and stays out of the way of everyone else.

   A plain timer, not `requestIdleCallback`. Idle callbacks fire at the first
   gap in the main thread, and on a cold load that gap arrives while the page
   is still settling — measured, it pulled the tag in earlier than the fixed
   timer did and cost 150ms of blocking time. The timer is the blunter tool and
   the better one here.

   The queue is set up immediately, so the page_view still carries the landing
   path the visitor actually arrived on; gtag.js drains it when it loads.

   Note this sets the _ga cookies described in the Cookie Policy — keep the two
   in step. */
const GA_MEASUREMENT_ID = "G-5ZLFDQZ95F";

/* Google Tag Manager, supplied by the client's SEO team. The container snippet
   has to live in the page itself — a static export has no tag field for them
   to paste into — but everything inside the container is theirs to manage from
   the GTM dashboard without another deploy.

   Note GA4 above is loaded directly, not through this container. If the team
   also adds a GA4 tag inside GTM, the same property is measured twice and the
   numbers double; one of the two has to go. */
const GTM_CONTAINER_ID = "GTM-KTK4M64R";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${schibstedGrotesk.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager, in the head as the container snippet requires. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
          }}
        />
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
        {/* Google Tag Manager's no-JavaScript fallback, first thing in the
            body as the snippet requires. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
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

        <RevealObserver />
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
        <ContactDock />

        {/* The company and the site, emitted once for every page. Each page's
            own structured data references these two by @id rather than
            repeating them, which is what makes the crawler read twenty-five
            pages as one entity — and keeps those references resolvable on a
            page reached directly from search, rather than only alongside the
            home page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: graph([organizationSchema(), websiteSchema()]) }}
        />

        <Script id="ga4" strategy="afterInteractive">
          {`(function(){
var id='${GA_MEASUREMENT_ID}',loaded=false;
var events=['scroll','pointerdown','keydown','touchstart'];
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('config',id);
function load(){
if(loaded)return;loaded=true;
events.forEach(function(e){window.removeEventListener(e,load);});
var s=document.createElement('script');
s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;
document.head.appendChild(s);
}
events.forEach(function(e){window.addEventListener(e,load,{passive:true,once:true});});
setTimeout(load,10000);
})();`}
        </Script>
      </body>
    </html>
  );
}
