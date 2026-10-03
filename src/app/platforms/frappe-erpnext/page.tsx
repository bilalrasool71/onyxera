import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBox,
  FaChartSimple,
  FaCloud,
  FaCubes,
  FaDatabase,
  FaEye,
  FaFileLines,
  FaGear,
  FaHeadset,
  FaLink,
  FaListCheck,
  FaPlay,
  FaRegCalendarCheck,
  FaRocket,
  FaShieldHalved,
  FaTrophy,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { AutomationFunnelForm } from "@/components/sections/AutomationFunnelForm";
import { Reveal } from "@/components/ui/Reveal";
import { faqSchema, graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so its
   sections deliberately do not use the theme tokens and look the same in both
   themes — except the bands (hero, outcomes, get started), which follow the
   theme like every other page. It is built from the same pieces as /odoo, so
   the two platform pages stay identical in everything but their copy.

     BLUE    #6a9bd1  buttons and step numbers (the site's own button fill)
             #1a6df5  the design's icon blue, kept as drawn
     GREEN   #1aa34a / ORANGE #f97316 / PURPLE #7c3aed / PINK #e0447c
             — the accent icons, one colour per glyph as the design assigns
     NAVY    #0b1f33  headings on white (the site's --fg)
     BODY    #3c5a7e  supporting copy on white (the site's --fg-muted)
     TINT    #eef5ff  the light-blue sections
     CIRCLE  #e6f0ff  icon squares and discs on the white sections */

/* The breadcrumb and schema keep the short name; the browser title is the
   longer one the brief supplies, which already carries the brand, so it is
   set as an absolute title rather than through the site's
   "%s | Onyxera Tech" template. */
const TITLE = "Frappe / ERPNext";
/* Service markup, transcribed from the brief. The FAQPage the brief also
   lists is already emitted below by faqSchema. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Frappe ERPNext Implementation",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Frappe ERPNext implementation and consulting covering CRM, HR, inventory, accounting, manufacturing, helpdesk and custom app development.",
  url: "https://onyxeratech.com/platforms/frappe-erpnext",
};
/* Title, description, social tags, headings, intro and schema below come
   from the SEO brief for this page. The brief writes "Frappe ERPNext" as a
   single phrase throughout, which is the keyword it targets, so the page no
   longer splits it as "Frappe & ERPNext" in the places the brief names. */
const META_TITLE =
  "Frappe ERPNext Implementation Partner | Onyxera Tech";
const DESCRIPTION =
  "Implement Frappe ERPNext with an experienced team CRM, HR, inventory, accounting and more, with no per-user licensing fees. Book a free consultation.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/platforms/frappe-erpnext" },
  openGraph: openGraph({
    title: "Frappe ERPNext Implementation | Onyxera Tech",
    description:
      "Frappe ERPNext implementation, customisation and support CRM, HR, inventory and accounting, configured around how your business runs.",
    url: "/platforms/frappe-erpnext",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Frappe ERPNext Implementation | Onyxera Tech",
    description:
      "An experienced Frappe ERPNext implementation partner no per-user licensing, fully customised to your business.",
  },
};

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.    */
/* ------------------------------------------------------------------ */

type Item = { icon: IconType; title: string; body: string; color?: string };

const problems: Item[] = [
  {
    icon: FaDatabase,
    title: "Multiple Systems",
    body: "Important data is spread across different tools.",
    color: "#e0447c",
  },
  {
    icon: FaRegCalendarCheck,
    title: "Manual Processes",
    body: "Your team spends too much time on repetitive tasks.",
    color: "#7c3aed",
  },
  {
    icon: FaEye,
    title: "Limited Visibility",
    body: "It is difficult to see the full picture of your business.",
    color: "#7c3aed",
  },
];

/* The eight stages the design draws across the solution band. */
const flow: { icon: IconType; label: string; sub: string; color?: string }[] = [
  { icon: FaUser, label: "Sales", sub: "(CRM)", color: "#1aa34a" },
  { icon: FaFileLines, label: "Orders", sub: "(Sales)" },
  { icon: FaBox, label: "Inventory", sub: "(Stock)", color: "#1aa34a" },
  { icon: FaGear, label: "Operations", sub: "(Manufacturing)" },
  { icon: FaDatabase, label: "Finance", sub: "(Accounting)", color: "#1aa34a" },
  { icon: FaUsers, label: "People", sub: "(HR)", color: "#7c3aed" },
  { icon: FaHeadset, label: "Support", sub: "(Helpdesk)", color: "#f97316" },
  { icon: FaChartSimple, label: "Growth", sub: "(Insights)", color: "#1aa34a" },
];

