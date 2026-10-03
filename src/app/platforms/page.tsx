import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Code2,
  LayoutDashboard,
  Megaphone,
  Search,
  ShieldCheck,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand, FaqSection } from "@/components/sections/Shared";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { graph, pageSchema } from "@/lib/schema";
import { openGraph, site } from "@/lib/site";

/* The index the Platforms menu did not have. Every platform page was reachable
   only from the header dropdown or from its own service page, so `/platforms`
   itself answered with a 404 — a parent path with nothing at it, which is both
   a dead end for anyone who trims the URL and a gap in the structure a crawler
   walks.

   The list below mirrors ALL_PLATFORM_LINKS in components/layout/Navbar.tsx.
   It is repeated rather than imported because that file is a client component
   and this page is not; if a label or an href changes there, change it here
   too. The summaries are each page's own meta description, shortened. */
const platforms: {
  href: string;
  name: string;
  summary: string;
  icon: LucideIcon;
  points: string[];
}[] = [
  {
    href: "/platforms/gohighlevel",
    name: "GoHighLevel (GHL)",
    summary:
      "Capture leads, automate follow ups and manage your sales pipeline in one CRM, built around how your business already sells.",
    icon: LayoutDashboard,
    points: ["CRM setup", "Lead capture", "Automated follow up", "Pipelines"],
  },
  {
    href: "/platforms/odoo-erp",
    name: "Odoo Business Systems",
    summary:
      "Unify sales, inventory, accounting and operations in a single system, configured for your business rather than the other way around.",
    icon: Boxes,
    points: ["Sales", "Inventory", "Accounting", "Operations"],
  },
  {
    href: "/platforms/frappe-erpnext",
    name: "Frappe / ERPNext",
    summary:
      "Open source ERP covering CRM, HR, inventory and accounting, with no per user licensing fees and no vendor lock in.",
    icon: Building2,
    points: ["CRM", "HR", "Inventory", "Accounting"],
  },
  {
    href: "/platforms/shopify-development-services",
    name: "Shopify Solutions",
    summary:
      "Stores designed, developed and optimised to look right, load fast and turn visitors into customers.",
    icon: ShoppingBag,
    points: ["Store design", "App integration", "SEO", "Support"],
  },
  {
    href: "/cybersecurity-solutions",
    name: "Cyber Security",
    summary:
      "Prevent threats, safeguard your data and keep operations running, with security work sized to your business rather than an enterprise.",
    icon: ShieldCheck,
    points: ["Assessments", "Monitoring", "Hardening", "Response"],
  },
  {
    href: "/custom-development-solutions",
    name: "Development Solutions",
    summary:
      "Build, integrate and modernise the software your business runs on, from web applications to the systems behind them.",
    icon: Code2,
    points: ["Web apps", "Integrations", "Modernisation", "APIs"],
  },
  {
    href: "/digital-marketing-services",
    name: "Digital Marketing",
    summary:
      "Reach the right audience with campaigns, content and ads that are measured on enquiries rather than impressions.",
    icon: Megaphone,
    points: ["Campaigns", "Content", "Paid ads", "Social"],
  },
  {
    href: "/seo-services",
    name: "SEO Services",
    summary:
      "Be found on Google, AI search and beyond, with work aimed at qualified traffic rather than vanity rankings.",
    icon: Search,
    points: ["Technical SEO", "Content", "Local SEO", "AI search"],
  },
];

/* Four statements about how the eight meet, matching the section the services
   index carries. Written in house, like that page's, and each one says only
   what the platform pages themselves already say. */
const pairings = [
  {
    title: "Start With What You Already Run",
    body: "Most businesses are not starting from nothing. There is a CRM, a spreadsheet and a system somebody set up years ago. We look at what already works before proposing anything that replaces it.",
  },
  {
    title: "One System Beats Five Logins",
    body: "Sales in one place, stock in another and accounts in a third is where the hours go. Odoo, Frappe/ERPNext and GoHighLevel each pull those threads into one system; which one fits depends on how you actually work.",
  },
  {
    title: "The Build And The Platform Are One Job",
    body: "A store, a site or an internal tool is rarely just a build. It has to connect to what runs behind it, and be secure and findable once it is live, which is why development, security and SEO sit on this page too.",
  },
  {
    title: "Traffic Only Counts When It Lands Somewhere",
    body: "Marketing and SEO bring people in; the CRM decides whether that turns into an enquiry you can act on. Treating the two as separate purchases is how leads get lost between them.",
  },
];

/* Questions we are actually asked about this page. The answers stay inside
   what the individual platform pages already commit to — no timelines or
   figures beyond the ones those pages state. */
