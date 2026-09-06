import {
  ClipboardList,
  Compass,
  Globe2,
  Handshake,
  Layers,
  MessagesSquare,
  Ruler,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Real clients, with logo files served from `public/clients/`.
 *
 * The artwork was supplied via webappconsulting.com.au and is stored locally
 * rather than hot-linked. Each mark is the client's own trade mark — see the
 * note in the README about confirming display permission.
 */
export const clients: { name: string; logo: string }[] = [
  { name: "Greyhound Racing SA", logo: "/clients/grsa.webp" },
  { name: "Toyota Dealers", logo: "/clients/toyota-dealers.webp" },
  { name: "Nebula IMS", logo: "/clients/nebula-ims.webp" },
  { name: "Master Plumbers", logo: "/clients/master-plumbers.webp" },
  { name: "Aussies Discount Chemist", logo: "/clients/aussie-discount-chemist.webp" },
  { name: "Esena Energy", logo: "/clients/esena-energy.webp" },
  { name: "Master Builders", logo: "/clients/master-builders.webp" },
  { name: "Department of Education SA", logo: "/clients/dept-of-edu-sa.webp" },
];

/* The four figures the client supplies, and the only four anywhere on the site.
   This list previously read "11 yrs" and "18 specialists", neither of which the
   brief supports — it says 10+ years and 20+ specialists. Nothing imports this
   export today (the hero and the about page each carry their own copy), so it is
   corrected rather than left to contradict them. */
export const agencyStats = [
  { value: "10", suffix: "+", label: "Years in business" },
  { value: "140", suffix: "+", label: "Projects delivered" },
  { value: "94", suffix: "%", label: "Clients who return" },
  { value: "20", suffix: "+", label: "Specialists on the team" },
];

/**
 * "The Standards Behind Our Work" — the client's own six, in the brief's order
 * and wording. The previous set was written here rather than supplied, and it
 * carried specifics the brief does not ("the first week", "eighteen months",
 * "two-week sprints"), so it is replaced outright rather than edited around.
 * Only the icons are ours: the brief supplies no imagery.
 */
export const principles: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Compass,
    title: "Strategy Before Execution",
    body: "We understand the business, the problem and the goal before we start building.",
  },
  {
    icon: Ruler,
    title: "Simple Is Better",
    body: "We avoid unnecessary complexity and focus on what your business actually needs.",
  },
  {
    icon: MessagesSquare,
    title: "Talk To The Experts",
    body: "You work directly with the people planning and delivering your project.",
  },
  {
    icon: ClipboardList,
    title: "Clear Progress",
    body: "You always know what we are working on, what is next and what has been delivered.",
  },
  {
    icon: ShieldCheck,
    title: "You Own What We Build",
    body: "Your website, software, accounts, data and digital assets remain yours.",
  },
  {
    icon: Handshake,
    title: "We Tell You What You Need To Hear",
    body: "If something is unnecessary, we will say so instead of selling you more work.",
  },
];

/**
 * "From Idea to Execution" — the home page's four steps, in the brief's wording.
 *
 * The old set invented its own stages *and* their durations ("30 min", "3–5
 * days", "Final 2 weeks"); none of those commitments appear in the brief, and
 * a timeframe published on the home page is a promise, so they are gone rather
 * than reworded. `ProcessSteps` requires a `duration` chip, so it carries the
 * step's position — which the brief does give — instead of a made-up figure.
 *
 * The About page tells the same four steps as `deliveryProcess`. They are kept
 * as two lists on purpose: the pages are briefed separately, and one editing
 * the other's copy from a distance is the kind of surprise that survives review.
 */
export const engagementSteps = [
  {
    title: "Understand",
    body: "Goals, challenges, audience, existing systems and priorities are reviewed to define what actually needs to be solved.",
    duration: "Step 01",
  },
  {
    title: "Plan",
    body: "We recommend the right approach, define deliverables, timelines and priorities, and give you a clear path forward.",
    duration: "Step 02",
  },
  {
    title: "Build & Execute",
    body: "Our specialists design, develop, automate, optimise or launch with clear communication and progress throughout.",
    duration: "Step 03",
  },
  {
    title: "Launch & Grow",
    body: "Once live, we measure performance, refine what matters and provide ongoing support to help the solution keep delivering value.",
    duration: "Step 04",
  },
];

