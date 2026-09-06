import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacySections, privacyUpdated } from "@/lib/data/legal";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | OnyxEra Tech" template to run would
     print the company name twice. */
  title: { absolute: "Privacy Policy | OnyxEra Tech" },
  description:
    "Learn how OnyxEra Tech collects, uses, protects and manages personal information across our website, services, forms, communications and digital tools.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | OnyxEra Tech",
    description:
      "Learn how OnyxEra Tech collects, uses, protects and manages personal information across our website, services, forms, communications and digital tools.",
    url: "/privacy-policy",
    /* Declaring `openGraph` at all replaces the file-based
       opengraph-image convention rather than merging with it, so the card
       has to name the image itself. */
    images: ["/opengraph-image.png"],
  },
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
