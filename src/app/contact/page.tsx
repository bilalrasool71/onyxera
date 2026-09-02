import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Tell us what you are building, where you are stuck, or what you want to improve. We will help you find the clearest way forward.",
};

export default function ContactPage() {
  /* Explicit type: without it the array widens to a union and `href` stops
     existing on the members that omit it. */
  const details: {
    icon: LucideIcon;
    label: string;
    value: string;
    href?: string;
  }[] = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...site.offices.map((o) => ({
      icon: MapPin,
      label: `${o.label} — ${o.kind}`,
      value: `${o.line1}, ${o.line2}`,
    })),
    ...site.offices.map((o) => ({
      icon: Phone,
      label: `${o.label} phone`,
      value: o.phone,
      href: `tel:${o.phoneHref}`,
    })),
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let&rsquo;s talk about
            <span className="accent-text"> what you&rsquo;re building</span>.
          </>
        }
        intro="Tell us what you’re building, where you’re stuck, or what you want to improve. We’ll help you find the clearest way forward."
      />

      <section className="pb-20 md:pb-28">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* direct details — the only sidebar card; the page stays deliberately plain */}
          <Reveal delay={90}>
            <div className="card p-7 md:p-8">
              <span className="eyebrow eyebrow-plain">Direct lines</span>
              <ul className="mt-6 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong bg-glass text-accent">
                      <d.icon className="size-4" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-label text-[0.625rem] tracking-[0.14em] text-fg-faint uppercase">
                        {d.label}
                      </span>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1 block text-sm text-fg-body transition-colors duration-300 hover:text-accent"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-sm text-fg-body">{d.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
