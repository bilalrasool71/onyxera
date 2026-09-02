import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Firebase Hosting serves static files only, so the whole site is
     pre-rendered to `out/`. */
  output: "export",
  experimental: {
    /* The site is entirely static; a single worker keeps the build well
       inside memory limits on constrained machines. */
    cpus: 1,
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
