import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { graph, pageSchema } from "@/lib/schema";
import { openGraph, site } from "@/lib/site";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | Onyxera Tech" template to run would
     print the company name twice. */
  title: { absolute: "Contact Onyxera Tech" },
  description:
    "Talk to Onyxera Tech about websites, software, CRM, ERP, automation, SEO, digital marketing or cyber security for your business and growth goals.",
  alternates: { canonical: "/contact" },
  openGraph: openGraph({
    title: "Contact Onyxera Tech",
    description:
      "Talk to Onyxera Tech about websites, software, CRM, ERP, automation, SEO, digital marketing or cyber security for your business and growth goals.",
    url: "/contact",
  }),
};

export default function ContactPage() {
  const schema = graph(
    pageSchema({
      path: "/contact",
      name: "Contact",
      description:
        "Tell us what you are building, where you are stuck, or what you want to improve. We will help you find the clearest way forward.",
      type: "ContactPage",
      crumbs: [{ label: "Contact", path: "/contact" }],
    }),
  );

  /* Explicit type: without it the array widens to a union and `href` stops
     existing on the members that omit it. */
  const details: {
    icon: LucideIcon;
    label: string;
    value: string;
    href?: string;
    /* A country's phone, shown under its address so each location reads as
       one block rather than three addresses followed by three numbers. */
    phone?: { value: string; href: string };
  }[] = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    /* Just the country. The "· Operating Location" / "· Mailing Address"
       qualifier is off the page at the client’s request — `kind` stays in
       site.ts, since the legal pages still have to state which is which. */
    ...site.offices.map((o) => ({
      icon: MapPin,
      label: o.label,
      value: `${o.line1}, ${o.line2}`,
      phone: { value: o.phone, href: `tel:${o.phoneHref}` },
    })),
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let&rsquo;s Build
            <span className="accent-text"> Something That Works</span>.
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
          <Reveal delay={90} className="h-full">
            <div className="card h-full p-7 md:p-8">
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
                      {d.phone && (
                        <a
                          href={d.phone.href}
                          className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-fg-body transition-colors duration-300 hover:text-accent"
                        >
                          <Phone aria-hidden="true" className="size-3.5 text-accent" strokeWidth={1.7} />
                          {d.phone.value}
                        </a>
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
