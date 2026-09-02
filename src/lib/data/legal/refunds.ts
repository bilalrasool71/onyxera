import type { LegalSection } from "./shared";
import { AU, AU_ADDRESS } from "./shared";
import { site } from "@/lib/site";

/* Supplied by the business, 2 Sep 2026, as the final copy for this page. The
   six numbered clauses are reproduced one-to-one, in order. Edits are limited
   to spelling and formatting:
     - "cancelation" -> "cancellation" (Australian English), five occurrences;
     - clause headings normalised to sentence case, matching the other
       policies in this folder. The source title-cases them inconsistently
       ("Scope Of This Policy" but "Non-refundable services").
   Wording, order and the client's terms are otherwise untouched. In
   particular nothing here has been softened: the source asserts that deposits,
   third-party costs and delivered services are non-refundable, and it says so
   in those words.

   Address, email and phone come from `site` through ./shared rather than being
   typed out, so they cannot drift away from the footer, the contact page and
   the schema. The source writes the address unpunctuated on one line; the
   derived string is the same address with its commas.

   Three things in the source were left as written rather than guessed at, and
   want the client's confirmation:
     - clause 01 carries the fragment "Refund, Cancellation and Payment Terms."
       mid-paragraph, which reads like a sub-heading pasted inline. Deleting it
       is not a typo fix, so it stays.
     - clause 02's heading, "No going forward", is an odd label for a
       cancellation clause. Kept verbatim; it is not obviously a typo.
     - clause 04's "Non-refundable third party costs ... may also be
       non-refundable" is circular as written.

   The document opens with an unnumbered lead paragraph. `LegalSection` needs a
   heading per entry, so that paragraph runs as the opening of clause 01; it
   would sit more naturally as the page's `intro`, which lives in the route
   file rather than here.

   Unlike the privacy document, this one carried no internal note to itself, so
   there was nothing of that kind to hold back from the published copy. */
export const refundSections: LegalSection[] = [
  {
    heading: "Scope of this policy",
    body: [
      "OnyxEra Tech delivers professional digital services including web design, software development, automation, SEO, digital marketing and cyber security. Given the time, expertise and project resources needed for these services, refunds will be determined based on the nature and progress of the engagement.",
      "This policy applies to services bought directly from OnyxEra Tech. Refund, Cancellation and Payment Terms. Where applicable, the specific refund, cancellation and payment terms agreed to in a signed proposal or client agreement will supersede this policy.",
    ],
    needsReview: true,
  },
  {
    heading: "No going forward",
    body: [
      "The client may request cancellation of a project by contacting us in writing. Where work has already started, fees for work done, resources committed, third party expenses and other approved expenses may still be charged.",
      "Any amount to be refunded will be calculated on the basis of the work done and the payments already committed.",
    ],
    needsReview: true,
  },
  {
    heading: "Return policy",
    body: [
      "Refunds may be considered if the relevant service has not yet begun by OnyxEra Tech, or if the signed client agreement expressly states a refund.",
      "Payments are for professional services and as such, and because development time and resources have been provided, they are non-refundable once substantial work has been performed.",
    ],
    needsReview: true,
  },
  {
    heading: "Deposits & payment",
    body: [
      "Project deposits and milestone payments secure resources and allow work to commence. These are usually linked to the scope of the project that has been agreed and are not always refundable once work has commenced.",
      "Non-refundable third party costs such as hosting, software subscriptions, licences, advertising spend or other external services may also be non-refundable.",
    ],
    needsReview: true,
  },
  {
    /* The "these include, but are not limited to" run is the one genuine list
       in the document, but it is not `points`: the clause ends with a further
       paragraph, and LegalPage renders every `body` paragraph *before* the
       bullets. Splitting the list out would lift that closing sentence above
       the colon that introduces the items. Kept as the client's prose. */
    heading: "Non-refundable services",
    body: [
      "Some services may not be eligible for a refund once delivered or commenced. These include, but are not limited to: completed development work, design work, SEO work, marketing campaign management, automation setup, consulting, security assessments and other professional services.",
      "Where a service has an agreed cancellation or refund provision, the terms of that agreement shall apply.",
    ],
    needsReview: true,
  },
  {
    heading: "Requesting a refund",
    body: [
      "To make a refund request, send a written request to:",
      `OnyxEra Tech, ${AU_ADDRESS}. Email ${site.email}, phone ${AU.phone}.`,
      "Please provide your name, project or service, payment details and reason for request. We will review the request and respond in a reasonable time.",
      "Where client agreements and signed proposals contain specific payment, cancellation or refund terms, these shall take precedence.",
    ],
    needsReview: true,
  },
];
