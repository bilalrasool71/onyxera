import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaArrowPointer,
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaBullhorn,
  FaBullseye,
  FaCalendarCheck,
  FaCartShopping,
  FaChartLine,
  FaChartSimple,
  FaCircleCheck,
  FaCircleNodes,
  FaCoins,
  FaCommentDots,
  FaDesktop,
  FaDiamond,
  FaEye,
  FaFacebookF,
  FaFileLines,
  FaFilter,
  FaGear,
  FaGlobe,
  FaInstagram,
  FaLayerGroup,
  FaLightbulb,
  FaLinkedinIn,
  FaMagnifyingGlass,
  FaMeta,
  FaPeopleGroup,
  FaPlay,
  FaShieldHalved,
  FaUser,
  FaUsers,
  FaDiscord,
  FaPinterestP,
  FaRedditAlien,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
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
   hero and the closing consultation band follow the theme, as they do on
   /odoo and /frappe-erpnext — the hero artwork is transparent, so it sits on
   either ground. Built from the same pieces as the other platform pages.

     BUTTON  #6a9bd1  the site's own button fill
     BLUE    #1a6df5  the design's icon blue, kept as drawn
     GREEN   #1aa34a  the growth glyphs
     NAVY    #0b1f33  headings on white (the site's --fg)
     BODY    #3c5a7e  supporting copy on white (the site's --fg-muted)
     TINT    #eef5ff  the light-blue sections
     BORDER  #dbe6f5  card edges */

/* The brief's LocalBusiness node, transcribed. It is given the same @id as
   the Organization the root layout already emits on every page, so a crawler
   reads the two as one company with one set of details rather than as two
   businesses that happen to share a name. Without that, the page would carry
   two Organization nodes — this one with two addresses, the layout's with all
   three — and nothing to say they are the same entity. */
const LOCAL_BUSINESS_SCHEMA = {
  "@type": "Organization",
  "@id": "https://onyxeratech.com/#organization",
  name: "Onyxera Tech",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "95 Reserve Parade",
      addressLocality: "Findon",
      addressRegion: "SA",
      postalCode: "5023",
      addressCountry: "AU",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "7901 4th St N #31089",
      addressLocality: "St. Petersburg",
      addressRegion: "FL",
      postalCode: "33702",
      addressCountry: "US",
    },
  ],
  telephone: "+61481317161",
  url: "https://onyxeratech.com",
};
/* Service markup, transcribed from the brief. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Digital Marketing Services",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Digital marketing services including Google Ads, Meta Ads, social media marketing, content marketing, SEO and AI search visibility.",
  url: "https://onyxeratech.com/digital-marketing-services",
};
/* Title, description, social tags, headings, intro and schema below come
   from the SEO brief for this page, word for word. */
const TITLE = "Digital Marketing Services";
const DESCRIPTION =
  "Full digital marketing services Google Ads, Meta Ads, social media, content and AI search visibility, built around data and real business outcomes.";

export const metadata: Metadata = {
  /* `absolute` because the brief writes the title in full, including the
     brand — the layout's "%s | Onyxera Tech" template would print it twice. */
  title: {
    absolute: "Digital Marketing Services | Ads, SEO, Social & Content | Onyxera Tech",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/digital-marketing-services" },
  openGraph: openGraph({
    title: "Digital Marketing Services | Onyxera Tech",
    description:
      "Full-service digital marketing services combining data, creative and AI-driven strategy to turn attention into customers.",
    url: "/digital-marketing-services",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Onyxera Tech",
    description:
      "Digital marketing services covering Google Ads, Meta Ads, social, content and AI search visibility built around your business goals.",
  },
};

const BLUE = "#1a6df5";
const GREEN = "#1aa34a";

/* ------------------------------------------------------------------ */
/* Brand marks. The design draws these in their own colours, which a   */
/* single-colour icon font cannot do, so they are small inline pieces. */
/* ------------------------------------------------------------------ */

function GoogleAdsMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <line x1="12" y1="5" x2="6.2" y2="16.4" stroke="#fbbc04" strokeWidth="5" strokeLinecap="round" />
      <line x1="12" y1="5" x2="18.2" y2="17.6" stroke="#4285f4" strokeWidth="5" strokeLinecap="round" />
      <circle cx="6" cy="17.8" r="2.7" fill="#34a853" />
    </svg>
  );
}

