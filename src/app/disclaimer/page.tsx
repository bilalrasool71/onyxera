import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { disclaimerSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | OnyxEra Tech" template to run would
     print the company name twice. */
  title: { absolute: "Disclaimer | OnyxEra Tech" },
  description:
    "Review the OnyxEra Tech disclaimer covering website information, digital services, marketing results, third party platforms and AI generated information.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | OnyxEra Tech",
    description:
      "Review the OnyxEra Tech disclaimer covering website information, digital services, marketing results, third party platforms and AI generated information.",
    url: "/disclaimer",
    /* Declaring `openGraph` at all replaces the file-based
       opengraph-image convention rather than merging with it, so the card
       has to name the image itself. */
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      label="Disclaimer"
      title={
        <>
          General information,
          <span className="accent-text"> not advice</span>.
        </>
      }
      intro="What you read here is published to be useful, not to be relied on as advice about your own systems."
      sections={disclaimerSections}
    />
  );
}
