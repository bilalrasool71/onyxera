import type { Metadata } from "next";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBullseye,
  FaCalendarDays,
  FaChartLine,
  FaChartSimple,
  FaCircleArrowUp,
  FaClock,
  FaCommentDots,
  FaDatabase,
  FaDollarSign,
  FaEnvelope,
  FaFileLines,
  FaFilter,
  FaGear,
  FaLink,
  FaMicrophone,
  FaPlay,
  FaQuoteLeft,
  FaRegCalendarCheck,
  FaRegGem,
  FaRocket,
  FaShieldHalved,
  FaTableCellsLarge,
  FaTrophy,
  FaUser,
  FaUsers,
  FaWindowMaximize,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { AutomationFunnelForm } from "@/components/sections/AutomationFunnelForm";
import { Reveal } from "@/components/ui/Reveal";
import { clientStories } from "@/lib/data/agency";
import { graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so
   its sections deliberately do not use the theme tokens and look the same in
   both themes — except the two bands (hero, outcomes), which follow the theme
   like every other page, exactly as /automation-funnel does. The icons are
   Font Awesome solid glyphs (react-icons), which is what the design draws.

     BLUE     #1a6df5   buttons, icons, eyebrows, numbers
     GREEN    #1aa34a   the green icons
     PURPLE   #7c3aed   the purple icons
     ORANGE   #f97316 / YELLOW #f5b301 / TEAL #0ea5b7 — one icon each
     NAVY     #0b1f3a   headings on white
     BODY     #4b5a70   supporting copy on white
     TINT     #eef5ff   the light-blue sections, FAQ rows
     CIRCLE   #e6f0ff   icon discs and squares on the white sections */

/* The breadcrumb and schema keep the short name; the browser title is the
   longer one the brief supplies, which already carries the brand, so it goes
   in as an absolute title rather than through the site's
   "%s | Onyxera Tech" template. */
const TITLE = "GoHighLevel CRM and Automation";
const META_TITLE =
  "GoHighLevel Setup & CRM Automation Agency | Onyxera Tech";
const DESCRIPTION =
  "Hire a certified GoHighLevel agency to capture leads, automate follow ups, and manage your sales pipeline. Custom CRM, live in 3 to 6 weeks.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/platforms/gohighlevel" },
  openGraph: openGraph({
    title: META_TITLE,
    description: DESCRIPTION,
    url: "/platforms/gohighlevel",
  }),
};

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.   */
/* ------------------------------------------------------------------ */

type Item = { icon: IconType; title: string; body: string; color?: string };

const problems: Item[] = [
  {
    icon: FaDatabase,
    title: "Leads from different places",
    body: "Enquiries come from your website, social media, phone and email, and it's hard to keep track.",
  },
  {
    icon: FaClock,
    title: "Manual follow up",
    body: "Your team spends too much time manually messaging and following up with leads.",
  },
  {
    icon: FaChartLine,
    title: "No clear pipeline",
    body: "It's difficult to see where each opportunity stands and what needs attention.",
    color: "#7c3aed",
  },
];

const flow: { icon: IconType; label: string; sub?: string; color?: string }[] = [
  { icon: FaUsers, label: "Traffic", sub: "(Ads, Social, Website)", color: "#1aa34a" },
  { icon: FaWindowMaximize, label: "Funnel", sub: "(Landing Pages)" },
  { icon: FaCommentDots, label: "AI Chat or Voice" },
  { icon: FaDatabase, label: "Captured in GHL" },
  { icon: FaEnvelope, label: "Email + Automation", color: "#1aa34a" },
  { icon: FaCalendarDays, label: "Appointment Booked", color: "#7c3aed" },
  { icon: FaDollarSign, label: "Customer", color: "#1aa34a" },
];

