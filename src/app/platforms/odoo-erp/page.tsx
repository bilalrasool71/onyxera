import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBagShopping,
  FaBox,
  FaBuilding,
  FaBullhorn,
  FaBullseye,
  FaChartLine,
  FaChartSimple,
  FaClock,
  FaDatabase,
  FaDesktop,
  FaEye,
  FaFileLines,
  FaGear,
  FaGraduationCap,
  FaHeadset,
  FaLink,
  FaPlay,
  FaRegCalendarCheck,
  FaRegGem,
  FaRocket,
  FaShieldHalved,
  FaStethoscope,
  FaStore,
  FaTrophy,
  FaTruck,
  FaUser,
  FaUsers,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { AutomationFunnelForm } from "@/components/sections/AutomationFunnelForm";
import { Reveal } from "@/components/ui/Reveal";
import { faqSchema, graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so its
   sections deliberately do not use the theme tokens and look the same in both
   themes — except the bands (hero, outcomes, get started), which follow the
   theme like every other page, exactly as /gohighlevel does. Icons are Font
   Awesome solid glyphs, which is what the design draws.

     BLUE    #6a9bd1  buttons and step numbers (the site's own button fill)
             #1a6df5  the design's icon blue, kept as drawn
     GREEN   #1aa34a / ORANGE #f97316 / PURPLE #7c3aed / PINK #e0447c
             — the accent icons, one colour per glyph as the design assigns
     NAVY    #0b1f33  headings on white (the site's --fg)
     BODY    #3c5a7e  supporting copy on white (the site's --fg-muted)
     TINT    #eef5ff  the light-blue sections and FAQ rows
     CIRCLE  #e6f0ff  icon squares and discs on the white sections */

/* Service markup, transcribed from the brief. The FAQPage the brief also
   lists is already emitted below by faqSchema.

   The brief's Review node is not added: its reviewBody and author are
   placeholders ("[Insert Odoo-specific client quote here]"), and the brief
   itself marks it "once a testimonial is added". This page carries no
   testimonial, and review markup for a review that is not on the page is
   against Google's structured data policy. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Odoo ERP Implementation",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Odoo ERP implementation and consulting covering CRM, sales, accounting, inventory, manufacturing, HR, eCommerce and custom Odoo development.",
  url: "https://onyxeratech.com/platforms/odoo-erp",
};
/* Title, description, social tags, headings, the opening paragraph and the
   Service schema below come from the SEO brief for this page, which writes
   "Odoo ERP" as a single phrase because that is the keyword it targets. */
const TITLE = "Odoo Business Systems";
const DESCRIPTION =
  "Work with an experienced Odoo ERP implementation partner. Sales, inventory and accounting in one custom setup, live in 4\u201310 weeks.";

export const metadata: Metadata = {
  title: { absolute: "Odoo ERP Implementation Partner | Onyxera Tech" },
  description: DESCRIPTION,
  alternates: { canonical: "/platforms/odoo-erp" },
  openGraph: openGraph({
    title: "Odoo ERP Implementation Partner | Onyxera Tech",
    description:
      "A fully customised Odoo ERP solution that unifies sales, inventory, accounting and operations in one connected system.",
    url: "/platforms/odoo-erp",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Odoo ERP Implementation Partner | Onyxera Tech",
    description:
      "Odoo ERP implementation, customisation and support configured around how your business actually runs.",
  },
};

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.   */
/* ------------------------------------------------------------------ */

type Item = { icon: IconType; title: string; body: string; color?: string };

const whatIsOdoo: Item[] = [
  {
    icon: FaLink,
    title: "One Connected System",
    body: "All your business data in one place with real time visibility.",
  },
  {
    icon: FaGear,
    title: "Customised for Your Business",
    body: "Configured around your processes, not a generic template.",
    color: "#7c3aed",
  },
  {
    icon: FaChartSimple,
    title: "Built for Growth",
    body: "Flexible, scalable and cost effective as your business evolves.",
    color: "#1aa34a",
  },
];

const problems: Item[] = [
  {
    icon: FaDatabase,
    title: "Disconnected tools",
    body: "Your data is spread across different apps and systems.",
    color: "#e0447c",
  },
  {
    icon: FaClock,
    title: "Manual data entry",
    body: "Your team spends too much time entering and updating data manually.",
    color: "#f97316",
  },
  {
    icon: FaEye,
    title: "Limited visibility",
    body: "It's difficult to get a clear view of your sales, operations and financial performance.",
    color: "#e0447c",
  },
];

const flow: { icon: IconType; label: string; sub: string; color?: string }[] = [
  { icon: FaUsers, label: "CRM", sub: "Leads & Opportunities", color: "#1aa34a" },
  { icon: FaChartSimple, label: "Sales", sub: "Quotations & Orders" },
  { icon: FaDatabase, label: "Finance", sub: "Accounting & Invoicing", color: "#7c3aed" },
  { icon: FaBox, label: "Operations", sub: "Inventory & Manufacturing", color: "#f97316" },
  { icon: FaBullhorn, label: "Marketing", sub: "Campaigns & Automation", color: "#e0447c" },
  { icon: FaHeadset, label: "Service", sub: "Helpdesk & Field Service" },
  { icon: FaChartLine, label: "Growth", sub: "Insights & Expansion", color: "#1aa34a" },
];

/* The two cards the design places under the section heading, on the left. */
const capabilitiesLeft: Item[] = [
  {
    icon: FaDesktop,
    title: "Website, eCommerce and POS",
    body: "Build your website, online store and connect with point of sale.",
    color: "#e0447c",
  },
  {
    icon: FaWandMagicSparkles,
    title: "Marketing and Loyalty",
    body: "Email marketing, automation, social marketing, events and customer loyalty.",
    color: "#7c3aed",
  },
];

const capabilitiesRight: Item[] = [
  {
    icon: FaUsers,
    title: "CRM and Sales",
    body: "Manage leads, quotations and sales orders inside a fully configured Odoo CRM setup.",
    color: "#1aa34a",
  },
  {
    icon: FaFileLines,
    title: "Accounting and Finance",
    body: "Handle invoicing, expenses and reporting with a complete Odoo accounting implementation.",
  },
  {
    icon: FaBox,
    title: "Inventory, Purchase and Manufacturing",
    body: "Manage stock, purchase orders and production with Odoo inventory and manufacturing workflows.",
    color: "#f97316",
  },
  {
    icon: FaHeadset,
    title: "Project, Helpdesk and Field Service",
    body: "Manage projects, tasks, support tickets and field service operations.",
  },
  {
    icon: FaUser,
    title: "HR and Workforce",
    body: "Manage employees, recruitment, time off, appraisals and workforce processes.",
  },
  {
    icon: FaGear,
    title: "AI, Automation and Customisation",
    body: "Automate processes with Odoo Studio customisation and AI tools.",
  },
];

const industries: { icon: IconType; label: string }[] = [
  { icon: FaGear, label: "Manufacturing" },
  { icon: FaBagShopping, label: "Retail and eCommerce" },
  { icon: FaUsers, label: "Professional Services" },
  { icon: FaTruck, label: "Distribution and Wholesale" },
  { icon: FaStethoscope, label: "Healthcare" },
  { icon: FaBuilding, label: "Construction and Real Estate" },
  { icon: FaGraduationCap, label: "Education" },
  { icon: FaStore, label: "Franchises and Multi Location" },
];

const outcomes: Item[] = [
  {
    icon: FaChartSimple,
    title: "Better Visibility",
    body: "Get a clear view of your entire business in real time.",
    color: "#1aa34a",
  },
  { icon: FaClock, title: "Less Manual Work", body: "Automate repetitive tasks and reduce errors." },
  {
    icon: FaUsers,
    title: "Connected Operations",
    body: "Bring your teams, data and processes together.",
    color: "#f5b301",
  },
  {
    icon: FaChartLine,
    title: "Scalable for Growth",
    body: "Build a strong foundation for future opportunities.",
    color: "#7c3aed",
  },
];

const process: Item[] = [
  { icon: FaUser, title: "Understand", body: "Review your business requirements and existing systems." },
  { icon: FaFileLines, title: "Plan", body: "Define the right Odoo apps, configuration and integrations." },
  { icon: FaGear, title: "Implement", body: "Configure, customise and test the system around your workflow." },
  { icon: FaRocket, title: "Launch & Improve", body: "Train your team, go live and continuously optimise." },
];

const why: Item[] = [
  {
    icon: FaShieldHalved,
    title: "Business First",
    body: "We understand your business before configuring the technology.",
  },
  {
    icon: FaGear,
    title: "Custom Implementation",
    body: "Built around your processes, not a generic template.",
  },
  {
    icon: FaChartSimple,
    title: "Ongoing Improvement",
    body: "Integrate Odoo with your website, marketing and other tools.",
  },
];

/* The design shows the questions closed; the answers are written to match
   the tone of the rest of the page. */
/* The six the brief supplies, questions and answers both, in its wording.
   The two links it sets are stored as `[text](/path)` and rendered by the
   FAQ component. */
const faqsLeft = [
  {
    q: "Is Odoo right for my business?",
    a: "If you run sales, inventory, accounting or projects across separate tools and spreadsheets, Odoo is usually a strong fit. We assess your processes, existing systems and growth plans first, and will tell you honestly if a simpler solution would serve you better.",
  },
  {
    q: "How much does Odoo implementation cost?",
    a: "Odoo implementation costs vary depending on the modules, users, customisation and integrations required. Smaller implementations can start in the low thousands, while larger multi department rollouts require a significantly larger investment. We scope your requirements clearly before work begins.",
  },
  {
    q: "How long does an Odoo implementation take?",
    a: "A focused Odoo implementation can often be completed within several weeks, while larger projects require more time for configuration, integrations, data migration, testing and training. We provide a clear implementation plan based on your actual requirements.",
  },
];

const faqsRight = [
  {
    q: "Can you migrate our existing data into Odoo?",
    a: "Yes. We can assess your existing customer, product, sales, inventory, accounting and operational data, determine what should be migrated, clean and map the information, then plan the migration to reduce disruption to your business.",
  },
  {
    q: "Can Odoo integrate with our existing systems?",
    a: "Yes. Odoo can be connected with websites, ecommerce platforms, payment systems, CRM tools, accounting systems and other [business applications](/services/development-solutions). We assess your current technology first and recommend integrations where they genuinely improve your workflows.",
  },
  {
    q: "Do we need to customise Odoo for our business?",
    a: "Not necessarily. We first configure Odoo using its existing capabilities and only recommend [custom development](/services/development-solutions) where your requirements cannot be handled effectively through standard functionality or sensible configuration. This helps control cost, complexity and future maintenance.",
  },
];

const ctaPoints: Item[] = [
  { icon: FaRegCalendarCheck, title: "No Obligation", body: "Consultation" },
  { icon: FaBullseye, title: "Practical", body: "Recommendations" },
  { icon: FaRegGem, title: "Focused on", body: "Your Business Goals" },
];

const improveOptions = [
  "Sales and CRM",
  "Accounting and finance",
  "Inventory and manufacturing",
  "Projects and field service",
  "HR and workforce",
  "Website, eCommerce and POS",
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


export default function OdooPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/platforms/odoo-erp",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "Odoo Business Systems", path: "/platforms/odoo-erp" }],
            }),
            /* Asked for by the brief. Built from the same arrays the page
               renders, so the marked-up answers are the ones on screen. */
            SERVICE_SCHEMA,
            faqSchema("/platforms/odoo-erp", [...faqsLeft, ...faqsRight]),
          ]),
        }}
      />

      {/* ---------------- hero ----------------
          Follows the theme like every other page's hero: navy in the dark
          theme, the off-white canvas in the light one. */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              Odoo ERP Implementation &amp; Consulting
              <br />
              <span className="text-accent-strong">
                for a Stronger Business
              </span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Streamline your operations, improve efficiency and unlock growth
                with a fully customised Odoo solution designed for your business.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Book a Free Consultation
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

          {/* The artwork. */}
          <Reveal delay={160} immediate className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] top-[15%] bottom-[10%] rounded-full bg-[#1a6df5]/20 blur-3xl"
            />
            <img
              src="/images/odoo-hero.webp"
              alt="Odoo ERP dashboard showing sales, invoices, tasks and projects in one system"
              width={1572}
              height={887}
              fetchPriority="high"
              className="relative w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- what is odoo ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Pill>What is Odoo?</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>What is Odoo ERP?</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Odoo ERP is an integrated suite of business applications:{" "}
                {/* `prose-link` is used in a few places in this project but is
                    not defined in any stylesheet, so it rendered as plain
                    text. Styled here in this page's own blue. */}
                <Link
                  href="/services/automation"
                  className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
                >
                  CRM
                </Link>
                , sales, accounting, inventory, manufacturing, HR and more that
                replaces disconnected spreadsheets and standalone tools with one
                connected system. As an Odoo ERP implementation partner, we
                configure the specific modules your business needs, connect them
                to your existing tools and make sure your team is trained to use
                them from day one.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#capabilities" className={`${BTN} mt-6`}>
                Learn More About Odoo
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {whatIsOdoo.map((c, i) => (
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

      {/* ---------------- the problem ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Pill>The Problem</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Disconnected Systems
                <br />
                Create Bigger Problems
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Many businesses rely on multiple disconnected tools,
                spreadsheets and manual processes to manage sales, inventory and
                finance. Without a properly configured Odoo ERP system, this
                leads to inefficiencies, data errors and a lack of real-time
                visibility across departments.
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
      {/* Heading and copy across the top, the seven stages in one row
          underneath. The row gets the full width instead of sharing it with
          the text, which left empty space above and below the icons. */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <Reveal>
                <Pill>The Solution</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>
                  A Fully Integrated
                  <br />
                  Odoo ERP System
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal delay={160}>
                <p className={`${P} lg:mt-0`}>
                  As your Odoo implementation partner, we configure the platform
                  around how your business actually runs &mdash; its operations all
                  connected in one system.
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
                    <span className="mt-3 max-w-[7rem] text-sm font-bold leading-snug text-[#0b1f33]">
                      {f.label}
                    </span>
                    <span className="mt-0.5 max-w-[7rem] text-xs leading-snug text-[#3c5a7e]">
                      {f.sub}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <FaArrowRight
                      aria-hidden="true"
                      className="mt-6 hidden size-4 shrink-0 text-[#1a6df5] md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- key capabilities ---------------- */}
      <section id="capabilities" className="scroll-mt-24 bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <div>
            <Reveal>
              <Pill>Key Capabilities</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Odoo ERP Modules and Implementation Services We Deliver</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We implement the right Odoo apps for your goals &mdash; not just
                a generic setup.
              </p>
            </Reveal>
            {/* The design keeps these two under the heading rather than in the
                grid on the right. */}
            <ul className="mt-6 grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {capabilitiesLeft.map((c, i) => (
                <Reveal
                  key={c.title}
                  as="li"
                  delay={i * 70}
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

          <ul className="grid gap-4 sm:grid-cols-2">
            {capabilitiesRight.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={(i % 3) * 60}
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

      {/* ---------------- industries ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>Built for Businesses Like Yours</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Odoo ERP Works Across Industries</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>A flexible solution for a wide range of businesses.</p>
            </Reveal>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {industries.map((f, i) => (
              <Reveal
                key={f.label}
                as="li"
                delay={(i % 4) * 50}
                className="flex flex-col items-center text-center"
              >
                <f.icon className="size-7 text-[#1a6df5]" />
                <span className="mt-2.5 text-xs leading-snug font-semibold text-balance text-[#0b1f33]">
                  {f.label}
                </span>
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
                <h2 className={H2_BAND}>What Changes After Odoo ERP Implementation?</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className={P_BAND}>
                  A more connected business, better decisions and less manual work.
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
              The goal isn&rsquo;t more software &mdash; it&rsquo;s a properly implemented Odoo
              ERP system that gives you one connected view of your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- how we work + why onyxera ---------------- */}
      <section id="how-we-work" className="scroll-mt-24 bg-white py-12 md:py-14">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Reveal>
              <Pill>How We Work</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>A Simple, Structured Odoo ERP Implementation Process</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We keep the process straightforward and focused on your business goals.
              </p>
            </Reveal>
            <ol className="mt-7 grid gap-6 sm:grid-cols-2">
              {process.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 70} className="flex items-start gap-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#6a9bd1] text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                      <s.icon className="size-4 shrink-0 text-[#1a6df5]" />
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal delay={80}>
              <h2 className="text-[clamp(1.375rem,2.2vw,1.75rem)] leading-tight font-bold text-[#0b1f33]">
                Why Choose Us for Odoo ERP Implementation?
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>A business focused approach. Real expertise. Ongoing support.</p>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {why.map((w, i) => (
                <Reveal
                  key={w.title}
                  as="li"
                  delay={i * 70}
                  className="rounded-lg border border-[#dbe6f5] bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    <IconSquare icon={w.icon} />
                    <h3 className="mt-1 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                      {w.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{w.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      {/* The heading sits above the questions rather than beside them, so the
          two question columns get the full width and no question wraps. */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]">
              Common Questions About Odoo ERP
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-6">
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
              <h2 className={H2_BAND}>
                Let&rsquo;s Build Your
                <br />
                Odoo ERP System
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_BAND}>
                Tell us how you currently manage your operations &mdash; we&rsquo;ll
                review your processes and recommend the right Odoo
                implementation for your business.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-4">
                {ctaPoints.map((p) => (
                  <li key={p.title} className="flex items-center gap-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-accent shadow-soft">
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
              title="Book Your Free Odoo Consultation"
              submitLabel="Book My Consultation"
              source="Odoo page"
              detailLabel="What are you looking to improve?"
              detailOptions={improveOptions}
            />
          </Reveal>

        </div>
      </section>
    </>
  );
}
