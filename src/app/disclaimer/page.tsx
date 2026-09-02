import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { disclaimerSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Everything on this site is general information rather than advice, and outcomes shown are specific to the clients they happened for.",
  alternates: { canonical: "/disclaimer" },
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