const capabilities: Item[] = [
  { icon: FaUser, title: "CRM Setup", body: "Organise every customer inside a fully configured GoHighLevel CRM." },
  { icon: FaChartSimple, title: "Sales Pipeline", body: "See where every opportunity stands and manage it better.", color: "#1aa34a" },
  { icon: FaFilter, title: "Lead Capture", body: "Connect your website, ads and other channels into one system." },
  { icon: FaGear, title: "Workflow Automation", body: "Automate repetitive tasks with custom GoHighLevel workflow automation." },
  { icon: FaCommentDots, title: "AI Chat Agents", body: "Engage website visitors with GoHighLevel AI chat agents around the clock." },
  { icon: FaMicrophone, title: "AI Voice Agents", body: "Handle inbound calls automatically with GoHighLevel AI voice agents." },
  { icon: FaEnvelope, title: "Email Marketing", body: "Build and automate email campaigns to nurture and convert.", color: "#0ea5b7" },
  { icon: FaWindowMaximize, title: "Funnel Building", body: "Launch GoHighLevel funnels and landing pages without needing a developer." },
];

/* Real reviews only. The first was on this page already; the other two are
   client stories from lib/data/agency, labelled with the project they came
   from so neither reads as a GoHighLevel engagement it was not. */
const storyFor = (client: string) => {
  const s = clientStories.find((c) => c.client === client);
  if (!s) throw new Error(`Missing client story: ${client}`);
  return { quote: s.quote, name: s.client, role: s.project };
};

const reviews: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Onyxera Tech streamlined our clinic’s lead management and follow-up process. Our team is more organised and we’re seeing better results.",
    name: "Dr Brendan Dougherty",
    role: "Healthcare Professional",
  },
  storyFor("Toyota Dealers"),
  storyFor("Master Plumbers South Australia"),
];

const outcomes: Item[] = [
  { icon: FaChartLine, title: "Better Lead Management", body: "Never lose a lead again.", color: "#1aa34a" },
  { icon: FaClock, title: "More Consistent Follow Up", body: "Automate and stay in touch." },
  { icon: FaUsers, title: "Less Manual Administration", body: "Save time for what really matters.", color: "#f5b301" },
  { icon: FaCircleArrowUp, title: "Clearer Sales Visibility", body: "See where every opportunity stands.", color: "#7c3aed" },
];

const process: Item[] = [
  { icon: FaUser, title: "Understand", body: "Review your business requirements and existing tools." },
  { icon: FaFileLines, title: "Plan", body: "Define what should be built, customised and integrated." },
  { icon: FaTableCellsLarge, title: "Build", body: "Configure the CRM, workflows, integrations and customer journey." },
  { icon: FaRocket, title: "Launch", body: "Train your team, launch the system and identify ongoing improvements." },
];

const why: Item[] = [
  {
    icon: FaShieldHalved,
    title: "Business First",
    body: "We review your sales process, current tools and team workflow before touching any settings.",
  },
  {
    icon: FaGear,
    title: "Custom Implementation",
    body: "Every GoHighLevel setup is configured from scratch around your business, never a copy paste template.",
  },
  {
    icon: FaLink,
    title: "Connected Expertise",
    body: "Our team combines GoHighLevel automation with web development, SEO and digital marketing under one roof.",
  },
  {
    icon: FaChartSimple,
    title: "Ongoing Improvement",
    body: "We monitor performance after launch and keep refining your workflows as your business grows.",
  },
];

/* The six the brief supplies, questions and answers both, in its wording.
   The three links it sets are stored as `[text](/path)` and rendered by
   the FAQ component. */
const faqsLeft = [
  {
    q: "How much does GoHighLevel implementation cost?",
    a: "Cost depends on the scope how many pipelines, [automations](/services/automation) and integrations you need. We scope this during your [free consultation](/contact) and give you a clear package before any work begins.",
  },
  {
    q: "Why should I hire a GoHighLevel implementation agency instead of setting it up myself?",
    a: "A professional implementation helps ensure your CRM, workflows, pipelines, funnels, and automations. It can also reduce setup mistakes, improve lead management, and create a system that matches your actual sales process.",
  },
  {
    q: "Can GoHighLevel be integrated with our existing website or web application?",
    a: "Yes. Depending on your technology stack and requirements, GoHighLevel can be connected with websites, web applications, forms, APIs, and other [digital systems](/services/development-solutions).",
  },
];

