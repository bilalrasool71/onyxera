import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaArrowTrendUp,
  FaBullseye,
  FaCalendarCheck,
  FaChartSimple,
  FaFileLines,
  FaFilter,
  FaGear,
  FaGem,
  FaLeaf,
  FaLightbulb,
  FaLink,
  FaLocationDot,
  FaMagnifyingGlass,
  FaMicrochip,
  FaPlay,
  FaRocket,
  FaStar,
  FaTrophy,
  FaUsers,
  FaEye,
  FaLayerGroup,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { AutomationFunnelForm } from "@/components/sections/AutomationFunnelForm";
import { StackBand } from "@/components/sections/StackBand";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/lib/data/services";
import { faqSchema, graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces an approved design one-to-one, colours included, so its
   white and light-blue sections deliberately do not use the theme tokens. The
   hero, the results band and the consultation band follow the theme, like the
   other platform pages. The hero artwork is a full dark scene, so it sits in a
   rounded panel as it does on /cyber-security-platform.

     BUTTON  #6a9bd1  the site's own button fill
     BLUE    #1a6df5  the design's icon blue, kept as drawn
     ACCENTS one colour per glyph, as the design assigns them
     NAVY    #0b1f33  headings on white (the site's --fg)
     BODY    #3c5a7e  supporting copy on white (the site's --fg-muted)
     TINT    #eef5ff  the light-blue sections
     DISC    the glyph's own colour at 12%, as the design draws it */

/* Service markup, transcribed from the brief. The FAQPage it also asks for
   is already emitted below by faqSchema over this page's own FAQ, which is
   what the brief says to use ("page already has a strong FAQ section — use
   it as-is"). */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "SEO Services",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "SEO services including technical SEO, content strategy, local SEO, link building, AI SEO (GEO) and SEO reporting.",
  url: "https://onyxeratech.com/seo-services",
};
/* Title, description, social tags, headings, the opening paragraph, two of
   the service cards and the Service schema below come from the SEO brief
   for this page, word for word. */
const TITLE = "SEO Services";
const DESCRIPTION =
  "Professional SEO services to boost your rankings, traffic and leads across Google and AI search. Get a free SEO audit and see where you stand today.";