/**
 * The /services FAQ — not home page content, so the home brief leaves it
 * alone. One entry has been deleted rather than reworded: it asked "Do you
 * work with companies outside the US?" and answered that "roughly 40% of our
 * clients are in Europe, the UK and Australia". The percentage is supplied by
 * no document, and the question framed OnyxEra as a US business — it is an
 * Australian one, and the US address is a mailing address only. Writing a
 * replacement would have meant inventing a second set of figures.
 *
 * Three of the four below still carry commitments no document supports —
 * capacity "within two to four weeks", fixing a missed phase "at our cost",
 * exiting "at any phase boundary with no penalty", and a team of "two to four
 * specialists". They are flagged for whoever owns /services rather than
 * rewritten from here.
 */
export const generalFaqs = [
  {
    q: "How quickly can you start?",
    a: "We usually have capacity for a new engagement within two to four weeks. Discovery work and audits can often begin sooner, and genuine security incidents jump the queue.",
  },
  {
    q: "Can you handle more than one service at once?",
    a: "That is where we are strongest. A site redesigned without SEO input loses rankings; ads sent to an unconverting page waste budget. When services are combined we run them from one roadmap with one point of contact.",
  },
  {
    q: "What if we are not happy with the work?",
    a: "Every phase has a defined deliverable and an approval gate. If a phase misses the mark we fix it at our cost. If the relationship is not working, contracts can be ended at any phase boundary with no penalty. You keep everything produced up to that point.",
  },
  {
    q: "Who will actually be working on our project?",
    a: "A named lead plus two to four specialists, introduced by name in the proposal. The people you meet in the pitch are the people who do the work. We do not run a bait and switch between sales and delivery.",
  },
];

export const contactReasons = [
  "Web Application",
  "Website Design",
  "SEO",
  "Digital Marketing",
  "Automation",
  "Cyber Security",
  "Not sure yet",
];

/* ------------------------------------------------------------------ */
/* About page                                                          */
/* ------------------------------------------------------------------ */

/* The four content-card figures from the About brief, and the only four on the
   page. Same numbers as `agencyStats` above — the two lists are kept apart
   because the pages are briefed separately, not because the figures differ. */
export const aboutStats = [
  { value: "10+", label: "Years in business" },
  { value: "140+", label: "Projects delivered" },
  { value: "94%", label: "Clients who return" },
  { value: "20+", label: "Specialists on the team" },
];

/**
 * The origin story, told as four turning points rather than a wall of prose.
 * Markers, eyebrows, titles and bodies are all the client's, from the About
 * brief; only the icons are ours, since the brief supplies no imagery.
 */
export const originStory: {
  marker: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    marker: "01",
    eyebrow: "25+ Years",
    title: "Experience shaped the way we think.",
    body: "Years spent building businesses, developing brands and solving real operational challenges showed us that technology only creates value when it serves the business behind it.",
    icon: Compass,
  },
  {
    marker: "02",
    eyebrow: "The Realisation",
    title: "Technology needs understanding, not just implementation.",
    body: "Working across Singapore and other markets revealed a common gap: businesses were adopting technology without always getting the guidance, support or outcomes they actually needed.",
    icon: Globe2,
  },
  {
    marker: "03",
    eyebrow: "The Beginning",
    title: "Two journeys came together.",
    body: "Different experiences, industries and perspectives led to one shared vision: create a digital partner that listens first, recommends honestly and builds around what the business truly needs.",
    icon: Handshake,
  },
  {
    marker: "04",
    eyebrow: "OnyxEra Today",
    title: "Technology built around people and progress.",
    body: "From websites and software to AI, automation, marketing and cybersecurity, OnyxEra brings connected expertise together to help businesses work smarter, grow confidently and prepare for what's next.",
    icon: Sparkles,
  },
];

/**
 * "Different expertise. One connected team." — the six headings and one-line
 * descriptions the About brief supplies, in its order and wording. Icons are
 * ours; the brief supplies none.
 */
export const differentiators: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Business Problem Before Technology",
    body: "Solve the right problem before choosing the technology.",
    icon: Compass,
  },
  {
    title: "One Team, Connected Expertise",
    body: "Multiple disciplines, one team and one clear direction.",
    icon: Users,
  },
  {
    title: "Technology Built for Outcomes",
    body: "Every solution is built around a measurable business goal.",
    icon: Target,
  },
  {
    title: "Automation Without Unnecessary Complexity",
    body: "Automate more without making your business harder to manage.",
    icon: Workflow,
  },
  {
    title: "Built to Scale, Not Rebuild",
    body: "Flexible technology designed to grow with your business.",
    icon: Layers,
  },
  {
    title: "Advice You Can Actually Act On",
    body: "Clear recommendations that turn into practical next steps.",
    icon: MessagesSquare,
  },
];

