import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { refundSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | OnyxEra Tech" template to run would
     print the company name twice. */
  title: { absolute: "Returns & Refunds | OnyxEra Tech" },
  description:
    "Review the OnyxEra Tech returns and refunds policy covering cancellations, deposits, payments, refund eligibility and digital professional services.",
  alternates: { canonical: "/returns-refunds-policy" },
  openGraph: {
    title: "Returns & Refunds | OnyxEra Tech",
    description:
      "Review the OnyxEra Tech returns and refunds policy covering cancellations, deposits, payments, refund eligibility and digital professional services.",
    url: "/returns-refunds-policy",
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
      label="Returns and Refunds Policy"
      title={
        <>
          Cancellations
          <span className="accent-text"> and refunds</span>.
        </>
      }
      intro="We provide services rather than goods, so this covers how cancelling a project or a retainer works."
      sections={refundSections}
    />
  );
}
