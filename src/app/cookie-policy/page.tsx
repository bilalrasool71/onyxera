import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { cookieSections } from "@/lib/data/legal";

/* The title, intro and description below used to claim this site set no
   analytics or advertising cookies and that there was "nothing to consent to".
   Google Analytics 4 loads on every page (src/app/layout.tsx), which sets the
   _ga and _ga_* cookies, and the clauses in src/lib/data/legal/cookie.ts already
   describe analytics and marketing cookies — so the page contradicted both the
   build and its own body. The copy here now matches what actually ships.

   Two things still need an owner outside this file:
   - cookie.ts names no individual cookie, so the promise to say exactly what is
     stored is still unmet in the body. _ga / _ga_* and their retention belong
     there.
   - Whether GA4 should load before consent is a decision for whoever owns
     layout.tsx. Nothing on this page claims it does not any more. */
export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How OnyxEra Tech uses cookies: what keeps the site working, what remembers your settings, and the Google Analytics cookies that measure how the site is used.",
  alternates: { canonical: "/cookie-policy" },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Privacy"
      label="Cookie Policy"
      title={
        <>
          What this site stores,
          <span className="accent-text"> and why</span>.
        </>
      }
      intro="Some cookies keep the site working and remember your settings. Others, including Google Analytics, measure how the site is used. Here is what each kind does and how to turn them off."
      sections={cookieSections}
    />
  );
}
