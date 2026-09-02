import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MetricStrip } from "@/components/sections/Shared";

/* NOTE: the same four figures are also declared in src/lib/data/agency.ts
   (agencyStats, aboutStats) and src/app/work/page.tsx. They are the client's
   own supplied numbers, but four copies of them is three too many — they want
   consolidating into one exported list. That change spans files outside this
   one, so it is flagged rather than half-done here. */
const proofPoints = [
  { value: "10+", label: "Years in business" },
  { value: "140+", label: "Projects delivered" },
  { value: "94%", label: "Clients who return" },
  { value: "20+", label: "Specialists on the team" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="shell relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---------------- copy ---------------- */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-glass py-1.5 pr-4 pl-1.5 backdrop-blur-sm">
                <span className="grid size-6 place-items-center rounded-full bg-blue-400/18">
                  <Sparkles className="size-3 text-accent" />
                </span>
                {/* The client's own line, punctuated exactly as the brief
                    gives it — stops between the words, none after "Grow". */}
                <span className="font-label text-[0.6875rem] tracking-[0.14em] text-fg-body uppercase">
                  Build. Automate. Grow
                </span>
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 text-[clamp(2.5rem,6.4vw,4.75rem)] text-fg">
                Websites that work. Software that scales.
                <span className="accent-text"> Automation that delivers</span>.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
                From web applications and website design to SEO, digital marketing,
                automation and cybersecurity, we bring every digital capability
                together to help your business grow.
              </p>
            </Reveal>

            <Reveal delay={270}>
              {/* One CTA only, per the brief. The hero is the one place on the
                  page with a single ask — a second button here competes with it
                  for the same click. The CTA pairing resumes further down, where
                  the reader has enough context for a choice to be useful. */}
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg" withArrow>
                  Book Now
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* ---------------- visual ----------------
              The artwork already carries the five services as labelled chips
              around the cube, so the old orbit motif — a logo mark ringed by
              the same five service icons — said the identical thing twice and
              collided with it. Per C1 the image wins; the orbit is gone. */}
          <Reveal delay={220} className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            {/* Brand halo so the dark frame does not read as a hard rectangle
                dropped onto the light canvas. */}
            {/* Plain <img> with intrinsic width/height: the browser reserves
                the 16:9 box before the file lands, so there is no shift. No
                object-cover — the labels in the artwork are content, and a
                crop would cut them off. */}
            <div className="card relative overflow-hidden">
              <img
                src="/images/home-hero.jpg"
                alt="A glowing blue cube resting on a circuit board, wired to five labelled capabilities: web and software, SEO growth, digital marketing, automation and cyber security."
                width={1600}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
        </div>

        {/* ---------------- proof strip ----------------
            Was a second, hand-rolled copy of `MetricStrip` — built on `.card`
            and `.accent-text`, the two things `.card-stat` was introduced to
            replace (see the comment in Shared.tsx). It also diverged on figure
            size, label tier and padding, so the same 4-up stat pattern read two
            different ways on one site. One component now, one rendering. */}
        <MetricStrip metrics={proofPoints} className="mt-20 md:mt-24" />
      </div>
    </section>
  );
}
