import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { disclaimerSections } from "@/lib/data/legal";
import { openGraph } from "@/lib/site";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | Onyxera Tech" template to run would
     print the company name twice. */
  title: { absolute: "Disclaimer | Onyxera Tech" },
  description:
    "Review the Onyxera Tech disclaimer covering website information, digital services, marketing results, third party platforms and AI generated information.",
  alternates: { canonical: "/disclaimer" },
  openGraph: openGraph({
    title: "Disclaimer | Onyxera Tech",
    description:
      "Review the Onyxera Tech disclaimer covering website information, digital services, marketing results, third party platforms and AI generated information.",
    url: "/disclaimer",
  }),
};

export default function Page() {
  return (
    <LegalPage
      path="/disclaimer"
      description="Review the Onyxera Tech disclaimer covering website information, digital services, marketing results, third party platforms and AI generated information."
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
