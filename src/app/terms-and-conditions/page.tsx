import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { termsSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | OnyxEra Tech" template to run would
     print the company name twice. */
  title: { absolute: "Terms & Conditions | OnyxEra Tech" },
  description:
    "Read the OnyxEra Tech terms and conditions covering website use, digital services, technology projects, professional engagements and client responsibilities.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions | OnyxEra Tech",
    description:
      "Read the OnyxEra Tech terms and conditions covering website use, digital services, technology projects, professional engagements and client responsibilities.",
    url: "/terms-and-conditions",
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
      label="Terms and Conditions"
      title={
        <>
          The terms
          <span className="accent-text"> of using this site</span>.
        </>
      }
      intro="Short, and written to be read. Client projects are governed by the signed proposal for that engagement, not by this page."
      sections={termsSections}
    />
  );
}
