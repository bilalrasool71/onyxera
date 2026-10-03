export const site = {
  name: "Onyxera Tech",
  shortName: "Onyxera",
  domain: "onyxeratech.com",
  /* Apex, not www — www 301s here, so a www canonical would point at a
     redirect. Drives canonicals, Open Graph URLs and the sitemap. */
  url: "https://onyxeratech.com",
  tagline: "We build it. Automate it. Grow it.",
  description:
    "Onyxera Tech builds AI automation, web and software development, and digital marketing under one roof. Technology connected to real business growth.",
  email: "info@onyxeratech.com",
  salesEmail: "info@onyxeratech.com",

  /* Primary contact — used wherever a single number is shown. */
  phone: "+61 481 317 161",
  phoneHref: "+61481317161",

  /* WhatsApp for the floating contact button. `whatsappHref` is the number
     as wa.me expects it: country code first, digits only, no plus. */
  whatsapp: "+61 430 496 430",
  whatsappHref: "61430496430",

  /* Two locations. `primary` is the registered mailing address. */
  /* `kind` is mandated wording, not decoration. Australia is the only
     physical operating location; the other two are mailing addresses and must
     never be presented as offices or as registered addresses. */
  offices: [
    {
      label: "Australia",
      kind: "Operating Location",
      primary: true,
      line1: "95 Reserve Parade",
      line2: "Findon SA 5023",
      country: "Australia",
      phone: "+61 481 317 161",
      phoneHref: "+61481317161",
      locality: "Findon",
      region: "SA",
      postalCode: "5023",
      countryCode: "AU",
    },
    {
      label: "United States",
      kind: "Mailing Address",
      primary: false,
      line1: "7901 4th St N #31089",
      line2: "St. Petersburg, FL 33702",
      country: "USA",
      /* International format, same as the Australian and Singapore
         numbers beside it on the contact page. Brackets and dashes are the
         US domestic convention and made this the odd one out in a list of
         three. */
      phone: "+1 321 359 3590",
      phoneHref: "+13213593590",
      locality: "St. Petersburg",
      region: "FL",
      postalCode: "33702",
      countryCode: "US",
    },
    {
      label: "Singapore",
      kind: "Mailing Address",
      primary: false,
      line1: "Blk 658, #12-447, Hougang Ave 8",
      line2: "Singapore 530658",
      country: "Singapore",
      phone: "+65 8133 1443",
      phoneHref: "+6581331443",
      locality: "Singapore",
      region: "",
      postalCode: "530658",
      countryCode: "SG",
    },
  ],

  hours: "Available 24/7",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/onyxeratech/" },
    { label: "Facebook", href: "https://www.facebook.com/Onyxeratech/" },
    { label: "Instagram", href: "https://www.instagram.com/onyxeratechofficial/" },
  ],
} as const;

/** Convenience: the address shown when only one can be. */
export const primaryOffice = site.offices[0];

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Our Portfolio", href: "/our-portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * A complete Open Graph card.
 *
 * Next replaces the whole `openGraph` object when a page declares one — it
 * does not merge with the layout's — so every page that set its own title and
 * URL silently dropped `og:type` and `og:site_name`, and the file-based
 * opengraph-image with them. A crawler reported twenty pages with incomplete
 * cards.
 *
 * Building the object here means a page supplies only what is genuinely its
 * own, and the four constants cannot go missing again.
 */
export function openGraph({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  /** Path with a leading slash; resolved against metadataBase. */
  url: string;
}) {
  return {
    type: "website" as const,
    siteName: site.name,
    title,
    description,
    url,
    images: ["/opengraph-image.png"],
  };
}
