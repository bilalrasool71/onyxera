import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Real brand marks in their own colours: Simple Icons (CC0) for all but Ahrefs,
 * which comes from svgl. Saved under public/tools.
 *
 * Each mark rides on a light tile. Nine of these brands ship a black or
 * near-black logo (Next.js, Temporal, OWASP, AWS at #232F3E, Angular), which
 * would vanish straight into the navy this band sits on, and every brand colour
 * is drawn to work on white anyway. The tile is identical in both themes, so a
 * logo never changes weight when the site does.
 *
 * This map is also the gate on what the band shows: a tool with no entry is
 * dropped rather than given a stand-in shape. Nine of them (Screaming Frog,
 * Schema.org, Google Trends, Peec AI, Nmap, Semgrep, Wazuh, Klaviyo, Segment)
 * have no open mark in either Simple Icons or svgl, and a wall of real logos
 * interrupted by drawn icons read as a mistake rather than a set.
 */
const TOOL_LOGOS: Record<string, string> = {
  /* SEO — research and audit */
  "Ahrefs": "ahrefs",
  "Semrush": "semrush",
  "Similarweb": "similarweb",
  "Lighthouse": "lighthouse",
  /* SEO — Google's own surfaces */
  "Google Search Console": "googlesearchconsole",
  "Google Analytics 4": "googleanalytics",
  "GA4": "googleanalytics",
  "Looker Studio": "looker",
  "Google Tag Manager": "googletagmanager",
  "Google Business Profile": "googlemybusiness",
  "Google Maps": "googlemaps",
  "PageSpeed Insights": "pagespeedinsights",
  "Chrome DevTools": "googlechrome",
  /* SEO — other search and analytics */
  "Bing Webmaster Tools": "bing",
  "Matomo": "matomo",
  "Mixpanel": "mixpanel",
  "YouTube": "youtube",
  /* SEO — platforms and delivery */
  "WordPress": "wordpress",
  "Yoast SEO": "yoast",
  "WooCommerce": "woocommerce",
  "Webflow": "webflow",
  "Contentful": "contentful",
  "Cloudflare": "cloudflare",
  /* SEO — AI search visibility */
  "ChatGPT": "openai",
  "Claude": "claude",
  "Perplexity": "perplexity",
  "Google Gemini": "googlegemini",

  /* Automation & AI */
  "n8n": "n8n",
  "Make": "make",
  "Zapier": "zapier",
  "Python": "python",
  "Node.js": "nodedotjs",
  "Airtable": "airtable",
  "Retool": "retool",
  "Claude API": "claude",
  "Temporal": "temporal",
  "AWS Lambda": "awslambda",

  /* Cyber security */
  "Burp Suite": "burpsuite",
  "OWASP ZAP": "owasp",
  "Snyk": "snyk",
  "Terraform": "terraform",
  "Vault": "vault",
  "AWS Security Hub": "amazonwebservices",

  /* Development solutions */
  "React": "react",
  "Next.js": "nextdotjs",
  "TypeScript": "typescript",
  "Salesforce": "salesforce",
  "HubSpot": "hubspot",
  "Microsoft Dynamics 365": "dynamics365",
  "SAP": "sap",
  "PostgreSQL": "postgresql",
  "AWS": "amazonwebservices",
  "Shopify": "shopify",
  "NET": "dotnet",
  "REST APIs": "openapiinitiative",
  "GraphQL": "graphql",
  "Angular": "angular",
  "Docker": "docker",
  "Flutter": "flutter",

  /* Digital marketing */
  "Google Ads": "googleads",
  "Meta Ads": "meta",
  "LinkedIn Ads": "linkedin",
  "Server Side GTM": "googletagmanager",
  "Hotjar": "hotjar",

  /* Development solutions */
  "Vue.js": "vuedotjs",
  "Laravel": "laravel",
  "Django": "django",
  "MongoDB": "mongodb",
  "MySQL": "mysql",
  "Redis": "redis",
  "Kubernetes": "kubernetes",
  "GitHub": "github",
  "Tailwind CSS": "tailwindcss",
  "Prisma": "prisma",
  "Vercel": "vercel",
  "Firebase": "firebase",
  "Stripe": "stripe",

  /* Automation */
  "ChatGPT API": "openai",
  "LangChain": "langchain",
  "Hugging Face": "huggingface",
  "Slack": "slack",
  "Notion": "notion",
  "Google Sheets": "googlesheets",
  "Twilio": "twilio",
  "SendGrid": "sendgrid",
  "Postman": "postman",
  "GitHub Actions": "githubactions",
  "Supabase": "supabase",
  "Zendesk": "zendesk",
  "Intercom": "intercom",
  "Trello": "trello",

  /* Cyber security */
  "Wireshark": "wireshark",
  "Kali Linux": "kalilinux",
  "Metasploit": "metasploit",
  "Splunk": "splunk",
  "Elastic": "elastic",
  "Okta": "okta",
  "Auth0": "auth0",
  "1Password": "1password",
  "Bitwarden": "bitwarden",
  "Let's Encrypt": "letsencrypt",
  "SonarQube": "sonarqube",
  "Trivy": "trivy",
  "GitLab": "gitlab",
  "Ubuntu": "ubuntu",
  "OpenSSL": "openssl",
  "Fortinet": "fortinet",
  "Cisco": "cisco",
  "Palo Alto Networks": "paloaltonetworks",
  "Qualys": "qualys",
  "Nginx": "nginx",

  /* Digital marketing */
  "TikTok": "tiktok",
  "Instagram": "instagram",
  "Facebook": "facebook",
  "Pinterest": "pinterest",
  "Snapchat": "snapchat",
  "Reddit": "reddit",
  "X": "x",
  "WhatsApp": "whatsapp",
  "Mailchimp": "mailchimp",
  "Brevo": "brevo",
  "Buffer": "buffer",
  "Hootsuite": "hootsuite",
  "Canva": "canva",
  "Figma": "figma",
  "Bing Ads": "bing",
};

/** One mark is 3.5rem wide plus 1.5rem of margin either side. */
const TILE_PX = 104;
/** The shell caps the strip at 75rem of inner width, so a copy this wide
 *  always overruns it and the -50% seam never opens a gap. */
const MIN_TRACK_PX = 1400;

/**
 * Marks whose brand colour is too dark to read on the navy this band sits on
 * once the tile behind them is gone — pure black (Next.js, Temporal, OWASP),
 * near-black (Angular, AWS at #232F3E, Retool) and the deep blues and purples.
 * Each ships a second, white cut beside it and CSS picks one, the same way the
 * site's own lockup does. Everything else keeps its brand colour in both themes.
 */
const NEEDS_LIGHT_CUT = new Set([
  "1password",
  "amazonwebservices",
  "angular",
  "bitwarden",
  "buffer",
  "django",
  "dotnet",
  "elastic",
  "flutter",
  "github",
  "letsencrypt",
  "linkedin",
  "make",
  "matomo",
  "nextdotjs",
  "notion",
  "openai",
  "openssl",
  "owasp",
  "pinterest",
  "prisma",
  "retool",
  "similarweb",
  "slack",
  "snyk",
  "splunk",
  "temporal",
  "tiktok",
  "trello",
  "trivy",
  "vercel",
  "x",
  "yoast",
  "zendesk",
]);

function StackChip({ tool, logo }: { tool: string; logo: string }) {
  const swaps = NEEDS_LIGHT_CUT.has(logo);

  /* No name on the face of the chip, so it has to live on the image: a wall of
     unlabelled marks is silent to a screen reader otherwise. Only one of the
     two cuts is ever displayed, so only one carries the alt text. */
  const common = {
    width: 96,
    height: 96,
    loading: "lazy" as const,
    decoding: "async" as const,
    className: "h-full w-full object-contain",
  };

  return (
    <span
      title={tool}
      className="mx-4 grid size-11 shrink-0 place-items-center transition-transform duration-300 hover:scale-110 md:mx-6 md:size-14"
    >
      {swaps ? (
        <>
          <img
            {...common}
            src={`/tools/${logo}-light.svg`}
            alt={`${tool} logo`}
            className={`${common.className} logo-on-dark`}
          />
          <img
            {...common}
            src={`/tools/${logo}.svg`}
            alt={`${tool} logo`}
            aria-hidden="true"
            className={`${common.className} logo-on-light`}
          />
        </>
      ) : (
        <img {...common} src={`/tools/${logo}.svg`} alt={`${tool} logo`} />
      )}
    </span>
  );
}

/**
 * Tools band: two tracks running in opposite directions, both held to the same
 * column as the heading above them. The list is dealt by alternate index rather
 * than cut in half, so each row carries a mix instead of the first half sitting
 * above the second.
 *
 * A row is repeated until one copy is wider than that column. Marquee then
 * prints the whole track twice and slides it by exactly -50%, so the seam never
 * opens a gap — which it would otherwise, since the shortest stack here leaves
 * a row of only three tiles.
 */
export function StackBand({
  stack,
  intro,
  label,
}: {
  stack: readonly string[];
  intro?: string;
  /** Accessible name for the band. The brief for a page may specify one;
      pages that pass nothing keep the band exactly as it was. */
  label?: string;
}) {
  const logos = stack
    .map((tool) => ({ tool, logo: TOOL_LOGOS[tool] }))
    .filter((t): t is { tool: string; logo: string } => Boolean(t.logo));

  if (logos.length === 0) return null;

  const rows = [
    logos.filter((_, i) => i % 2 === 0),
    logos.filter((_, i) => i % 2 === 1),
  ].filter((row) => row.length > 0);

  return (
    <section
      className="section overflow-hidden border-t border-line"
      aria-label={label}
    >
      <div className="shell">
        <SectionHeading
          title={
            <>
              Tools <span className="accent-text">&amp; stack</span>
            </>
          }
          intro={intro}
        />

        <div className="mt-9 space-y-3 md:mt-11 md:space-y-4">
          {rows.map((row, rowIndex) => {
            const repeats = Math.max(
              2,
              Math.ceil(MIN_TRACK_PX / (row.length * TILE_PX)),
            );
            const filled = Array.from({ length: repeats }, () => row).flat();

            return (
              <Marquee
                key={rowIndex}
                duration="58s"
                reverse={rowIndex === 1}
                className="py-1"
              >
                <ul className="flex items-center">
                  {filled.map(({ tool, logo }, i) => (
                    <li key={`${tool}-${i}`} className="flex">
                      <StackChip tool={tool} logo={logo} />
                    </li>
                  ))}
                </ul>
              </Marquee>
            );
          })}
        </div>
      </div>
    </section>
  );
}
