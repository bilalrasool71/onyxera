import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CaseStudyCard, CtaBand, MetricStrip } from "@/components/sections/Shared";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/data/case-studies";
import { numberWord, titleCaseWord } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Case studies",
  description:
    "Real client engagements across SEO, web applications, automation and digital marketing — what was broken, what we did, and what changed.",
};

/* Only figures the business has actually supplied. The former "$46M client
   revenue influenced" line was invented and has been removed. */
const summary = [
  { value: "140+", label: "Projects delivered" },
  { value: "94%", label: "Clients who return" },
  { value: "10+", label: "Years in business" },
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        title={
          <>
            Proof, with the
            <span className="accent-text"> numbers attached</span>.
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
