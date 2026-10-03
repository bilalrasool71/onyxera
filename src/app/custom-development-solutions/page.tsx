import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaBullseye,
  FaChartSimple,
  FaCloud,
  FaCode,
  FaDatabase,
  FaFileLines,
  FaGear,
  FaGlobe,
  FaHeadset,
  FaLink,
  FaMagnifyingGlass,
  FaMobileScreen,
  FaPalette,
  FaPlay,
  FaRobot,
  FaRocket,
  FaShareNodes,
  FaUsers,
} from "react-icons/fa6";
import { StackBand } from "@/components/sections/StackBand";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/lib/data/services";
import { graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so its
   sections deliberately do not use the theme tokens and look the same in both
   themes — except the hero and the outcomes band, which follow the theme like
   the other platform pages. Built from the same pieces as /odoo,
   /frappe-erpnext and /cyber-security-platform.

     BLUE    #6a9bd1  buttons (the site's own button fill)
             #1a6df5  the design's icon blue, kept as drawn
     ACCENTS #7c3aed purple, #1aa34a green, #f97316 orange, #e0447c pink
             — one colour per glyph, as the design assigns them
     NAVY    #0b1f33  headings on white (the site's --fg)
     BODY    #3c5a7e  supporting copy on white (the site's --fg-muted)
     TINT    #eef5ff  the light-blue sections
     DISC    the icon's own colour at 12%, as the design draws it */

/* Service markup, transcribed from the brief. The BreadcrumbList the brief
   also asks for is already emitted by pageSchema's `crumbs` below. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Custom Development Solutions",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Custom development solutions including web applications, custom software, ERP, CRM, SaaS platforms, AI systems and system integration.",
  url: "https://onyxeratech.com/custom-development-solutions",
};
/* Title, description, social tags, headings, opening paragraph and schema
   below come from the SEO brief for this page, word for word, with one
   correction: the brief writes the company as "Onyxera Tech" throughout,
   while the logo, site.name and the Organization schema every page emits
   all read "Onyxera Tech". A provider name that did not match that
   Organization would describe two different companies, so it reads that
   way here. The brief offers two title tags — its own current one and a
   shorter "Alternative" — and the shorter one is used, because it is what
   its og:title and twitter:title also say. */
const TITLE = "Custom Development Solutions";
const DESCRIPTION =
  "Get custom development solutions built around your business web apps, software, ERP, CRM and AI systems; built to grow with you.";

export const metadata: Metadata = {
  /* `absolute` because the brief writes the title in full, including the
     brand — the layout's "%s | Onyxera Tech" template would print it twice. */
  title: { absolute: "Custom Development Solutions | Onyxera Tech" },
  description: DESCRIPTION,
  alternates: { canonical: "/custom-development-solutions" },
  openGraph: openGraph({
    title: "Custom Development Solutions | Onyxera Tech",
    description:
      "Get custom development solutions built around your business web apps, software, ERP, CRM, AI systems and integrations, built to scale.",
    url: "/custom-development-solutions",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Custom Development Solutions | Onyxera Tech",
    description:
      "Custom development solutions for growing businesses software, apps, ERP, CRM and AI, engineered around how you work.",
  },
};

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.    */
/* ------------------------------------------------------------------ */

const BLUE = "#1a6df5";
const PURPLE = "#7c3aed";
const GREEN = "#1aa34a";
const ORANGE = "#f97316";
const PINK = "#e0447c";

type Item = { icon: IconType; title: string; body: string; color?: string };

const challenges: Item[] = [
  {
    icon: FaLink,
    title: "Disconnected Systems",
    body: "Your tools do not talk to each other.",
    color: PINK,
  },
  {
    icon: FaDatabase,
    title: "Outdated Technology",
    body: "Legacy systems hold you back.",
  },
  {
    icon: FaGear,
    title: "Manual Processes",
    body: "Time consuming and error prone.",
    color: ORANGE,
  },
  {
    icon: FaChartSimple,
    title: "Difficult to Scale",
    body: "Your technology cannot keep up with your ambitions.",
    color: GREEN,
  },
];

/* The six stages the design draws across the solution band. */
const flow: { icon: IconType; label: string }[] = [
  { icon: FaBullseye, label: "Business Goals" },
  { icon: FaFileLines, label: "Plan" },
  { icon: FaCode, label: "Build" },
  { icon: FaLink, label: "Integrate" },
  { icon: FaRocket, label: "Launch" },
  { icon: FaChartSimple, label: "Grow" },
];

const solutions: Item[] = [
  {
    icon: FaGlobe,
    title: "Web Applications",
    body: "Build high performance web applications, portals and dashboards tailored to your business workflows.",
  },
  {
    icon: FaCode,
    title: "Custom Software",
    body: "Develop purpose built software around your unique requirements and processes.",
    color: PURPLE,
  },
  {
    icon: FaDatabase,
    title: "ERP Platforms",
    body: "Connect and unify your core business functions with scalable ERP solutions.",
    color: PURPLE,
  },
  {
    icon: FaUsers,
    title: "CRM Platforms",
    body: "Build powerful CRM systems to manage customers, sales pipelines and communications.",
  },
  {
    icon: FaCloud,
    title: "SaaS Engineering",
    body: "Design and develop scalable SaaS platforms for B2B and consumer markets.",
  },
  {
    icon: FaMobileScreen,
    title: "Mobile Applications",
    body: "Create intuitive and high performance mobile applications for iOS and Android.",
    color: GREEN,
  },
];

const intelligence: Item[] = [
  {
    icon: FaBrain,
    title: "AI Systems & LLMs",
    body: "Build practical AI systems using LLMs and your business data.",
    color: PURPLE,
  },
  {
    icon: FaRobot,
    title: "AI Agents & Automation",
    body: "Develop intelligent AI agents to execute tasks across your business systems.",
  },
  {
    icon: FaShareNodes,
    title: "API & System Integration",
    body: "Connect your software and third party systems with secure and reliable integrations.",
    color: GREEN,
  },
];

const modern: Item[] = [
  {
    icon: FaCloud,
    title: "Cloud & DevOps Core",
    body: "Build secure and scalable cloud infrastructure with modern DevOps practices.",
  },
  {
    icon: FaGear,
    title: "Software Modernization",
    body: "Transform legacy systems into modern, high performance solutions.",
    color: ORANGE,
  },
  {
    icon: FaChartSimple,
    title: "BI & Real Time Analytics",
    body: "Turn your data into clear dashboards and actionable insights.",
    color: PURPLE,
  },
];

const journey: Item[] = [
  { icon: FaMagnifyingGlass, title: "Discover", body: "Understand your needs and goals." },
  { icon: FaFileLines, title: "Define", body: "Scope and plan the solution." },
  { icon: FaPalette, title: "Design", body: "Create the technical design and architecture." },
  { icon: FaCode, title: "Develop", body: "Build and test the solution." },
  { icon: FaLink, title: "Integrate", body: "Connect with your existing systems." },
  { icon: FaRocket, title: "Launch", body: "Deploy and train your team." },
  { icon: FaHeadset, title: "Support", body: "Ongoing support and improvements." },
];

const outcomes: Item[] = [
  { icon: FaGear, title: "Better Technology", body: "Solutions that fit your business.", color: GREEN },
  { icon: FaLink, title: "Connected Systems", body: "Seamless data and workflows." },
  { icon: FaBolt, title: "Faster Operations", body: "Improve efficiency and productivity.", color: "#fbbf24" },
  { icon: FaChartSimple, title: "Scalable Growth", body: "Technology that grows with you.", color: PURPLE },
  { icon: FaBullseye, title: "Better Decisions", body: "Real time data and actionable insights.", color: PINK },
];

/* ------------------------------------------------------------------ */
/* Small presentational pieces shared by several sections              */
/* ------------------------------------------------------------------ */

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-sm bg-[#e6f0ff] px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.04em] text-[#3e68a1] uppercase">
      {children}
    </span>
  );
}

/* The hero and the outcomes band follow the theme, so their pill uses the
   theme's accent rather than the fixed blue of the white sections. */
function PillBand({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-sm bg-blue-400/18 px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.04em] text-accent-strong uppercase">
      {children}
    </span>
  );
}

