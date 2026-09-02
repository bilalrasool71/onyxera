import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { refundSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Returns and Refunds Policy",
  description: "How cancellations and refunds work on OnyxEra Tech engagements.",
  alternates: { canonical: "/returns-refunds-policy" },
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
