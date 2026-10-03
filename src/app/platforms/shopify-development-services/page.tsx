import type { Metadata } from "next";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBullseye,
  FaCartShopping,
  FaChartSimple,
  FaCheck,
  FaCoins,
  FaComments,
  FaFileLines,
  FaGear,
  FaHandshake,
  FaHeadset,
  FaMagnifyingGlass,
  FaPaintbrush,
  FaPlay,
  FaPuzzlePiece,
  FaRightLeft,
  FaRocket,
  FaShield,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { AutomationFunnelFaq } from "@/components/sections/AutomationFunnelFaq";
import { AutomationFunnelForm } from "@/components/sections/AutomationFunnelForm";
import { Reveal } from "@/components/ui/Reveal";
import { faqSchema, graph, pageSchema } from "@/lib/schema";
import { openGraph } from "@/lib/site";

/* This page reproduces the approved Shopify design one-to-one: the same six
   sections in the same order, the same copy from the content document, the
   same alternating dark and white bands, and the same icon colours.

   Two things follow the site rather than the mockup, for the same reason the
   other platform pages do it — a page that sits under this header and above
   this footer cannot carry a second blue or a second navy:

     NAVY    #0b1f33  the site's own navy, which the navbar and footer use.
                      The mockup's #042943 is a shade bluer; side by side with
                      the header it read as two different darks.
     BUTTON  #6a9bd1  the site's button fill, as on every other platform page,
                      rather than the mockup's brighter #2f8ae8.

   Everything else is the mockup's: the icon colours below are its own, and
   they are deliberately not theme tokens.

     WHITE   #ffffff  the light bands
     HEAD    #0b1f33  headings on white
     BODY    #3c5a7e  supporting copy on white
     ON-DARK #cbdcf0  supporting copy on navy */

/* The brief adds a FAQ section; the page had none. Questions and answers are
   its own, word for word. */
const faqs = [
  {
    q: "What are Shopify development services?",
    a: "Shopify development services cover store design, theme customisation, app integration, migration, SEO and ongoing support everything needed to build and grow a Shopify store.",
  },
  {
    q: "How much does Shopify development cost?",
    a: "Cost depends on the scope a new store build, a redesign, or ongoing optimisation all vary in price. We provide a clear quote after understanding your requirements.",
  },
  {
    q: "How long does it take to build a Shopify store?",
    a: "A standard store build typically takes a few weeks depending on design complexity, number of products and required app integrations.",
  },
  {
    q: "Can you migrate our existing store to Shopify?",
    a: "Yes. We handle store migrations from other platforms, including product data, SEO redirects and design, to minimise disruption and lost rankings.",
  },
  {
    q: "Do you build custom Shopify themes or use existing ones?",
    a: "Both, depending on your goals and budget. We can customise an existing theme or build a fully custom one when your brand and functionality needs require it.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We provide ongoing maintenance, updates and optimisation so your store keeps performing after go-live.",
  },
];

/* Service markup, transcribed from the brief.

   The brief's Review node is not added: its reviewBody and author are
   placeholders ("[Insert Shopify-specific client quote here]"), and the brief
   itself marks it "once a testimonial is added". Review markup for a review
   that is not on the page is against Google's structured data policy. */
const SERVICE_SCHEMA = {
  "@type": "Service",
  serviceType: "Shopify Development Services",
  provider: {
    "@type": "Organization",
    name: "Onyxera Tech",
    url: "https://onyxeratech.com",
  },
  areaServed: ["Australia", "United States", "Singapore"],
  description:
    "Shopify development services including store design, theme development, app integration, migration, SEO and ongoing support.",
  url: "https://onyxeratech.com/platforms/shopify-development-services",
};
/* Title, description, social tags, headings, the opening paragraph, the six
   services and the FAQ below come from the SEO brief for this page. */
const TITLE = "Shopify Development Services";
const DESCRIPTION =
  "Professional Shopify development services custom store design, app integration, SEO and ongoing support to help your store grow.";

