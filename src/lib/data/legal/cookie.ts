import type { LegalSection } from "./shared";
import { AU, AU_ADDRESS } from "./shared";
import { site } from "@/lib/site";

/* Supplied by the business as the final "Cookies Statement" copy, 2 Sep 2026.
   Body copy is reproduced as written.

   The only edits are house style on the headings, matching what was done to
   `privacySections`: the "01"–"06" prefixes are dropped (the renderer lists
   clauses in order and no other legal page carries numbers), headings are set
   in sentence case, a trailing "?" is removed, and "Third party" is hyphenated
   in the heading only. Body wording is left exactly as supplied — including
   "Third party providers" unhyphenated and the client's "Cookies Management"
   phrasing — so their meaning is not softened or restated.

   Address, email and phone are read from `site` so they cannot drift away from
   the footer and the schema. The source wrote the website as `http://`;
   `site.url` supplies the canonical `https://` instead.

   The source contains no bullet lists, so no clause uses `points`. Clause 3
   enumerates four cookie categories inside a single sentence; that is kept as
   the client's prose rather than split into bullets, which would mean
   inventing a lead-in and re-cutting their sentence.

   This copy is not legal advice and has not been reviewed by a solicitor — see
   the note at the top of ./shared.ts. Clauses making a representation someone
   should confirm are flagged with `needsReview`. */
export const cookieSections: LegalSection[] = [
  {
    heading: "What are cookies",
    body: [
      "Cookies are small files that are stored on your device when you visit a website. They help websites work properly, remember your preferences and understand how visitors use the site.",
    ],
  },
  {
    heading: "How we use cookies",
    body: [
      `${site.name} uses cookies and similar technologies to operate the website, improve performance, understand website usage and remember certain preferences.`,
      "We do not collect information through cookies which is not necessary to provide or improve our website.",
    ],
    /* A hard negative representation about the scope of collection — and one
       that sits awkwardly beside the marketing cookies named in the next
       clause. Worth confirming it is accurate as written. */
    needsReview: true,
  },
  {
    heading: "The cookies we use",
    body: [
      "We may use essential cookies that are necessary for the website to work, preference cookies that remember your selected settings, analytics cookies that help us understand website usage and performance, and marketing cookies where applicable.",
      "The exact cookies we use may change as our website, tools and services evolve.",
    ],
    /* Analytics and marketing cookies attract prior-consent obligations in
       some jurisdictions, and this statement commits to no consent mechanism. */
    needsReview: true,
  },
  {
    heading: "Third party cookies",
    body: [
      "We may permit other parties to place cookies or similar technologies via the services they provide on our website. These can include analytics, embedded content, advertising or other website functionality.",
      "Third party providers have separate privacy policies and terms.",
    ],
    /* Permits advertising cookies set by others, and implies a limit on our
       responsibility for what they do. */
    needsReview: true,
  },
  {
    heading: "Cookies management",
    body: [
      "You can control or delete cookies using the settings in your browser. You may also be able to manage your cookie preferences through a cookie consent tool where available.",
      "Some parts of the website might not work if some cookies are turned off.",
    ],
  },
  {
    heading: "Get in touch",
    body: [
      `For questions about how ${site.name} uses cookies please contact us:`,
      `${site.name}, ${AU_ADDRESS}. Email ${site.email}, phone ${AU.phone}. Website ${site.url}.`,
    ],
  },
];
