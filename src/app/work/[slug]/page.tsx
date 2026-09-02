import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Building2, CalendarDays, Timer } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand, MetricStrip } from "@/components/sections/Shared";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";
import { getService } from "@/lib/data/services";
import { numberWord, titleCaseWord } from "@/lib/utils";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.client} — ${study.serviceName}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.client} | ${site.name}`,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const service = getService(study.serviceSlug);
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  /* `year` and `duration` are optional and absent from most briefs. Rendering
     them regardless left a label with empty space under it on every page, so
     entries with no value are dropped rather than shown blank. */
  const facts = [
    { icon: Building2, label: "Industry", value: study.industry },
    { icon: CalendarDays, label: "Year", value: study.year },
    { icon: Timer, label: "Duration", value: study.duration },
  ].filter((f) => Boolean(f.value));

  return (
    <>
      <PageHeader
        eyebrow={study.serviceName}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: study.client },
        ]}
        title={study.title}
        intro={study.summary}
      >
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="flex items-center gap-1.5 font-label text-[0.625rem] tracking-[0.14em] text-fg-faint uppercase">
                <f.icon className="size-3" /> {f.label}
              </dt>
              <dd className="mt-1.5 font-display text-sm font-medium text-fg">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* ---------------- cover band ---------------- */}
      <section className="pb-14">
        <div className="shell">
          <Reveal>
            <div
              className="cover-art relative aspect-21/9 overflow-hidden rounded-2xl border border-line"
              style={{
                backgroundImage: `linear-gradient(130deg, ${study.cover.from} 0%, #0a0a0c 55%, ${study.cover.to}26 100%)`,
              }}
            >
              <div className="dot-bg absolute inset-0 opacity-35" />
              <span
                className="absolute -right-16 -bottom-32 font-display text-[26rem] leading-none text-white/5"
                aria-hidden="true"
              >
                {study.cover.glyph}
              </span>
              <div className="absolute bottom-7 left-7 md:bottom-9 md:left-9">
                <p className="font-label text-[0.625rem] tracking-[0.18em] text-accent uppercase">
                  Client
                </p>
                <p className="mt-2 font-display text-2xl font-medium text-white md:text-3xl">
                  {study.client}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- results ---------------- */}
      <section className="pb-4">
        <div className="shell">
          <MetricStrip metrics={study.results} />
        </div>
      </section>

      {/* ---------------- challenge ---------------- */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow">The challenge</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(1.085rem,2.108vw,1.55rem)] text-fg">
                Where they were
                <span className="accent-text"> starting from</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="text-base leading-relaxed text-fg-muted md:text-lg">
              {study.challenge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- approach ---------------- */}
      <section className="section border-t border-line">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Our approach</span>
          </Reveal>
          <Reveal delay={80}>
            {/* Counted from the data: three studies carry three or five
                approach items, and a hardcoded "Four" miscounted the list
                directly beneath it. */}
            <h2 className="mt-5 max-w-2xl text-[clamp(1.085rem,2.108vw,1.55rem)] text-fg">
              {titleCaseWord(numberWord(study.approach.length))} decisions that
              <span className="accent-text"> shaped the outcome</span>.
            </h2>
          </Reveal>

          <ol className="mt-14 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {study.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} as="li" className="block bg-bg">
                <div className="group grid gap-5 p-8 transition-colors duration-300 hover:bg-surface md:grid-cols-[auto_0.9fr_1.1fr] md:items-start md:gap-10 md:p-10">
                  <span className="font-display text-3xl font-light text-fg-faint transition-colors duration-300 group-hover:text-accent-quiet md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-medium text-fg md:text-xl">
                    {a.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-fg-subtle">
                    {a.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- outcome + quote ---------------- */}
      <section className="section border-t border-line">
        <div className="shell grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card flex h-full flex-col justify-center p-8 md:p-10">
              <span className="eyebrow eyebrow-plain">The outcome</span>
              <p className="mt-6 text-base leading-relaxed text-fg-body md:text-lg">
                {study.outcome}
              </p>

              {/* `stack` is optional — only some briefs name the tooling. */}
              {study.stack && study.stack.length > 0 && (
              <div className="mt-9 border-t border-line pt-7">
                <p className="font-label text-[0.625rem] tracking-[0.18em] text-fg-faint uppercase">
                  Built with
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-lg border border-line bg-glass px-3 py-1.5 font-label text-xs text-fg-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </Reveal>

          {/* No invented quotes: the card renders only where a real, attributable
              testimonial exists for that engagement. */}
          {study.quote && (
            <Reveal delay={110}>
              <TestimonialCard t={study.quote} featured className="h-full" />
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------------- related service ---------------- */}
      {service && (
        <section className="section border-t border-line">
          <div className="shell">
            <Reveal>
              <div className="card card-hover card-glow group relative overflow-hidden p-8 md:p-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-xl">
                    <span className="eyebrow eyebrow-plain">The service behind it</span>
                    <h2 className="mt-5 font-display text-2xl font-medium text-fg md:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-subtle">
                      {service.summary}
                    </p>
                  </div>
                  <ButtonLink
                    href={`/services/${service.slug}`}
                    size="lg"
                    variant="secondary"
                    withArrow
                    className="shrink-0"
                  >
                    Explore {service.navLabel}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- next case ---------------- */}
      <section className="border-t border-line py-14">
        <div className="shell">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="font-label text-[0.625rem] tracking-[0.18em] text-fg-faint uppercase">
                Next case study
              </span>
              <span className="mt-2.5 block font-display text-xl font-medium text-fg transition-colors duration-200 group-hover:text-accent-strong md:text-2xl">
                {next.client} — {next.serviceName}
              </span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-300 group-hover:border-accent/60 group-hover:bg-blue-500 group-hover:text-navy-900">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="Similar problem?"
        title={
          <>
            Tell us where it
            <span className="accent-text"> hurts</span>.
          </>
        }
        intro="If any of this sounded familiar, the call is free and the advice is honest — even when the honest advice is that you do not need us."
        secondaryHref="/work"
        secondaryLabel="More case studies"
      />
    </>
  );
}
