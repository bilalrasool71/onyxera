import type { LegalSection } from "./shared";
import { AU, AU_ADDRESS } from "./shared";
import { site } from "@/lib/site";

/* Supplied by the business as final copy for this page, dated 2 September 2026,
   and reproduced clause for clause — one entry per numbered clause, in the
   document's own order. Body copy is the client's wording; the edits are
   limited to obvious typos and Australian spelling:

     - "guaranty" -> "guarantee" and "endeavor" -> "endeavour" (clause 09)
     - "unauthorized" -> "unauthorised" (clause 02)
     - "trademarks" -> "trade marks" (clause 04), AU/IP Australia usage
     - a dropped conjunction in "limited, excluded" -> "limited or excluded"
       (clause 10) and a dropped article in "If client engagement" -> "If a
       client engagement" (clause 13)
     - a scrambled clause in the preamble sentence was re-ordered, not reworded:
       every element of "The signed proposal and agreement for that engagement
       governing Client projects will supersede these website terms" is kept.

   Clause numbers are not carried into `heading` — LegalPage renders headings
   unnumbered, as on the other four legal pages — and the two headings the
   source set in capitals (04, 10) are cased to match the rest. The source
   labelled the second paragraph of clause 10 "1.1"; that is a mis-numbered
   10.1, so it is kept as the clause's second paragraph and the stray label
   dropped. The source's contact block is the only genuine list, so it is the
   only `points`. Address, email and phone are read from `site` so they cannot
   drift from the footer and the schema.

   Deliberately NOT changed, because the fix would alter the client's meaning
   rather than correct a typo: clause 08 says original content "is licensed
   under" applicable IP laws, where "protected under" is the usual formulation.
   Raised for the client rather than silently rewritten.

   Nothing here is legal advice and none of it has been reviewed by a lawyer.
   Clauses a solicitor should confirm carry `needsReview` so they stay visible. */
export const termsSections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      "These Terms and Conditions apply to your use of the OnyxEra Tech website. For client projects, the signed proposal and agreement for that engagement will supersede these website terms.",
      "Use of the website shall be deemed to be your acceptance of these Terms and Conditions. These terms apply only to your use of the website, and do not apply to services provided under a separate client agreement.",
    ],
  },
  {
    heading: "Using this website",
    body: [
      "You may browse, read, share and link to content published on this website for legitimate purposes.",
      "You agree not to misuse the website, attempt to gain unauthorised access, interfere with the operation of the website, scrape content at a level that impacts performance, or reproduce our content as your own.",
    ],
  },
  {
    heading: "Our content",
    body: [
      "OnyxEra Tech owns all website design, written content, code, graphics and brand assets, unless otherwise stated.",
    ],
  },
  {
    /* Flagged for the same reason the previous draft flagged its content
       clause: "used with permission where applicable" is a claim about
       permissions actually held for client names, logos and marks shown on
       the site, and should be confirmed against those permissions. */
    heading: "Information on this website",
    body: [
      "Client names, logos, trade marks and other third party materials are the property of their respective owners and are used with permission where applicable.",
      "We strive to ensure that information on this site is accurate and up-to-date. The information provided on the website is for general informational purposes only and does not constitute a quote, offer, professional advice or warranty.",
      "Pricing, timelines, services and results are subject to change. The terms applicable to a client engagement are those in a signed proposal or agreement.",
    ],
    needsReview: true,
  },
  {
    heading: "Services and proposals",
    body: [
      "The information about our services is designed to demonstrate our capabilities and possible solutions.",
      "No content contained on this website shall be construed to impose any obligation on OnyxEra Tech to provide services. Any engagement is subject to agreed scope, pricing, timeline and a written agreement.",
    ],
  },
  {
    heading: "Case studies and results",
    body: [
      "Case studies, testimonials and results are related to specific projects and scenarios.",
      "Past performance is not a guarantee of future results. Results will vary depending on business, market, budget, competition, implementation and other factors.",
    ],
  },
  {
    heading: "Third party services and links",
    body: [
      "This website may refer to or link to third party platforms, software, websites or services.",
      "OnyxEra Tech has no control over such third party services and makes no warranty as to the availability, content, security, privacy practices or terms of such third party services.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Unless otherwise noted, all original site content created by OnyxEra Tech is licensed under applicable intellectual property laws.",
      "You may not reproduce, modify, distribute or commercially exploit any content, code, designs or brand material without our prior written permission.",
    ],
  },
  {
    heading: "Website availability",
    body: [
      "We will endeavour to ensure the website is available and operating properly but we do not guarantee uninterrupted availability.",
      "The website may sometimes be unavailable because of maintenance, technical problems, hosting problems or circumstances beyond our reasonable control.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by applicable Australian law, OnyxEra Tech shall not be liable for any loss or damage suffered by you as a consequence of your use or reliance on information contained on this website.",
      "Nothing in these terms limits, excludes or modifies any rights or remedies that may not lawfully be limited or excluded under applicable consumer protection laws.",
    ],
    needsReview: true,
  },
  {
    /* The whole of the source's privacy clause is this one sentence. It states
       that personal information may be collected but commits to nothing and
       does not point at the Privacy Policy, so it is flagged rather than
       padded out with wording the document never supplied. */
    heading: "Privacy",
    body: [
      "Your use of this website may involve the collection and processing of personal information.",
    ],
    needsReview: true,
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may change these Terms and Conditions from time to time to reflect changes to the website, our services or applicable requirements.",
      "The most current version will be posted on this page with the date it was updated.",
    ],
  },
  {
    /* Reproduced as supplied. The clause names no jurisdiction — it leaves the
       governing law to be "determined by OnyxEra Tech" — which is exactly the
       point a solicitor needs to settle before launch. */
    heading: "Law and jurisdiction",
    body: [
      "These Terms shall be governed by the applicable law of the jurisdiction as determined by OnyxEra Tech for its website operations.",
      "If a client engagement is subject to a separate written agreement, the governing law and jurisdiction of such agreement will apply to the engagement.",
    ],
    needsReview: true,
  },
  {
    heading: "Contact us",
    body: [
      "Please contact us if you have any inquiries about these Terms and Conditions:",
    ],
    points: [
      `OnyxEra Tech — ${AU_ADDRESS}`,
      `Email: ${site.email}`,
      `Phone: ${AU.phone}`,
      `Website: ${site.url}`,
    ],
  },
];
