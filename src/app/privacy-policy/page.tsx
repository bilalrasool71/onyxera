import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacySections, privacyUpdated } from "@/lib/data/legal";
import { openGraph } from "@/lib/site";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | Onyxera Tech" template to run would
     print the company name twice. */
  title: { absolute: "Privacy Policy | Onyxera Tech" },
  description:
    "Learn how Onyxera Tech collects, uses, protects and manages personal information across our website, services, forms, communications and digital tools.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: openGraph({
    title: "Privacy Policy | Onyxera Tech",
    description:
      "Learn how Onyxera Tech collects, uses, protects and manages personal information across our website, services, forms, communications and digital tools.",
    url: "/privacy-policy",
  }),
};

export default function Page() {
  return (
    <LegalPage
      path="/privacy-policy"
      description="Learn how Onyxera Tech collects, uses, protects and manages personal information across our website, services, forms, communications and digital tools."
      eyebrow="Privacy"
      label="Privacy Policy"
      title={
        <>
          What we collect,
          <span className="accent-text"> and what we do with it</span>.
        </>
      }
      intro="Onyxera Tech respects your privacy and is committed to protecting the information you share with us. This policy explains what we collect, how we use it, when we may share it, and how we protect it."
      sections={privacySections}
      updated={privacyUpdated}
    />
  );
}
