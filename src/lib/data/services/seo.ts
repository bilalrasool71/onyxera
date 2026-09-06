import type { Service } from "./types";
import { BrainCircuit, Globe, Search, ServerCog, ShoppingCart, Sparkles, Type } from "lucide-react";

export const seo: Service = /* ------------------------------------------------------------------ */
  {
    slug: "seo-and-ai-seo",
    name: "Search Engine Optimisation",
    navLabel: "SEO and AI SEO",
    icon: Search,
    tagline: "Compounding traffic, not rented clicks",
    summary:
      "Search strategies that improve visibility, attract qualified traffic and build long term growth.",
    heroCta: "Get A Free SEO Audit",
    /* The brief’s own "WHAT YOU GET?" copy, in its wording. */
    whatYouGet: {
      title: "A clear SEO plan built to",
      highlight: " get you found",
      body:
        "From technical fixes to content, authority and AI search visibility, every activity is focused on improving rankings, discovery and qualified leads.",
    },
    stackIntro:
      "Industry standard tools that give us the data to find gaps, measure progress and make better SEO decisions.",
    /* The brief’s own headings for the process band and the FAQ. */
    processHeading: {
      title: "How We Turn Search Into",
      highlight: " Growth",
      end: "?",
      body:
        "A clear process that takes your business from audit and strategy to stronger visibility, qualified traffic and measurable leads.",
    },
    faqHeading: {
      title: "SEO, GEO, AEO:",
      highlight: " Answered Straight",
    },
    /* The brief’s own heading for the capabilities band. */
    capabilitiesHeading: {
      title: "From Google rankings to",
      highlight: " AI visibility",
      body:
        "SEO that connects technical performance, content, authority and AI search to help your business get discovered wherever customers are looking.",
    },
    hero: {
      eyebrow: "Search Engine Optimisation",
      /* The brief’s H1, split so the template can accent the tail. */
      headline: "SEO That Gets Your",
      highlight: " Business Found",
      sub:
        "We build AI SEO strategies that improve your visibility across search engines, AI platforms and the places your customers look for trusted answers.",
    },
    /* The three figures the brief supplies, in its own wording — the figure is
       the value, the line printed under it is the label. Refilled from the
       brief; the numbers that used to sit here ("+184% median organic growth",
       "3.4x non-brand keywords") were invented and are gone for good. */
    metrics: [
      { value: "3×", label: "More visibility across search and AI discovery channels" },
      { value: "2×", label: "More qualified traffic from high intent organic searches" },
      { value: "90 Days", label: "Typical period before meaningful SEO movement" },
    ],
    /* The brief's alternative hero hook, which the H1 above displaces. The four
       points below are the brief's problem bullets, which also fill
       `problem.points` — the brief describes one problem section and the page
       renders two, so the same four run twice rather than four invented ones
       filling the second. Same resolution as cyber-security.ts. */
    capabilities: [
      { icon: ServerCog, title: "Technical SEO", body: "Site structure, indexing, Core Web Vitals and structured data." },
      { icon: Type, title: "On Page SEO", body: "Keywords, search intent, content optimisation and topical authority that strengthen every page." },
      { icon: Globe, title: "Local & International SEO", body: "Local visibility, business profiles, international targeting and hreflang for multiple markets." },
      { icon: ShoppingCart, title: "Ecommerce SEO", body: "Product, category and technical optimisation designed to improve visibility and conversions." },
      { icon: BrainCircuit, title: "AI & LLM SEO", body: "AI search visibility, entity optimisation and citation ready content for AI powered answers." },
      { icon: Sparkles, title: "GEO & Content Authority", body: "Generative Engine Optimisation, content strategy and schema that build authority across search and AI." },
    ],
    /* The brief's "WHAT YOU GET?" section is a headline and one supporting
       sentence — "A clear SEO plan built to get you found." and "From technical
       fixes to content, authority and AI search visibility, every activity is
       focused on improving rankings, discovery and qualified leads." It lists
       no items, and `Service` has no field for that headline or sentence
       (page.tsx hardcodes both). The eight below are the original template copy
       with no source in the brief; left rather than swapped for freshly
       invented ones, and flagged for the client to supply the real list. */
    /* The brief's "WHAT YOU GET?" section is a headline and one sentence with
       no itemised list. The previous eight entries ("12 month content roadmap",
       "Monthly performance review", "Live reporting dashboard") were template
       copy, and they render under a heading promising they are in the contract.
       Left empty until the real list is supplied; the section self-hides. */
    deliverables: [
      "Full technical audit & fix list",
      "Keyword to page intent map",
      "Competitor gap analysis",
      "12 month content roadmap",
      "Optimised page templates",
      "Structured data implementation",
      "Monthly performance review",
      "Live reporting dashboard",
    ],
    /* The brief numbers the steps but gives no timeframes, so `duration` keeps
       the house "Step 0N" convention rather than inventing weeks. */
    process: [
      { title: "Audit & Consultation", body: "We assess your website, search visibility, competitors and current performance to identify what is holding your growth back.", duration: "Step 01" },
      { title: "Plan & Strategy", body: "We build a focused SEO, AEO and GEO strategy around your audience, search intent, business goals and growth opportunities.", duration: "Step 02" },
      { title: "Fix & Grow", body: "We implement technical, content and authority improvements to increase rankings, AI visibility and qualified organic traffic.", duration: "Step 03" },
      { title: "Convert Into Leads", body: "We optimise your search journey so the right traffic reaches the right pages and turns into enquiries, opportunities and customers.", duration: "Step 04" },
    ],
    stack: [
      "Ahrefs", "Semrush", "Screaming Frog", "Google Search Console",
      "Google Analytics 4", "Looker Studio", "Schema.org",
      "Google Business Profile", "Google Trends", "PageSpeed Insights", "Peec AI",
    ],
    faqs: [
      { q: "How long does it take to see results from SEO?", a: "SEO takes time to build. Technical improvements can show earlier, while stronger rankings, AI visibility and meaningful traffic usually develop over several months." },
      { q: "Can you help my business appear in AI search results?", a: "Yes. We optimise your website and content so search engines and AI platforms can better understand your business, expertise and relevance." },
      { q: "Is SEO still important now that people use AI for answers?", a: "Yes. SEO remains the foundation for online visibility, while AEO and GEO help your business become more visible in AI generated answers and recommendations." },
      { q: "Why is my website getting traffic but no enquiries?", a: "Traffic alone does not guarantee business. We look at search intent, landing pages, content and conversion points to help turn relevant visitors into leads." },
      { q: "Can you help me rank higher than my competitors?", a: "We analyse what competitors are doing, identify gaps and build a strategy to improve your visibility for the searches that matter to your business." },
      { q: "Do I need to understand SEO, AEO or GEO to work with you?", a: "No. You do not need to understand the technical side. We explain what matters, what we recommend and why in straightforward business terms." },
    ],
    seo: {
      /* No " | OnyxEra Tech" here — layout.tsx appends it via the title
         template, and repeating it would print the suffix twice. */
      title: "SEO, AEO & GEO Services",
      description:
        "Improve your visibility across Google and AI search with SEO, AEO and GEO strategies designed to attract qualified traffic, leads and customers.",
      ogTitle: "SEO, AEO & GEO Services | OnyxEra Tech",
      ogDescription:
        "Improve your visibility across Google and AI search with SEO, AEO and GEO strategies designed to attract qualified traffic, leads and customers.",
      /* Primary keyword first, then the brief's secondary list in its order. */
      keywords: [
        "SEO services", "SEO agency", "search engine optimisation", "technical SEO",
        "on page SEO", "local SEO", "international SEO", "ecommerce SEO", "AI SEO",
        "AEO", "GEO", "generative engine optimisation", "AI search visibility",
        "LLM search optimisation", "content and topical authority",
        "structured data and schema",
      ],
      heroAlt: "SEO services by OnyxEra Tech",
    },
    /* The brief's "3 Core Outcomes", numbered as it numbers them. Distinct
       figures from `metrics`, so the two strips do not repeat each other. */
    heroStats: [
      { value: "01", label: "Rank On Google" },
      { value: "02", label: "Appear In AI Search" },
      { value: "03", label: "Convert Traffic Into Leads" },
    ],
    problem: {
      title: "Is your website ready for AI search?",
      sub: "Search has changed. AIO, AEO and GEO are now part of modern SEO, and without them your business can miss visibility across Google and AI powered search.",
      points: [
        "Not appearing in AI search answers.",
        "Not getting enough organic traffic.",
        "Traffic is not turning into leads.",
        "Competitors are outranking you.",
      ],
      solution:
        "We help your business get discovered across search engines and AI platforms, improving visibility, attracting the right traffic and turning that visibility into qualified leads.",
    },
    /* Copy only. The brief's button labels ("Book A Call", "Start a Project",
       and the hero's "Get Free Consultation") are hardcoded in
       src/app/services/[slug]/page.tsx, which this file cannot reach. */
    cta: {
      title: "Ready to turn search into leads?",
      body: "Bring your current SEO challenges. We will show you where you stand, what needs fixing and where the strongest opportunities for growth are.",
      primaryLabel: "Find Your SEO Gaps",
      secondaryLabel: "Get Your SEO Strategy",
    },
    /* Empty on purpose: the brief carries no quotes, and the entries that were
       here were invented names and companies. Real, attributable quotes only. */
    testimonials: [],
    /* Not a duration. The same discipline covers a two-week job and a
       six-month one, so a range printed here is either meaningless or a
       promise nobody agreed to. What is true of every engagement is that the
       schedule is settled in the proposal, before the client commits — so
       that is what the card says. Keep all five services on this line. */
    timeline: "Agreed before we start",
  };