const platformFaqs = [
  {
    q: "What is the difference between the platforms here and the services page?",
    a: "The services page describes the disciplines we work in. This page covers the specific products we implement, such as Odoo, Frappe/ERPNext, GoHighLevel and Shopify, alongside our approach to development, security, marketing and SEO. Several pages cover the same ground from the two different angles.",
  },
  {
    q: "Do we have to pick one, or can these work together?",
    a: "They are usually combined. A Shopify store, the CRM behind it and the SEO work that feeds it are one system in practice, so the sensible question is which parts you need first rather than which single platform wins.",
  },
  {
    q: "Can you work with a platform we already pay for?",
    a: "Yes. If a system is already in place and doing its job, we would rather configure and connect it than replace it. A replacement should be something the problem forces, not the default suggestion.",
  },
  {
    q: "How do you decide which platform suits our business?",
    a: "By how you operate rather than by feature lists. Where the manual work is, who needs access to what, what has to talk to what, and what you are already paying for. That conversation usually settles it faster than a comparison table.",
  },
  {
    q: "How long does an implementation take?",
    a: "It depends on the platform and the scope, and each platform page states its own range rather than one number for all of them. What moves the timeline most is how clean the existing data is and how quickly decisions can be made on your side.",
  },
  {
    q: "What if none of these is the right answer?",
    a: "Then we will say so. Some problems are process problems, and a new platform makes them more expensive rather than smaller. If that is what we find, you will hear it before any work is quoted.",
  },
];

const TITLE = "Platforms";
const DESCRIPTION =
  "The platforms Onyxera Tech implements and builds on: GoHighLevel, Odoo, Frappe/ERPNext and Shopify, plus our approach to security, development and SEO.";

export const metadata: Metadata = {
  title: { absolute: "Platforms | Onyxera Tech" },
  description: DESCRIPTION,
  alternates: { canonical: "/platforms" },
  openGraph: openGraph({
    title: "Platforms | Onyxera Tech",
    description: DESCRIPTION,
    url: "/platforms",
  }),
};

export default function PlatformsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            pageSchema({
              path: "/platforms",
              name: TITLE,
              description: DESCRIPTION,
              crumbs: [{ label: "Platforms", path: "/platforms" }],
              /* Names every platform page as part of this collection, the same
                 way the services index does, so a crawler reads the eight as
                 one set under this parent rather than eight loose pages. */
              extra: {
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: platforms.map((p, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    name: p.name,
                    url: `${site.url}${p.href}`,
                  })),
                },
              },
            }),
          ),
        }}
      />

      <PageHeader
        eyebrow="Platforms"
        crumbs={[{ label: "Home", href: "/" }, { label: "Platforms" }]}
        title={
          <>
            The Platforms We Build On
            <span className="accent-text"> And Implement</span>
          </>
        }
        intro="Some of these are products we implement and tailor to how you already work. The rest are the disciplines we bring to a build. Either way, the page tells you what it covers, how we approach it and what it changes for your business."
      />

      <section className="pb-4">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-2">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.href} delay={(i % 2) * 70} className="h-full">
                  <Link
                    href={p.href}
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
                      {p.name}
                    </h2>
                    <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg-subtle">
                      {p.summary}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-full border border-line bg-glass px-3 py-1 text-xs text-fg-muted"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Not a link: the whole card is already the anchor, so a
                        second one inside it would nest interactives. This is
                        the label for the arrow in the corner. */}
                    <div className="mt-7 flex items-center gap-1.5 border-t border-line pt-6 font-display text-sm font-medium text-accent">
                      Explore More
                      <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- how they fit together ----------------
          The same section the services index carries under its cards, and for
          the same reason: eight tiles read as eight separate purchases unless
          something says how they meet. */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            title={
              <>
                Two Kinds of Platform,
                <span className="accent-text"> One Set of Decisions</span>
              </>
            }
            intro="Four of these are products we implement and shape around your business. The other four are disciplines we bring to a build. Which one you need depends less on the label and more on where the work is actually stuck."
            introWide
          />

          {/* Borders rather than a gap-px grid over a tinted parent — the same
              note applies here as on the services index. */}
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-line md:grid-cols-2">
            {pairings.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 70}
                className="-mt-px -ml-px border-t border-l border-line bg-bg"
              >
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
          faqs={platformFaqs}
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
        eyebrow="Not sure which one"
        title={
          <>
            Tell us how your business
            <span className="accent-text"> actually runs</span>.
          </>
        }
        intro="You do not need to know whether the answer is a CRM, an ERP or a rebuild. Describe what is slow, manual or breaking, and we will tell you which of these solves it."
        primaryLabel="Get a recommendation"
        secondaryHref="/services"
        secondaryLabel="Compare our services"
      />
    </>
  );
}