function MetaMark({ className = "size-6" }: { className?: string }) {
  return <FaMeta aria-hidden="true" className={className} style={{ color: "#0866ff" }} />;
}

/* The social step: twelve social apps as small round badges in their own
   colours, laid on a four-by-four grid with the corners left empty so the
   set reads as a circle inside the 56px disc. */
const INSTAGRAM_GRADIENT =
  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)";

const SOCIAL_APPS: ({ icon: IconType; bg: string; fg?: string } | null)[] = [
  null,
  { icon: FaFacebookF, bg: "#1877f2" },
  { icon: FaInstagram, bg: INSTAGRAM_GRADIENT },
  null,
  { icon: FaYoutube, bg: "#ff0000" },
  { icon: FaLinkedinIn, bg: "#0a66c2" },
  { icon: FaWhatsapp, bg: "#25d366" },
  { icon: FaXTwitter, bg: "#000000" },
  { icon: FaTiktok, bg: "#010101" },
  { icon: FaPinterestP, bg: "#e60023" },
  { icon: FaTelegram, bg: "#26a5e4" },
  { icon: FaSnapchat, bg: "#fffc00", fg: "#000000" },
  null,
  { icon: FaRedditAlien, bg: "#ff4500" },
  { icon: FaDiscord, bg: "#5865f2" },
  null,
];

