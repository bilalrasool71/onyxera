import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/data/services";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center py-32">
      <div className="shell text-center">
        <div className="relative mx-auto w-fit">
          <LogoMark className="relative mx-auto h-20 w-20 animate-[float_7s_ease-in-out_infinite]" />
        </div>

        <p className="mt-10 font-label text-[0.6875rem] tracking-[0.24em] text-accent-icon uppercase">
          Error 404
        </p>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] text-fg">
          This page has drifted
          <span className="accent-text"> out of orbit</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-fg-muted">
          The link is broken or the page has moved. Here is everything that
          definitely still exists.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="card card-hover group flex items-center gap-3 p-4 text-left"
              >
                <s.icon className="size-4 shrink-0 text-accent-icon" strokeWidth={1.7} />
                <span className="text-sm text-fg-body transition-colors group-hover:text-accent-strong">
                  {s.navLabel}
                </span>
                <ArrowUpRight className="ml-auto size-3.5 text-fg-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
