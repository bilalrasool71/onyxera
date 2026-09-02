import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { caseStudies } from "@/lib/data/case-studies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/cookie-policy",
    "/returns-refunds-policy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.includes("policy") || path.includes("terms") || path.includes("disclaimer") ? 0.3 : 0.8,
  }));

  const caseStudyRoutes = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));


  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes];
}

/* Required by `output: "export"` — emitted as a file at build time. */
export const dynamic = "force-static";
