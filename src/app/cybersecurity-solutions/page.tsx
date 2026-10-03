import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBolt,
  FaBug,
  FaChartSimple,
  FaCircleCheck,
  FaCloud,
  FaDatabase,
  FaDesktop,
  FaFileShield,
  FaGear,
  FaHeadset,
  FaLaptop,
  FaLock,
  FaMagnifyingGlass,
  FaNetworkWired,
  FaPlay,
  FaQuoteLeft,
  FaRotate,
  FaShieldHalved,
  FaTriangleExclamation,
  FaUserLock,
  FaUsers,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { StackBand } from "@/components/sections/StackBand";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/lib/data/services";
import { faqSchema, graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so its
   sections deliberately do not use the theme tokens and look the same in both
   themes. It is built from the same pieces as /odoo and /frappe-erpnext, so
   the platform pages stay identical in everything but their copy.

   The one difference from those two: the hero and the closing band carry a
   fixed navy rather than following the theme. The artwork is a full dark scene
   with no transparency, so on the light theme's off-white canvas it would read
   as a dark rectangle dropped on the page. The design draws both bands dark,
   and this keeps them that way.

     BLUE    #6a9bd1  buttons (the site's own button fill)
             #1a6df5  the design's icon blue, kept as drawn
     GREEN   #1aa34a / ORANGE #f97316 / PURPLE #7c3aed / PINK #e0447c
             — the accent icons, one colour per glyph as the design assigns
     NAVY    #0b1f33  headings on white (the site's --fg)
     BODY    #3c5a7e  supporting copy on white (the site's --fg-muted)
     TINT    #eef5ff  the light-blue section
     CIRCLE  #e6f0ff  icon squares and discs on the white sections
     BAND    #001d3e  the hero, #00142c the closing band */

/* Title, description, social tags, headings, intro and schema below come from
   the SEO brief for this page, word for word, with one correction: the brief
   writes the company as "Onyxera Tech" in the title tag and the Service
   provider, but "Onyxera Tech" in both og:title and twitter:title. The latter
   is the real spelling — the logo, site.name and the Organization schema every
   page emits all use it — so it reads that way throughout. */
const TITLE = "Cybersecurity Solutions";
const DESCRIPTION =
  "Enterprise grade cybersecurity solutions to prevent threats, protect data and keep your business compliant. Get a free security consultation today.";

export const metadata: Metadata = {
  /* `absolute` because the brief writes the title in full, including the
     brand — the layout's "%s | Onyxera Tech" template would print it twice. */
  title: {
    absolute: "Cybersecurity Solutions | Threat Detection & Compliance | Onyxera Tech",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/cybersecurity-solutions" },
  openGraph: openGraph({
    title: "Cybersecurity Solutions | Onyxera Tech",
    description:
      "End-to-end cybersecurity solutions covering threat detection, network security, compliance and 24/7 monitoring for growing businesses.",
    url: "/cybersecurity-solutions",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Solutions | Onyxera Tech",
    description:
      "Enterprise-grade cybersecurity solutions threat detection, cloud security, compliance and ongoing monitoring, built around your business.",
  },
};

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.    */
/* ------------------------------------------------------------------ */

type Item = { icon: IconType; title: string; body: string; color?: string };

const challenges: Item[] = [
  {
    icon: FaBug,
    title: "Growing Threats",
    body: "Cyber attacks are more frequent and sophisticated.",
    color: "#e0447c",
  },
  {
    icon: FaDatabase,
    title: "Data at Risk",
    body: "Sensitive data can be exposed or stolen.",
  },
  {
    icon: FaTriangleExclamation,
    title: "Business Disruption",
    body: "Security incidents can halt operations.",
    color: "#f97316",
  },
  {
    icon: FaFileShield,
    title: "Compliance Pressure",
    body: "Regulations require stronger security measures.",
    color: "#1aa34a",
  },
];

/* The five stages the design draws across the solution band. */
const flow: { icon: IconType; label: string; sub: string; color?: string }[] = [
  { icon: FaMagnifyingGlass, label: "Assess", sub: "Identify risks" },
  { icon: FaShieldHalved, label: "Protect", sub: "Implement security measures", color: "#1aa34a" },
  { icon: FaDesktop, label: "Monitor", sub: "Detect and respond to threats", color: "#7c3aed" },
  { icon: FaRotate, label: "Recover", sub: "Minimise impact", color: "#f97316" },
  { icon: FaChartSimple, label: "Stay Ahead", sub: "Continuously improve", color: "#1aa34a" },
];

const services: Item[] = [
  {
    icon: FaBug,
    title: "Threat Detection & Response",
    body: "Identify and stop threats before they cause damage.",
    color: "#e0447c",
  },
  {
    icon: FaNetworkWired,
    title: "Network Security",
    body: "Protect your networks and infrastructure.",
    color: "#1aa34a",
  },
  {
    icon: FaLaptop,
    title: "Endpoint Security",
    body: "Secure all devices across your business.",
  },
  {
    icon: FaCloud,
    title: "Cloud Security",
    body: "Keep your cloud environments safe and compliant.",
  },
  {
    icon: FaUserLock,
    title: "Identity & Access Management",
    body: "Control access and prevent unauthorised entry.",
    color: "#f97316",
  },
  {
    icon: FaDatabase,
    title: "Data Protection",
    body: "Secure and manage your critical data.",
    color: "#7c3aed",
  },
  {
    icon: FaFileShield,
    title: "Compliance & Risk Management",
    body: "Meet industry regulations and reduce risk.",
    color: "#e0447c",
  },
  {
    icon: FaShieldHalved,
    title: "Security Monitoring & Support",
    body: "24/7 monitoring and expert support.",
    color: "#f97316",
  },
];

const journey: Item[] = [
  {
    icon: FaMagnifyingGlass,
    title: "Discover",
    body: "Understand your business and identify risks.",
    color: "#7c3aed",
  },
  { icon: FaFileShield, title: "Assess", body: "Evaluate your current security environment." },
  { icon: FaGear, title: "Plan", body: "Design a tailored security strategy.", color: "#1aa34a" },
  {
    icon: FaShieldHalved,
    title: "Implement",
    body: "Deploy security solutions.",
    color: "#f97316",
  },
  { icon: FaDesktop, title: "Monitor", body: "Continuously detect and respond.", color: "#7c3aed" },
  { icon: FaChartSimple, title: "Optimise", body: "Improve and adapt as threats evolve.", color: "#1aa34a" },
];

const outcomes: Item[] = [
  { icon: FaLock, title: "Stronger Security", body: "Protect your business and data." },
  {
    icon: FaGear,
    title: "Reduced Risk",
    body: "Minimise the chance of costly incidents.",
  },
  {
    icon: FaChartSimple,
    title: "Business Continuity",
    body: "Keep your operations running smoothly.",
    color: "#f97316",
  },
  {
    icon: FaCircleCheck,
    title: "Regulatory Compliance",
    body: "Meet industry standards with confidence.",
    color: "#1aa34a",
  },
  {
    icon: FaUsers,
    title: "Peace of Mind",
    body: "Focus on growth while we keep you secure.",
    color: "#e0447c",
  },
];

const why: Item[] = [
  { icon: FaUsers, title: "Expert Team", body: "Certified security professionals.", color: "#7c3aed" },
  {
    icon: FaGear,
    title: "Tailored Solutions",
    body: "Built around your business needs.",
    color: "#e0447c",
  },
  { icon: FaBolt, title: "Proactive Approach", body: "Prevent issues before they happen.", color: "#f97316" },
  { icon: FaHeadset, title: "Ongoing Support", body: "We are with you every step of the way." },
];

/* The nine questions are the design's own. The answers are NOT — the design
   draws every row closed, so no answer copy came with it. These are written
   from what this page already states and are waiting on the client to confirm
   or replace them. */
/* The six items the brief lists under "What Do Cybersecurity Solutions
   Include?", verbatim. */
/* Service and Review markup, transcribed from the brief. The review is the
   testimonial printed further down this page, so the markup describes
   something the visitor can actually see. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Cybersecurity Solutions",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Cybersecurity solutions including threat detection and response, network security, endpoint security, cloud security, identity and access management, data protection and compliance.",
  url: "https://onyxeratech.com/cybersecurity-solutions",
};

const REVIEW_SCHEMA = {
  "@type": "Service",
  name: "Cybersecurity Solutions",
  review: {
    "@type": "Review",
    reviewBody:
      "Onyxera Tech helped us strengthen our security posture and gave us confidence to scale our business.",
    author: { "@type": "Person", name: "IT Manager" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  },
};
const included = [
  "Threat detection and response",
  "Network and endpoint security",
  "Cloud security and identity and access management",
  "Data protection and encryption",
  "Compliance and risk management",
  "24/7 security monitoring and support",
];
/* The three questions marked below were added for the brief's People Also
   Ask requirement. The brief asked for three but did not supply them, so
   they are written here against the page's target keyword. They say only
   what the rest of the page already says, and name no price or figure. */
const faqsLeft = [
  {
    /* PAA */
    q: "What are cybersecurity solutions?",
    a: "Cybersecurity solutions are the tools, processes and monitoring that protect a business's systems, data and people from threats such as data breaches, ransomware and unauthorised access. In practice that means threat detection and response, network and endpoint security, cloud security, identity and access management, data protection and compliance working as one set rather than as separate products.",
  },
  {
    q: "What types of businesses can benefit?",
    a: "Any business that holds customer data, takes payments or depends on its systems to trade. The smaller the team, the more a single incident tends to cost, because there is rarely anyone whose job it is to watch for one.",
  },
  {
    q: "How do you identify security risks?",
    a: "We review your systems, cloud accounts, devices and access controls, then test the parts that face the internet. You get a written list of what we found, ranked by what would hurt most.",
  },
  {
    q: "Do you provide ongoing monitoring?",
    a: "Yes. Monitoring and support run continuously rather than as a one-off audit, because the threats change after the report is written.",
  },
];

const faqsMiddle = [
  {
    q: "How long does it take to implement?",
    a: "An assessment takes days rather than weeks. How long the fixes take depends on what we find and how much of your estate is in scope, which is why we give you a plan before a timeline.",
  },
  {
    q: "Can you help with compliance?",
    a: "Yes. We map your current controls against the standard you need to meet, close the gaps and prepare the evidence. The formal audit itself is carried out by an accredited auditor.",
  },
  {
    /* PAA */
    q: "What is the difference between cybersecurity solutions and antivirus software?",
    a: "Antivirus is one part of one layer: it looks for known malware on a device. Cybersecurity solutions cover the rest of the picture, including who can reach what, how your cloud accounts are configured, what leaves your network, and what happens in the hours after something does get in. Plenty of incidents never involve a virus on a laptop at all.",
  },
  {
    q: "What industries do you work with?",
    a: "We work across professional services, healthcare, retail and manufacturing. The controls differ by sector mainly in what has to be evidenced, not in how the work is done.",
  },
];

const faqsRight = [
  {
    q: "What security tools do you use?",
    a: "We use established, well-supported tooling rather than anything exotic, and we tell you what is running on your systems. Nothing goes in that your team cannot see or maintain.",
  },
  {
    q: "How do we get started?",
    a: "With a free consultation. We look at how your business runs today, where the data lives and who has access, then come back with a recommendation.",
  },
  {
    /* PAA */
    q: "How much do cybersecurity solutions cost?",
    a: "It depends on how many systems and users you have, what you are required to comply with, and whether you need a one-off assessment or continuous monitoring. We scope it before quoting rather than pricing a package you may not need, and we will tell you which parts can safely wait.",
  },
  {
    q: "Is our data safe with you?",
    a: "We take the least access we need to do the work, hold nothing we do not need, and remove our access when the engagement ends.",
  },
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

/* The hero follows the theme, so its pill uses the theme's accent; the closing
   band is fixed navy and uses a light tint on it. */
function PillBand({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-sm bg-blue-400/18 px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.04em] text-accent-strong uppercase">
      {children}
    </span>
  );
}

const H2 = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]";
const H2_BAND = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-white";
const P = "mt-4 text-base leading-relaxed text-[#3c5a7e]";
const P_BAND = "mt-4 text-base leading-relaxed text-[#c9d7ec]";

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

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#6a9bd1] px-5 py-3 font-display text-sm font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc]";

const CYBER = getService("cyber-security")!;

export default function CyberSecurityPlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/cybersecurity-solutions",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "Cybersecurity Solutions", path: "/cybersecurity-solutions" }],
            }),
            SERVICE_SCHEMA,
            REVIEW_SCHEMA,
            faqSchema("/cybersecurity-solutions", [
              ...faqsLeft,
              ...faqsMiddle,
              ...faqsRight,
            ]),
          ]),
        }}
      />

      {/* ---------------- hero ----------------
          Fixed navy, not a theme band: the artwork is a full dark scene with
          no transparency and cannot sit on the light theme's canvas. */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              Cybersecurity Solutions Built
              <br />
              <span className="text-accent-strong">to Protect Your Business</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Protect your business with enterprise grade cyber security
                solutions. Prevent threats, safeguard your data and keep your
                operations running with confidence.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Get a Free Security Consultation
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

          <Reveal delay={160} immediate className="relative">
            <img
              src="/images/cyber-security-platform-hero.webp"
              alt="Cybersecurity solutions covering threat detection, network security and compliance"
              width={1572}
              height={1048}
              fetchPriority="high"
              className="relative w-full rounded-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- intro ----------------
          The brief places this paragraph and the definition block below it
          after the hero and before The Challenge, and links the first
          mention of "cybersecurity solutions" to the portfolio. */}
      <section className="bg-white pt-12 pb-2 md:pt-14">
        <div className="shell">
          <Reveal>
            <p className={`${P} max-w-4xl`}>
              {/* `prose-link` is used elsewhere in this project but is not
                  defined in any stylesheet, so it renders as plain text.
                  Styled here instead, in this page's own blue. */}
              <Link
                href="/our-portfolio"
                className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
              >
                Cybersecurity solutions
              </Link>{" "}
              protect a business&rsquo;s systems, data and people from threats
              such as data breaches, ransomware and unauthorised access.
              Onyxera Tech delivers end-to-end cybersecurity solutions covering
              threat detection and response, network and endpoint security,
              cloud security, identity and access management, data protection
              and compliance. Rather than a one-off audit, our cybersecurity
              solutions combine prevention, continuous monitoring and rapid
              response, so your business stays protected as threats evolve.
            </p>
          </Reveal>

          {/* The brief's definition block, added for AI Overview and
              People Also Ask. */}
          <Reveal delay={80}>
            <div className="mt-8 max-w-3xl rounded-lg border border-[#dbe6f5] bg-[#eef5ff] p-6 md:p-8">
              <h2 className="text-[1.125rem] leading-snug font-bold text-[#0b1f33]">
                What Do Cybersecurity Solutions Include?
              </h2>
              <p className={`${P} mt-3`}>Cybersecurity solutions typically include:</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <FaCircleCheck
                      aria-hidden="true"
                      className="mt-[0.2rem] size-4 shrink-0 text-[#1a6df5]"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-[#3c5a7e]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
              <h2 className={H2}>Why Businesses Need Stronger Cybersecurity Solutions</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Businesses face increasing cyber threats, data breaches and
                compliance risks. A single security incident can lead to
                financial loss, reputational damage and operational disruption.
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {challenges.map((c, i) => (
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

      {/* ---------------- our solution ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>Our Solution</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Comprehensive Cybersecurity Solutions
                <br />
                for Your Business
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We deliver end to end cyber security solutions to protect your
                systems, data and people. From prevention to response, we help
                you stay secure and resilient.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#how-we-work" className={`${BTN} mt-6`}>
                See How We Protect Your Business
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ol className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:flex md:items-start md:justify-between md:gap-1">
              {flow.map((f, i) => (
                <li key={f.label} className="flex items-start md:flex-1">
                  <div className="flex w-full flex-col items-center text-center">
                    <span
                      className="grid size-16 place-items-center rounded-full bg-white shadow-[0_10px_28px_-10px_rgba(26,109,245,0.4)]"
                      style={{ color: f.color ?? "#1a6df5" }}
                    >
                      <f.icon className="size-6" />
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
                      className="mt-6 hidden size-3.5 shrink-0 text-[#1a6df5] md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- our services ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <Pill>Our Cyber Security Services</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>Our Cybersecurity Solutions</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className={`${P} max-w-xl`}>
                  A complete range of cyber security services to protect your
                  business, reduce risk and ensure compliance.
                </p>
              </Reveal>
            </div>
            <Reveal delay={220}>
              <Link
                href="/services/cyber-security"
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-bold text-[#4f81bc] transition-colors duration-300 hover:text-[#3e68a1]"
              >
                Explore All Cyber Security Services
                <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((c, i) => (
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

      {/* ---------------- the security journey ---------------- */}
      <section id="how-we-work" className="scroll-mt-24 bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>The Security Journey</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>How Our Cybersecurity Solutions Work</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>
              A simple and proven process to strengthen your security posture.
            </p>
          </Reveal>

          <div className="relative mt-10">
            {/* The rail the steps sit on. Stops short of the outer discs so it
                never runs past the first or last step. */}
            <span
              aria-hidden="true"
              className="absolute top-7 right-[8.4%] left-[8.4%] hidden h-px bg-[#c3d8f2] lg:block"
            />
            <ol className="relative grid gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {journey.map((s, i) => (
                <Reveal
                  key={s.title}
                  as="li"
                  delay={(i % 6) * 60}
                  className="flex flex-col items-center px-1 text-center"
                >
                  <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-[#c3d8f2] bg-white shadow-[0_8px_20px_-12px_rgba(26,109,245,0.7)]">
                    <s.icon className="size-5" style={{ color: s.color ?? "#1a6df5" }} />
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

      {/* ---------------- tools & stack ----------------
          The same band as /services/cyber-security, fed from that service's
          own list. Placed after the journey, as on the other platform pages. */}
      {/* The brief gives this band alt text. It is a marquee of individual
          tool logos rather than one image, so the text names the band. */}
      <StackBand
        stack={CYBER.stack}
        intro={CYBER.stackIntro}
        label="Security tools used to deliver cybersecurity solutions and threat monitoring"
      />

      {/* ---------------- business outcomes ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Business Outcomes</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>What Our Cybersecurity Solutions Deliver</h2>
          </Reveal>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-[#dbe6f5]">
            {outcomes.map((o, i) => (
              <Reveal key={o.title} as="li" delay={i * 60} className="lg:px-6 lg:first:pl-0">
                <o.icon className="size-8" style={{ color: o.color ?? "#1a6df5" }} />
                <h3 className="mt-3 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                  {o.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{o.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- why onyxera ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:items-start lg:gap-12">
          <div>
            <Reveal>
              <Pill>Why Onyxera Tech</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Why Choose Our Cybersecurity Solutions</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                More than just security. A strategic partner committed to
                protecting your business.
              </p>
            </Reveal>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {why.map((w, i) => (
                <Reveal
                  key={w.title}
                  as="li"
                  delay={(i % 4) * 60}
                  className="rounded-lg border border-[#dbe6f5] bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    <w.icon className="mt-0.5 size-7 shrink-0" style={{ color: w.color ?? "#1a6df5" }} />
                    <h3 className="text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                      {w.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{w.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* The quote is shorter than the four cards beside it, which left a
              gap under the card. Filling the column and centring the quote
              inside closes it without moving anything else. */}
          <Reveal delay={200} className="lg:h-full">
            <figure className="flex h-full flex-col justify-center rounded-xl border border-[#cfe0fb] bg-white p-6">
              <div className="flex items-start gap-3">
                <FaQuoteLeft aria-hidden="true" className="mt-1 size-5 shrink-0 text-[#1a6df5]" />
                <blockquote className="text-[0.9375rem] leading-relaxed text-[#0b1f33]">
                  &ldquo;Onyxera Tech helped us strengthen our security posture and
                  gave us confidence to scale our business.&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-3 pl-8 text-sm font-bold text-[#0b1f33]">
                IT Manager
                <span className="block text-[0.8125rem] font-normal text-[#3c5a7e]">
                  Professional Services Business
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Frequently Asked Questions</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Cybersecurity Solutions | Frequently Asked Questions</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
              <AutomationFunnelFaq items={faqsLeft} />
              <AutomationFunnelFaq items={faqsMiddle} />
              <AutomationFunnelFaq items={faqsRight} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- get started ----------------
          Fixed navy, like the hero, so the page closes the way the design
          draws it in both themes. */}
      <section id="consultation" className="scroll-mt-24 bg-[#00142c] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <PillBand>Ready to Strengthen Your Security?</PillBand>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_BAND}>Get Started With the Right Cybersecurity Solution</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={`${P_BAND} max-w-xl`}>
                Get a free cyber security consultation and discover how we can
                protect your business, data and future.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <Link href="/contact" className={BTN}>
              Get a Free Security Consultation
              <FaArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
