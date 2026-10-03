import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { refundSections } from "@/lib/data/legal";
import { openGraph } from "@/lib/site";

export const metadata: Metadata = {
  /* Title, description and Open Graph copy come from the SEO brief.
     `absolute` because the brief writes each title in full, including the
     brand — leaving the layout's "%s | Onyxera Tech" template to run would
     print the company name twice. */
  title: { absolute: "Returns & Refunds | Onyxera Tech" },
  description:
    "Review the Onyxera Tech returns and refunds policy covering cancellations, deposits, payments, refund eligibility and digital professional services.",
  alternates: { canonical: "/returns-refunds-policy" },
  openGraph: openGraph({
    title: "Returns & Refunds | Onyxera Tech",
    description:
      "Review the Onyxera Tech returns and refunds policy covering cancellations, deposits, payments, refund eligibility and digital professional services.",
    url: "/returns-refunds-policy",
  }),
};

export default function Page() {
  return (
    <LegalPage
      path="/returns-refunds-policy"
      description="Review the Onyxera Tech returns and refunds policy covering cancellations, deposits, payments, refund eligibility and digital professional services."
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
