import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { legalUpdated, type LegalSection } from "@/lib/data/legal";
import { graph, pageSchema } from "@/lib/schema";
import { withLinks } from "@/lib/prose";
import { site } from "@/lib/site";

/**
 * Shared shell for the five legal pages.
 *
 * Deliberately *not* a stack of cards. A policy is one continuous document:
 * clauses are separated by vertical rhythm and a hairline rule, not by chrome,
 * so the eye reads straight down a single column at a generous measure.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  label,
  path,
  description,
  updated: updatedISO = legalUpdated,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  sections: LegalSection[];
  label: string;
  /** Canonical path, so the structured breadcrumb can name real URLs. */
  path: string;
  /** The page's meta description, reused as the WebPage description. */
  description: string;
  /** Overrides the shared date for a page revised on its own schedule. */
  updated?: string;
}) {
  const updated = new Date(updatedISO).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* These five pages showed a breadcrumb but published no structured one,
          the only pages on the site where the two disagreed. Built from the
          same `label` and `path` the visible trail uses, so they cannot
          drift apart. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            pageSchema({
              path,
              name: label,
              description,
              crumbs: [{ label, path }],
            }),
          ),
        }}
      />
      <PageHeader
        eyebrow={eyebrow}
        crumbs={[{ label: "Home", href: "/" }, { label }]}
        title={title}
        intro={intro}
      />

      <section className="pb-24 md:pb-32">
        <div className="shell max-w-3xl">
          <Reveal>
            <p className="font-label text-[0.6875rem] tracking-[0.14em] text-fg-faint uppercase">
              Last updated {updated}
            </p>
          </Reveal>

          <div className="mt-10 md:mt-12">
            {sections.map((s, i) => (
              <Reveal
                key={s.heading}
                as="section"
                /* Stagger the opening clauses only. A long policy runs to a
                   dozen-plus sections, and `i * 60` would hold one near the
                   foot at opacity 0 for most of a second after it has already
                   scrolled into view. */
                delay={Math.min(i, 3) * 60}
                /* The rule belongs *between* clauses, so the first one opens
                   flush. Mutually exclusive literals rather than a `first:`
                   override — `cn()` is a plain join with no merge. */
                className={
                  i > 0
                    ? "mt-10 border-t border-line pt-10 md:mt-12 md:pt-12"
                    : undefined
                }
              >
                <h2 className="font-sans text-xl font-semibold text-fg md:text-2xl">
                  {s.heading}
                </h2>

                {s.body.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="mt-5 text-base leading-[1.75] text-fg-body"
                  >
                    {withLinks(para)}
                  </p>
                ))}

                {s.points && (
                  <ul className="mt-6 space-y-3.5">
                    {s.points.map((point) => (
                      <li key={point.slice(0, 40)} className="flex items-start gap-3">
                        <span className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue-400/12 text-accent">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        <span className="text-base leading-[1.75] text-fg-body">
                          {withLinks(point)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-12 border-t border-line pt-8 text-sm leading-relaxed text-fg-faint md:mt-14">
              Questions about this page? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent transition-colors hover:text-accent-strong"
              >
                {site.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
