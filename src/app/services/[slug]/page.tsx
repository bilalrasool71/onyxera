import type { Metadata } from "next";
import { cn, numberWord, titleCaseWord } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Check, Clock, X } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
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

import { site } from "@/lib/site";
import { getCaseStudyByService } from "@/lib/data/case-studies";

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
  /* Derived from serviceSlug, so a deleted study can never leave a
     dangling pointer behind. Undefined for services with no real work
     published yet, and the section below then does not render. */
  const study = service ? getCaseStudyByService(service.slug) : undefined;
  if (!service) notFound();

  const Icon = service.icon;
  const hasDeliverables = service.deliverables.length > 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
    serviceType: service.name,
  };

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
          </>
        }
        intro={service.hero.sub}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" size="lg" withArrow>
            Discuss your project
          </ButtonLink>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
          {service.timeline && (
            <span className="flex items-center gap-2 text-sm text-fg-subtle">
              <Clock className="size-4 text-accent-icon" />
              Typical timeline{" "}
              <span className="font-medium text-fg-body">{service.timeline}</span>
            </span>
          )}
          <span className="flex items-center gap-2 text-sm text-fg-subtle">
            <Icon className="size-4 text-accent-icon" />
            {service.tagline}
          </span>
        </div>
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
                <h2 className="text-[clamp(2rem,4.4vw,3.25rem)] text-fg">
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
              <>
                Inside
                <span className="accent-text"> {service.name}</span>.
              </>
            }
            intro={`${titleCaseWord(numberWord(service.capabilities.length))} areas we cover in depth. You do not have to take all of them — most engagements start with two or three.`}
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="bg-bg">
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
            hasDeliverables ? "lg:grid-cols-[1fr_0.85fr]" : "lg:grid-cols-1",
          )}
        >
          {/* Only rendered with a real, client-supplied list. The heading below
              promises these items are contractual, so an empty or invented list
              would be a false promise. The stack column stands on its own. */}
          {hasDeliverables && (
          <div>
            <Reveal>
              <span className="eyebrow">What you get</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(1.876rem,3.8vw,2.75rem)] text-fg">
                Everything listed here is
                <span className="accent-text"> in the contract</span>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-fg-muted">
                No line items that turn out to be optional extras later. If it is on
                this list it is scoped, priced and delivered.
              </p>
            </Reveal>
            <div className="mt-10">
              <DeliverablesList items={service.deliverables} />
            </div>
          </div>
          )}

          <Reveal delay={120} className={cn(!hasDeliverables && "lg:max-w-2xl")}>
            <div className="card sticky top-28 p-8">
              <span className="eyebrow eyebrow-plain">Tools & stack</span>
              <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
                We pick boring, well-supported tools on purpose. Everything below is
                something your next hire can already use.
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
                  You own every account, repository and licence we set up on your behalf.
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
              <>
                How
                <span className="accent-text"> {service.navLabel} </span>
                engagements run.
              </>
            }
            intro="Fixed phases with a defined deliverable at the end of each. You approve one before the next begins."
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
            <>
              {service.navLabel},
              <span className="accent-text"> answered straight</span>.
            </>
          }
        />
      </div>


      {/* ---------------- proof ---------------- */}
      {study && (
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
              intro="A real engagement in this discipline — what was broken, what we did, and what changed."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:max-w-2xl">
              <CaseStudyCard study={study} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow={service.navLabel}
        title={service.cta?.title ?? `Let’s talk about your ${service.navLabel}.`}
        intro={service.cta?.body ?? service.summary}
        primaryLabel="Free consultation"
        secondaryHref="/#services"
        secondaryLabel="Explore more"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
