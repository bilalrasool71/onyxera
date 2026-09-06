import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  ClientLogos,
  CtaBand,
  MetricStrip,
  ProcessSteps,
} from "@/components/sections/Shared";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import {
  aboutStats,
  deliveryProcess,
  differentiators,
  originStory,
} from "@/lib/data/agency";
import { services } from "@/lib/data/services";
import { graph, pageSchema } from "@/lib/schema";
import { numberWord, titleCaseWord } from "@/lib/utils";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | OnyxEra Tech" template to run would
     print the company name twice. */
  title: { absolute: "About OnyxEra Tech" },
  description:
    "Learn about OnyxEra Tech, our experience, approach and vision for helping businesses build better technology, automate work and achieve sustainable growth.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OnyxEra Tech",
    description:
      "Learn about OnyxEra Tech, our experience, approach and vision for helping businesses build better technology, automate work and achieve sustainable growth.",
    url: "/about",
    /* Declaring `openGraph` at all replaces the file-based
       opengraph-image convention rather than merging with it, so the card
       has to name the image itself. */
    images: ["/opengraph-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph(
            pageSchema({
              path: "/about",
              name: "About",
              description:
                "From websites and software to AI automation and performance marketing, OnyxEra Tech connects technology with growth to help businesses scale smarter.",
              type: "AboutPage",
              crumbs: [{ label: "About", path: "/about" }],
            }),
          ) }}
      />
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="shell">
          {/* Services, Contact and every case study already show a trail;
              this page was the only second-level page without one, which the
              structured breadcrumb beside it would have contradicted. Same
              markup as PageHeader's, since this page builds its own hero. */}
          <Reveal immediate>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-label text-[0.6875rem] tracking-wide text-fg-faint">
                <li className="flex items-center gap-1.5">
                  <Link href="/" className="transition-colors duration-300 hover:text-accent">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="size-3 text-fg-faint" />
                  <span className="text-accent">About</span>
                </li>
              </ol>
            </nav>
          </Reveal>
        </div>
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal immediate>
              <span className="eyebrow">About OnyxEra</span>
            </Reveal>
            {/* Unwrapped on purpose — see the note on the home page's h1. */}
            <h1 className="mt-6 text-[clamp(2.5rem,6.4vw,4.75rem)] text-fg">
              We Build It. Automate It.
              <span className="accent-text"> Grow It.</span>
            </h1>
            <Reveal delay={150} immediate>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
                From websites and software to AI automation and performance
                marketing, we connect technology with growth to help businesses
                scale smarter.
              </p>
            </Reveal>
            <Reveal delay={220} immediate>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg" withArrow>
                  Start a conversation
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">
                  See what we build
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Supplied photograph, staged from the launch checklist document. */}
          {/* No `Reveal`, and fetched at high priority: at 736px square this
              photograph is the largest thing in this page's fold, which makes
              it the LCP element — and Chromium will not credit an element that
              was mid-animation, or still at opacity 0 waiting on hydration,
              when it was first painted. */}
          <div className="card relative aspect-4/3 overflow-hidden">
            <img
              src="/images/about-hero.webp"
              alt="OnyxEra Tech, built on experience, one connected team"
              width={736}
              height={736}
              fetchPriority="high"
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------- stats ---------------- */}
      <section className="pb-16 md:pb-20">
        <div className="shell">
          <MetricStrip metrics={aboutStats} />
        </div>
      </section>

      {/* ---------------- vision ---------------- */}
      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Built on experience.
                <span className="accent-text"> Driven by one vision</span>.
              </>
            }
            intro="More than 25 years of business experience, shaped across industries and borders, now brought together to make technology more useful, practical and human."
          />

          {/* Four turning points, read as a sequence rather than four cards. */}
          <ol className="mt-16 grid gap-5 md:grid-cols-2">
            {originStory.map((item, i) => (
              <Reveal key={item.marker} delay={i * 90} as="li" className="h-full">
                <div className="card card-hover group relative h-full overflow-hidden p-8 md:p-9">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 right-7 font-display text-6xl leading-none text-fg-ghost transition-colors duration-300 group-hover:text-accent-quiet md:text-7xl"
                  >
                    {item.marker}
                  </span>

                  <span className="relative grid size-12 place-items-center rounded-xl border border-line-strong bg-glass text-accent">
                    <item.icon className="size-5" strokeWidth={1.6} />
                  </span>

                  <p className="relative mt-6 font-label text-[0.6875rem] tracking-[0.18em] text-accent-icon uppercase">
                    {item.eyebrow}
                  </p>
                  <h3 className="relative mt-3 max-w-md font-display text-lg text-fg md:text-xl">
                    {item.title}
                  </h3>
                  <p className="relative mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-fg-subtle">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- clients ---------------- */}
      <ClientLogos label="Trusted by teams at" />

      {/* ---------------- why us ---------------- */}
      <section className="section">
        <div className="shell">
          {/* Title and intro are the client's own, from the About brief. The
              previous pair ("How we think about the work" / "Six positions that
              decide how every engagement runs — before a single line of code is
              written") was written here rather than supplied.

              The count is read off `services` rather than typed. The brief's
              line said "Six disciplines" while the site ships five — the exact
              drift src/lib/utils.ts documents from the last time website design
              was folded into web applications. The cards below this heading are
              differentiators, not services, so the number was never theirs. */}
          <SectionHeading
            eyebrow="Why OnyxEra"
            title={
              <>
                Different expertise.
                <span className="accent-text"> One connected team</span>.
              </>
            }
            intro={`${titleCaseWord(numberWord(services.length))} disciplines, one partner bringing the right specialists together to build, optimise and grow your digital operation.`}
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 70} className="h-full">
                <div className="card card-hover card-glow group h-full p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-glass text-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-accent-icon/50 group-hover:bg-blue-400/12">
                    <d.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-sans text-base font-semibold text-fg">
                    {d.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-subtle">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- what we build ---------------- */}
      <section className="section border-t border-line pb-0">
        <div className="shell">
          {/* The brief punctuates this heading as a question ("What We Build &
              Deliver?"), so it is kept as written rather than normalised to a
              full stop. */}
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                What we build
                <span className="accent-text"> &amp; deliver</span>?
              </>
            }
            intro="Web, software, AI automation and marketing solutions designed around real business needs, built to improve performance and drive sustainable growth."
          />
        </div>
        {/* Each card links through to its own service page. */}
        <ServicesGrid withHeading={false} className="pt-10" />
      </section>

      {/* ---------------- process ---------------- */}
      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                From idea
                <span className="accent-text"> to execution</span>.
              </>
            }
            intro="A clear four step process designed to turn business challenges into practical solutions and measurable results."
          />
          <div className="mt-16">
            <ProcessSteps steps={deliveryProcess} />
          </div>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <CtaBand
        eyebrow="Say hello"
        title={
          <>
            Have a problem
            <span className="accent-text"> worth solving</span>?
          </>
        }
        intro="Whether you need a website, software, AI automation, SEO or a complete digital growth solution, start with the problem."
        primaryLabel="Start a project"
        secondaryHref="/our-portfolio"
        secondaryLabel="See what we build"
      />
    </>
  );
}