const applications: Item[] = [
  {
    icon: FaListCheck,
    title: "ERPNext",
    body: "Manage sales, purchasing, inventory, accounting and manufacturing in a complete ERPNext implementation.",
  },
  {
    icon: FaUsers,
    title: "CRM",
    body: "Track leads, customers and opportunities with Frappe CRM.",
    color: "#1aa34a",
  },
  {
    icon: FaUser,
    title: "HR",
    body: "Manage employees, attendance, leave and payroll with Frappe HR.",
    color: "#7c3aed",
  },
  {
    icon: FaHeadset,
    title: "Helpdesk",
    body: "Support your customers with a simple and organised system.",
    color: "#e0447c",
  },
  {
    icon: FaChartSimple,
    title: "Insights",
    body: "Turn your data into clear reports and dashboards.",
    color: "#f97316",
  },
  {
    icon: FaCubes,
    title: "Builder",
    body: "Create custom apps and business pages when you need them.",
    color: "#1aa34a",
  },
  {
    icon: FaCloud,
    title: "Frappe Cloud",
    body: "Secure, reliable hosting for your Frappe and ERPNext applications, fully managed.",
  },
  {
    icon: FaLink,
    title: "Integrations",
    body: "Connect with the tools your business already uses.",
  },
];

const outcomes: Item[] = [
  {
    icon: FaChartSimple,
    title: "Better Visibility",
    body: "See what is happening across your business.",
    color: "#1aa34a",
  },
  {
    icon: FaRegCalendarCheck,
    title: "Less Manual Work",
    body: "Reduce repetitive tasks and save time.",
  },
  {
    icon: FaUsers,
    title: "More Control",
    body: "Manage your data and processes in one place.",
    color: "#f97316",
  },
  {
    icon: FaRocket,
    title: "Ready to Grow",
    body: "A flexible foundation.",
    color: "#7c3aed",
  },
];

const process: Item[] = [
  { icon: FaUser, title: "Understand", body: "We learn about your business and existing tools." },
  { icon: FaFileLines, title: "Plan", body: "We design the right solution for your needs." },
  { icon: FaGear, title: "Implement", body: "We configure, customise and test the system." },
  { icon: FaRocket, title: "Support", body: "We launch and help your team succeed." },
];

const why: Item[] = [
  {
    icon: FaShieldHalved,
    title: "Business First",
    body: "We understand your business processes before recommending ERPNext, a custom Frappe app, or a mix of both.",
  },
  {
    icon: FaGear,
    title: "Custom Implementation",
    body: "Every ERPNext setup is configured around your processes and reports, not a generic template.",
  },
  {
    icon: FaLink,
    title: "Integration Expertise",
    body: "Connect ERPNext with your existing tools through Frappe's REST API, without replacing everything at once.",
  },
  {
    icon: FaChartSimple,
    title: "Ongoing Support",
    body: "Unlike hiring a single freelance developer, you get a team that stays available for support as your business grows.",
  },
];

/* The six the brief supplies, questions and answers both, in its wording.
   These replace a set written in-house while the design's answers were
   missing. The three links in the integration answer are the brief's own;
   they are stored as `[text](/path)` and rendered by the FAQ component. */
const faqsLeft = [
  {
    q: "What is ERPNext and how does it help a business?",
    a: "ERPNext is an open source business management system covering areas such as accounting, sales, purchasing, inventory, manufacturing, projects and human resources. It brings these functions into one connected system, reducing reliance on separate tools and disconnected spreadsheets.",
  },
  {
    q: "What is the difference between Frappe and ERPNext?",
    a: "Frappe is the open source framework used to build business applications, while ERPNext is a complete business management application built on that framework. Frappe provides the foundation, database and development architecture, while ERPNext provides ready to use business functionality. The two ship together, which is why the platform is usually referred to as Frappe ERPNext.",
  },
  {
    q: "Is ERPNext suitable for my business?",
    a: "ERPNext can be a strong option for businesses managing sales, purchasing, inventory, accounting, manufacturing or projects across separate systems. We assess your processes, existing technology and operational requirements before recommending ERPNext, including when another solution may be more appropriate.",
  },
];

