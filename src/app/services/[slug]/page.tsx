import type { Metadata } from "next";
import { cn, numberWord, titleCaseWord } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceHeroVisual } from "@/components/sections/ServiceHeroVisual";
import {
  CtaBand,
  DeliverablesList,
  FaqSection,
  MetricStrip,
  ProcessSteps, CaseStudyCard } from "@/components/sections/Shared";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getService, services } from "@/lib/data/services";

import { graph, ORG_ID, pageSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getCaseStudiesByService } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const seo = service.seo;

  return {
    title: seo?.title ?? service.name,
    description: seo?.description ?? service.summary,
    keywords: seo?.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: seo?.ogTitle ?? `${service.name} | ${site.name}`,
      description: seo?.ogDescription ?? service.summary,
      url: `/services/${service.slug}`,
      /* Declaring `openGraph` here replaces the file-based
         opengraph-image convention instead of merging with it, so the card
         has to name the image itself. */
      images: ["/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle ?? `${service.name} | ${site.name}`,
      description: seo?.ogDescription ?? service.summary,
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  /* Derived from serviceSlug, so a deleted study can never leave a dangling
     pointer behind. Empty for services with no real work published yet, and the
     section below then does not render. Plural: SEO and Automation have three
     engagements each and web application two, all of which used to be collapsed
     to whichever happened to sit first in the data file. */
  const studies = service ? getCaseStudiesByService(service.slug) : [];
  if (!service) notFound();

  const hasDeliverables = service.deliverables.length > 0;
  /* The left column of the "what you get" band. It used to appear only with a
     deliverables list, which left SEO with a lone Tools card and no heading at
     all. It now also appears for a service that supplies its own copy for it. */
  const hasWhatYouGet = hasDeliverables || Boolean(service.whatYouGet);

  /* Three nodes, not one: the page, its breadcrumb, and the service the page
     is about. `hasOfferCatalog` lists the capabilities this page actually
     documents — the brief is explicit that the markup may only name services
     genuinely offered and supported by the page, so it is built from the same
     array the page renders rather than from a keyword list. */
  const schema = graph([
    ...pageSchema({
      path: `/services/${service.slug}`,
      name: service.name,
      description: service.summary,
      crumbs: [
        { label: "Services", path: "/services" },
        { label: service.navLabel, path: `/services/${service.slug}` },
      ],
      extra: { mainEntity: { "@id": `${site.url}/services/${service.slug}#service` } },
    }),
    {
      "@type": "Service",
      "@id": `${site.url}/services/${service.slug}#service`,
      name: service.name,
      description: service.summary,
      serviceType: service.name,
      provider: { "@id": ORG_ID },
      areaServed: site.offices.map((o) => o.country),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.name,
        itemListElement: service.capabilities.map((c) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: c.title, description: c.body },
        })),
      },
    },
  ]);

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <PageHeader
        eyebrow={service.hero.eyebrow}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.navLabel },
        ]}
        title={
          <>
            {service.hero.headline}{" "}
            <span className="accent-text">{service.hero.highlight}</span>
            {service.hero.headlineEnd}
          </>
        }
        intro={service.hero.sub}
        visual={<ServiceHeroVisual slug={service.slug} />}
      >
        {/* Brief: "Add two CTAs in every hero section." The generic ask leads,
            in brand blue; the discipline-specific offer sits beside it in white
            — the "one blue, one white" pairing used everywhere else on the
            site. The second label comes from the brief’s CTA table, so it reads
            "Get A Free SEO Audit" here and "Find What You Can Automate" on
            automation. The first is "Discuss Project" per the client’s later
            call, replacing the "Get Free Consultation" the document listed. */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" size="lg" withArrow>
            {service.heroCtaPrimary ?? "Discuss Project"}
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="white">
            {service.heroCta}
          </ButtonLink>
        </div>

        {/* The "Typical timeline · tagline" row under the hero buttons is gone
            at the client’s request. `timeline` stays in the service data —
            nothing else reads it today, but it is a real figure per service and
            deleting it would lose it. */}
      </PageHeader>

      {/* Self-hides when a service has no verified figures yet, rather than
          rendering an empty band. */}
      {service.metrics.length > 0 && (
        <section className="pb-4">
          <div className="shell">
            <MetricStrip metrics={service.metrics} />
          </div>
        </section>
      )}

      {/* ---------------- what to build ---------------- */}
      {service.problem && (
        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">Problem</span>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.25rem)] text-fg">
                  {service.problem.title}
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-5 text-lg text-fg-muted">{service.problem.sub}</p>
              </Reveal>
              {/* `points` is empty on at least one service, which rendered a
                  bordered, zero-child <ul> and its top margin — a visibly blank
                  left column beside a full solution card. The list only ships
                  where the service actually supplies symptoms. */}
              {service.problem.points.length > 0 && (
                <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                  {service.problem.points.map((point, i) => (
                    <Reveal key={point} delay={120 + i * 70} as="li">
                      <span className="flex items-start gap-3 rounded-xl border border-line bg-glass px-4 py-3.5">
                        <X className="mt-0.5 size-4 shrink-0 text-fg-faint" strokeWidth={2.2} />
                        <span className="text-sm leading-relaxed text-fg-body">{point}</span>
                      </span>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>

            {/* The answer to the list on the left, given its own surface. */}
            <Reveal delay={140}>
              <div className="card-brand flex h-full flex-col justify-center p-8 md:p-10">
                {/* Solid white: at 80% alpha this drops to 3.77:1 against the
                    light end of the .card-brand gradient, and it is 11px
                    uppercase, so it needs 4.5:1. Size, tracking and case
                    already carry the hierarchy — the same call Principles.tsx
                    makes on this fill. */}
                <span className="font-label text-[0.6875rem] tracking-[0.18em] text-white uppercase">
                  Solution
                </span>
                <p className="mt-5 font-display text-xl leading-snug text-white md:text-2xl">
                  {service.problem.solution}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {service.images?.hero && (
        <section className="pb-10">
          <div className="shell">
            <Reveal>
              <div className="card overflow-hidden">
                <img
                  src={service.images.hero.src}
                  alt={service.images.hero.alt}
                  width={1200}
                  height={750}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- shape of the engagement ---------------- */}
      {service.heroStats && service.heroStats.length > 0 && (
        <section className="pb-4">
          <div className="shell">
            <MetricStrip metrics={service.heroStats} />
          </div>
        </section>
      )}

      {/* ---------------- capabilities ---------------- */}
      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="What we do"
            title={
              service.capabilitiesHeading ? (
                <>
                  {service.capabilitiesHeading.title}
                  <span className="accent-text">
                    {service.capabilitiesHeading.highlight}
                  </span>
                  {service.capabilitiesHeading.end ?? "."}
                </>
              ) : (
                <>
                  Inside
                  <span className="accent-text"> {service.name}</span>.
                </>
              )
            }
            introWide
            intro={
              service.capabilitiesHeading?.body ??
              `${titleCaseWord(numberWord(service.capabilities.length))} areas we cover in depth. You do not have to take all of them. Most engagements start with two or three.`
            }
          />

          {/* Dividers are real borders on each cell, pulled together by a -1px
                margin so neighbouring edges collapse into one line and the outer
                ring tucks under the container’s own border.

                This was a `gap-px` grid over a `bg-line` parent, where the
                divider was the parent showing through a 1px gap. Three columns
                across 1200px put the cells on fractional pixels (x = 116,
                515.66, 915.33), so those 1px strips were painted at partial
                coverage: some rendered, some vanished, and the section showed a
                line before the last cell only. Borders snap to the pixel grid
                and paint every time. */}
          <div className="mt-14 grid overflow-hidden rounded-2xl border border-line md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 60}
                className="-mt-px -ml-px border-t border-l border-line bg-bg"
              >
                <div className="group h-full p-8 transition-colors duration-300 hover:bg-surface">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-glass text-accent transition-all duration-300 group-hover:border-accent-icon/50 group-hover:text-accent">
                    <c.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-medium text-fg">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-subtle">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- deliverables + stack ----------------
          Self-hides when a service has no client-supplied deliverables list:
          the heading promises these are "in the contract", so an invented or
          empty list is worse than no section. */}
      <section className="section border-t border-line">
        {/* cn() is a plain join with no merge step, so the two column rules
            have to be mutually exclusive: without deliverables the band drops
            to one column instead of leaving a 0.85fr hole where "What you get"
            would have been. */}
        <div
          className={cn(
            "shell grid gap-14 lg:gap-16",
            hasWhatYouGet ? "lg:grid-cols-[1fr_0.85fr]" : "lg:grid-cols-1",
          )}
        >
          {hasWhatYouGet && (
          <div>
            <Reveal>
              <span className="eyebrow">What you get</span>
            </Reveal>
            <Reveal delay={80}>
              {/* The brief's own wording where it supplies some, and the
                  contract line otherwise. */}
              <h2 className="mt-5 text-[clamp(1.876rem,3.8vw,2.75rem)] text-fg">
                {service.whatYouGet ? (
                  <>
                    {service.whatYouGet.title}
                    <span className="accent-text">
                      {service.whatYouGet.highlight}
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Everything listed here is
                    <span className="accent-text"> in the contract</span>.
                  </>
                )}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-fg-muted">
                {service.whatYouGet
                  ? service.whatYouGet.body
                  : "No line items that turn out to be optional extras later. If it is on this list it is scoped, priced and delivered."}
              </p>
            </Reveal>
            {/* Only with a real, client-supplied list: the contract heading
                promises these items are contractual, so an invented list would
                be a false promise. */}
            {hasDeliverables && (
              <div className="mt-10">
                <DeliverablesList items={service.deliverables} />
              </div>
            )}
          </div>
          )}

          {/* No `lg:max-w-2xl`: alone in a single-column track the cap left
              this card in the left half with an empty right half beside it, so
              it runs full width there and only the paragraph keeps a measure.

              `sticky` only makes sense with a taller column beside it to scroll
              past — alone in the row it has nothing to stick against. Mutually
              exclusive strings, since cn() does not merge. */}
          <Reveal delay={120}>
            <div
              className={cn(
                "card p-8",
                hasWhatYouGet ? "sticky top-28" : "static",
              )}
            >
              <span className="eyebrow eyebrow-plain">Tools & stack</span>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-subtle">
                {service.stackIntro ??
                  "We pick boring, well-supported tools on purpose. Everything below is something your next hire can already use."}
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {service.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-lg border border-line bg-glass px-3 py-1.5 font-label text-xs text-fg-body transition-colors duration-200 hover:border-accent-quiet/50 hover:text-accent-strong"
                  >
                    {tool}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-400/12 text-accent">
                  <Check className="size-4" strokeWidth={2.5} />
                </span>
                <p className="text-xs leading-relaxed text-fg-subtle">
                  {service.stackNote ??
                    "You own every account, repository and licence we set up on your behalf."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="section border-t border-line">
        <div className="shell">
          {/* Service names are printed as written. Lowercasing them turned
              "SEO" into "seo" and "AI" into "ai", and the indefinite article
              cannot be right for every name at once ("a SEO", "a automation"),
              so the article is gone and the noun is plural instead. */}
          <SectionHeading
            eyebrow="The process"
            title={
              service.processHeading ? (
                <>
                  {service.processHeading.title}
                  <span className="accent-text">
                    {service.processHeading.highlight}
                  </span>
                  {service.processHeading.end ?? "."}
                </>
              ) : (
                <>
                  How
                  <span className="accent-text"> {service.navLabel} </span>
                  engagements run.
                </>
              )
            }
            intro={
              service.processHeading?.body ??
              "Fixed phases with a defined deliverable at the end of each. You approve one before the next begins."
            }
          />
          <div className="mt-14">
            <ProcessSteps steps={service.process} />
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <div className="border-t border-line">
        <FaqSection
          faqs={service.faqs}
          eyebrow="FAQ"
          title={
            service.faqHeading ? (
              <>
                {service.faqHeading.title}
                <span className="accent-text">{service.faqHeading.highlight}</span>
                {service.faqHeading.end ?? "."}
              </>
            ) : (
              <>
                {service.navLabel},
                <span className="accent-text"> answered straight</span>.
              </>
            )
          }
        />
      </div>


      {/* ---------------- proof ---------------- */}
      {studies.length > 0 && (
        <section className="section border-t border-line">
          <div className="shell">
            <SectionHeading
              eyebrow="Proof"
              title={
                <>
                  This work,
                  <span className="accent-text"> in practice</span>.
                </>
              }
              intro={
                studies.length === 1
                  ? "A real engagement in this discipline: what was broken, what we did, and what changed."
                  : "Real engagements in this discipline: what was broken, what we did, and what changed."
              }
            />
            {/* Same grid as the portfolio page, so a card is the same size and
                shape wherever it appears. The old `lg:max-w-2xl` capped the row
                at two columns because only one card could ever land in it; with
                the full list that cap would strand the third card on its own
                line. */}
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((c, i) => (
                <CaseStudyCard key={c.slug} study={c} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow={service.cta?.eyebrow ?? service.navLabel}
        title={service.cta?.title ?? `Let’s talk about your ${service.navLabel}.`}
        intro={service.cta?.body ?? service.summary}
        primaryLabel={service.cta?.primaryLabel ?? "Free consultation"}
        secondaryHref={
          service.cta?.secondaryHref ?? (service.cta?.secondaryLabel ? "/contact" : "/#services")
        }
        secondaryLabel={service.cta?.secondaryLabel ?? "Explore more"}
        note={service.cta?.note}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
    </>
  );
}
