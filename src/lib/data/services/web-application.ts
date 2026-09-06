import type { Service } from "./types";
import {
  Blocks,
  Bot,
  Boxes,
  BrainCircuit,
  Cable,
  Cloud,
  Code2,
  LineChart,
  Network,
  RefreshCcw,
  Smartphone,
  Users,
} from "lucide-react";

export const web_application: Service = /* ------------------------------------------------------------------ */
  {
    /* Brief: "URL change: development solutions". The old /services/web-application
       is 301'd to this in firebase.json — it is indexed, so it must not 404. */
    slug: "development-solutions",
    name: "Development Solutions",
    navLabel: "Development Solutions",
    icon: Blocks,
    tagline: "Products that hold up under real load",
    summary:
      "Scalable web platforms and custom applications built around how your business operates.",
    heroCta: "Build Your Solution",
    whatYouGet: {
      title: "The right solution, Built Around",
      highlight: " Your Business",
      body:
        "From choosing what to build to selecting the right technology, everything is planned around your needs with no unnecessary features or wasted spend.",
    },
    stackIntro:
      "A proven technology stack selected to build reliable, scalable development solutions.",
    processHeading: {
      title: "How Your Project Comes",
      highlight: " Together",
      end: "?",
      body:
        "A clear four step process that takes you from an idea or business problem to a working digital solution.",
    },
    faqHeading: {
      title: "Digital Products,",
      highlight: " Answered Straight",
    },
    hero: {
      eyebrow: "Development Solutions",
      headline: "Digital Products And Systems",
      highlight: " Built For Your Business",
      sub:
        "Design, development and integration across websites, web applications, CRM, ERP and business systems, built to support the way your business operates.",
    },
    metrics: [
      { value: "4", label: "Development Stages" },
      { value: "1", label: "Dedicated Team" },
      { value: "1", label: "Scalable Foundation" },
    ],
    capabilitiesHeading: {
      title: "Inside Development",
      highlight: " Solutions",
      body:
        "From development solutions to enterprise systems, we build digital solutions that connect your customers, people, processes and data.",
    },
    capabilities: [
      {
        icon: Blocks,
        title: "Web Applications",
        body: "Build high performance web applications, portals and dashboards tailored to your business workflows. Create secure, scalable digital experiences that simplify complex processes and improve productivity.",
      },
      {
        icon: Code2,
        title: "Custom Software",
        body: "Develop purpose built software around your unique business requirements and processes. Replace disconnected tools and manual workflows with scalable software designed specifically for your organisation.",
      },
      {
        icon: Boxes,
        title: "ERP Platforms",
        body: "Connect finance, operations, procurement, inventory and other core functions through one unified platform. Improve visibility, control and efficiency across your entire business.",
      },
      {
        icon: Users,
        title: "CRM Platforms",
        body: "Build powerful CRM systems that centralise customer data, sales pipelines and communication. Give your teams better visibility, automation and control throughout the customer journey.",
      },
      {
        icon: Cloud,
        title: "SaaS Engineering",
        body: "Design and develop scalable SaaS platforms for B2B and consumer markets. Build secure multi tenant products with subscriptions, billing, analytics and enterprise capabilities.",
      },
      {
        icon: Smartphone,
        title: "Mobile Applications",
        body: "Create intuitive mobile applications for iOS, Android and cross platform environments. Deliver fast, secure and reliable mobile experiences connected to your wider digital ecosystem.",
      },
      {
        icon: BrainCircuit,
        title: "AI Systems & LLMs",
        body: "Build practical AI systems using LLMs, RAG and intelligent knowledge retrieval. Connect AI with your business data to automate information processing and improve decision making.",
      },
      {
        icon: Bot,
        title: "AI Agents & Automation",
        body: "Develop intelligent AI agents that can execute tasks and connect with your business systems. Automate repetitive workflows across communication, operations, customer service and internal processes.",
      },
      {
        icon: Cable,
        title: "API & System Integration",
        body: "Connect your software, CRM, ERP, SaaS platforms and third party systems through reliable integrations. Build secure APIs and data flows that allow your technology to work as one connected ecosystem.",
      },
      {
        icon: Network,
        title: "Cloud & DevOps Core",
        body: "Build secure, scalable cloud infrastructure that keeps your applications reliable and ready to grow. Automate deployment, infrastructure and operational processes for faster and more dependable delivery.",
      },
      {
        icon: RefreshCcw,
        title: "Software Modernization",
        body: "Transform outdated software, legacy databases and monolithic systems into modern technology environments. Improve performance, maintainability and scalability while protecting critical business functionality.",
      },
      {
        icon: LineChart,
        title: "BI & Real Time Analytics",
        body: "Turn fragmented business data into clear dashboards, reports and actionable insights. Connect your systems and deliver real time visibility into the metrics that matter most.",
      },
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
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Salesforce",
      "HubSpot",
      "Microsoft Dynamics 365",
      "SAP",
      "PostgreSQL",
      "AWS",
      "Shopify",
      "NET",
      "REST APIs",
      "GraphQL",
      "Angular",
      "Docker",
      "Flutter",
    ],
    faqs: [
      {
        q: "Can you design and build a complete website for our business?",
        a: "Yes. We handle strategy, UX, UI design, development, CMS, integrations and launch, creating a website around your business goals and customer journey.",
      },
      {
        q: "Can you build a custom web application?",
        a: "Yes. We build customer portals, employee portals, dashboards, booking platforms, marketplaces, SaaS platforms and custom business applications.",
      },
      {
        q: "Can you implement or customise a CRM?",
        a: "Yes. We can help select, implement, customise, migrate, integrate and automate CRM platforms such as Salesforce, HubSpot, Microsoft Dynamics 365, Zoho and Pipedrive.",
      },
      {
        q: "Can you implement an ERP system?",
        a: "Yes. We provide ERP consulting, implementation, customisation, integration, migration, reporting and automation across platforms such as SAP, Oracle, NetSuite, Odoo and Microsoft Dynamics 365.",
      },
      {
        q: "Can you connect our different business systems?",
        a: "Yes. We integrate websites, CRM, ERP, payment systems, APIs and other business tools so information can move between systems without unnecessary manual work.",
      },
      {
        q: "Can you build custom software for our business?",
        a: "Yes. When existing platforms do not fit your processes, we design and develop custom software around your requirements, workflows, data and future growth.",
      },
    ],
    seo: {
      title: "Digital Development Solutions",
      description:
        "Build websites, web applications, CRM, ERP and custom software with digital development solutions designed around your business needs and processes.",
      ogTitle: "Digital Development Solutions | OnyxEra Tech",
      ogDescription:
        "Build websites, web applications, CRM, ERP and custom software with digital development solutions designed around your business needs and processes.",
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
    heroStats: [
      { value: "6+ Digital Capabilities", label: "Design, development, CRM, ERP, integration and automation." },
      { value: "15+ Platforms & Technologies", label: "Built with proven tools suited to your requirements." },
      { value: "1 Technology Partner", label: "From the first idea to implementation and ongoing growth." },
    ],
    problem: {
      title: "Not sure what your business actually needs?",
      sub: "Starting online is easy. Knowing what to build is the hard part.",
      points: [
        "Don't know where to start",
        "Not sure what your website needs",
        "Confused between website, store or app",
        "Worried about wasting money",
      ],
      solution:
        "We understand your business first, then build the right development solution around it.",
    },
    cta: {
      eyebrow: "Digital Products, Platforms & Business Systems",
      title: "Have an idea? Let’s build the right thing.",
      body: "Tell us the problem. We’ll define the right solution, scope the work and show you what comes next.",
      /* "Get Free Consultation → Contact us form aye ga" and
         "Explore More → homepage pe baaqi services pe chala jaye ga user". */
      primaryLabel: "Get Free Consultation",
      secondaryLabel: "Explore More",
      secondaryHref: "/#services",
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
    /* Not a duration. The same discipline covers a two-week job and a
       six-month one, so a range printed here is either meaningless or a
       promise nobody agreed to. What is true of every engagement is that the
       schedule is settled in the proposal, before the client commits — so
       that is what the card says. Keep all five services on this line. */
    timeline: "Agreed before we start",
  };