/**
 * "From Idea to Execution" — the About page's four steps, in the brief's
 * wording. `ProcessSteps` requires a `duration` chip; the brief gives no
 * timeframes, so it carries the step's position rather than an invented figure.
 */
export const deliveryProcess = [
  {
    title: "Understand",
    body: "Goals, challenges, audience, existing systems and priorities are reviewed to define what actually needs to be solved.",
    duration: "Step 01",
  },
  {
    title: "Plan",
    body: "We recommend the right approach, define deliverables, timelines and priorities, and give you a clear path forward.",
    duration: "Step 02",
  },
  {
    title: "Build & Execute",
    body: "Our specialists design, develop, automate, optimise or launch with clear communication and progress throughout.",
    duration: "Step 03",
  },
  {
    title: "Launch & Grow",
    body: "Once live, we measure performance, refine what matters and provide ongoing support to help the solution keep delivering value.",
    duration: "Step 04",
  },
];

/**
 * Real client work, supplied by the client — names, quotes and project scope
 * all come from the brief rather than being written here.
 */
export const clientStories: {
  client: string;
  project: string;
  quote: string;
  /** The client’s own mark, square-cropped. Brief: "use its original image". */
  logo: string;
}[] = [
  {
    client: "Greyhound Racing SA",
    logo: "/clients/grsa.webp",
    project: "Content Management & Digital Solutions",
    quote:
      "OnyxEra helped us improve how our content and digital systems were managed, giving our team a more reliable way to keep everything organised and up to date.",
  },
  {
    client: "Toyota Dealers",
    logo: "/clients/toyota-dealers.webp",
    project: "Website Design & Lead Generation",
    quote:
      "The landing pages gave our marketing team a much stronger way to turn campaigns into enquiries. The experience was simple, focused and built around conversion.",
  },
  {
    client: "Nebula IMS",
    logo: "/clients/nebula-ims.webp",
    project: "SaaS Platform Development & Support",
    quote:
      "OnyxEra helped us build and support a SaaS platform around our business needs, giving us the technology foundation to operate more efficiently as the product evolved.",
  },
  {
    client: "Master Plumbers South Australia",
    logo: "/clients/master-plumbers.webp",
    project: "ERP & Business Management Solution",
    quote:
      "The new ERP brought customer management, HR and project management into one connected system, making it much easier to manage the business.",
  },
  {
    client: "Aussies Discount Chemist",
    logo: "/clients/aussie-discount-chemist.webp",
    project: "Web Platform & Content Management",
    quote:
      "Having our website and content management brought together in one platform made the whole system easier to manage and maintain.",
  },
  {
    client: "Esena Energy",
    logo: "/clients/esena-energy.webp",
    project: "Business Management Platform",
    quote:
      "Consolidating seven separate applications into one business management platform gave us a much simpler and more efficient way to run our operations.",
  },
];

/** The questions the home page answers, straight from the brief. */
export const homeFaqs = [
  {
    q: "Can you build a web application around our existing business processes?",
    a: "Yes. We can work with your existing systems, workflows and requirements to build a web application that fits how your business actually operates.",
  },
  {
    q: "Can you redesign our website without starting everything from scratch?",
    a: "Absolutely. We can assess the existing website, identify what is working and what is holding it back, then improve the design, experience and performance where it matters.",
  },
  {
    q: "How long does it take to see results from SEO?",
    a: "SEO is a long term growth channel, and results depend on your market, competition and starting point. We focus on building sustainable visibility rather than chasing short term rankings.",
  },
  {
    q: "Can you manage both Google Ads and Meta Ads for our business?",
    a: "Yes. We can manage the strategy, campaigns, creative, tracking and optimisation across Google and Meta, with the focus on qualified leads and measurable business results.",
  },
  {
    q: "What parts of our business can you automate?",
    a: "Usually the repetitive work: lead capture, CRM updates, follow ups, reporting, data movement and internal workflows. We identify the highest value opportunities before recommending what to automate.",
  },
  {
    q: "How do we know if our website or systems are actually secure?",
    a: "We assess your existing setup for vulnerabilities, configuration issues and potential risks, then provide clear recommendations on what needs attention and why.",
  },
];
