import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand, FaqSection } from "@/components/sections/Shared";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/services";
import { openGraph, site } from "@/lib/site";
import { numberWord, titleCaseWord } from "@/lib/utils";
import { generalFaqs } from "@/lib/data/agency";
import { graph, pageSchema } from "@/lib/schema";

/* Derived, so the count and the list cannot drift from the data again. */
const COUNT = numberWord(services.length);
const NAMES = services.map((s) => s.navLabel);
const NAME_LIST = `${NAMES.slice(0, -1).join(", ")} and ${NAMES.at(-1)}`;

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | Onyxera Tech" template to run would
     print the company name twice. */
  title: { absolute: "Digital Solutions | Onyxera Tech" },
  description:
    "Explore Onyxera Tech services across digital development, SEO, digital marketing, automation and cyber security, built around your business and growth.",
  alternates: { canonical: "/services" },
  openGraph: openGraph({
    title: "Digital Solutions | Onyxera Tech",
    description:
      "Explore Onyxera Tech services across digital development, SEO, digital marketing, automation and cyber security, built around your business and growth.",
    url: "/services",
  }),
};

/* The client's copy, verbatim. The headings are statements about how the
   disciplines meet rather than the "A + B" labels that stood here, so the
   section now reads as four positions rather than four pairings. */
/* `body` is a node rather than a string because the document links a
   discipline in each of these four to the service page that covers it. Those
   links are part of the copy the client wrote, so they live with it. */
const pairings = [
  {
    title: "Build It Right, Then Make It Visible",
    body: (
      <>
        A website should look good and perform well. We connect development, user
        experience and{" "}
        <Link href="/services/seo-and-ai-seo" className="prose-link">
          SEO
        </Link>{" "}
        so your digital foundation supports customers, search visibility and future
        business growth.
      </>
    ),
  },
  {
    title: "Turn Traffic Into Something Useful",
    body: (
      <>
        Traffic only matters when it creates action. We connect{" "}
        <Link href="/services/digital-marketing" className="prose-link">
          digital marketing
        </Link>, landing pages and
        development to create experiences that turn attention into meaningful
        enquiries and measurable opportunities.
      </>
    ),
  },
  {
    title: "Build The Workflow Around The Work",
    body: (
      <>
        <Link href="/services/automation" className="prose-link">
          Automation
        </Link>{" "}
        starts with understanding the work. We connect applications, CRM, ERP and
        workflows so information moves efficiently, reducing manual effort while
        helping teams operate with greater consistency.
      </>
    ),
  },
  {
    title: "Security Belongs Inside The Solution",
    body: (
      <>
        <Link href="/services/cyber-security" className="prose-link">
          Security
        </Link>{" "}
        should be part of every digital solution. We consider applications,
        integrations, infrastructure and access controls early, helping identify
        risks before they become costly business problems.
      </>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* The trail matches the breadcrumb the reader can see on this page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph(
            pageSchema({
              path: "/services",
              name: "Services",
              description: `${titleCaseWord(COUNT)} disciplines under one roof: ${NAME_LIST}.`,
              type: "CollectionPage",
              crumbs: [{ label: "Services", path: "/services" }],
              /* Names every service page as part of this collection, which is
                 the Onyxera Tech -> Services -> Individual Service link the
                 brief asks for. */
              extra: {
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: services.map((s, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    name: s.name,
                    url: `${site.url}/services/${s.slug}`,
                  })),
                },
              },
            }),
          ) }}
      />
      <PageHeader
        eyebrow="Services"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            Digital Solutions Built
            <span className="accent-text"> For Your Business</span>
          </>
        }
        intro="Our digital solutions combine technology, marketing, automation and security to solve business problems, improve operations and support sustainable growth."
      />

      {/* ---------------- detailed service list ---------------- */}
      <section className="pb-4">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={i * 70} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="card card-hover card-glow group flex h-full flex-col p-8 md:p-9"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid size-13 place-items-center rounded-xl border border-line-strong bg-glass p-3 text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent-icon/50 group-hover:bg-blue-400/12 group-hover:text-accent">
                        <Icon className="size-6" strokeWidth={1.6} />
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg-subtle transition-all duration-300 group-hover:border-accent/60 group-hover:bg-blue-500 group-hover:text-navy-900">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>

                    <h2 className="mt-7 font-display text-2xl font-medium text-fg transition-colors duration-200 group-hover:text-accent-strong">
                      {service.name}
                    </h2>
                    <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg-subtle">
                      {service.summary}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.capabilities.slice(0, 4).map((c) => (
                        <li
                          key={c.title}
                          className="rounded-full border border-line bg-glass px-3 py-1 text-xs text-fg-muted"
                        >
                          {c.title}
                        </li>
                      ))}
                      <li className="rounded-full border border-line px-3 py-1 text-xs text-fg-faint">
                        +{service.capabilities.length - 4} more
                      </li>
                    </ul>

                    {/* Closes the card with what it is for. A duration used to
                        stand here, but the same discipline covers a two-week
                        job and a six-month one, so any figure was either
                        meaningless or a promise nobody had agreed to.

                        Not a link: the whole card is already the anchor, and a
                        second one inside it would be a nested interactive.
                        This is the label for the arrow in the corner, and it
                        moves with the card's own hover. */}
                    <div className="mt-7 flex items-center gap-1.5 border-t border-line pt-6 font-display text-sm font-medium text-accent">
                      Explore More
                      <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- pairings ---------------- */}
      <section className="section">
        <div className="shell">
          {/* The document's "MAIIN Heading", which introduces the four below
              it. No eyebrow: the document does not supply one, and the last
              heading here was written in-house. */}
          <SectionHeading
            title={
              <>
                Digital Solutions That Work
                <span className="accent-text"> As One System</span>
              </>
            }
            intro="Digital solutions do not work in isolation. Websites, SEO, marketing, automation and security influence each other. We connect these disciplines around one objective, making improvements more valuable."
            introWide
          />

          {/* Borders, not a `gap-px` grid over a tinted parent — see the note
              on the same pattern in services/[slug]/page.tsx. Fractional column
              widths made those 1px gaps paint inconsistently. */}
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-line md:grid-cols-2">
            {pairings.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 70}
                className="-mt-px -ml-px border-t border-l border-line bg-bg"
              >
                <div className="h-full p-8 transition-colors duration-300 hover:bg-surface md:p-9">
                  <h3 className="accent-text font-display text-lg font-medium">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-subtle">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <FaqSection
          faqs={generalFaqs}
          eyebrow="Before you ask"
          title={
            <>
              The practical
              <span className="accent-text"> details</span>.
            </>
          }
        />
      </div>

      <CtaBand
        title={
          <>
            Not sure which one you
            <span className="accent-text"> actually need</span>?
          </>
        }
        intro="That is a completely normal place to start. Describe the problem in plain language and we will tell you which discipline solves it, even if the honest answer is none of them."
        primaryLabel="Book a 30 minute call"
      />
    </>
  );
}
