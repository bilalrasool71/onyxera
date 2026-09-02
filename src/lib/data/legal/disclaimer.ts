import type { LegalSection } from "./shared";
import { AU, AU_ADDRESS } from "./shared";
import { site } from "@/lib/site";

/* Supplied by the business, 2 Sep 2026, as the final copy for this page. Body
   copy is reproduced as written; the only edits are two "guaranty" typos, a
   "web site" spelling, and a missing full stop that ran two sentences together
   in clause 04 ("...tools and services Availability, policies..."). Headings are
   the client's own words, sentence-cased to match the other policy pages.

   The document's contact block is read from `site` via AU / AU_ADDRESS rather
   than hardcoded, so the address, email and phone cannot drift away from the
   footer and the schema. The supplied values match `site` exactly.

   NOTE the document's "Updated: 2 September 2026" already matches
   `legalUpdated` in ./shared.ts, so nothing there needed changing.

   NOTE unlike the privacy document, this one carried no internal note to
   itself about lawyer review. The clauses that exclude liability or a
   guarantee are flagged with `needsReview` instead. */
export const disclaimerSections: LegalSection[] = [
  {
    heading: "General info",
    body: [
      "The information contained in this website is for general information purposes only. Its purpose is to help visitors learn more about OnyxEra Tech and the services that we offer.",
    ],
  },
  {
    heading: "Not professional advice",
    body: [
      "Nothing on this website is intended to constitute legal, financial, technical, cybersecurity or other professional advice. Specific recommendations should be based on your business needs and situation.",
    ],
  },
  {
    heading: "Services and results",
    body: [
      "We design our services, strategies and recommendations for each engagement. Impressive as past results, case studies and examples are, they do not guarantee the same results for everyone.",
    ],
    needsReview: true,
  },
  {
    heading: "Third-party platforms",
    body: [
      "Our services may include third-party platforms, software, tools and services. Availability, policies and performance are not under our control and may change without notice.",
    ],
  },
  {
    heading: "Website credibility",
    body: [
      "We use reasonable efforts to make sure that the information on this website is correct and up to date. However, we cannot guarantee the completeness, currency or accuracy of any information.",
    ],
    needsReview: true,
  },
  {
    heading: "Liability disclaimer",
    body: [
      "OnyxEra Tech shall have no liability for any loss caused by reliance on information posted on this website to the extent permitted by applicable law. Nothing in this disclaimer will exclude any rights that may not be excluded by law.",
    ],
    needsReview: true,
  },
  {
    heading: "Contact",
    body: [
      `OnyxEra Tech — ${AU_ADDRESS}. Email ${site.email}, phone ${AU.phone}.`,
    ],
  },
];