const faqsRight = [
  {
    q: "How much does ERPNext implementation cost?",
    a: "Frappe ERPNext does not use traditional per user software licensing in the same way as many commercial ERP platforms. Your investment mainly depends on implementation scope, modules, customisation, integrations, data migration, hosting and ongoing support. We define these requirements before providing a project scope and quotation.",
  },
  {
    q: "Can ERPNext integrate with our existing systems?",
    a: "Yes. ERPNext can be connected with existing [websites](/our-portfolio/erp-integration-automation), [ecommerce](/our-portfolio/ecommerce-product-discovery) platforms, payment systems, CRM platforms and other [business applications](/services/development-solutions). We first assess your current systems and workflows, then determine which integrations are necessary to improve data flow and reduce duplicated manual work.",
  },
  {
    q: "How much customisation does ERPNext require?",
    a: "The amount of customisation depends on your processes and how closely they align with ERPNext's standard functionality. We recommend configuring standard features first and introducing custom development only where it provides a clear operational benefit, helping reduce unnecessary complexity and future maintenance.",
  },
];

const ctaPoints: Item[] = [
  { icon: FaFileLines, title: "No Obligation", body: "Consultation" },
  { icon: FaRegCalendarCheck, title: "Practical", body: "Recommendations" },
  { icon: FaShieldHalved, title: "Focused on", body: "Your Business Goals" },
];

const improveOptions = [
  "Sales and CRM",
  "Inventory and manufacturing",
  "Finance and accounting",
  "HR and payroll",
  "Customer support",
  "Reporting and visibility",
  "Not sure yet",
];

/* ------------------------------------------------------------------ */
/* Small presentational pieces shared by several sections              */
/* ------------------------------------------------------------------ */

/* Small pill label in the design's blue, at the top of every section. */
function Pill({ children, band = false }: { children: string; band?: boolean }) {
  return (
    <span
      className={
        band
          ? "inline-block rounded-sm bg-blue-400/18 px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.04em] text-accent-strong uppercase"
          : "inline-block rounded-sm bg-[#e6f0ff] px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.04em] text-[#3e68a1] uppercase"
      }
    >
      {children}
    </span>
  );
}

const H2 = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]";
const H2_BAND = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-fg";
const P = "mt-4 text-base leading-relaxed text-[#3c5a7e]";
const P_BAND = "mt-4 text-base leading-relaxed text-fg-muted";

/* Light-blue square with a solid icon, as drawn on every card. */
function IconSquare({ icon: Icon, color = "#1a6df5" }: { icon: IconType; color?: string }) {
  return (
    <span
      className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#e6f0ff]"
      style={{ color }}
    >
      <Icon className="size-5" />
    </span>
  );
}

/* The one blue button the design uses everywhere. */
const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#6a9bd1] px-5 py-3 font-display text-sm font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc]";


