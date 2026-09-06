import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronRight,
  Layers,
  Timer,
  Users,
} from "lucide-react";
import { CtaBand, MetricStrip } from "@/components/sections/Shared";
import { graph, ORG_ID, pageSchema } from "@/lib/schema";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";
import { getService } from "@/lib/data/services";
import { cn, numberWord, titleCaseWord } from "@/lib/utils";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

/**
 * Trims a summary to a length a search engine will print in full.
 *
 * Cuts on a word boundary and adds nothing: an ellipsis in a meta description
 * is a character of the 160 spent saying the sentence was cut, which the
 * reader can already see.
 */
function clamp(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "");
}

export async function generateMetadata({
  params,
}: PageProps<"/our-portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    /* The SEO brief's title where it supplies one, the client name otherwise.
       Either way the layout template appends " | OnyxEra Tech". */
    title: study.seoTitle ?? study.client,
    description: clamp(study.summary),
    alternates: { canonical: `/our-portfolio/${study.slug}` },
    openGraph: {
      title: `${study.seoTitle ?? study.client} | ${site.name}`,
      description: clamp(study.summary),
      url: `/our-portfolio/${study.slug}`,
      /* Declaring `openGraph` here replaces the file-based
         opengraph-image convention instead of merging with it, so the card
         has to name the image itself. */
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/our-portfolio/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const service = getService(study.serviceSlug);
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  /* `year` and `duration` are optional and absent from most briefs. Rendering
     them regardless left a label with empty space under it on every page, so
     entries with no value are dropped rather than shown blank. */
  /* The first real image of the delivered work, if there is one. The rest of
     the screenshots belong in `proof`, which is the captioned pattern the SEO
     case studies use.

     Skipped when `proof` already carries the same file. The listing card needs
     a `coverImage` to show anything at all, so a study whose only pictures are
     proof shots names one of them as its cover — and then ran it twice on this
     page, uncaptioned at the top and captioned again forty lines down. The
     card keeps its image; this page shows it once, in the place that explains
     what it is. */
  /* The engagement itself, as a CreativeWork the page is "about". No Review,
     no AggregateRating and no rating value anywhere: the brief forbids
     manufactured trust signals, and those three are the properties that would
     manufacture them. What is published here is what the page already states —
     the client, the discipline, the problem and the outcome. */
  const schema = graph([
    ...pageSchema({
      path: `/our-portfolio/${study.slug}`,
      name: study.title,
      description: study.summary,
      crumbs: [
        { label: "Our Portfolio", path: "/our-portfolio" },
        { label: study.client, path: `/our-portfolio/${study.slug}` },
      ],
      extra: { mainEntity: { "@id": `${site.url}/our-portfolio/${study.slug}#project` } },
    }),
    {
      "@type": "CreativeWork",
      "@id": `${site.url}/our-portfolio/${study.slug}#project`,
      name: study.title,
      abstract: study.summary,
      description: study.challenge,
      creator: { "@id": ORG_ID },
      about: study.serviceName,
      ...(study.disciplines?.length ? { keywords: study.disciplines.join(", ") } : {}),
      ...(study.industry ? { audience: { "@type": "Audience", audienceType: study.industry } } : {}),
    },
  ]);

  const candidate = study.coverImage ?? study.gallery?.[0];
  const cover =
    candidate &&
    ![...(study.proof?.before ?? []), ...(study.proof?.after ?? [])].some(
      (shot) => shot.src === candidate.src,
    )
      ? candidate
      : undefined;

  const facts = [
    { icon: Users, label: "Client", value: study.client },
    { icon: Building2, label: "Industry", value: study.industry },
    { icon: CalendarDays, label: "Year", value: study.year },
    { icon: Timer, label: "Duration", value: study.duration },
  ].filter((f) => Boolean(f.value));

  return (
    <>
      {/* ---------------- masthead ----------------
          A case study is a document, so it opens like one: the claim on the
          left, the engagement's facts in a spec panel on the right. The old
          layout ran PageHeader at max-w-3xl and left the entire right half of
          the fold empty, then filled the next screen with a 21:9 gradient box
          that carried a client name and nothing else. */}
      <header className="relative overflow-hidden pt-32 pb-8 md:pt-40 md:pb-10">
        <div className="shell relative">
          <Reveal immediate>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-label text-[0.6875rem] tracking-wide text-fg-faint">
                {[
                  { label: "Home", href: "/" },
                  { label: "Our Portfolio", href: "/our-portfolio" },
                  { label: study.client },
                ].map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3 text-fg-faint" />}
                    {c.href ? (
                      <Link
                        href={c.href}
                        className="transition-colors duration-300 hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-accent">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          {/* `items-start`, not `items-center`. Centring was meant to split the
              height difference between the two ends of the shorter column, and
              on a study whose panel runs a line or two longer than the title it
              does read as breathing room. But the panel's height is driven by
              content that varies a lot — a client name that wraps, three
              service tags instead of one — and where it comes out at twice the
              height of the copy, half that difference lands *above* the
              eyebrow. The heading then floats in the middle of the fold with a
              void between it and the breadcrumb, which reads as a bug rather
              than as spacing. Aligned to the top, the eyebrow and the panel
              start on the same line on every study, and the difference sits at
              the bottom where a taller panel is simply a taller panel. */}
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:gap-16">
            {/* ---- the claim ---- */}
            <div>
              <Reveal immediate>
                <span className="eyebrow">{study.serviceName}</span>
              </Reveal>
              {/* Unwrapped on purpose — see the note on the home page's h1. */}
              <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,3.5rem)] text-fg">
                {study.title}
              </h1>
              <Reveal delay={160} immediate>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
                  {study.summary}
                </p>
              </Reveal>
              {/* The figures used to open a band of their own below the fold,
                  which left this column ending at the summary while the spec
                  panel beside it ran on for another 300px — a hole the width of
                  the page, right under the headline. Up here they close it and
                  do a better job besides: the claim in the title is answered by
                  the numbers while the reader is still looking at it. `narrow`
                  keeps four of them to two by two rather than four across. */}
              <Reveal delay={240} immediate>
                <MetricStrip metrics={study.results} narrow className="mt-10" />
              </Reveal>
            </div>

            {/* ---- at a glance ----
                Everything the reader would otherwise have to hunt for, in the
                order a client asks for it. Rows are hairline separated rather
                than boxed individually, so the panel reads as one spec sheet. */}
            <Reveal delay={220} immediate>
              <div className="card p-7 md:p-8">
                <span className="eyebrow eyebrow-plain">At a glance</span>

                <dl className="mt-6 space-y-5">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-t border-line pt-5 first:border-t-0 first:pt-0"
                    >
                      <dt className="flex items-center gap-1.5 font-label text-[0.625rem] tracking-[0.16em] text-fg-faint uppercase">
                        <fact.icon className="size-3" /> {fact.label}
                      </dt>
                      <dd className="mt-2 font-display text-[0.9375rem] font-medium text-fg">
                        {fact.value}
                      </dd>
                    </div>
                  ))}

                  {/* The brief's "Services:" line. Pills rather than a comma
                      list: these are the disciplines sold on this site, and
                      each one reads as a thing you can buy. */}
                  {study.disciplines && study.disciplines.length > 0 && (
                    <div className="border-t border-line pt-5">
                      <dt className="flex items-center gap-1.5 font-label text-[0.625rem] tracking-[0.16em] text-fg-faint uppercase">
                        <Layers className="size-3" /> Services
                      </dt>
                      <dd className="mt-3 flex flex-wrap gap-2">
                        {study.disciplines.map((d) => (
                          <span
                            key={d}
                            className="rounded-lg border border-line bg-glass px-2.5 py-1 font-label text-[0.6875rem] text-fg-body"
                          >
                            {d}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                {service && (
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-7 flex items-center justify-between gap-3 border-t border-line pt-6 font-display text-sm font-medium text-fg transition-colors duration-300 hover:text-accent-strong"
                  >
                    Explore {service.navLabel}
                    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------------- cover ----------------
          Only where a real photograph or screenshot of the delivered work
          exists. Seven of the ten engagements have none, and for those the band
          used to render as a near-black 21:9 rectangle holding a 5%-opacity
          glyph — a screenful of nothing before the reader reached a single
          fact. Those pages now go straight from the masthead to the results. */}
      {cover && (
        <section className="pb-16">
          <div className="shell">
            <Reveal>
              <div className="card overflow-hidden">
                {/* Natural ratio. A fixed 16/9 crop cut the sides off the
                    wider screenshots — these run from 2:1 to 2.6:1. */}
                <img
                  src={cover.src}
                  alt={cover.alt}
                  width={1600}
                  height={900}
                  className="block h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

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
        {/* Two columns only when there is a second thing to put in one. Most
            engagements carry no client quote, and the fixed two-column track
            left the outcome card in the left half with a card-sized void beside
            it. Mutually exclusive strings, since cn() does not merge. */}
        <div
          className={cn(
            "shell grid gap-5",
            study.quote ? "lg:grid-cols-2" : "lg:grid-cols-1",
          )}
        >
          <Reveal>
            <div className="card flex h-full flex-col justify-center p-8 md:p-10">
              <span className="eyebrow eyebrow-plain">The outcome</span>
              {/* Capped at a readable measure. Without a quote beside it the
                  card runs the full shell width, and an uncapped paragraph
                  would set ~150 characters to the line. */}
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-fg-body md:text-lg">
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

      {/* ---------------- measured evidence ----------------
          Sits after the outcome: the reader has the claim, this is what backs
          it. Self-hides for engagements with no captured screenshots. */}
      {study.proof && (
        <section className="section border-t border-line">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">Measured</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-2xl text-[clamp(1.085rem,2.108vw,1.55rem)] text-fg">
                {study.proof.before
                  ? "The numbers, before and after."
                  : "The numbers behind it."}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-fg-muted">
                Screenshots taken from the tools themselves, not a summary of
                them. Select any one to see it full size.
              </p>
            </Reveal>

            <ProofGallery before={study.proof.before} after={study.proof.after} />
          </div>
        </section>
      )}

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
            href={`/our-portfolio/${next.slug}`}
            className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="font-label text-[0.625rem] tracking-[0.18em] text-fg-faint uppercase">
                Next case study
              </span>
              <span className="mt-2.5 block font-display text-xl font-medium text-fg transition-colors duration-200 group-hover:text-accent-strong md:text-2xl">
                {next.client} · {next.serviceName}
              </span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-300 group-hover:border-accent/60 group-hover:bg-blue-500 group-hover:text-navy-900">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      <CtaBand
        eyebrow="Similar problem?"
        title={
          <>
            Tell us where it
            <span className="accent-text"> hurts</span>.
          </>
        }
        intro="If any of this sounded familiar, the call is free and the advice is honest, even when the honest advice is that you do not need us."
        secondaryHref="/our-portfolio"
        secondaryLabel="More case studies"
      />
    </>
  );
}