export const metadata: Metadata = {
  /* `absolute` because the brief writes the title in full, including the
     brand — the layout's "%s | Onyxera Tech" template would print it twice. */
  title: {
    absolute: "Shopify Development Services | Store Design & Build Onyxera Tech",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/platforms/shopify-development-services" },
  openGraph: openGraph({
    title: "Shopify Development Services | Onyxera Tech",
    description:
      "End-to-end Shopify development services design, development, app integration and optimisation for stores that convert.",
    url: "/platforms/shopify-development-services",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Shopify Development Services | Onyxera Tech",
    description:
      "Custom Shopify development services covering store design, build, app integration, SEO and ongoing support.",
  },
};

const NAVY = "#0b1f33";

type Item = { icon: IconType; title: string; body: string; color: string };

const challenges: Item[] = [
  { icon: FaCartShopping, title: "Low Conversions", body: "Visitors leave without buying.", color: "#e8352a" },
  { icon: FaGear, title: "Technical Issues", body: "Setup and customisation can be complex.", color: "#1a73e8" },
  { icon: FaCoins, title: "Higher Costs", body: "Mistakes can lead to lost revenue.", color: "#f59e0b" },
  { icon: FaUser, title: "Lack of Expertise", body: "Difficult to stand out and scale.", color: "#8b5cf6" },
];

/* The brief expands the four cards this section had into six, and supplies
   the title and description of each. The icons and colours are chosen to
   match the ones already on the page. */
const services: Item[] = [
  {
    icon: FaPaintbrush,
    title: "Custom Store Design",
    body: "Unique, on-brand Shopify stores designed to convert, not templated themes.",
    color: "#4ade80",
  },
  {
    icon: FaPuzzlePiece,
    title: "Theme & App Development",
    body: "Custom theme edits, app integrations and third-party tool connections.",
    color: "#3b82f6",
  },
  {
    icon: FaRightLeft,
    title: "Store Migration",
    body: "Move your existing store to Shopify with data, SEO and design intact.",
    color: "#38bdf8",
  },
  {
    icon: FaBullseye,
    title: "Conversion Rate Optimisation",
    body: "Identify and fix what's costing you sales.",
    color: "#f43f5e",
  },
  {
    icon: FaMagnifyingGlass,
    title: "Shopify SEO",
    body: "Technical and on-page SEO to get your store found.",
    color: "#f59e0b",
  },
  {
    icon: FaHeadset,
    title: "Ongoing Support & Maintenance",
    body: "Updates, fixes and improvements after launch.",
    color: "#e9a8f0",
  },
];

const journey: Item[] = [
  { icon: FaComments, title: "Consult", body: "Share your goals and requirements.", color: "#2f9e7f" },
  { icon: FaFileLines, title: "Design & Develop", body: "Create a tailored Shopify store.", color: "#3b82f6" },
  { icon: FaRocket, title: "Launch", body: "Test and go live with confidence.", color: "#22c55e" },
  { icon: FaChartSimple, title: "Grow", body: "Get ongoing support to scale further.", color: "#16a34a" },
];

const outcomes: Item[] = [
  { icon: FaChartSimple, title: "Higher Sales", body: "More visitors into customers.", color: "#3b82f6" },
  /* Drawn as a shield with a tick, as the mockup has it — fa6 ships the two
     glyphs separately, so they are stacked below. */
  { icon: FaShield, title: "Trusted Expertise", body: "Experienced Shopify professionals.", color: "#22c55e" },
  { icon: FaUsers, title: "Tailored Solutions", body: "Built around your business goals.", color: "#f59e0b" },
  { icon: FaHandshake, title: "Long Term Partnership", body: "We grow with you.", color: "#f43f5e" },
];

/* The last field of the consultation form. The options are this page's own
   six services, so the form offers nothing the page does not describe. */
const improveOptions = [
  "A new Shopify store",
  "Redesign of an existing store",
  "Store migration to Shopify",
  "Theme and app development",
  "Shopify SEO and performance",
  "Ongoing support and maintenance",
  "Not sure yet",
];
/* The three labels the mockup sets beside the bag in the closing section. */
const ctaLabels: { icon: IconType; label: string }[] = [
  { icon: FaGear, label: "Build" },
  { icon: FaChartSimple, label: "Optimise" },
  { icon: FaRocket, label: "Grow" },
];

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

/* The mockup sets every eyebrow as plain letterspaced uppercase — no pill. */
const EYEBROW_LIGHT =
  "text-[0.6875rem] font-bold tracking-[0.16em] text-[#4f81bc] uppercase";
const EYEBROW_DARK =
  "text-[0.6875rem] font-bold tracking-[0.16em] text-[#9fc0e2] uppercase";

const H2_LIGHT =
  "mt-3 text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] font-bold text-[#0b1f33]";
const H2_DARK =
  "mt-3 text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] font-bold text-white";

const P_LIGHT = "mt-4 text-[0.9375rem] leading-relaxed text-[#3c5a7e]";
const P_DARK = "mt-4 text-[0.9375rem] leading-relaxed text-[#cbdcf0]";

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#6a9bd1] px-5 py-3 font-display text-sm font-bold text-white transition-colors duration-300 hover:bg-[#4f81bc]";
const ARROW = "size-3.5 transition-transform duration-200 group-hover:translate-x-1";

/* A glyph on a tinted disc, in the glyph's own colour — the mockup's treatment
   on the white bands. */
function Disc({ icon: Icon, color }: { icon: IconType; color: string }) {
  return (
    <span
      className="grid size-[4.25rem] shrink-0 place-items-center rounded-full"
      style={{ color, backgroundColor: `${color}1f` }}
    >
      <Icon className="size-7" />
    </span>
  );
}

/* The same idea on navy: a darker disc with a hairline ring, as drawn. */
function DiscDark({ icon: Icon, color }: { icon: IconType; color: string }) {
  return (
    <span
      className="grid size-[4.25rem] shrink-0 place-items-center rounded-full border"
      style={{ color, backgroundColor: `${color}1a`, borderColor: `${color}4d` }}
    >
      <Icon className="size-7" />
    </span>
  );
}

export default function ShopifyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph([
            ...pageSchema({
              path: "/platforms/shopify-development-services",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [
                { label: "Shopify Development Services", path: "/platforms/shopify-development-services" },
              ],
            }),
            SERVICE_SCHEMA,
            faqSchema("/platforms/shopify-development-services", faqs),
          ]),
        }}
      />

      {/* ---------------- hero ---------------- */}
      <section
        className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-14"
        style={{ backgroundColor: NAVY }}
      >
        {/* The mockup lifts the middle of the band a shade; a single soft wash
            rather than a second colour. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[70rem] -translate-x-1/2 opacity-70"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 45%, #14395c 0%, rgba(20,57,92,0) 70%)",
          }}
        />
        <div className="shell relative grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div>
            <Reveal immediate>
              <p className={EYEBROW_DARK}>Shopify Solutions</p>
            </Reveal>
            <h1 className="mt-4 text-[clamp(2rem,3.9vw,3.25rem)] leading-[1.08] font-bold text-white">
              Shopify Development Services That
              <br />
              <span className="text-[#9fc0e2]">Turn Ideas Into Profitable Stores</span>
            </h1>
            <Reveal delay={120} immediate>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#cbdcf0]">
                We design, develop and optimise Shopify stores that look amazing,
                convert visitors and help you grow your business.
              </p>
            </Reveal>
            <Reveal delay={200} immediate>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#consultation" className={BTN}>
                  Get a Free Shopify Consultation
                  <FaArrowRight className={ARROW} />
                </a>
                <Link
                  href="/our-portfolio"
                  className="group inline-flex items-center gap-2.5 rounded-md border border-white/45 px-4 py-2.5 font-display text-sm font-bold text-white transition-colors duration-300 hover:border-[#9fc0e2] hover:text-[#9fc0e2]"
                >
                  See Our Work
                  <span className="grid size-6 place-items-center rounded-full bg-white text-[#0b1f33]">
                    <FaPlay className="size-2.5" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} immediate className="relative">
            <img
              src="/images/shopify-platform-hero-v2.webp"
              alt="Shopify store development services shown on laptop and mobile"
              width={677}
              height={511}
              fetchPriority="high"
              className="h-auto w-full max-w-[36rem] lg:ml-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- intro ----------------
          The brief adds this paragraph, which the page did not have, and
          links its first mention of "Shopify development services" to the
          portfolio. */}
      <section className="bg-white pt-12 pb-2 md:pt-16">
        <div className="shell">
          <Reveal>
            <p className={`${P_LIGHT} max-w-4xl`}>
              Onyxera Tech provides{" "}
              <Link
                href="/our-portfolio"
                className="text-[#1a6df5] underline underline-offset-4 transition-colors duration-300 hover:text-[#0b1f33]"
              >
                Shopify development services
              </Link>{" "}
              covering everything from custom store design and theme development
              to app integration, SEO and ongoing performance optimisation.
              Whether you&rsquo;re launching a new store or fixing conversion
              issues on an existing one, our Shopify development services are
              built to turn visitors into customers not just make the store look
              good.
            </p>
          </Reveal>
        </div>
      </section>
      {/* ---------------- the challenge ---------------- */}
      <section className="bg-white py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <p className={EYEBROW_LIGHT}>The Challenge</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_LIGHT}>
                Why Businesses Need the Right Shopify Development Services
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_LIGHT}>
                Outdated designs, low conversions, technical issues and limited
                expertise can hold your store back.
              </p>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
            {challenges.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={i * 70}
                className="flex flex-col items-center text-center"
              >
                <Disc icon={c.icon} color={c.color} />
                <h3 className="mt-4 text-[0.875rem] leading-snug font-bold text-balance text-[#0b1f33]">
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
      <section className="py-12 md:py-16" style={{ backgroundColor: NAVY }}>
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <p className={EYEBROW_DARK}>Our Solution</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_DARK}>
                Complete Shopify Development Services Under One Roof
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_DARK}>
                We provide end to end Shopify services to design, develop, optimise
                and support your store, so you can focus on what you do best,
                growing your business.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <Link href="#how-it-works" className={`${BTN} mt-7`}>
                See How We Can Help
                <FaArrowRight className={ARROW} />
              </Link>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 70}
                className="flex flex-col items-center text-center"
              >
                <DiscDark icon={s.icon} color={s.color} />
                <h3 className="mt-4 text-[0.875rem] leading-snug font-bold text-balance text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-balance text-[#cbdcf0]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- your shopify journey ---------------- */}
      <section id="how-it-works" className="scroll-mt-24 bg-white py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <p className={EYEBROW_LIGHT}>Your Shopify Journey</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_LIGHT}>Our Shopify Development Services Process</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_LIGHT}>
                We follow a clear and proven process to deliver a Shopify store
                that performs.
              </p>
            </Reveal>
          </div>

          {/* The arrows sit in the gap between steps, as drawn, and drop away
              once the steps stack. */}
          <ol className="grid grid-cols-2 gap-x-7 gap-y-9 lg:grid-cols-4">
            {journey.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 70}
                className="relative flex flex-col items-center text-center"
              >
                <Disc icon={s.icon} color={s.color} />
                <h3 className="mt-4 text-[0.875rem] leading-snug font-bold text-[#0b1f33]">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-balance text-[#3c5a7e]">
                  {s.body}
                </p>
                {i < journey.length - 1 && (
                  <FaArrowRight
                    aria-hidden="true"
                    className="absolute top-[1.55rem] -right-[1.4rem] hidden size-4 text-[#1f3f63] lg:block"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- business outcomes ---------------- */}
      <section className="py-12 md:py-16" style={{ backgroundColor: NAVY }}>
        <div className="shell">
          <Reveal>
            <p className={EYEBROW_DARK}>Business Outcomes</p>
          </Reveal>
          <Reveal delay={80}>
            {/* Set a step down from the other section headings: this band
                carries no supporting paragraph under it, so at the shared size
                the line sat too heavy above the four short items. */}
            <h2 className="mt-3 text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.2] font-bold text-white">
              Why Choose Our Shopify Development Services
            </h2>
          </Reveal>

          <ul className="mt-9 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/12">
            {outcomes.map((o, i) => (
              <Reveal
                key={o.title}
                as="li"
                delay={i * 70}
                className="flex items-start gap-4 lg:px-6 lg:first:pl-0"
              >
                <span className="relative grid size-9 shrink-0 place-items-center">
                  <o.icon className="size-9" style={{ color: o.color }} />
                  {o.title === "Trusted Expertise" && (
                    <FaCheck
                      aria-hidden="true"
                      className="absolute top-[0.55rem] left-1/2 size-3.5 -translate-x-1/2 text-white"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-bold text-white">{o.title}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-[#cbdcf0]">
                    {o.body}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- faq ----------------
          Added by the brief: the page carried no FAQ, which it calls the
          biggest content gap for this keyword. */}
      <section className="bg-white pt-4 pb-12 md:pb-16">
        <div className="shell">
          <Reveal>
            <p className={EYEBROW_LIGHT}>FAQ</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={H2_LIGHT}>Frequently Asked Questions</h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-6">
              <AutomationFunnelFaq items={faqs.slice(0, 3)} />
              <AutomationFunnelFaq items={faqs.slice(3)} />
            </div>
          </Reveal>
        </div>
      </section>
      {/* ---------------- final cta ----------------
          The consultation form the other platform pages carry. It replaces a
          button that sent the visitor away to /contact; the mockup's bag and
          its Build / Optimise / Grow labels move under the copy rather than
          being dropped. */}
      <section id="consultation" className="scroll-mt-24 bg-white py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <p className={EYEBROW_LIGHT}>Ready to Build Your Shopify Store?</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={H2_LIGHT}>Get Started With Your Shopify Development Project</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className={P_LIGHT}>
                Get a free consultation and discover how we can design, develop
                and grow a high performing Shopify store for your business.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex items-center gap-5 sm:gap-7">
                <img
                  src="/images/shopify-bag.webp"
                  alt="Shopify shopping bag"
                  aria-hidden="true"
                  width={171}
                  height={200}
                  loading="lazy"
                  className="h-auto w-[5.5rem] shrink-0 sm:w-[6.5rem]"
                />
                <span className="hidden h-24 w-px shrink-0 bg-[#dbe6f5] sm:block" />
                <ul className="flex gap-3 sm:gap-4">
                  {ctaLabels.map((c) => (
                    <li key={c.label} className="flex flex-col items-center">
                      <span className="grid size-11 place-items-center rounded-full bg-[#eef5ff] text-[#0b1f33] sm:size-12">
                        <c.icon className="size-4.5" />
                      </span>
                      <span className="mt-2 text-xs font-bold text-[#0b1f33]">{c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <AutomationFunnelForm
              title="Get a Free Shopify Consultation"
              submitLabel="Get My Free Consultation"
              source="Shopify Development Services page"
              detailLabel="What do you need help with?"
              detailOptions={improveOptions}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
