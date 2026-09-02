/* Shared types for the per-service modules in this folder. Split out of the
   old 851-line services.ts so each service can be edited independently
   (and so several people can edit different services without conflicting). */
import type { LucideIcon } from "lucide-react";

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
  cta?: { title: string; body: string };
  testimonials: Testimonial[];
  /** Optional: omitted where no client-supplied engagement length exists. */
  timeline?: string;
};
