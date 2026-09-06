import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CaseStudyCard, CtaBand, MetricStrip } from "@/components/sections/Shared";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/data/case-studies";
import { graph, pageSchema } from "@/lib/schema";
import { numberWord, titleCaseWord } from "@/lib/utils";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | OnyxEra Tech" template to run would
     print the company name twice. */
  title: { absolute: "OnyxEra Tech Portfolio" },
  description:
    "Explore OnyxEra Tech case studies across web development, SEO, digital marketing, automation and cyber security, with practical business outcomes.",
  alternates: { canonical: "/our-portfolio" },
  openGraph: {
    title: "OnyxEra Tech Portfolio",
    description:
      "Explore OnyxEra Tech case studies across web development, SEO, digital marketing, automation and cyber security, with practical business outcomes.",
    url: "/our-portfolio",
    /* Declaring `openGraph` at all replaces the file-based
       opengraph-image convention rather than merging with it, so the card
       has to name the image itself. */
    images: ["/opengraph-image.png"],
  },
};

/* Only figures the business has actually supplied. The former "$46M client
   revenue influenced" line was invented and has been removed. */
const summary = [
  { value: "140+", label: "Projects delivered" },
  { value: "94%", label: "Clients who return" },
  { value: "10+", label: "Years in business" },
];

export default function WorkPage() {
  const schema = graph(
    pageSchema({
      path: "/our-portfolio",
      name: "Our Portfolio",
      description:
        "Real client engagements across SEO, web applications, automation and digital marketing. What was broken, what we did, and what changed.",
      type: "CollectionPage",
      crumbs: [{ label: "Our Portfolio", path: "/our-portfolio" }],
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <PageHeader
        eyebrow="Our Portfolio"
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Portfolio" }]}
        title={
          <>
            Built On Experience.
            <span className="accent-text"> Proven By Results</span>.
          </>
        }
        intro="Every case study below states what was broken, what we did about it, and what changed."
      />

      <section className="pb-4">
        <div className="shell">
          <MetricStrip metrics={summary} />
        </div>
      </section>

      {/* The grid used to sit under no heading of its own, so the page jumped
          from its h1 straight to the h3 on every card. SectionHeading renders
          an h2, which restores the level. The count is derived rather than
          typed so it cannot drift from the data. */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            title={
              <>
                {titleCaseWord(numberWord(caseStudies.length))} engagements,
                <span className="accent-text"> in detail</span>.
              </>
            }
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <CaseStudyCard key={c.slug} study={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your turn"
        title={
          <>
            The next one could be
            <span className="accent-text"> yours</span>.
          </>
        }
        intro="Every project above started with a conversation about a problem someone was tired of living with."
        secondaryHref="/services"
        secondaryLabel="Browse services"
      />
    </>
  );
}