export const metadata: Metadata = {
  /* `absolute` because the brief writes the title in full, including the
     brand — the layout's "%s | Onyxera Tech" template would print it twice. */
  title: {
    absolute: "SEO Services That Drive Real Traffic & Rankings | Onyxera Tech",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/seo-services" },
  openGraph: openGraph({
    title: "SEO Services | Onyxera Tech",
    description:
      "Professional SEO services built to grow rankings, traffic and qualified leads combined with AI search optimisation for the platforms your customers use next.",
    url: "/seo-services",
  }),
  twitter: {
    card: "summary_large_image",
    title: "SEO Services | Onyxera Tech",
    description:
      "Get expert SEO services that combine proven ranking strategies with AI search optimisation. Free audit available.",
  },
};

const BLUE = "#1a6df5";
const GREEN = "#1aa34a";
const ORANGE = "#f59e0b";
const PURPLE = "#7c3aed";
const RED = "#ef4444";
const PINK = "#e0447c";

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.    */
/* ------------------------------------------------------------------ */

type Item = { icon: IconType; title: string; body: string; color?: string };

const challenges: Item[] = [
  {
    icon: FaEye,
    title: "Low Visibility",
    body: "Your website does not appear where your customers are searching.",
    color: RED,
  },
  {
    icon: FaChartSimple,
    title: "Lost Opportunities",
    body: "Competitors capture your potential customers.",
    color: ORANGE,
  },
  {
    icon: FaLayerGroup,
    title: "Outdated SEO",
    body: "Traditional SEO alone is no longer enough.",
    color: PURPLE,
  },
  {
    icon: FaUsers,
    title: "Rapidly Changing Search",
    body: "AI powered search is changing how people find and choose businesses.",
    color: GREEN,
  },
];

const flow: { icon: IconType; label: string; color?: string }[] = [
  { icon: FaBullseye, label: "Strategy" },
  { icon: FaGear, label: "Optimise", color: GREEN },
  { icon: FaFileLines, label: "Create Content" },
  { icon: FaLink, label: "Build Authority" },
  { icon: FaChartSimple, label: "Measure Results", color: GREEN },
  { icon: FaRocket, label: "Grow Your Business", color: RED },
];

const services: Item[] = [
  {
    icon: FaGear,
    title: "Technical SEO",
    body: "Our technical SEO services fix crawl, speed and structure issues so your site ranks the way it should.",
  },
  {
    icon: FaFileLines,
    title: "Content Strategy",
    body: "Create valuable content that ranks and converts.",
    color: ORANGE,
  },
  {
    icon: FaLocationDot,
    title: "Local SEO",
    body: "Get found by nearby customers and grow your local presence.",
    color: GREEN,
  },
  {
    icon: FaMicrochip,
    title: "AI SEO (GEO)",
    body: "Optimise for AI search platforms like ChatGPT, Google AI Overviews and Perplexity.",
    color: PURPLE,
  },
  {
    icon: FaLink,
    title: "Link Building",
    body: "Build high quality authority and trust for long term growth.",
  },
  {
    icon: FaChartSimple,
    title: "SEO Reporting",
    body: "Clear, actionable SEO reporting so you always know how our SEO services are performing.",
    color: RED,
  },
];

const results: { icon: IconType; value: string; label: string; color: string }[] = [
  { icon: FaChartSimple, value: "2x", label: "More Organic Traffic", color: "#22c55e" },
  { icon: FaUsers, value: "Higher", label: "Quality Leads", color: "#8b5cf6" },
  { icon: FaArrowTrendUp, value: "Better", label: "Search Rankings", color: ORANGE },
  { icon: FaStar, value: "Long Term", label: "Business Growth", color: "#3b82f6" },
];

const steps: Item[] = [
  {
    icon: FaMagnifyingGlass,
    title: "Audit",
    body: "Analyse your website, competitors and opportunities.",
  },
  {
    icon: FaFileLines,
    title: "Strategy",
    body: "Create a customised SEO and AI SEO strategy.",
  },
  {
    icon: FaGear,
    title: "Implement",
    body: "Optimise, create content and build authority.",
    color: RED,
  },
  {
    icon: FaChartSimple,
    title: "Monitor",
    body: "Track performance and make data driven improvements.",
  },
  {
    icon: FaTrophy,
    title: "Grow",
    body: "Achieve higher rankings, more traffic and real business results.",
    color: ORANGE,
  },
];

const outcomes: Item[] = [
  {
    icon: FaChartSimple,
    title: "More Visibility",
    body: "Be found by the right audience across all search platforms.",
    color: GREEN,
  },
  { icon: FaUsers, title: "Better Leads", body: "Attract more qualified customers.", color: PINK },
  {
    icon: FaFilter,
    title: "Higher Conversions",
    body: "Turn traffic into enquiries and sales.",
    color: ORANGE,
  },
  { icon: FaGem, title: "Stronger Brand", body: "Build authority and credibility online." },
  {
    icon: FaLeaf,
    title: "Sustainable Growth",
    body: "Long term results for your business.",
    color: GREEN,
  },
];

/* The ten questions are the design's own. The answers are NOT — the design
   draws every row closed, so no answer copy came with it. These are written
   from what this page already states and are waiting on the client to confirm
   or replace them. */
const faqsLeft = [
  {
    q: "How long does it take to see results?",
    a: "SEO builds over time. Technical fixes can make a difference quickly, while rankings and organic traffic usually grow over a number of months. We track progress from the start so you can see what is moving.",
  },
  {
    q: "What is AI SEO or GEO?",
    a: "AI SEO, also called Generative Engine Optimisation (GEO), helps your business get found and recommended on AI search platforms like ChatGPT, Google AI Overviews and Perplexity, not only in traditional search results.",
  },
  {
    q: "Do you work with businesses in my industry?",
    a: "Very likely. The audit looks at your market, your competitors and how your customers search, so the strategy is built around your industry rather than a template.",
  },
  {
    q: "Can you help with local SEO?",
    a: "Yes. Local SEO helps you get found by nearby customers and grow your local presence, including in map and local search results.",
  },
  {
    q: "Do you provide SEO reporting?",
    a: "Yes. You get clear reports that track performance and turn the data into actionable recommendations.",
  },
];

const faqsRight = [
  {
    q: "Will SEO work for a new website?",
    a: "Yes. A new website is a good time to start, because the technical foundations and content structure can be built right from day one. If you are still planning the site, see our [development solutions](/services/development-solutions).",
  },
  {
    q: "Can you optimise for AI search platforms?",
    a: "Yes. We optimise your content and website so AI search platforms like ChatGPT, Google AI Overviews and Perplexity can understand, trust and reference your business.",
  },
  {
    q: "Do you create the content?",
    a: "Yes. Content strategy is part of the service, and we can create valuable content that ranks and converts, working with your team on the details only you know.",
  },
  {
    q: "How much does SEO cost?",
    a: "It depends on your website, your competition and your goals. After the free SEO audit we recommend the right strategy and give you a clear quote.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Search keeps changing, so we keep monitoring performance and making data driven improvements. Read more about our [SEO and AI SEO services](/services/seo-and-ai-seo).",
  },
];

const ctaPoints: { icon: IconType; line1: string; line2: string; color: string }[] = [
  { icon: FaCalendarCheck, line1: "No Obligation", line2: "Consultation", color: BLUE },
  { icon: FaLightbulb, line1: "Actionable", line2: "Recommendations", color: PURPLE },
  { icon: FaBullseye, line1: "Focused on", line2: "Your Growth", color: "#16a34a" },
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

/* The theme bands (hero, results, consultation) use the theme's accent rather
   than the fixed blue of the white sections. */
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
const P_BAND = "mt-4 text-base leading-relaxed text-fg-muted";

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#6a9bd1] px-5 py-3 font-display text-sm font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc]";

const ARROW = "size-3.5 transition-transform duration-200 group-hover:translate-x-1";

/* A tinted disc behind a glyph, in the glyph's own colour. */
function Disc({
  icon: Icon,
  color = BLUE,
  size = "size-14",
  glyph = "size-6",
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

/* Two stacked lines beside a filled circle — the hero and the consultation
   band both use it. */
function Points({ items }: { items: { icon: IconType; line1: string; line2: string; color: string }[] }) {
  return (
    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
      {items.map((p) => (
        <li key={p.line1} className="flex items-center gap-2">
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full text-white"
            style={{ backgroundColor: p.color }}
          >
            <p.icon className="size-4" />
          </span>
          <span className="text-xs leading-snug font-bold text-fg">
            {p.line1}
            <br />
            {p.line2}
          </span>
        </li>
      ))}
    </ul>
  );
}

const SEO = getService("seo-and-ai-seo")!;

export default function SeoPlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/seo-services",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "SEO Services", path: "/seo-services" }],
            }),
            SERVICE_SCHEMA,
            faqSchema("/seo-services", [...faqsLeft, ...faqsRight]),
          ]),
        }}
      />

      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              SEO Services That Get You Found
              <br />
              <span className="text-accent-strong">Everywhere People Search</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Boost your visibility across Google, AI search and beyond. We help
                you attract the right audience, drive qualified traffic and turn
                searches into real business opportunities.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Get a Free SEO Audit
                  <FaArrowRight className={ARROW} />
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

          {/* The artwork is a full photo, not a cut-out like the other
              platform heroes, so instead of framing it in a rounded panel its
              edges fade into the page — it sits in the hero the same way the
              transparent artwork does elsewhere, with no box around it. */}
          <Reveal delay={160} immediate className="relative">
            <img
              src="/images/seo-platform-hero-v2.webp"
              alt="SEO services dashboard showing keyword rankings and traffic growth"
              width={1572}
              height={985}
              fetchPriority="high"
              className="relative w-full"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)",
                maskComposite: "intersect",
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- intro ----------------
          The brief places this paragraph after the hero and before The
          Challenge, and links its first mention of "SEO services" to the
          portfolio. */}
      <section className="bg-white pt-12 pb-2 md:pt-14">
        <div className="shell">
          <Reveal>
            <p className={`${P} max-w-4xl`}>
              Onyxera Tech provides{" "}
              <Link
                href="/our-portfolio"
                className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
              >
                SEO services
              </Link>{" "}
              designed to get your business found on Google, AI search platforms
              and local search. From technical SEO and content strategy to local
              SEO and AI SEO (GEO), our SEO services are built around real
              ranking data and measurable results not guesswork. Whether you
              need to fix technical issues, build authority, or optimise for how
              people search today, our SEO services turn visibility into
              qualified leads and revenue.
            </p>
          </Reveal>
        </div>
      </section>
      {/* ---------------- the challenge ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>The Challenge</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Great Businesses Remain Invisible
                <br />
                Without the Right SEO Services
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Your customers are searching, but if you are not visible in Google,
                AI search and local results, you are losing opportunities to
                competitors.
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {challenges.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={i * 70}
                className="flex flex-col items-center px-4 text-center"
              >
                <Disc icon={c.icon} color={c.color} size="size-16" glyph="size-7" />
                <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-balance text-[#0b1f33]">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                  {c.body}
                </p>
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
                Full-Service SEO Built
                <br />
                for Google and AI Search
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We combine proven SEO strategies with AI search optimisation to get
                your business visible across all major search platforms and drive
                real results.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#how-we-work" className={`${BTN} mt-6`}>
                See How It Works
                <FaArrowRight className={ARROW} />
              </a>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ol className="grid grid-cols-3 gap-y-8 md:flex md:items-start md:justify-between md:gap-1">
              {flow.map((f, i) => (
                <li key={f.label} className="flex items-start md:flex-1">
                  <div className="flex w-full flex-col items-center text-center">
                    <span
                      className="grid size-16 place-items-center rounded-full bg-white shadow-[0_10px_28px_-12px_rgba(26,109,245,0.45)]"
                      style={{ color: f.color ?? BLUE }}
                    >
                      <f.icon className="size-6" />
                    </span>
                    <span className="mt-3 max-w-[6.5rem] text-sm leading-snug font-bold text-balance text-[#0b1f33]">
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

      {/* ---------------- our seo & ai seo services ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="max-w-2xl">
              <Reveal>
                <Pill>Our SEO &amp; AI SEO Services</Pill>
              </Reveal>
              <Reveal delay={80}>
                <h2 className={H2}>Our SEO Services</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className={P}>
                  A full range of services to help you rank higher, attract the right
                  audience and stay ahead in the AI search era.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Link
                href="/services/seo-and-ai-seo"
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-bold text-[#4f81bc] transition-colors duration-300 hover:text-[#3e68a1]"
              >
                Explore All SEO Services
                <FaArrowRight className={ARROW} />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={(i % 6) * 60}
                className="flex flex-col items-center rounded-lg border border-[#dbe6f5] bg-white px-4 py-6 text-center"
              >
                <Disc icon={s.icon} color={s.color} size="size-16" glyph="size-7" />
                <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- real results ----------------
          Follows the theme, as the design draws it dark. */}
      <section className="bg-bg py-12 md:py-14">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <PillBand>Real Results</PillBand>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_BAND}>
                What Our SEO Services Deliver
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_BAND}>
                We help businesses achieve higher rankings, more traffic and better
                quality leads through data driven SEO and AI search strategies.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#consultation" className={`${BTN} mt-6`}>
                Get a Free SEO Audit
                <FaArrowRight className={ARROW} />
              </a>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((r, i) => (
              <Reveal
                key={r.label}
                as="li"
                delay={i * 70}
                className="flex flex-col items-center rounded-xl border border-line-strong bg-surface px-3 py-7 text-center"
              >
                <r.icon className="size-10" style={{ color: r.color }} />
                <span className="mt-4 font-display text-2xl leading-none font-bold text-fg">
                  {r.value}
                </span>
                <span className="mt-2 text-sm leading-snug text-balance text-fg-muted">
                  {r.label}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- our process ---------------- */}
      <section id="how-we-work" className="scroll-mt-24 bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Our Process</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Our SEO Services Process, From Audit to Results</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>A clear and collaborative process to grow your search visibility.</p>
          </Reveal>

          <div className="relative mt-10">
            {/* The rail the steps sit on. Stops at the first and last disc. */}
            <span
              aria-hidden="true"
              className="absolute top-8 right-[10%] left-[10%] hidden h-px bg-[#c3d8f2] lg:block"
            />
            <ol className="relative grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {steps.map((s, i) => (
                <Reveal
                  key={s.title}
                  as="li"
                  delay={i * 60}
                  className="flex flex-col items-center px-2 text-center"
                >
                  <span className="relative grid size-16 shrink-0 place-items-center rounded-full border border-[#c3d8f2] bg-white shadow-[0_8px_20px_-12px_rgba(26,109,245,0.7)]">
                    <s.icon className="size-6" style={{ color: s.color ?? BLUE }} />
                    <span className="absolute -top-1.5 -left-1.5 grid size-7 place-items-center rounded-full bg-[#1a6df5] text-[0.6875rem] font-bold text-white">
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
          The same band as /services/seo-and-ai-seo, fed from that service's
          own list, so the two pages never drift apart. Placed after the
          process, as on /automation-funnel. */}
      {/* The brief gives this band alt text. It is a marquee of individual
          tool logos rather than one image, so the text names the band. */}
      <StackBand
        stack={SEO.stack}
        intro={SEO.stackIntro}
        label="Tools used to deliver our SEO services and track performance"
      />

      {/* ---------------- business outcomes ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Business Outcomes</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>What Changes for Your Business?</h2>
          </Reveal>

          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {outcomes.map((o, i) => (
              <Reveal
                key={o.title}
                as="li"
                delay={i * 60}
                className="flex flex-col items-center text-center"
              >
                <Disc icon={o.icon} color={o.color} size="size-16" glyph="size-7" />
                <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                  {o.title}
                </h3>
                <p className="mt-1.5 max-w-[14rem] text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                  {o.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Frequently Asked Questions</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>SEO Services &mdash; Frequently Asked Questions</h2>
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
          Follows the theme, like the hero — the same band as /odoo. */}
      <section id="consultation" className="scroll-mt-24 bg-bg py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6">
          <div>
            <Reveal>
              <PillBand>Ready to Grow Your Search Visibility?</PillBand>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_BAND}>Get Started With Our SEO Services</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_BAND}>
                Tell us about your business and we will review your website,
                identify opportunities and recommend the right strategy to help you
                grow.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Points items={ctaPoints} />
            </Reveal>
          </div>

          <Reveal delay={120}>
            <AutomationFunnelForm
              title="Get Your Free SEO Audit"
              submitLabel="Get My Free SEO Audit"
              source="SEO & AI SEO page"
              detailLabel="What are your goals?"
              detailError="Please tell us what your goals are."
              websiteField
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
