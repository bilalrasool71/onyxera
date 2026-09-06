import { site } from "@/lib/site";

/*
 * Structured data helpers.
 *
 * One rule runs through all of this: the markup describes what is already on
 * the page, and nothing else. No Review, no AggregateRating, no awards, no
 * invented offices — the brief that asked for this work is explicit that trust
 * signals must never be manufactured, and a schema block is the easiest place
 * in a codebase to quietly do exactly that.
 *
 * Everything hangs off two stable `@id`s. Emitting the organisation once, at
 * the root, and referencing it by id from every page is what makes Google read
 * the site as one entity rather than as thirty pages that each happen to
 * mention the same company.
 */

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

const abs = (path: string) => new URL(path, site.url).toString();

/**
 * The company. Emitted once, in the root layout.
 *
 * `Organization`, not `ProfessionalService`.
 *
 * ProfessionalService is a LocalBusiness, and a LocalBusiness means premises a
 * customer can walk into. Three postal addresses hang off this node and only
 * the Australian one is an operating location — the other two are mailing
 * addresses that, by the client's own standing instruction, must never be
 * presented as offices. Declaring the company a local business with three
 * addresses says the opposite.
 *
 * It is also the type the SEO brief actually asked for, and it drops Google's
 * request for `priceRange` — a LocalBusiness field this business does not
 * publish and which could not be filled without inventing a number.
 *
 * If the Australian location later needs local search treatment, the honest
 * way is a separate LocalBusiness node for that one address, tied to this one
 * through parentOrganization, and only once there is a Google Business Profile
 * for it to match.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: abs("/logo-white.webp"),
    image: abs("/opengraph-image.png"),
    email: site.email,
    telephone: site.phone,
    /* Links the site to the verified social profiles. Google reads this when
       associating a Business Profile with a website. */
    sameAs: site.socials.map((s) => s.href),
    /* Both locations, so search engines see the real footprint. */
    address: site.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.line1,
      addressLocality: o.locality,
      ...(o.region ? { addressRegion: o.region } : {}),
      postalCode: o.postalCode,
      addressCountry: o.countryCode,
    })),
    /* One point per number, each with its own @id and named for the country
       it answers in, so "OnyxEra Tech Australia contact" resolves to the
       Australian line rather than to whichever number happened to be listed
       first — and so the three are addressable as distinct entities that
       nonetheless belong to this one organisation.

       `areaServed` is a Country node rather than a bare "AU": the two-letter
       code is unambiguous to a parser but the name is what a query is written
       in, and schema.org accepts either.

       The numbers are the display strings from site.ts, not a re-formatted
       copy — the visible page and this markup have to agree exactly, and the
       surest way to guarantee that is for both to read the same field. */
    contactPoint: site.offices.map((o) => ({
      "@type": "ContactPoint",
      "@id": `${site.url}/#contact-${o.countryCode.toLowerCase()}`,
      name: `${o.label} enquiries`,
      contactType: "customer service",
      telephone: o.phone,
      email: site.email,
      areaServed: { "@type": "Country", name: o.label, identifier: o.countryCode },
      availableLanguage: "en",
    })),
  };
}

/** The site as a whole. Homepage only — it is a property of the domain. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

type PageArgs = {
  /** Path with a leading slash. "/" for the home page. */
  path: string;
  name: string;
  description: string;
  /** AboutPage, ContactPage, CollectionPage … defaults to WebPage. */
  type?: string;
  /** Trail for the BreadcrumbList, excluding Home, which is added here. */
  crumbs?: { label: string; path: string }[];
  /** Anything else this page needs — `about`, `mainEntity`, and so on. */
  extra?: Record<string, unknown>;
};

/**
 * A page, its breadcrumb trail, and its link back to the organisation.
 *
 * The breadcrumb it emits must match the one the reader can see. They are
 * generated from the same trail for that reason: a structured breadcrumb that
 * disagrees with the visible navigation is worse than none at all.
 */
export function pageSchema({ path, name, description, type = "WebPage", crumbs, extra }: PageArgs) {
  const url = abs(path);
  const page: Record<string, unknown> = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
    ...extra,
  };

  if (!crumbs) return [page];

  const trail = [{ label: "Home", path: "/" }, ...crumbs];
  return [
    page,
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: abs(c.path),
      })),
    },
  ];
}

/** Wraps nodes in the `@graph` envelope the crawler expects. */
export function graph(nodes: unknown[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
