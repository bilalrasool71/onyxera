import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacySections, privacyUpdated } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal information this website collects, why, and what OnyxEra Tech does with it.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Privacy"
      label="Privacy Policy"
      title={
        <>
          What we collect,
          <span className="accent-text"> and what we do with it</span>.
        </>
      }
      intro="OnyxEra Tech respects your privacy and is committed to protecting the information you share with us. This policy explains what we collect, how we use it, when we may share it, and how we protect it."
      sections={privacySections}
      updated={privacyUpdated}
    />
  );
}