const H2 = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]";
const H2_BAND = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-fg";
const P = "mt-4 text-base leading-relaxed text-[#3c5a7e]";

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#6a9bd1] px-5 py-3 font-display text-sm font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc]";

/* A tinted disc behind a glyph, in the glyph's own colour — the design uses it
   on the challenge, solution-flow, AI and journey icons. */
function Disc({
  icon: Icon,
  color = BLUE,
  size = "size-12",
  glyph = "size-5",
}: {
  icon: IconType;
  color?: string;
  size?: string;
  glyph?: string;
}) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full`}
      style={{ color, backgroundColor: `${color}1f` }}
    >
      <Icon className={glyph} />
    </span>
  );
}

/* The card shape the design repeats four times: a centred glyph — on a tinted
   disc or bare, as the section draws it — over a centred title and body. */
function CardGrid({
  items,
  cols,
  disc = false,
}: {
  items: Item[];
  cols: string;
  disc?: boolean;
}) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
      {items.map((c, i) => (
        <Reveal
          key={c.title}
          as="li"
          delay={(i % 6) * 60}
          className="flex flex-col items-center rounded-lg border border-[#dbe6f5] bg-white px-3 py-5 text-center"
        >
          {disc ? (
            <Disc icon={c.icon} color={c.color} />
          ) : (
            <c.icon className="size-7" style={{ color: c.color ?? BLUE }} />
          )}
          <h3 className="mt-3 text-[0.9375rem] leading-snug font-bold text-[#0b1f33] text-balance">
            {c.title}
          </h3>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#3c5a7e] text-balance">
            {c.body}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

const DEVELOPMENT = getService("development-solutions")!;

export default function DevelopmentPlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/custom-development-solutions",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [
                { label: "Custom Development Solutions", path: "/custom-development-solutions" },
              ],
            }),
            SERVICE_SCHEMA,
          ]),
        }}
      />

      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-6">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              Custom Development Solutions
              <br />
              <span className="text-accent-strong">Built Around Your Business</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Build, integrate and modernise the technology your business needs
                with scalable software, applications and connected systems
                designed around your goals.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Discuss Your Development Project
                  <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#how-we-work"
                  className="group inline-flex items-center gap-2.5 rounded-md border border-fg/60 px-4 py-2.5 font-display text-sm font-bold text-fg transition-colors duration-300 hover:border-accent-icon hover:text-accent-strong"
                >
                  See How We Work
                  <span className="grid size-6 place-items-center rounded-full bg-fg text-bg">
                    <FaPlay className="size-2.5" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} immediate className="relative">
            <img
              src="/images/development-platform-hero-v2.webp"
              alt="Custom development solutions connecting web apps, CRM, ERP, AI and cloud systems"
              width={1572}
              height={885}
              fetchPriority="high"
              className="relative w-full rounded-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- opening paragraph ----------------
          The brief supplies this paragraph and leaves the placement to us.
          It sits where the same paragraph sits on the other two briefed
          pages: after the hero, before The Challenge. */}
      <section className="bg-white pt-12 pb-2 md:pt-14">
        <div className="shell">
          <Reveal>
            <p className={`${P} max-w-4xl`}>
              Onyxera Tech delivers custom development solutions for businesses
              that have outgrown off-the-shelf software. From web applications
              and custom software to ERP, CRM and AI-powered systems, our
              development team designs and builds technology around how your
              business actually works not the other way around. Every custom
              development solution we build is engineered to integrate with
              your existing systems, scale as you grow, and remove the manual
              work that slows your team down.
            </p>
          </Reveal>
        </div>
      </section>
      {/* ---------------- the challenge ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Pill>The Challenge</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Why Your Business Needs the
                <br />
                Right Development Partner
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Disconnected tools, outdated systems and manual processes create
                friction, slow down your team and limit your growth. You need
                technology that works together and evolves with your business.
              </p>
            </Reveal>
          </div>
          <CardGrid items={challenges} cols="lg:grid-cols-4" disc />
        </div>
      </section>

      {/* ---------------- our solution ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>Our Solution</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Custom Software Development
                <br />
                Solutions, Built Around You
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We build and connect the right technology around your business
                requirements, creating scalable solutions that streamline
                operations and support your long term growth.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#how-we-work" className={`${BTN} mt-6`}>
                See How We Work
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ol className="grid grid-cols-3 gap-y-8 md:flex md:items-start md:justify-between md:gap-1">
              {flow.map((f, i) => (
                <li key={f.label} className="flex items-start md:flex-1">
                  <div className="flex w-full flex-col items-center text-center">
                    <Disc icon={f.icon} size="size-16" glyph="size-6" />
                    <span className="mt-3 max-w-[6.5rem] text-sm leading-snug font-bold text-[#0b1f33]">
                      {f.label}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <FaArrowRight
                      aria-hidden="true"
                      className="mt-6 hidden size-3.5 shrink-0 text-[#1a6df5] md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- our development solutions ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>Our Development Solutions</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Our Custom Development Solutions</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We design and develop scalable software, applications and
                systems that solve real business problems and create long term
                value.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link
                href="/services/development-solutions"
                className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-[#4f81bc] transition-colors duration-300 hover:text-[#3e68a1]"
              >
                Explore All Development Solutions
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <CardGrid items={solutions} cols="lg:grid-cols-3" />
        </div>
      </section>

      {/* ---------------- ai and integration ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>AI and Integration</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                AI Development Solutions
                <br />
                &amp; System Integration
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We build intelligent systems and integrations that connect your
                data, enhance decision making and streamline your operations.
              </p>
            </Reveal>
          </div>
          <CardGrid items={intelligence} cols="lg:grid-cols-3" disc />
        </div>
      </section>

      {/* ---------------- modern technology ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>Modern Technology</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Modern, Scalable Development Solutions</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We modernise and optimise your technology infrastructure to
                deliver better performance, scalability and long term
                reliability.
              </p>
            </Reveal>
          </div>
          <CardGrid items={modern} cols="lg:grid-cols-3" />
        </div>
      </section>

      {/* ---------------- tools & stack ----------------
          The same band as /services/development-solutions, fed from that
          service's own list. It follows "Modern Technology" rather than the
          journey here: the outcomes band after the journey is already a
          theme band, and two in a row would read as one. */}
      {/* The brief gives this band alt text. It is a marquee of individual
          tool logos rather than one image, so the text names the band. */}
      <StackBand
        stack={DEVELOPMENT.stack}
        intro={DEVELOPMENT.stackIntro}
        label="Technology stack used for custom software and web application development"
      />

      {/* ---------------- the development journey ---------------- */}
      <section id="how-we-work" className="scroll-mt-24 bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>The Development Journey</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Our Custom Software Development Process</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={`${P} max-w-2xl`}>
              A clear and collaborative process to bring your ideas to life.
            </p>
          </Reveal>

          <div className="relative mt-10">
            {/* The rail the steps sit on. Stops short of the outer discs so it
                never runs past the first or last step. */}
            <span
              aria-hidden="true"
              className="absolute top-7 right-[7.2%] left-[7.2%] hidden h-px bg-[#c3d8f2] lg:block"
            />
            <ol className="relative grid gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
              {journey.map((s, i) => (
                <Reveal
                  key={s.title}
                  as="li"
                  delay={(i % 7) * 60}
                  className="flex flex-col items-center px-1 text-center"
                >
                  <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-[#c3d8f2] bg-white text-[#1a6df5] shadow-[0_8px_20px_-12px_rgba(26,109,245,0.7)]">
                    <s.icon className="size-5" />
                    <span className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-[#1a6df5] text-[0.625rem] font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                    {s.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- business outcomes ----------------
          Follows the theme, as the design draws it dark. */}
      <section className="bg-bg py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <PillBand>Business Outcomes</PillBand>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2_BAND}>Business Outcomes From Custom Development</h2>
          </Reveal>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-line-strong">
            {outcomes.map((o, i) => (
              <Reveal key={o.title} as="li" delay={i * 60} className="lg:px-6 lg:first:pl-0">
                <o.icon className="size-8" style={{ color: o.color ?? BLUE }} />
                <h3 className="mt-3 text-[0.9375rem] leading-snug font-bold text-fg">{o.title}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">{o.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- get started ----------------
          Not in the supplied design, which stops at the outcomes band. Built
          to match the closing band on the other platform pages so the page has
          somewhere to send a reader; replace it if the design continues. */}
      <section id="consultation" className="scroll-mt-24 bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>Get Started Today</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Start Your Custom Development Project</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={`${P} max-w-xl`}>
                Tell us what you are trying to build or fix. We&rsquo;ll review your
                requirements and recommend the right approach for your business.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <Link href="/contact" className={BTN}>
              Discuss Your Development Project
              <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
