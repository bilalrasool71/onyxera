import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { termsSections } from "@/lib/data/legal";
import { openGraph } from "@/lib/site";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | Onyxera Tech" template to run would
     print the company name twice. */
  title: { absolute: "Terms & Conditions | Onyxera Tech" },
  description:
    "Read the Onyxera Tech terms and conditions covering website use, digital services, technology projects, professional engagements and client responsibilities.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: openGraph({
    title: "Terms & Conditions | Onyxera Tech",
    description:
      "Read the Onyxera Tech terms and conditions covering website use, digital services, technology projects, professional engagements and client responsibilities.",
    url: "/terms-and-conditions",
  }),
};

export default function Page() {
  return (
    <LegalPage
      path="/terms-and-conditions"
      description="Read the Onyxera Tech terms and conditions covering website use, digital services, technology projects, professional engagements and client responsibilities."
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
