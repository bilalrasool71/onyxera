import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { termsSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms covering your use of the OnyxEra Tech website. Client engagements are governed by their own signed agreement.",
  alternates: { canonical: "/terms-and-conditions" },
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
