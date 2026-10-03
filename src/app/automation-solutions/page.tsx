import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBullseye,
  FaBrain,
  FaChartLine,
  FaChartSimple,
  FaClock,
  FaCoins,
  FaCommentDots,
  FaDatabase,
  FaEnvelope,
  FaFilter,
  FaGear,
  FaHandshake,
  FaLayerGroup,
  FaLink,
  FaMagnet,
  FaPlay,
  FaQuoteLeft,
  FaRegCalendarCheck,
  FaRegGem,
  FaRocket,
  FaSliders,
  FaSquareCheck,
  FaStopwatch,
  FaStore,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { AutomationFunnelForm } from "@/components/sections/AutomationFunnelForm";
import { StackBand } from "@/components/sections/StackBand";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/lib/data/services";
import { faqSchema, graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so
   its sections deliberately do not use the theme tokens and look the same in
   both themes — except the three bands (hero, results, consultation), which
   follow the theme like every other page; see H2_BAND below. Every colour below is the design's own value, and the
   icons are Font Awesome solid glyphs (react-icons) because the design draws
   filled icons, which lucide's outline set cannot match.

     BLUE     #6a9bd1   buttons and numbers (the site's own button fill)
              #1a6df5   the design's icon blue, kept as drawn
     BLUE_LT  #7fb0ff   "Grow Faster.", icons on the navy bands
     GREEN    #1aa34a   the one green icon, "Drive Growth"
     NAVY     #0b1f33   headings on white (the site's --fg)
     BODY     #3c5a7e   supporting copy on white (the site's --fg-muted)
     TINT     #eef5ff   the light-blue sections, FAQ rows, quote card
     CIRCLE   #e6f0ff   icon discs on the white sections */

/* Title, description, social tags, headings, intro and schema below come from
   the SEO brief for this page, word for word, with one correction: the brief
   spells the company "Onyxera Tech" in the title tag, the og:title and the
   Service provider, but "Onyxera Tech" in twitter:title. The second is the
   real spelling — the logo, site.name and the Organization schema every page
   emits all use it — so all four read that way here. A provider name that did
   not match that Organization would have described two different companies. */
const TITLE = "Automation Solutions";
const DESCRIPTION =
  "Custom automation solutions that streamline workflows, cut manual work and scale your business with AI. Get a free automation consultation today.";

export const metadata: Metadata = {
  /* `absolute` because the brief writes the title in full, including the
     brand — the layout's "%s | Onyxera Tech" template would print it twice. */
  title: {
    absolute: "Automation Solutions | AI Workflow & CRM Automation | Onyxera Tech",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/automation-solutions" },
  openGraph: openGraph({
    title: "Automation Solutions | Onyxera Tech",
    description:
      "AI powered automation solutions that connect your tools, streamline workflows and help your business save time and grow faster.",
    url: "/automation-solutions",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Automation Solutions | Onyxera Tech",
    description:
      "Custom automation solutions for workflows, CRM, lead management and AI chatbots built around how your business runs.",
  },
};

/* Service and Review markup, transcribed from the brief. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Automation Solutions",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Automation solutions including AI chatbots, CRM automation, workflow automation, lead management, integrations and reporting.",
  url: "https://onyxeratech.com/automation-solutions",
};

const REVIEW_SCHEMA = {
  "@type": "Service",
  name: "Automation Solutions",
  review: {
    "@type": "Review",
    reviewBody:
      "Onyxera Tech helped us automate our lead management and follow up process. We are saving more hours every week and converting more leads.",
    author: { "@type": "Person", name: "Operations Manager" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  },
};

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.   */
/* ------------------------------------------------------------------ */

type Item = { icon: IconType; title: string; body: string };

const challenges: Item[] = [
  { icon: FaClock, title: "Time Consuming", body: "Your team spends too much time on manual tasks." },
  { icon: FaUser, title: "Human Errors", body: "Manual work leads to mistakes and lost opportunities." },
  { icon: FaLayerGroup, title: "Disconnected Tools", body: "Your systems do not talk to each other." },
  { icon: FaChartLine, title: "Limited Growth", body: "You can not scale efficiently with manual processes." },
];

const flow: { icon: IconType; label: string; green?: boolean }[] = [
  { icon: FaMagnet, label: "Capture Leads" },
  { icon: FaBrain, label: "AI Qualifies" },
  { icon: FaDatabase, label: "CRM Updates" },
  { icon: FaEnvelope, label: "Automate Follow Ups" },
  { icon: FaSquareCheck, label: "Complete Tasks" },
  /* The one green icon on the page, exactly as the design draws it. */
  { icon: FaChartLine, label: "Drive Growth", green: true },
];

const automationServices: Item[] = [
  { icon: FaCommentDots, title: "AI Chatbots", body: "Engage visitors, answer questions and qualify leads." },
  { icon: FaUsers, title: "CRM Automation", body: "Automatically manage and update your customer data." },
  { icon: FaGear, title: "Workflow Automation", body: "Connect your tools and automate repetitive tasks." },
  { icon: FaFilter, title: "Lead Management", body: "Capture, qualify and route leads to the right people." },
  { icon: FaLink, title: "Integrations", body: "Connect with your existing tools and platforms." },
  { icon: FaChartSimple, title: "Reporting & Insights", body: "Get real time data to make better decisions." },
];

const results: { icon: IconType; value: string; label: string }[] = [
  { icon: FaGear, value: "70%", label: "Less Manual Work" },
  { icon: FaStopwatch, value: "2x", label: "Faster Response Time" },
  { icon: FaChartSimple, value: "Higher", label: "Lead Conversion" },
  { icon: FaRocket, value: "More", label: "Time to Focus on Growth" },
];

const journey = [
  { title: "Discover", body: "We learn about your business and your goals." },
  { title: "Plan", body: "We design the right automation strategy and workflow." },
  { title: "Build", body: "We implement, integrate and test the solution." },
  { title: "Launch", body: "We go live and train your team." },
  { title: "Optimise", body: "We monitor, improve and scale as you grow." },
];

const outcomes: Item[] = [
  { icon: FaClock, title: "Save Time", body: "Focus on what really matters." },
  { icon: FaCoins, title: "Reduce Costs", body: "Do more with fewer resources." },
  { icon: FaChartLine, title: "More Leads", body: "Capture and convert more opportunities." },
  { icon: FaHandshake, title: "Better Customer Experience", body: "Faster responses and personalised service." },
  { icon: FaChartSimple, title: "Scale with Confidence", body: "Build a stronger foundation for growth." },
];

const why: Item[] = [
  { icon: FaStore, title: "Business First", body: "We understand your business and create solutions that fit." },
  { icon: FaUsers, title: "Expert Team", body: "Specialists in AI, automation and integrations." },
  { icon: FaSliders, title: "Custom Solutions", body: "Built around your processes, not off the shelf." },
  { icon: FaGear, title: "Ongoing Support", body: "We are with you after go live to keep improving." },
];

/* The design shows the questions closed; the answers are written to match
   the tone of the rest of the page. */
const faqsLeft = [
  {
    q: "What types of businesses can benefit from automation?",
    a: "Any business with repetitive tasks, manual data entry or leads that need following up. We work with professional services, trades, retail, healthcare and SaaS teams of every size.",
  },
  {
    q: "How long does it take to implement?",
    a: "Most first workflows are live within two to six weeks, depending on how many tools are involved. We start with the process that will save you the most time.",
  },
  {
    q: "Do you work with our existing tools?",
    a: "Yes. We connect the CRM, inbox, forms, calendar and other platforms you already use rather than asking you to replace them.",
  },
  {
    q: "Is automation secure?",
    a: "Every integration uses the platform's own authorised connection, access is limited to what the workflow needs, and nothing is stored outside the tools you already trust.",
  },
  {
    q: "Can you help with ongoing support?",
    a: "Yes. After go live we monitor the workflows, fix anything that breaks when a tool changes and keep improving them as your business grows.",
  },
];

const faqsRight = [
  {
    q: "Will automation replace our team?",
    a: "No. It takes the repetitive work off their plate so they can spend their time on customers and decisions that need a person.",
  },
  {
    q: "Can you create custom workflows?",
    a: "Yes. Every workflow is designed around how your business actually runs, not a template.",
  },
  {
    q: "What platforms do you integrate with?",
    a: "Popular CRMs, email and SMS tools, web forms, calendars, accounting software, and thousands of apps through Zapier, Make and direct APIs.",
  },
  {
    q: "How do we get started?",
    a: "Request a free consultation using the form below. We look at your current process and come back with a practical recommendation.",
  },
  {
    q: "Do you offer training?",
    a: "Yes. Your team is shown how each workflow runs and how to manage it day to day before we hand over.",
  },
];

/* Outline glyphs here, unlike the solid ones everywhere else — that is how
   the design draws these three. */
const ctaPoints: Item[] = [
  { icon: FaRegCalendarCheck, title: "No Obligation", body: "Consultation" },
  { icon: FaBullseye, title: "Practical", body: "Recommendations" },
  { icon: FaRegGem, title: "Focused on", body: "Your Results" },
];

/* ------------------------------------------------------------------ */
/* Small presentational pieces shared by several sections              */
/* ------------------------------------------------------------------ */

/* Bold uppercase label in the design's blue. */
function Eyebrow({ children }: { children: string }) {
  return (
    <span className="block text-sm font-bold tracking-[0.04em] text-[#3e68a1] uppercase">
      {children}
    </span>
  );
}

/* Section headline on the white / light-blue sections, and on the bands. */
const H2 = "mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]";
/* The three bands (hero, results, consultation) follow the theme like every
   other page does — page ground and theme type — rather than the design's
   fixed navy, at the client's request. Navy in the dark theme, canvas in the
   light one. */
const H2_BAND = "mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-fg";
const P = "mt-4 text-base leading-relaxed text-[#3c5a7e]";
const P_BAND = "mt-4 text-base leading-relaxed text-fg-muted";

/* Card / list-item text tiers. */
const ITEM_TITLE = "mt-4 text-base font-bold text-[#0b1f33]";
const ITEM_BODY = "mt-1.5 text-sm leading-relaxed text-[#3c5a7e]";

/* Light-blue disc with a solid blue icon, as drawn on every white section. */
function IconCircle({ icon: Icon }: { icon: IconType }) {
  return (
    <span className="grid size-[4.5rem] shrink-0 place-items-center rounded-full bg-[#e6f0ff] text-[#1a6df5]">
      <Icon className="size-8" />
    </span>
  );
}

/* The one blue button the design uses everywhere. */
const BTN =
  "group inline-flex items-center justify-center gap-2.5 rounded-md bg-[#6a9bd1] px-6 py-3.5 font-display text-[0.9375rem] font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc]";

const AUTOMATION = getService("automation")!;

export default function AutomationFunnelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/automation-solutions",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "Automation Solutions", path: "/automation-solutions" }],
            }),
            /* Service, Review and FAQPage, exactly as the brief specifies them.
               The review is the testimonial printed further down this page, so
               the markup describes something the visitor can actually see. */
            SERVICE_SCHEMA,
            REVIEW_SCHEMA,
            faqSchema("/automation-solutions", [...faqsLeft, ...faqsRight]),
          ]),
        }}
      />

      {/* ---------------- hero ----------------
          Unlike the rest of the page, the hero follows the theme like every
          other page's hero does: page ground and theme type, so the fixed
          header floats over it the same way it does everywhere else. Navy in
          the dark theme, the off-white canvas in the light one. */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-8 md:pt-32 md:pb-8">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div>
            <h1 className="text-[clamp(2.25rem,4.3vw,3.5rem)] leading-[1.06] font-bold text-fg">
              Automation Solutions That Save Time
              <br />
              <span className="text-accent-strong">and Scale Your Business</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Streamline your workflows, save time and scale your business
                with AI powered automation. We design and implement custom
                automation solutions that work around your goals.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#consultation" className={BTN}>
                  Get a Free Automation Consultation
                  <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#how-it-works"
                  className="group inline-flex items-center gap-3 rounded-md border border-fg/60 px-5 py-3 font-display text-[0.9375rem] font-bold text-fg transition-colors duration-300 hover:border-accent-icon hover:text-accent-strong"
                >
                  See How It Works
                  <span className="grid size-7 place-items-center rounded-full bg-fg text-bg">
                    <FaPlay className="size-3" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} immediate className="relative">
            {/* Soft blue glow behind the artwork, as in the design. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] top-[15%] bottom-[10%] rounded-full bg-[#1a6df5]/25 blur-3xl"
            />
            {/* Two bakes of the same artwork: the handwritten note is white for
                the navy ground and navy for the light one. Picked by the same
                CSS pair the logo uses, so the right one paints on first frame
                with no swap. */}
            <img
              src="/images/automation-funnel-hero-v2.webp"
              alt="Automation solutions connecting CRM, forms, AI chatbot and workflow automation"
              width={1438}
              height={875}
              fetchPriority="high"
              className="logo-on-dark relative w-full lg:w-[118%] lg:max-w-none"
            />
            <img
              src="/images/automation-funnel-hero-light.webp"
              alt="Automation solutions connecting CRM, forms, AI chatbot and workflow automation"
              width={1438}
              height={875}
              className="logo-on-light relative w-full lg:w-[118%] lg:max-w-none"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- intro ----------------
          The brief places this paragraph after the hero and before The
          Challenge, and links its first mention of "automation solutions"
          to the portfolio. */}
      <section className="bg-white pt-12 pb-2 md:pt-14">
        <div className="shell">
          <Reveal>
            <p className={`${P} max-w-4xl`}>
              Onyxera Tech designs and implements{" "}
              {/* `prose-link` is used on /odoo and /services but is not
                  defined in any stylesheet, so it renders as plain text.
                  Styled here instead, in this page's own blue. */}
              <Link
                href="/our-portfolio"
                className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
              >
                automation solutions
              </Link>{" "}
              that remove repetitive, manual work from your business. From AI
              chatbots and CRM automation to workflow automation and lead
              management, our automation solutions connect the tools you
              already use so your team spends less time on data entry and
              follow ups, and more time on the work that actually grows the
              business. Every automation solution we build is custom to how
              your business runs not a generic template.
            </p>
          </Reveal>
        </div>
      </section>
      {/* ---------------- the challenge ---------------- */}
      <section className="bg-white py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>The Challenge</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Why Manual Work Needs the Right
                <br />
                Automation Solutions
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={`${P} max-w-md`}>
                Repetitive tasks, scattered data and slow processes drain your
                time and resources. It is harder to scale when your systems do
                not work together.
              </p>
            </Reveal>
          </div>
          <ul className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {challenges.map((c, i) => (
              <Reveal key={c.title} as="li" delay={i * 70} className="flex flex-col items-center text-center">
                <IconCircle icon={c.icon} />
                <h3 className={ITEM_TITLE}>{c.title}</h3>
                <p className={ITEM_BODY}>{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- our solution ---------------- */}
      <section className="bg-[#eef5ff] py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Our Solution</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Intelligent Automation Solutions
                <br />
                Across Your Business
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={`${P} max-w-md`}>
                We design and implement AI powered automation solutions that
                connect your tools, streamline your workflows and help you
                achieve more with less effort.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#how-it-works" className={`${BTN} mt-7`}>
                See How It Works
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ol className="grid grid-cols-3 gap-y-8 md:flex md:items-start md:justify-between md:gap-1">
              {flow.map((f, i) => (
                <li key={f.label} className="flex items-start md:flex-1">
                  <div className="flex w-full flex-col items-center text-center">
                    <span
                      className={
                        f.green
                          ? "grid size-[4.5rem] place-items-center rounded-full bg-white text-[#1aa34a] shadow-[0_10px_28px_-10px_rgba(26,109,245,0.4)]"
                          : "grid size-[4.5rem] place-items-center rounded-full bg-white text-[#1a6df5] shadow-[0_10px_28px_-10px_rgba(26,109,245,0.4)]"
                      }
                    >
                      <f.icon className="size-8" />
                    </span>
                    <span className="mt-3 max-w-[6.5rem] text-sm font-bold leading-snug text-[#0b1f33] md:text-base">
                      {f.label}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <FaArrowRight
                      aria-hidden="true"
                      className="mt-7 hidden size-4 shrink-0 text-[#1a6df5] md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- services ---------------- */}
      <section className="bg-white py-14 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <Reveal>
                <Eyebrow>Our AI Automation Services</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>
                  Our Automation Solutions
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className={`${P} max-w-lg`}>
                  A complete range of AI and automation services to help you
                  save time, reduce costs and grow your business.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Link
                href="/services/automation"
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-bold text-[#4f81bc] transition-colors duration-300 hover:text-[#3e68a1]"
              >
                Explore All Automation Services
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {automationServices.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 60}
                className="flex flex-col items-center rounded-lg border border-[#dbe6f5] bg-white px-4 py-7 text-center transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(26,109,245,0.35)]"
              >
                <IconCircle icon={s.icon} />
                <h3 className={ITEM_TITLE}>{s.title}</h3>
                <p className={ITEM_BODY}>{s.body}</p>
                {/* The brief asks for one contextual link here: GoHighLevel is
                    the CRM we build this on, so the CRM card carries it. */}
                {s.title === "CRM Automation" && (
                  <Link
                    href="/platforms/gohighlevel"
                    className="mt-2 text-[0.8125rem] font-bold text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
                  >
                    Built on GoHighLevel
                  </Link>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- results ---------------- */}
      <section className="bg-bg py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Smarter Processes. Better Results.</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_BAND}>
                What Our Automation
                <br />
                Solutions Deliver
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={`${P_BAND} max-w-md`}>
                We use AI and automation to streamline operations to improve
                customer experiences and unlock new growth opportunities for
                your business.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#consultation" className={`${BTN} mt-7`}>
                Get a Free Automation Consultation
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((r, i) => (
              <Reveal
                key={r.label}
                as="li"
                delay={i * 70}
                className="flex flex-col items-center rounded-lg border border-line-strong bg-surface px-3 py-8 text-center shadow-soft"
              >
                <r.icon className="size-11 text-accent" />
                <span className="mt-4 font-display text-4xl font-bold text-fg">{r.value}</span>
                <span className="mt-1.5 text-sm leading-snug text-fg-muted">{r.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- journey ---------------- */}
      <section id="how-it-works" className="scroll-mt-24 bg-white py-14 md:py-16">
        <div className="shell">
          <Reveal>
            <Eyebrow>The Automation Journey</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>How Our Automation Solutions Are Built</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>A simple process to get your automation up and running.</p>
          </Reveal>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {journey.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 70} className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#6a9bd1] text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#0b1f33]">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#3c5a7e]">{s.body}</p>
                </div>
                {i < journey.length - 1 && (
                  <FaArrowRight
                    aria-hidden="true"
                    className="mt-3.5 hidden size-4 shrink-0 text-[#1a6df5] lg:block"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- tools & stack ----------------
          The same band as /services/automation, fed from that service's own
          list, so the two pages never drift apart. Placed after the journey,
          where a reader has just seen how the work runs. */}
      {/* The brief gives this band alt text. It is a marquee of individual
          tool logos rather than one image, so the text names the band. */}
      <StackBand
        stack={AUTOMATION.stack}
        intro={AUTOMATION.stackIntro}
        label="Automation tools used to build custom workflow and CRM automation solutions"
      />

      {/* ---------------- outcomes ---------------- */}
      <section className="bg-[#eef5ff] py-14 md:py-16">
        <div className="shell">
          <Reveal>
            <Eyebrow>Business Outcomes</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>What Changes for Your Business?</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {outcomes.map((o, i) => (
              <Reveal key={o.title} as="li" delay={i * 70} className="flex flex-col items-center text-center">
                <IconCircle icon={o.icon} />
                <h3 className={ITEM_TITLE}>{o.title}</h3>
                <p className={ITEM_BODY}>{o.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- why onyxera ---------------- */}
      <section className="bg-white py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Why Onyxera Tech</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Why Choose Our Automation Solutions</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>A strategic partner focused on your success.</p>
            </Reveal>
            <ul className="mt-9 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
              {why.map((w, i) => (
                <Reveal key={w.title} as="li" delay={i * 70} className="flex flex-col items-center text-center">
                  <IconCircle icon={w.icon} />
                  <h3 className={ITEM_TITLE}>{w.title}</h3>
                  <p className={ITEM_BODY}>{w.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={200}>
            <figure className="rounded-xl border border-[#cfe0fb] bg-[#eef5ff] p-7 md:p-8">
              <FaQuoteLeft aria-hidden="true" className="size-7 text-[#1a6df5]" />
              <blockquote className="mt-3 text-base leading-relaxed text-[#0b1f33] md:text-[1.0625rem]">
                &ldquo;Onyxera Tech helped us automate our lead management and
                follow up process. We are saving more hours every week and
                converting more leads.&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-[#1a6df5] text-white">
                  <FaUser className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#0b1f33]">Operations Manager</span>
                  <span className="block text-[0.8125rem] text-[#3c5a7e]">Professional Services Business</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="bg-white pb-14 md:pb-16">
        <div className="shell">
          <Reveal>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Automation Solutions &mdash; Frequently Asked Questions</h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-6">
              <AutomationFunnelFaq items={faqsLeft} />
              <AutomationFunnelFaq items={faqsRight} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- consultation ---------------- */}
      <section id="consultation" className="bg-bg py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              {/* Same pill as the hero eyebrow. */}
              <span className="inline-block rounded-sm bg-blue-400/18 px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.04em] text-accent-strong uppercase">
                Ready to Automate Your Business?
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={`${H2_BAND} mt-4`}>Get Started With Your Automation Solution</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={`${P_BAND} max-w-xl`}>
                Tell us about your business and we will recommend the right
                automation solutions to help you save time, reduce costs and
                grow faster.
              </p>
            </Reveal>
            <Reveal delay={220}>
              {/* Larger discs than the hero's, with outline glyphs and the
                  label on two lines, as the design draws them here. */}
              <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
                {ctaPoints.map((p) => (
                  <li key={p.title} className="flex items-center gap-3.5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface text-accent shadow-soft">
                      <p.icon className="size-6" />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-fg">{p.title}</span>
                      <span className="block text-[0.9375rem] font-medium text-fg">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <AutomationFunnelForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