/* `badge` is the badge diameter in px: 11 fits the 56px disc, 13 the 64px one. */
function SocialApps({ badge = 11 }: { badge?: number }) {
  const cell = { width: badge, height: badge };
  return (
    <span aria-hidden="true" className="grid grid-cols-4 gap-[1.5px]">
      {SOCIAL_APPS.map((app, i) =>
        app ? (
          <span
            key={i}
            className="grid place-items-center rounded-full"
            style={{ ...cell, background: app.bg, color: app.fg ?? "#ffffff" }}
          >
            <app.icon style={{ width: badge * 0.6, height: badge * 0.6 }} />
          </span>
        ) : (
          <span key={i} style={cell} />
        ),
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Copy — transcribed from the approved design, section by section.    */
/* ------------------------------------------------------------------ */

/* Every list item takes a glyph: an icon-font component or, for the brand
   marks, ready-made markup. */
type Glyph = { icon: IconType; color?: string } | { mark: ReactNode };
type Item = Glyph & { title: string; body: string };
type Step = Glyph & { label: string };

const problems: Item[] = [
  { icon: FaGear, title: "Too Much Manual Work", body: "Creating and managing campaigns takes time." },
  { icon: FaLayerGroup, title: "Too Many Channels", body: "Marketing activities can become disconnected." },
  {
    icon: FaUsers,
    title: "Poor Targeting",
    body: "The right message does not always reach the right audience.",
  },
  { icon: FaChartSimple, title: "Limited Insight", body: "It is difficult to know what is actually working." },
];

const flow: Step[] = [
  { icon: FaBullseye, label: "Business Goals" },
  { icon: FaUser, label: "Audience Insights" },
  { icon: FaFileLines, label: "Strategy" },
  { icon: FaBullhorn, label: "Content Ads + Social" },
  { icon: FaDesktop, label: "Website" },
  { icon: FaUser, label: "Leads" },
  { icon: FaChartSimple, label: "Growth", color: GREEN },
];

const services: Item[] = [
  {
    icon: FaBullseye,
    title: "Strategic Marketing",
    body: "Data driven strategy across all channels.",
  },
  {
    mark: <GoogleAdsMark className="size-7" />,
    title: "Google Ads",
    body: "Reach customers actively searching for your products and services.",
  },
  {
    mark: <MetaMark className="size-7" />,
    title: "Meta Ads",
    body: "Build targeted campaigns across Facebook and Instagram.",
  },
  {
    mark: <SocialApps badge={13} />,
    title: "Social Media",
    body: "Build visibility, engagement and demand across the platforms that matter.",
  },
  {
    icon: FaFileLines,
    title: "Content Marketing",
    body: "Create useful content that educates, builds trust and supports conversion.",
  },
  {
    icon: FaFilter,
    title: "Conversion Marketing",
    body: "Turn digital traffic into enquiries, opportunities and customers.",
  },
  {
    icon: FaMagnifyingGlass,
    title: "AI Search Visibility",
    body: "Help your business become more discoverable across AI powered search experiences.",
  },
  {
    icon: FaChartSimple,
    title: "SEO (Supporting)",
    body: "Support organic visibility as part of the wider marketing strategy.",
  },
];

const campaignFlow: Step[] = [
  { icon: FaUser, label: "Audience Data" },
  { icon: FaBrain, label: "Insights" },
  { icon: FaBullseye, label: "Campaign Strategy" },
  {
    mark: (
      <span className="flex items-center gap-0.5">
        <GoogleAdsMark className="size-5" />
        <MetaMark className="size-5" />
      </span>
    ),
    label: "Ads\n(Google | Meta)",
  },
  { icon: FaChartSimple, label: "Results" },
];

const contentFlow: Step[] = [
  { icon: FaMagnifyingGlass, label: "Research" },
  { icon: FaLightbulb, label: "Ideas" },
  { icon: FaFileLines, label: "Content" },
  { mark: <SocialApps />, label: "Social" },
  { icon: FaCommentDots, label: "Engagement" },
];

const journey: Item[] = [
  { icon: FaMagnifyingGlass, title: "Discover", body: "Customer finds your business" },
  { icon: FaArrowPointer, title: "Explore", body: "They interact with your content" },
  { icon: FaDesktop, title: "Consider", body: "They visit your website" },
  { icon: FaFileLines, title: "Convert", body: "They enquire or take action" },
  { icon: FaUsers, title: "Follow Up", body: "The opportunity moves forward" },
  { icon: FaChartSimple, title: "Customer", body: "Marketing contributes to business growth" },
];

const goals: { icon: IconType; title: string; points: string[] }[] = [
  { icon: FaUsers, title: "More Leads", points: ["Google Ads", "Meta Ads", "Content", "Conversion"] },
  {
    icon: FaCartShopping,
    title: "More Customers",
    points: ["Paid Advertising", "Social Media", "Content", "Conversion"],
  },
  { icon: FaEye, title: "More Online Visibility", points: ["AI Search", "Content", "Social Media"] },
  {
    icon: FaGlobe,
    title: "Enter New Markets",
    points: ["Audience Research", "Paid Advertising", "Localised Content"],
  },
  {
    icon: FaBullhorn,
    title: "Build Brand Demand",
    points: ["Content", "Social Media", "Paid Advertising"],
  },
];

const workSteps: { title: string; body: string }[] = [
  { title: "Understand", body: "Learn about your business, audience and goals." },
  { title: "Discover", body: "Use research and data to identify opportunities." },
  { title: "Plan", body: "Build the right channel and campaign strategy." },
  { title: "Launch", body: "Create and launch campaigns and content." },
  { title: "Measure", body: "Track what is working and where opportunities exist." },
  { title: "Improve", body: "Use performance data to continuously refine and improve." },
];

/* The last two bodies are unreadable in the supplied design at its
   resolution; these are the closest reading and are waiting on the client. */
const outcomes: Item[] = [
  { icon: FaBullseye, title: "Better Targeting", body: "Reach the right audience" },
  { icon: FaChartSimple, title: "Better Campaigns", body: "Make data driven decisions" },
  { icon: FaUsers, title: "More Opportunities", body: "Turn attention into enquiries" },
  { icon: FaCoins, title: "Better Use of Budget", body: "Focus on what performs" },
  { icon: FaBolt, title: "Faster Marketing", body: "Accelerate content and campaign execution" },
  { icon: FaChartLine, title: "Long Term Growth", body: "Build systems that support growth" },
];

const why: { icon: IconType; title: string; body: string }[] = [
  {
    icon: FaPeopleGroup,
    title: "Business First",
    body: "Marketing starts with understanding your business.",
  },
  { icon: FaBrain, title: "Data and Insight", body: "Use data to create real marketing value." },
  {
    icon: FaCircleNodes,
    title: "Connected Expertise",
    body: "Advertising, content, social media and technology work together.",
  },
  {
    icon: FaChartLine,
    title: "Performance Focused",
    body: "Focus on business outcomes, not vanity metrics.",
  },
  {
    icon: FaShieldHalved,
    title: "Continuous Improvement",
    body: "Use data and insights to keep improving.",
  },
];

/* The ten questions are the design's own. The answers are NOT — the design
   draws every row closed, so no answer copy came with it. These are written
   from what this page already states and are waiting on the client to confirm
   or replace them. */
/* The three questions marked below were added for the brief's People Also
   Ask requirement. The brief asked for three but did not supply them, so
   they are written here against the page's target keyword. They say only
   what the rest of the page already says, and name no price or figure. */
const faqsLeft = [
  {
    /* PAA */
    q: "What are digital marketing services?",
    a: "Digital marketing services are the paid advertising, SEO, social media, content and AI search work that bring people to your business and turn that attention into enquiries. Run well they are one strategy rather than separate channels, because the same audience meets your business in more than one place before they buy.",
  },
  {
    q: "How do you use AI in digital marketing?",
    a: "We use AI to speed up research, audience analysis, content ideas and reporting. People set the strategy and review the work before anything goes live.",
  },
  {
    q: "Can you manage our Google Ads and Meta Ads?",
    a: "Yes. We plan, build and manage campaigns across Google Ads and Meta Ads, using audience insights and data to improve how they perform.",
  },
  {
    q: "Do you provide social media marketing?",
    a: "Yes. We build visibility, engagement and demand across the platforms that matter to your audience.",
  },
  {
    q: "Can you improve our visibility in AI Search?",
    a: "We help your business become more discoverable across AI powered search experiences by making your content clear, consistent and useful. Read more about our [SEO and AI SEO services](/services/seo-and-ai-seo).",
  },
  {
    q: "Do you also provide SEO?",
    a: "Yes. SEO supports your organic visibility as part of the wider marketing strategy rather than running on its own.",
  },
];

const faqsRight = [
  {
    q: "Will AI replace human marketing strategy?",
    a: "No. AI accelerates the work, but understanding your business, your customers and your goals still takes human expertise.",
  },
  {
    q: "Can you create content using AI?",
    a: "Yes. AI helps accelerate research, ideas and content development, while human expertise keeps the messaging relevant, strategic and authentic.",
  },
  {
    /* PAA */
    q: "How much do digital marketing services cost?",
    a: "It depends on which channels you need, how much ad spend sits behind them and whether you want campaigns managed month to month or a one-off setup. We scope it before quoting rather than selling a package you may not need, and the ad budget is yours and paid to the platform, not to us.",
  },
  {
    q: "Can you work with our existing website?",
    a: "Yes. We start with the website you already have and recommend changes only where they will improve results. If it needs more than that, see our [development solutions](/services/development-solutions).",
  },
  {
    /* PAA */
    q: "How long do digital marketing services take to show results?",
    a: "Paid channels can produce enquiries in the first weeks because you are buying the visits. SEO, content and AI search visibility build over months, since they depend on search engines re-reading and trusting your site. We report on both separately so the slow one is never hidden behind the fast one.",
  },
  {
    q: "How do you measure marketing performance?",
    a: "We track what is working against business outcomes such as enquiries and leads, not vanity metrics, and use that data to keep refining the strategy.",
  },
  {
    q: "Can you support businesses in international markets?",
    a: "Yes. Entering new markets usually starts with audience research, paid advertising and localised content.",
  },
];

const ctaPoints: { icon: IconType; title: string; body: string }[] = [
  { icon: FaCalendarCheck, title: "No Obligation", body: "Consultation" },
  { icon: FaBullseye, title: "Practical", body: "Recommendations" },
  { icon: FaDiamond, title: "Focused on", body: "Your Business Goals" },
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

/* The hero and the consultation band follow the theme, so their pill uses the
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
const H2_HALF = "text-[clamp(1.5rem,2.4vw,1.875rem)] leading-[1.2] font-bold text-[#0b1f33]";
const P = "mt-4 text-base leading-relaxed text-[#3c5a7e]";
const P_BAND = "mt-4 text-base leading-relaxed text-fg-muted";

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#6a9bd1] px-5 py-3 font-display text-sm font-bold text-[color:var(--btn-fg)] transition-colors duration-300 hover:bg-[#4f81bc]";

const ARROW = "size-3.5 transition-transform duration-200 group-hover:translate-x-1";

/* The glyph inside a disc: an icon-font component or a brand mark. */
function GlyphFor({ g, size }: { g: Glyph; size: string }) {
  if ("mark" in g) return <>{g.mark}</>;
  const Icon = g.icon;
  return <Icon className={size} style={{ color: g.color ?? BLUE }} />;
}

/* The design's disc: light blue on the white sections, white with a soft
   shadow on the tinted ones, with the glyph centred. */
function Disc({
  g,
  size = "size-14",
  glyph = "size-5",
  onTint = false,
}: {
  g: Glyph;
  size?: string;
  glyph?: string;
  onTint?: boolean;
}) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full ${
        onTint ? "bg-white shadow-[0_8px_20px_-12px_rgba(26,109,245,0.6)]" : "bg-[#e6f0ff]"
      }`}
    >
      <GlyphFor g={g} size={glyph} />
    </span>
  );
}

/* A row of discs joined by arrows — the solution band and both halves of the
   campaigns/content band use it. Wraps into a grid below md. */
function Flow({ steps, cols }: { steps: Step[]; cols: string }) {
  return (
    <ol className={`grid ${cols} gap-y-6 md:flex md:items-start md:justify-between md:gap-1`}>
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-start md:flex-1">
          <div className="flex w-full flex-col items-center text-center">
            <Disc g={s} onTint />
            <span className="mt-3 max-w-[6.5rem] text-[0.8125rem] leading-snug font-bold whitespace-pre-line text-balance text-[#0b1f33]">
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <FaArrowRight
              aria-hidden="true"
              className="mt-6 hidden size-3 shrink-0 text-[#1a6df5] md:block"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

const MARKETING = getService("digital-marketing")!;

export default function DigitalMarketingPlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/digital-marketing-services",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "Digital Marketing Services", path: "/digital-marketing-services" }],
            }),
            SERVICE_SCHEMA,
            LOCAL_BUSINESS_SCHEMA,
            faqSchema("/digital-marketing-services", [...faqsLeft, ...faqsRight]),
          ]),
        }}
      />

      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden bg-bg pt-28 pb-10 md:pt-32 md:pb-10">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div>
            <h1 className="text-[clamp(1.75rem,2.7vw,2.25rem)] leading-[1.12] font-bold text-fg">
              Digital Marketing Services That
              <br />
              <span className="text-accent-strong">Turn Attention Into Customers</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
                Combine data, creativity and digital marketing expertise to reach
                the right audience, create stronger campaigns and turn more
                opportunities into business.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Discuss Your Marketing Goals
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

          <Reveal delay={160} immediate className="relative">
            <img
              src="/images/digital-marketing-platform-hero.webp"
              alt="Digital marketing services covering Google Ads, social media, content and analytics"
              width={1343}
              height={974}
              fetchPriority="high"
              className="relative mx-auto w-full max-w-[36rem]"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- intro ----------------
          The brief places this paragraph after the hero and before The
          Problem, and links its first mention of "digital marketing
          services" to the portfolio. The block under it is the brief's
          "What's Included" checklist item; the brief names no items, so the
          eight below are this page's own service cards, unchanged. */}
      <section className="bg-white pt-12 pb-2 md:pt-14">
        <div className="shell">
          <Reveal>
            <p className={`${P} max-w-4xl`}>
              <Link
                href="/our-portfolio"
                className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
              >
                Digital marketing services
              </Link>{" "}
              bring together paid advertising, SEO, social media, content and
              AI search visibility into one connected strategy. Instead of
              running channels in isolation, Onyxera Tech&rsquo;s digital
              marketing services combine data, creative and technology to help
              businesses reach the right audience, build stronger campaigns and
              turn more of that attention into real customers. Our digital
              marketing services cover everything from Google Ads and Meta Ads
              management to content marketing, social media and AI powered
              search discovery managed as one strategy, not separate silos.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 max-w-3xl rounded-lg border border-[#dbe6f5] bg-[#eef5ff] p-6 md:p-8">
              <h2 className="text-[1.125rem] leading-snug font-bold text-[#0b1f33]">
                What Do Digital Marketing Services Include?
              </h2>
              <p className={`${P} mt-3`}>
                Our digital marketing services cover:
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {services.map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <FaCircleCheck
                      aria-hidden="true"
                      className="mt-[0.2rem] size-4 shrink-0 text-[#1a6df5]"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-[#3c5a7e]">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ---------------- the problem ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <Pill>The Problem</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                Why Digital Marketing
                <br />
                Services Need to Evolve?
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                Customers are discovering businesses through search, social
                media, advertising, content and new digital experiences.
                Traditional marketing alone is no longer enough.
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((c, i) => (
              <Reveal key={c.title} as="li" delay={i * 70}>
                <Disc g={c} />
                <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- the solution ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-8">
          <div>
            <Reveal>
              <Pill>The Solution</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>
                One Strategy Across All Your
                <br />
                Digital Marketing Services
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P}>
                We combine data, creative thinking and digital marketing expertise
                to build campaigns around your business goals.
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
            <Flow steps={flow} cols="grid-cols-3 sm:grid-cols-4" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- how we help ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>How We Help</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>Our Digital Marketing Services</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>
              A complete range of services to help you attract, engage and convert
              the right audience.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={(i % 4) * 60}
                className="flex flex-col items-center text-center"
              >
                <Disc g={s} size="size-16" glyph="size-6" />
                <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                  {s.title}
                </h3>
                <p className="mt-1.5 max-w-[16rem] text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- campaigns and content ----------------
          The brief gives this section alt text. It holds two drawn flows
          rather than an image, so the text names the section. */}
      <section
        className="bg-[#eef5ff] py-12 md:py-14"
        aria-label="Data driven digital marketing services using audience insights and analytics"
      >
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-[#dbe6f5]">
          <div className="lg:pr-10">
            <Reveal>
              <h2 className={H2_HALF}>Smarter Digital Marketing Services, Backed by Data</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={P}>
                Use audience insights and data to create higher performing
                campaigns across Google Ads and Meta Ads.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-8">
              <Flow steps={campaignFlow} cols="grid-cols-3" />
            </Reveal>
          </div>
          <div className="lg:pl-10">
            <Reveal>
              <h2 className={H2_HALF}>Create More Relevant Content. Faster.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={P}>
                Accelerate research, ideas and content development while human
                expertise keeps the messaging relevant, strategic and authentic.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-8">
              <Flow steps={contentFlow} cols="grid-cols-3" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- the marketing journey ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>The Marketing Journey</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>
              How Our Digital Marketing Services Turn Attention Into Customers
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>A simple journey that turns awareness into long term value.</p>
          </Reveal>

          <ol className="mt-10 grid gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-2">
            {journey.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={(i % 6) * 60}
                className="flex items-start lg:flex-1"
              >
                <div className="flex w-full flex-col items-center px-1 text-center">
                  <Disc g={s} size="size-16" glyph="size-6" />
                  <h3 className="mt-4 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                    {s.body}
                  </p>
                </div>
                {i < journey.length - 1 && (
                  <FaArrowRight
                    aria-hidden="true"
                    className="mt-7 hidden size-3 shrink-0 text-[#1a6df5] lg:block"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- marketing by business goal ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>Marketing by Business Goal</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>What Do You Want Your Marketing to Achieve?</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>
              Different goals require different focus areas. Here are some common
              examples.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {goals.map((g, i) => (
              <Reveal
                key={g.title}
                as="li"
                delay={i * 60}
                className="flex items-start gap-3.5 rounded-lg border border-[#dbe6f5] bg-white p-5"
              >
                <g.icon className="mt-0.5 size-7 shrink-0 text-[#1a6df5]" />
                <div>
                  <h3 className="text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {g.title}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {g.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-[0.8125rem] text-[#3c5a7e] before:size-1 before:shrink-0 before:rounded-full before:bg-[#3c5a7e] before:content-['']"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- how we work ---------------- */}
      <section id="how-we-work" className="scroll-mt-24 bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <Pill>A Smarter Marketing Process</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2}>How We Work</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={P}>A clear and collaborative approach from strategy to growth.</p>
          </Reveal>

          <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {workSteps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={(i % 6) * 60}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1a6df5] text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {s.title}
                  </h3>
                  {i < workSteps.length - 1 && (
                    <FaArrowRight
                      aria-hidden="true"
                      className="hidden size-3 shrink-0 text-[#1a6df5] lg:block"
                    />
                  )}
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- tools & stack ----------------
          The same band as /services/digital-marketing, fed from that
          service's own list. Placed after the process, as on the other
          platform pages. */}
      <StackBand stack={MARKETING.stack} intro={MARKETING.stackIntro} />

      {/* ---------------- outcomes and why us ---------------- */}
      <section className="bg-[#eef5ff] py-12 md:py-14">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-0 lg:divide-x lg:divide-[#dbe6f5]">
          <div className="lg:pr-10">
            <Reveal>
              <Pill>Business Outcomes</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>What Changes for Your Business?</h2>
            </Reveal>

            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {outcomes.map((o, i) => (
                <Reveal
                  key={o.title}
                  as="li"
                  delay={(i % 3) * 60}
                  className="flex flex-col items-center rounded-lg border border-[#dbe6f5] bg-white px-3 py-5 text-center"
                >
                  <Disc g={o} />
                  <h3 className="mt-3 text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                    {o.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                    {o.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:pl-10">
            <Reveal>
              <Pill>Why Onyxera Tech</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2}>Why Choose Our Digital Marketing Services</h2>
            </Reveal>

            <ul className="mt-8 space-y-6">
              {why.map((w, i) => (
                <Reveal key={w.title} as="li" delay={i * 60} className="flex items-start gap-4">
                  <w.icon className="mt-0.5 size-7 shrink-0 text-[#1a6df5]" />
                  <div>
                    <h3 className="text-[0.9375rem] leading-snug font-bold text-[#0b1f33]">
                      {w.title}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-[#3c5a7e]">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <div className="shell">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-bold text-[#0b1f33]">
              Digital Marketing Services Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className={P}>Clear answers to common questions.</p>
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
              <PillBand>Ready to Grow Your Business Online</PillBand>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_BAND}>Get Started With Our Digital Marketing Services</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_BAND}>
                Tell us what you are currently doing, what is not working and what
                you want to achieve. We will review your goals and recommend the
                right digital marketing approach for your business.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-4">
                {ctaPoints.map((p) => (
                  <li key={p.body} className="flex items-center gap-2">
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
              title="Discuss Your Marketing Goals"
              submitLabel="Get My Free Consultation"
              source="Digital Marketing page"
              detailLabel="What are you looking to improve?"
              detailError="Please tell us what you are looking to improve."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
