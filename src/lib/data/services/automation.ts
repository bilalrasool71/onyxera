import type { Service } from "./types";
import { BarChart3, Boxes, BrainCircuit, Cable, ClipboardCheck, Workflow } from "lucide-react";

export const automation: Service = /* ------------------------------------------------------------------ */
  {
    slug: "automation",
    name: "Automation & AI Workflows",
    navLabel: "Automation",
    icon: Workflow,
    tagline: "Give your team their week back",
    summary:
      "AI-powered workflows and smart integrations that reduce manual work and improve efficiency.",
    hero: {
      eyebrow: "Automation & AI Workflows",
      headline: "Automation that gives your team",
      highlight: " time back",
      sub:
        "We automate repetitive processes so your team can spend less time on busywork and more time growing the business.",
    },
    /* The three figures the brief supplies, in the brief's own wording. They
       used to be repeated verbatim in `heroStats`, which renders a second
       identical MetricStrip further down the page — see the note where
       `heroStats` used to sit. */
    metrics: [
      { value: "1,900 hrs", label: "Median manual hours removed per year" },
      { value: "3 to 7 Weeks", label: "Typical time to first automation" },
      { value: "8 Months", label: "Average payback period" },
    ],
    /* Unverified: the brief carries one problem section, and it is mapped to
       `problem` below. The page renders a second symptom list from these four,
       which are older placeholder lines with invented specifics ("eleven manual
       steps across four tools"). Left in place because copying the brief's
       points here would print the same four bullets twice on one page — they
       need either real copy from the client or the section removing. */
    images: {
      hero: {
        src: "/images/automation-hero.jpg",
        alt: "AI automation and workflow services by OnyxEra Tech",
      },
    },
    capabilities: [
      { icon: Workflow, title: "Process Automation", body: "Automate repetitive workflows across the tools your team already uses." },
      { icon: Cable, title: "Systems Integration", body: "Connect your CRM, ERP, finance and support systems so information moves automatically." },
      { icon: BrainCircuit, title: "AI Assisted Workflows", body: "Use AI for tasks such as document extraction, classification, summarisation and drafting." },
      { icon: Boxes, title: "Internal Business Tools", body: "Replace shared spreadsheets with practical tools built around your team's workflows." },
      { icon: BarChart3, title: "Reporting Automation", body: "Turn recurring exports and manual reports into automated data flows and dashboards." },
      { icon: ClipboardCheck, title: "Document Automation", body: "Automate quotes, invoices, contracts and compliance documents from creation to filing." },
    ],
    deliverables: [
      "Process Mapping Workshop",
      "Automation Opportunity Register",
      "ROI Model Per Workflow",
      "Built And Tested Automations",
      "Error Handling And Alerting",
      "Runbook Documentation",
      "Team Enablement Session",
      "30 Day Stabilisation Support",
    ],
    process: [
      { title: "Understand The Work", body: "We observe how the process actually happens before deciding what should be automated.", duration: "Step 01" },
      { title: "Prioritise The Opportunity", body: "We compare time saved, error risk and build effort to identify the workflows worth automating first.", duration: "Step 02" },
      { title: "Build & Test", body: "We build the highest value workflow and run it alongside the manual process until your team trusts it.", duration: "Step 03" },
      { title: "Launch & Improve", body: "We train your team, document the workflow and monitor it so the automation keeps working after launch.", duration: "Step 04" },
    ],
    stack: [
      "n8n", "Make", "Zapier", "Python", "Node.js",
      "Airtable", "Retool", "Claude API", "Temporal", "AWS Lambda",
    ],
    faqs: [
      { q: "Do I need to replace my existing software?", a: "Usually not. Many useful automations connect the tools you already use rather than replacing them." },
      { q: "How do I know what should be automated?", a: "We look at the repetitive work your team performs, how much time it takes, the risk of errors and the potential return before recommending what to automate." },
      { q: "Can automation reduce the need for manual work?", a: "Yes. The goal is usually to remove repetitive and error prone tasks so your team can spend more time on work that requires judgement and customer interaction." },
      { q: "Can you connect our existing systems?", a: "Yes. We can connect suitable CRM, finance, support, reporting and other business systems so information moves between them automatically." },
      { q: "Where does AI fit into automation?", a: "AI works well for tasks involving language and information, such as document extraction, classification, summarisation and drafting. For financial or irreversible actions, we recommend appropriate human approval." },
      { q: "How do you know whether automation is actually saving us money?", a: "We establish a baseline before building, including time spent and error rates, then compare the results after implementation." },
    ],
    seo: {
      title: "Automation Services & AI Workflows",
      description:
        "Automate repetitive work, connect your systems and reduce manual tasks with AI automation and workflow solutions built around your business.",
      ogTitle: "Automation Built Around How Your Business Works",
      ogDescription:
        "Connect your systems, automate repetitive work and use AI where it makes sense to create faster, more reliable business processes.",
      keywords: [
        "automation services",
        "business process automation",
        "workflow automation",
        "AI automation",
        "AI workflow automation",
      ],
      heroAlt: "AI automation and workflow services by OnyxEra Tech",
    },
    /* No `heroStats`. It held the same three figures as `metrics`, and the
       service page renders a MetricStrip for each — the page showed the
       identical panel twice. The brief supplies one stat block, so it lives in
       `metrics` (directly under the hero) and the optional second strip is
       omitted rather than padded out with figures the brief does not give. */
    problem: {
      title: "Spending hours on work that could be automated?",
      sub: "Growing businesses often collect manual processes without realising how much time, money and attention they consume.",
      points: [
        "Spending hours every day on repetitive tasks.",
        "Manually moving information between different tools.",
        "Losing time waiting for approvals and updates.",
        "Simple processes taking too many steps and people.",
      ],
      solution:
        "We identify the work costing your team the most time, then automate the right processes so your people can focus on work that actually needs them.",
    },
    cta: {
      title: "Ready to give your team time back?",
      body: "Tell us which process is slowing your business down. We will identify what can be automated, what it could save and what should happen next.",
    },
    /* Empty on purpose. This held three named quotes — Yusuf Demir at
       Brightpath Advisory, Helen Marsh at Kestrel Manufacturing, Andre Silva at
       Corvid Logistics — with figures such as "4,000 documents/month" and
       "99.2% accuracy". None of it appears in the automation brief or anywhere
       else we can source, so it is removed rather than reworded. Add real,
       attributable quotes here when the client supplies them. */
    testimonials: [],
    /* Unverified: the brief's automation case studies (the PHP ERP integration,
       the e-commerce recommendation work and the tax document automation) have
       no slug in src/lib/data/case-studies.ts, so this still points at the
       placeholder entry. Repoint it once a real case study exists. */
    timeline: "3–7 weeks",
  };
