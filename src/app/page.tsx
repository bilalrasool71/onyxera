import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import {
  ClientLogos,
  CtaBand,
  FaqSection,
  ProcessSteps,
} from "@/components/sections/Shared";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Principles } from "@/components/sections/Principles";
import { ClientStorySlider } from "@/components/sections/ClientStorySlider";
import { Reveal } from "@/components/ui/Reveal";
import { engagementSteps, homeFaqs } from "@/lib/data/agency";

/* Self-referencing canonical; metadataBase resolves it against site.url. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesGrid />

      {/* ---------------- the standards behind our work ----------------
          Heading and supporting line are the client's, verbatim. What stood
          here before was written in-house and claimed "Eleven years of
          projects" — a figure the brief contradicts (10+ years) and does not
          otherwise support, so it is gone rather than reworded. */}
      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                The Standards Behind
                <span className="accent-text"> Our Work</span>.
              </>
            }
            intro="We believe good work starts with clarity, moves with purpose and leaves your business in a better position than where we found it."
          />

          <Principles />
        </div>
      </section>

      {/* ---------------- from idea to execution ----------------
          Sits ahead of the work section, which is the order the brief runs in:
          how we think, then how we deliver, then what we delivered. The intro
          that used to be here promised things the brief never does ("no
          discovery phase that quietly bills for three months", a price and a
          date before we begin), so it is replaced by the client's own line. */}
      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="Working together"
            title={
              <>
                From Idea to
                <span className="accent-text"> Execution</span>.
              </>
            }
            intro="A clear four step process designed to turn business challenges into practical solutions and measurable results."
          />
          <div className="mt-14">
            <ProcessSteps steps={engagementSteps} />
          </div>
        </div>
      </section>

      {/* ---------------- our work ----------------
          No eyebrow here: the brief's heading is "Our Work", and an eyebrow
          reading the same two words directly above it is a stutter, not a
          label. */}
      <section className="section border-t border-line" id="work">
        <div className="shell">
          <SectionHeading
            title={
              <>
                Our <span className="accent-text">Work</span>
              </>
            }
            intro="A selection of projects built to solve real business challenges, improve performance and deliver measurable results."
          />

          {/* Real clients and real quotes, supplied by the client. */}
          <Reveal>
            <ClientStorySlider className="mt-14 -mx-2.5" />
          </Reveal>
        </div>
      </section>

      <div className="border-t border-line">
        <FaqSection
          faqs={homeFaqs}
          title={
            <>
              Questions We
              <span className="accent-text"> Get Asked</span>.
            </>
          }
        />
      </div>

      {/* The closing band is the brief's, including both of its links:
          "Free Consultation" to the contact form (CtaBand's primary is wired
          to /contact) and "Work with Us" through to the services page. The
          single-CTA rule applies to the hero only.

          The intro is written for this page. What stood here was the web
          application service page's line, verbatim, which narrowed the home
          page's close to one of the five disciplines it sells. */}
      <CtaBand
        title={
          <>
            Have an idea? Let&rsquo;s build
            <span className="accent-text"> the right thing</span>.
          </>
        }
        intro="Tell us the problem. We’ll tell you which discipline solves it, scope the work and show you what comes next."
        primaryLabel="Free Consultation"
        secondaryHref="/services"
        secondaryLabel="Work with Us"
      />
    </>
  );
}
