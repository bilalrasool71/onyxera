/* Shared types for the per-service modules in this folder. Split out of the
   old 851-line services.ts so each service can be edited independently
   (and so several people can edit different services without conflicting). */
import type { LucideIcon } from "lucide-react";

/** A heading split so the template can paint its tail in brand blue.
    `end` is the punctuation after the highlight and defaults to a full stop —
    the briefs phrase some of these as questions. */
export type SplitHeading = {
  title: string;
  highlight: string;
  end?: string;
  body?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  metric?: string;
};

export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  hero: {
    /** Punctuation after the highlighted tail. Defaults to nothing; the briefs
        phrase some headlines as questions. */
    headlineEnd?: string;
    eyebrow: string;
    headline: string;
    highlight: string;
    sub: string;
  };
  metrics: { value: string; label: string }[];
  capabilities: { icon: LucideIcon; title: string; body: string }[];
  deliverables: string[];
  process: { title: string; body: string; duration: string }[];
  stack: string[];
  faqs: { q: string; a: string }[];
  /** Per-page SEO. Falls back to generated values when absent. */
  seo?: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
    heroAlt: string;
  };
  /** Placeholder artwork; alt text comes from the page brief. */
  images?: { hero?: { src: string; alt: string }; stack?: { src: string; alt: string } };
  /** Three figures under the hero: scope, cadence, feedback. */
  heroStats?: { value: string; label: string }[];
  /** The "you do not know what to build yet" block. */
  problem?: { title: string; sub: string; points: string[]; solution: string };
  /** Closing CTA copy. */
  cta?: {
    title: string;
    body: string;
    /** Overrides the generic service-name eyebrow above the closing band. */
    eyebrow?: string;
    /** The two closing buttons, where the brief names them. */
    primaryLabel?: string;
    secondaryLabel?: string;
    /** Where the second button goes. Defaults to the services list. */
    secondaryHref?: string;
    /** A short line under the buttons, where the brief gives one. */
    note?: string;
  };
  /** The second hero button, after "Get Free Consultation". One per service,
      from the brief’s recommended CTA table — the offer that is specific to
      this discipline rather than the generic ask. */
  heroCta: string;
  /** Overrides the "Discuss Project" hero button, where a brief names its own. */
  heroCtaPrimary?: string;
  /** Overrides the generic "Everything listed here is in the contract" heading
      above the deliverables column, where the brief supplies its own wording. */
  whatYouGet?: { title: string; highlight: string; body: string };
  /** Overrides the generic "We pick boring, well-supported tools" line. */
  stackIntro?: string;
  /** Overrides the ticked ownership note under the stack list. */
  stackNote?: string;
  /** Overrides the generated "Inside <service>." heading and its "N areas we
      cover in depth" line, where the brief supplies its own wording. */
  capabilitiesHeading?: SplitHeading;
  /** Overrides the generated "How <service> engagements run." heading. */
  processHeading?: SplitHeading;
  /** Overrides the generated "<service>, answered straight." FAQ heading. */
  faqHeading?: SplitHeading;
  testimonials: Testimonial[];
  /** Optional: omitted where no client-supplied engagement length exists. */
  timeline?: string;
};