const faqsRight = [
  {
    q: "What GoHighLevel services do you provide?",
    a: "Our GoHighLevel services can include CRM setup, pipeline configuration, sales funnels, workflow automation, lead capture, appointment scheduling, email and SMS automation, forms, calendars, and system optimisation.",
  },
  {
    q: "Can GoHighLevel automate lead follow up?",
    a: "Yes. GoHighLevel can automate follow up based on actions and events such as form submissions, missed calls, appointments, pipeline changes, and other customer interactions.",
  },
  {
    q: "Can you migrate our existing CRM to GoHighLevel?",
    a: "Yes, where the existing platform and data structure support migration. We can review your current CRM, identify the data and processes that need to move, and plan the GoHighLevel setup around your existing sales workflow.",
  },
];

const ctaPoints: Item[] = [
  { icon: FaRegCalendarCheck, title: "No Obligation", body: "Consultation" },
  { icon: FaBullseye, title: "Practical", body: "Recommendations" },
  { icon: FaRegGem, title: "Focused on", body: "Your Business Goals" },
];

const improveOptions = [
  "Lead capture and CRM setup",
  "Automated follow up",
  "Sales pipeline visibility",
  "Appointment booking",
  "AI chat or voice agents",
  "Email marketing and funnels",
  "Integrations with existing tools",
  "Not sure yet",
];

/* ------------------------------------------------------------------ */
/* Small presentational pieces shared by several sections              */
/* ------------------------------------------------------------------ */

/* Small pill label in the design's blue, as drawn at the top of every section. */
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

/* Light-blue square with a solid icon, as drawn on the cards. */
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


