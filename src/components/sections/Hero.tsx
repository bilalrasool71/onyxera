import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { MetricStrip } from "@/components/sections/Shared";

/* NOTE: the same four figures are also declared in src/lib/data/agency.ts
   (agencyStats, aboutStats) and src/app/our-portfolio/page.tsx. They are the client's
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
        {/* `items-stretch`, not `items-center`. Centred, the artwork panel came
            out shorter than the copy beside it and left a visible well of empty
            page underneath — the one thing that made the fold read as
            unfinished rather than composed. Stretched, both columns close on
            the same line. */}
        <div className="grid items-stretch gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---------------- copy ---------------- */}
          <div className="flex flex-col justify-center">
            <Reveal immediate>
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

            {/* Deliberately not wrapped in `Reveal`. This is the page's
                Largest Contentful Paint, and Chromium does not credit an
                element that was mid-animation the first time it painted — the
                22px lift on this one heading cost 12 points of mobile
                Performance and 1.1s of LCP. The stagger around it does the
                work; the headline is simply already there. */}
            <h1 className="mt-7 text-[clamp(2.5rem,6.4vw,4.75rem)] text-fg">
              Websites That Work. Software That Scales.
              <span className="accent-text"> Automation That Delivers</span>.
            </h1>

            <Reveal delay={180} immediate>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
                From web applications and website design to SEO, digital marketing,
                automation and cybersecurity, we bring every digital capability
                together to help your business grow.
              </p>
            </Reveal>

            <Reveal delay={270} immediate>
              {/* The brief's site-wide pairing, named button by button: "Start a
                  conversion: brand guideline blue" and "See what we build;
                  white", with the white half landing on the portfolio. */}
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg" withArrow>
                  Start a project
                </ButtonLink>
                <ButtonLink href="/our-portfolio" size="lg" variant="white">
                  See what we build
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* ---------------- visual ----------------
              The artwork already carries the five services as labelled chips
              around the cube, so the old orbit motif — a logo mark ringed by
              the same five service icons — said the identical thing twice and
              collided with it. Per C1 the image wins; the orbit is gone. */}
          <Reveal delay={220} immediate className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            {/* Vector, not the stock JPEG that used to sit here. It scales to
                whatever height the copy column ends up at instead of forcing a
                16:9 box and a well of empty page beneath it, it stays sharp on
                any display, and it carries motion.

                No frame: no card, no border, no fill. Boxed, the outer nodes
                ran straight into the panel edge and the whole thing read as a
                picture pasted onto the page. Unframed it sits *in* the page —
                which is only possible because the drawing is themed, not
                light-on-dark literals. */}
            <div className="relative h-full min-h-[22rem] sm:min-h-[27rem] lg:min-h-0">
              <HeroVisual className="absolute inset-0 size-full" />
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
