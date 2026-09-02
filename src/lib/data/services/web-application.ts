import type { Service } from "./types";
import { BarChart3, Blocks, Cable, CreditCard, RefreshCcw, Smartphone } from "lucide-react";

export const web_application: Service = /* ------------------------------------------------------------------ */
  {
    slug: "web-application",
    name: "Web Application Development",
    navLabel: "Web Design & Applications",
    icon: Blocks,
    tagline: "Products that hold up under real load",
    summary:
      "Scalable web platforms and custom applications built around how your business operates.",
    hero: {
      eyebrow: "Web Application Development",
      headline: "Web application development built around",
      highlight: " your business",
      sub:
        "From SaaS platforms and business portals to dashboards, APIs and custom applications, we build secure, scalable software designed around how your business actually works.",
    },
    metrics: [
      { value: "4", label: "Development Stages" },
      { value: "1", label: "Dedicated Team" },
      { value: "1", label: "Scalable Foundation" },
    ],
    capabilities: [
      { icon: Blocks, title: "SaaS Platforms", body: "Scalable software built for growing businesses." },
      { icon: BarChart3, title: "Data Heavy Dashboards", body: "Complex data made simple to understand." },
      { icon: Cable, title: "APIs & Integrations", body: "Connect your tools and systems seamlessly." },
      { icon: CreditCard, title: "Payments & Subscriptions", body: "Secure payment flows built into your platform." },
      { icon: Smartphone, title: "Progressive Web Apps", body: "App like experiences, accessible from the web." },
      { icon: RefreshCcw, title: "Legacy Modernisation", body: "Upgrade outdated systems without disrupting operations." },
    ],
    deliverables: [
      "Technical Architecture Document",
      "Typed Codebase, End To End",
      "Component & Design System",
      "Automated Test Suite",
      "CI/CD Pipeline",
      "Staging + Production Environments",
      "Monitoring & Error Tracking",
      "Handover Session + Written Docs",
    ],
    /* The brief numbers these 01–04 and gives no week ranges, so `duration`
       carries the step number — the same convention the other services use. */
    process: [
      {
        title: "Understand",
        body: "We learn how your business works, what you need and what is getting in the way.",
        duration: "Step 01",
      },
      {
        title: "Plan",
        body: "The right website, application, features and technology are mapped before we build.",
        duration: "Step 02",
      },
      {
        title: "Build",
        body: "You see real progress as we turn the plan into a working solution.",
        duration: "Step 03",
      },
      {
        title: "Launch",
        body: "Everything is tested, refined and ready for your team and customers to use.",
        duration: "Step 04",
      },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "Docker",
      "Playwright",
      "Stripe",
    ],
    faqs: [
      {
        q: "I am not technical — can you help me figure out what I actually need?",
        a: "Yes. We start with your business, goals and current processes, then recommend the right solution without unnecessary technical complexity.",
      },
      {
        q: "Do I need a website, web application or something else?",
        a: "Not every business needs a complex application. We help you understand what will actually solve the problem before recommending what to build.",
      },
      {
        q: "How much does a custom web application cost?",
        a: "It depends on the features, integrations and complexity involved. We define the scope first, then provide a clear proposal based on what your business actually needs.",
      },
      {
        q: "Can you build something from just my idea?",
        a: "Yes. You can come to us with an idea, rough concept or business problem. We can help turn it into a practical plan and working application.",
      },
      {
        q: "Can you improve our existing website or software?",
        a: "Yes. We can review what you already have and recommend whether it should be improved, integrated, modernised or rebuilt.",
      },
      {
        q: "What happens after the application is launched?",
        a: "We can provide documentation, handover, maintenance and ongoing support so your business is not left alone with the software.",
      },
    ],
    seo: {
      title: "Web Application Development Services",
      description:
        "Custom web application development for SaaS, business platforms, dashboards and integrations. Build the right solution with OnyxEra Tech.",
      ogTitle: "Web Application Development Built Around Your Business",
      ogDescription:
        "Custom web applications, SaaS platforms, dashboards and integrations built around your business needs.",
      keywords: [
        "custom web application development",
        "web application development services",
        "custom web applications",
        "SaaS development",
        "business application development",
        "web app development",
        "custom software development",
        "API integrations",
        "application modernisation",
        "web application design",
      ],
      heroAlt: "web application development services by OnyxEra Tech",
    },
    images: {
      hero: {
        src: "/images/web-application-hero.png",
        alt: "web application development services by OnyxEra Tech",
      },
      stack: {
        src: "/images/web-application-stack.png",
        alt: "web application development technology stack",
      },
    },
    heroStats: [
      { value: "4–6 Weeks", label: "Typical timeline for focused web applications" },
      { value: "3–5 Milestones", label: "Clear progress from planning to launch" },
      { value: "2–4 Review Cycles", label: "Structured feedback before final delivery" },
    ],
    problem: {
      title: "Not sure what website your business actually needs?",
      sub: "Starting online is easy. Knowing what to build is the hard part.",
      points: [
        "Don't know where to start",
        "Not sure what your website needs",
        "Confused between website, store or app",
        "Worried about wasting money",
      ],
      solution:
        "We understand your business first, then build the right digital solution around it.",
    },
    cta: {
      title: "Have an idea? Let's build the right thing.",
      body: "Tell us the problem. We'll define the right web application, scope the work and show you what comes next.",
    },
    /* Empty on purpose. The brief supplies no client quotes for this service —
       the three that used to sit here were invented, and the brief marks the
       band between the FAQs and the closing CTA "Remove it". Nothing goes back
       in here until a real, attributable quote exists. */
    testimonials: [],
    /* Still pointing at a placeholder entry in case-studies.ts. The brief's
       three real case studies (SnowAds, the Laravel VPS/API deployment and the
       matrimonial platform) are not in that file yet, so there is no honest
       slug to point at — re-point this once they are added. */
    timeline: "4–6 weeks",
  };