export default function GoHighLevelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            pageSchema({
              path: "/platforms/gohighlevel",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "GoHighLevel", path: "/platforms/gohighlevel" }],
            }),
          ),
        }}
      />

      {/* ---------------- hero ----------------
          Follows the theme like every other page's hero: navy in the dark
          theme, the off-white canvas in the light one. */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-6">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              GoHighLevel Implementation &amp; CRM Automation,
              <br />
              <span className="text-accent-strong">Built Around Your Business</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Turn more leads into customers with a fully customised
                GoHighLevel setup. We help you capture leads, automate follow
                up, manage pipelines and grow your revenue.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Discuss Your GoHighLevel Setup
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

          {/* The artwork fills its column; the space that used to be kept
              free on the right for a handwritten note is gone. */}
          <Reveal delay={160} immediate className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] top-[15%] bottom-[10%] rounded-full bg-[#1a6df5]/20 blur-3xl"
            />
            <img
              src="/images/gohighlevel-hero.webp"
              alt="A GoHighLevel dashboard on a laptop: total leads, appointments and closed deals, the sales pipeline from new to won, and recent activity such as new leads, booked appointments, AI voice calls and follow up emails."
              width={1457}
              height={874}
              fetchPriority="high"
              className="relative w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- the problem ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Pill>The Problem</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={`${H2} max-w-md`}>
                Your leads shouldn&rsquo;t depend on spreadsheets, inboxes and memory.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Many businesses generate leads but struggle to manage them
                effectively without a proper GoHighLevel CRM setup, enquiries
                from your website, ads and social media stay scattered across
                inboxes and spreadsheets instead of one connected pipeline. Does
                this sound familiar?
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
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <Reveal>
                <Pill>The Solution</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>
                  One Connected GoHighLevel System
                  <br />
                  for Your Entire Customer Journey
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal delay={160}>
                <p className={`${P} lg:mt-0`}>
                  As a dedicated GoHighLevel implementation agency, we configure
                  CRM, pipelines, workflows and funnels around your business, not
                  generic templates. Our GoHighLevel automation helps save time and
                  convert more leads.
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
                    <span className="mt-3 max-w-[6.5rem] text-sm font-bold leading-snug text-[#0b1f33]">
                      {f.label}
                    </span>
                    {f.sub && (
                      <span className="mt-0.5 max-w-[6.5rem] text-xs leading-snug text-[#3c5a7e]">{f.sub}</span>
                    )}
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

      {/* ---------------- what we build ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>What We Build</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>GoHighLevel Setup Services We Deliver</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>
              We implement the right GoHighLevel CRM and automation features for
              your goals &mdash; not just a generic setup.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={(i % 4) * 60}
                className="rounded-lg border border-[#dbe6f5] bg-white p-4"
              >
                {/* Icon and title share the top row; the body runs the full
                    width of the card below them rather than being indented
                    under the title, which left it about half the card to wrap
                    in. */}
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
                  What Changes When Your GoHighLevel System Is Set Up Right
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className={P_BAND}>
                  A more organised business, more opportunities and less manual work.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line-strong">
            {outcomes.map((o, i) => (
              <Reveal key={o.title} as="li" delay={i * 70} className="flex items-start gap-4 lg:px-6 lg:first:pl-0">
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
              The goal isn&rsquo;t more software &mdash; it&rsquo;s a GoHighLevel implementation
              that turns your customer journey into a repeatable, measurable
              system.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- reviews ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Client Reviews</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>What Our Clients Say</h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal
                key={r.name}
                as="li"
                delay={i * 70}
                className="flex flex-col rounded-lg border border-[#dbe6f5] bg-white p-6"
              >
                <FaQuoteLeft aria-hidden="true" className="size-6 text-[#1a6df5]" />
                <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-[#0b1f33]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <div className="mt-5 border-t border-[#dbe6f5] pt-4">
                  <span className="block text-sm font-bold text-[#0b1f33]">{r.name}</span>
                  <span className="mt-0.5 block text-[0.8125rem] text-[#3c5a7e]">{r.role}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- how we work ----------------
          Heading across the top and the four steps in a full-width row under
          it. Squeezed beside the heading, the first step's arrow ran into the
          next step's number. */}
      <section id="how-we-work" className="scroll-mt-24 bg-white py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <Reveal>
                <Pill>How We Work</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>A Simple and Structured Process</h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className={`${P} lg:mt-0`}>
                A simple, structured GoHighLevel implementation process focused
                on your business goals &mdash; not ours.
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
          <div>
            <Reveal>
              <Pill>Why Onyxera Tech</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Why Choose Onyxera Tech for GoHighLevel Implementation</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>A business focused approach. Real expertise. Ongoing support.</p>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {why.map((w, i) => (
                <Reveal
                  key={w.title}
                  as="li"
                  delay={i * 70}
                  className="rounded-lg border border-[#dbe6f5] bg-white p-4"
                >
                  {/* Bare glyph here, no tinted square — that is how the design
                      draws these four. */}
                  <div className="flex items-start gap-3">
                    <w.icon className="mt-0.5 size-7 shrink-0 text-[#1a6df5]" />
                    <h3 className="text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                      {w.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{w.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.4fr_1.6fr] lg:gap-12">
          <div>
            <Reveal>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]">
                Frequently Asked Questions
              </h2>
            </Reveal>
            <Reveal delay={80}>
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

      {/* ---------------- get started ---------------- */}
      <section id="consultation" className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6">
          <div>
            <Reveal>
              <Pill>Get Started Today</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Let&rsquo;s Build Your
                <br />
                GoHighLevel System
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Tell us how you currently manage leads, follow-up and
                appointments &mdash; we&rsquo;ll review your process and recommend the
                right GoHighLevel implementation for your business.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-4">
                {ctaPoints.map((p) => (
                  <li key={p.title} className="flex items-center gap-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e6f0ff] text-[#1a6df5]">
                      <p.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold text-[#0b1f33]">{p.title}</span>
                      <span className="block text-xs font-bold text-[#0b1f33]">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <AutomationFunnelForm
              title="Discuss Your GoHighLevel Setup"
              submitLabel="Book My Consultation"
              source="GoHighLevel page"
              detailLabel="What are you looking to improve?"
              detailOptions={improveOptions}
            />
          </Reveal>

        </div>
      </section>
    </>
  );
}