export default function FrappeErpnextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/platforms/frappe-erpnext",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "Frappe / ERPNext", path: "/platforms/frappe-erpnext" }],
            }),
            /* The brief asks for this: the six questions below, restated for
               machines. Built from the same arrays the page renders, so the
               two cannot drift apart. */
            SERVICE_SCHEMA,
            faqSchema("/platforms/frappe-erpnext", [...faqsLeft, ...faqsRight]),
          ]),
        }}
      />

      {/* ---------------- hero ----------------
          Follows the theme like every other page's hero: navy in the dark
          theme, the off-white canvas in the light one. */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              Frappe ERPNext Implementation:
              <br />
              <span className="text-accent-strong">
                Built Around Your Business
              </span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Implement Frappe and ERPNext to manage your sales, inventory,
                finance, HR, projects and more. We configure, customise and
                support the system around the way your business works.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Discuss Your Frappe Setup
                  <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#how-we-work"
                  className="group inline-flex items-center gap-2.5 rounded-md border border-fg/60 px-4 py-2.5 font-display text-sm font-bold text-fg transition-colors duration-300 hover:border-accent-icon hover:text-accent-strong"
                >
                  See How It Works
                  <span className="grid size-6 place-items-center rounded-full bg-fg text-bg">
                    <FaPlay className="size-2.5" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* The artwork, with the handwritten note down its right, as the
              design draws the fold. */}
          <Reveal delay={160} immediate className="relative xl:pr-24">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] top-[15%] bottom-[10%] rounded-full bg-[#1a6df5]/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute top-0 right-24 z-10 hidden items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(11,31,58,0.35)] xl:flex"
            >
              <FaChartSimple className="size-6 shrink-0 text-[#1a6df5]" />
              <span className="text-sm leading-[1.15] font-bold text-[#0b1f33]">
                Manage
                <br />
                More
                <br />
                Together
              </span>
            </div>
            <img
              src="/images/frappe-hero.webp"
              alt="Frappe ERPNext dashboard showing sales, purchases, invoices and open tasks"
              width={1572}
              height={867}
              fetchPriority="high"
              className="relative w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- intro ----------------
          The brief adds this paragraph because the page jumped straight from
          the hero to The Problem with no definition-style content, and asks
          for the first mention of "Frappe ERPNext" to link to the ERP
          integration case study. */}
      <section className="bg-white pt-12 pb-2 md:pt-14">
        <div className="shell">
          <Reveal>
            <p className={`${P} max-w-4xl`}>
              <Link
                href="/our-portfolio/erp-integration-automation"
                className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
              >
                Frappe ERPNext
              </Link>{" "}
              is an open source business management platform that brings sales,
              inventory, accounting, manufacturing, HR and more into one
              connected system, without the per-user licensing costs common to
              commercial ERP platforms. As a Frappe ERPNext implementation
              partner, we configure the platform around your actual processes,
              connect it to the tools you already use, and support your team
              through go-live and beyond.
            </p>
          </Reveal>
        </div>
      </section>
      {/* ---------------- the problem ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Pill>The Problem</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Disconnected Tools Create More Work</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Many businesses use multiple systems for different departments.
                Without a properly implemented ERPNext system, this leads to
                repeated data entry, scattered information and limited
                visibility across teams.
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {problems.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={i * 70}
                className="rounded-lg border border-[#dbe6f5] bg-white p-5"
              >
                <IconSquare icon={c.icon} color={c.color} />
                <h3 className="mt-4 text-base font-bold text-[#0b1f33]">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3c5a7e]">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- the solution ---------------- */}
      {/* Heading and copy across the top, the eight stages in one row
          underneath. The row gets the full width instead of sharing it with
          the text, which left empty space above and below the icons. */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <Reveal>
                <Pill>The Solution</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>
                  One Connected
                  <br />
                  Frappe ERPNext System
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal delay={160}>
                <p className={`${P} lg:mt-0`}>
                  As your Frappe implementation partner, we configure ERPNext and
                  the wider Frappe ecosystem &mdash; CRM, HR, Helpdesk, Insights
                  &mdash; around your actual processes.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <a href="#how-we-work" className={`${BTN} mt-5`}>
                  See How It Works
                  <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>
          </div>
          <Reveal delay={120} className="mt-10 md:mt-12">
            <ol className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 md:flex md:items-start md:justify-between md:gap-2">
              {flow.map((f, i) => (
                <li key={f.label} className="flex items-start md:flex-1">
                  <div className="flex w-full flex-col items-center text-center">
                    <span
                      className="grid size-16 place-items-center rounded-full bg-white shadow-[0_10px_28px_-10px_rgba(26,109,245,0.4)]"
                      style={{ color: f.color ?? "#1a6df5" }}
                    >
                      <f.icon className="size-7" />
                    </span>
                    <span className="mt-3 max-w-[7rem] text-sm leading-snug font-bold text-[#0b1f33]">
                      {f.label}
                    </span>
                    <span className="mt-0.5 max-w-[7rem] text-xs leading-snug text-[#3c5a7e]">
                      {f.sub}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <FaArrowRight
                      aria-hidden="true"
                      className="mt-4 hidden size-3.5 shrink-0 text-[#1a6df5] md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- key frappe applications ----------------
          The design runs the heading full width here and puts all eight cards
          in one grid beneath it, rather than the heading-beside-grid split the
          sections above use. */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Key Frappe Applications</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Frappe ERPNext Applications We Implement</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>
              We implement the right Frappe applications for your business
              &mdash; not just a generic setup.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={(i % 4) * 60}
                className="rounded-lg border border-[#dbe6f5] bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <IconSquare icon={c.icon} color={c.color} />
                  <h3 className="mt-1 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- business outcomes ----------------
          Follows the theme, like the hero. */}
      <section className="bg-bg py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <Reveal>
                <Pill band>Business Outcomes</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2_BAND}>
                What Changes After Frappe ERPNext Implementation
              </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className={P_BAND}>
                  A more connected business, more opportunities and less manual work.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line-strong">
            {outcomes.map((o, i) => (
              <Reveal
                key={o.title}
                as="li"
                delay={i * 70}
                className="flex items-start gap-4 lg:px-6 lg:first:pl-0"
              >
                <o.icon className="size-10 shrink-0" style={{ color: o.color ?? "#1a6df5" }} />
                <div>
                  <h3 className="text-base font-bold text-fg">{o.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={300}>
            <p className="mt-8 flex items-center gap-3 rounded-lg border border-line-strong bg-surface px-5 py-3.5 text-sm font-semibold text-fg shadow-soft">
              <FaTrophy className="size-5 shrink-0 text-accent" />
              The goal isn&rsquo;t more software &mdash; it&rsquo;s a properly implemented open
              source ERP system that gives your business one connected,
              cost-effective foundation to grow on.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- how we work ----------------
          Heading across the top and the four steps in a full-width row under
          it. Squeezed beside the heading, each step's title ran into the arrow
          and the next step's number. */}
      <section id="how-we-work" className="scroll-mt-24 bg-white py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <Reveal>
                <Pill>How We Work</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>Structured Frappe ERPNext Implementation Process</h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className={`${P} lg:mt-0`}>
                We keep the process straightforward and focused on your business goals.
              </p>
            </Reveal>
          </div>
          <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 70}>
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#6a9bd1] text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="size-4 shrink-0 text-[#1a6df5]" />
                  <h3 className="flex-1 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {s.title}
                  </h3>
                  {i < process.length - 1 && (
                    <FaArrowRight
                      aria-hidden="true"
                      className="hidden size-3.5 shrink-0 text-[#1a6df5]/45 lg:block"
                    />
                  )}
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- why onyxera ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Why Onyxera Tech</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Why Choose Us for Frappe ERPNext Implementation</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>A business focused approach. Real expertise. Ongoing support.</p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <Reveal
                key={w.title}
                as="li"
                delay={(i % 4) * 60}
                className="rounded-lg border border-[#dbe6f5] bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <IconSquare icon={w.icon} />
                  <h3 className="mt-1 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {w.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:gap-12">
          <div>
            <Reveal delay={80}>
              <h2 className={H2}>Frequently Asked Questions About Frappe ERPNext</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>Quick answers to common questions.</p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="grid gap-3 md:grid-cols-2 md:gap-x-6">
              <AutomationFunnelFaq items={faqsLeft} />
              <AutomationFunnelFaq items={faqsRight} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- get started ----------------
          Follows the theme, like the hero and the outcomes band. */}
      <section id="consultation" className="bg-bg py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6">
          <div>
            <Reveal>
              <Pill band>Get Started Today</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_BAND}>Let&rsquo;s Build Your Frappe ERPNext System</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_BAND}>
                Tell us about your business &mdash; we&rsquo;ll recommend the right
                Frappe or ERPNext implementation for your goals, with no
                per-user licensing costs.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-4">
                {ctaPoints.map((p) => (
                  <li key={p.title} className="flex items-center gap-1.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-accent shadow-soft">
                      <p.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold text-fg">{p.title}</span>
                      <span className="block text-xs font-bold text-fg">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <AutomationFunnelForm
              title="Discuss Your Frappe Setup"
              submitLabel="Book My Consultation"
              source="Frappe / ERPNext page"
              detailLabel="What are you looking to improve?"
              detailOptions={improveOptions}
            />
          </Reveal>

        </div>
      </section>
    </>
  );
}
