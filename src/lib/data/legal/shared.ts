/* Shared types, dates and derived address strings for the per-policy
   modules in this folder. */
/**
 * Legal copy.
 *
 * These describe what the site and the business actually do — static hosting,
 * a contact form, and Google Analytics 4. They are
 * written to be accurate rather than boilerplate, but they are NOT legal advice
 * and have not been reviewed by a lawyer. Anything a solicitor needs to confirm
 * is marked with `needsReview` so it is visible rather than buried.
 */

import { site } from "@/lib/site";

export const legalUpdated = "2026-09-02";

export type LegalSection = {
  heading: string;
  body: string[];
  /** Bullet list rendered under the body. */
  points?: string[];
  /** Flags a clause that needs a solicitor's confirmation before launch. */
  needsReview?: boolean;
};

/* Supplied by the business, 29 Aug 2026, v1.0. Body copy is reproduced as
   written; the only edits are a "fulfilll" typo and a stray full stop in a
   heading. The address and phone are read from `site` so they cannot drift
   away from the footer and the schema.

   NOTE the source document ended with an internal instruction that this copy
   be reviewed by a lawyer before publication, because privacy obligations
   depend on the actual legal entity, technology stack, data flows and client
   locations. That note is not published — it is recorded here instead. */
export const privacyUpdated = "2026-09-02";

export const AU = site.offices.find((o) => o.countryCode === "AU")!;
export const AU_ADDRESS = `${AU.line1}, ${AU.line2}, ${AU.country}`;
