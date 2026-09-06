import type { Service } from "./types";
import {
  BadgeDollarSign,
  BrainCircuit,
  Cable,
  ClipboardCheck,
  FileSearch,
  Headset,
  Map,
  MessageSquareHeart,
  Network,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";

export const automation: Service = /* ------------------------------------------------------------------ */
  {
    slug: "automation",
    name: "Automation & AI Workflows",
    navLabel: "Automation",
    icon: Workflow,
    tagline: "Give your team their week back",
    summary:
      "AI powered workflows and smart integrations that reduce manual work and improve efficiency.",
    heroCta: "Get Your Automation Assessment",
    capabilitiesHeading: {
      title: "From Manual Work To",
      highlight: " Automated Workflows",
      body:
        "We connect the tools you already use, automate repetitive processes and introduce AI where it can create a practical business advantage.",
    },
    whatYouGet: {
      title: "A Clear Automation Plan.",
      highlight: " Real Business Impact",
      body:
        "Every workflow is mapped, prioritised and measured so you know what is being automated, why it matters and what it should save.",
    },
    stackIntro:
      "We use proven automation tools that your team can understand, maintain and build on.",
    /* The brief's own line for the ticked note under the stack list. */
    stackNote:
      "Your automation should belong to your business, not the person who built it.",
    processHeading: {
      title: "A Clear Path From Manual To",
      highlight: " Automated",
      body:
        "A practical four step process that starts with understanding the work and ends with a workflow your team can trust.",
    },
    hero: {
      eyebrow: "Automation & AI Workflows",
      headline: "Automation That Gives Your",
      highlight: " Team Time Back",
      sub:
        "We automate repetitive processes so your team can spend less time on busywork and more time growing the business.",
    },
    /* The three figures the brief supplies, in the brief's own wording. They
       used to be repeated verbatim in `heroStats`, which renders a second
       identical MetricStrip further down the page — see the note where
       `heroStats` used to sit. */
    metrics: [
      { value: "6+ Solution Areas", label: "Design, development, CRM, ERP, software and automation" },
      { value: "15+ Platforms & Technologies", label: "Proven tools selected around your business requirements" },
      { value: "100% Business Focused", label: "Every solution starts with your processes, goals and customers" },
    ],
    /* Unverified: the brief carries one problem section, and it is mapped to
       `problem` below. The page renders a second symptom list from these four,
       which are older placeholder lines with invented specifics ("eleven manual
       steps across four tools"). Left in place because copying the brief's
       points here would print the same four bullets twice on one page — they
       need either real copy from the client or the section removing. */
    /* The brief's "AI Powered Automation Services", in its own order and
       wording. Replaces the six that were here. */
    capabilities: [
      { icon: Workflow, title: "Business Process Automation", body: "Automate repetitive tasks and streamline everyday business workflows." },
      { icon: MessageSquareHeart, title: "AI Powered Customer Engagement", body: "Use AI to deliver faster and more personalised customer interactions." },
      { icon: Network, title: "Enterprise Automation & RPA", body: "Automate complex processes and connect systems across your organisation." },
      { icon: Cable, title: "n8n Workflow Automation & Integrations", body: "Connect your tools and automate workflows across your business." },
      { icon: BrainCircuit, title: "AI Automation Consulting & Testing", body: "Identify practical AI opportunities and validate them before implementation." },
      { icon: UserPlus, title: "Lead Nurturing Automation", body: "Automatically follow up, qualify and nurture leads across multiple channels." },
      { icon: BadgeDollarSign, title: "Revenue Operations Automation", body: "Automate sales processes, CRM updates, lead routing and reporting." },
      { icon: Headset, title: "AI Service Desk Automation", body: "Automate support enquiries, ticket routing and routine service requests." },
      { icon: ClipboardCheck, title: "Finance Operations Automation", body: "Automate invoicing, payments, approvals and financial workflows." },
      { icon: Users, title: "People Operations Automation", body: "Streamline recruitment, onboarding, HR requests and employee workflows." },
      { icon: FileSearch, title: "Intelligent Document Processing", body: "Use AI to extract, classify and process business documents automatically." },
      { icon: Map, title: "Automation Strategy", body: "Identify the right processes to automate and build a practical implementation roadmap." },
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
        "Automate repetitive work, connect business systems and improve efficiency with AI automation, workflow solutions and practical process automation.",
      ogTitle: "Automation Services & AI Workflows | OnyxEra Tech",
      ogDescription:
        "Automate repetitive work, connect business systems and improve efficiency with AI automation, workflow solutions and practical process automation.",
      keywords: [
        "automation services",
        "business process automation",
        "workflow automation",
        "AI automation",
        "AI workflow automation",
      ],
      heroAlt: "AI automation and workflow services by OnyxEra Tech",
    },
    /* The brief's "3 Core Outcomes". `metrics` above carries the figures; this
       is the second strip, numbered, the same shape the SEO page uses. */
    heroStats: [
      { value: "01", label: "Save Time" },
      { value: "02", label: "Reduce Errors" },
      { value: "03", label: "Scale Operations" },
    ],
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
      primaryLabel: "Let’s Talk",
      secondaryLabel: "Find What You Can Automate",
      note: "Typical reply within 4 business hours",
    },
    /* Empty on purpose. This held three named quotes — Yusuf Demir at
       Brightpath Advisory, Helen Marsh at Kestrel Manufacturing, Andre Silva at
       Corvid Logistics — with figures such as "4,000 documents/month" and
       "99.2% accuracy". None of it appears in the automation brief or anywhere
       else we can source, so it is removed rather than reworded. Add real,
       attributable quotes here when the client supplies them. */
    testimonials: [],
    /* Unverified: the brief's automation case studies (the PHP ERP integration,
       the ecommerce recommendation work and the tax document automation) have
       no slug in src/lib/data/case-studies.ts, so this still points at the
       placeholder entry. Repoint it once a real case study exists. */
    /* Not a duration. The same discipline covers a two-week job and a
       six-month one, so a range printed here is either meaningless or a
       promise nobody agreed to. What is true of every engagement is that the
       schedule is settled in the proposal, before the client commits — so
       that is what the card says. Keep all five services on this line. */
    timeline: "Agreed before we start",
  };
