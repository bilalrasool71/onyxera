import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand, FaqSection } from "@/components/sections/Shared";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";
import { numberWord, titleCaseWord } from "@/lib/utils";
import { generalFaqs } from "@/lib/data/agency";

/* Derived, so the count and the list cannot drift from the data again. */
const COUNT = numberWord(services.length);
const NAMES = services.map((s) => s.navLabel);
const NAME_LIST = `${NAMES.slice(0, -1).join(", ")} and ${NAMES.at(-1)}`;

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description: `${titleCaseWord(COUNT)} disciplines under one roof: ${NAME_LIST}.`,
};

const pairings = [
  {
    title: "Design + SEO",
    body: "A redesign planned without search input is how companies lose five years of rankings in a weekend. We plan the URL structure and content model together.",
  },
  {
    title: "Marketing + Design",
    body: "Paid traffic is only as good as the page it lands on. The same team builds the ad and the landing page, so the promise and the payoff match.",
  },
  {
    title: "Web App + Automation",
    body: "The best internal tool is one that eliminates work rather than relocating it. We build the application and the workflows around it as one piece.",
  },
  {
    title: "Any build + Security",
    body: "Security review is folded into development rather than bolted on at the end, which is both cheaper and considerably less alarming.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            {titleCaseWord(COUNT)} disciplines.
            <span className="accent-text"> One accountable team</span>.
          </>
        }
        intro="Each of these is a full practice with its own specialists. Take one, or take several and let them reinforce each other."
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

                    {/* `timeline` is optional (SEO publishes none), so the
                        whole list is gated: a Timeline label with nothing
                        under it read as a rendering fault. The two-column
                        grid went with it — the second cell was removed long
                        ago and the row was sitting half empty on every card. */}
                    {service.timeline && (
                      <dl className="mt-7 border-t border-line pt-6">
                        <div>
                          <dt className="flex items-center gap-1.5 font-label text-[0.625rem] tracking-wide text-fg-faint uppercase">
                            <Clock className="size-3" /> Timeline
                          </dt>
                          <dd className="mt-1.5 font-display text-sm font-medium text-fg-body">
                            {service.timeline}
                          </dd>
                        </div>
                      </dl>
                    )}
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
          <SectionHeading
            eyebrow="Better together"
            title={
              <>
                Where the disciplines
                <span className="accent-text"> compound</span>.
              </>
            }
            intro="Services bought separately tend to quietly undo each other. These are the combinations our clients get the most out of."
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {pairings.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="bg-bg">
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
        intro="That is a completely normal place to start. Describe the problem in plain language and we will tell you which discipline solves it — even if the honest answer is none of them."
        primaryLabel="Book a 30-minute call"
      />
    </>
  );
}
