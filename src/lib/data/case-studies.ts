import type { Testimonial } from "./services";

export type ProofShot = {
  src: string;
  alt: string;
  /** The tool the screenshot came from — Ahrefs, PageSpeed Insights, GTmetrix. */
  source: string;
  /** What the shot actually shows, in words, so the figure survives a small screen. */
  caption: string;
  /** Taller than it is wide — a phone screenshot. Letterboxed rather than
      cropped, since a 16/10 cover box would slice a band out of its middle. */
  portrait?: boolean;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  serviceSlug: string;
  serviceName: string;
  /** Optional: only set where the brief states an engagement period. */
  year?: string;
  /** Optional: most briefs give no engagement lengths. */
  duration?: string;
  title: string;
  /**
   * Title for the browser tab and the search result, where the page's own
   * headline is written for a reader who is already on it.
   *
   * "From 150 Views To A 500K+ View Audience" is the right headline on the
   * page and the wrong one in a result list, where nothing says which company
   * or which discipline it belongs to. Supplied by the SEO brief; the visible
   * headline above it is untouched.
   */
  seoTitle?: string;
  summary: string;
  challenge: string;
  approach: { title: string; body: string }[];
  /** `label` is the line under the figure. Optional: a brief sometimes gives
      only the headline itself, and an invented supporting line would be worse
      than none. */
  results: { value: string; label?: string }[];
  /** The brief's "Key Deliverables" list. */
  deliverables?: string[];
  /** The brief's "Services:" line for the engagement. */
  disciplines?: string[];
  outcome: string;
  /** Optional: only tools the brief actually names for that engagement. */
  stack?: string[];
  /** Optional: only one brief carries a client testimonial. */
  quote?: Testimonial;
  /** Optional screenshot of the delivered work. Replaces the abstract cover
      when present — a real interface beats brand geometry. */
  coverImage?: { src: string; alt: string };
  /** Optional image set. With two or more the card cycles them on hover and
      opens a lightbox on click; with fewer it stays a static cover. Only two
      engagements have a real set, so the card degrades rather than faking one. */
  gallery?: { src: string; alt: string }[];
  /** Measured evidence: the audit, performance and Search Console screenshots
      captured around the engagement. `before` is omitted where the work was not
      a recovery and there is no meaningful "was" to show. Each shot carries its
      own caption because the number in it is the point — a reader should not
      have to squint at the image to get the result. */
  proof?: {
    before?: ProofShot[];
    after?: ProofShot[];
  };
  /** Set to keep an engagement in this file but off the site entirely: it is
      filtered out of `caseStudies`, so it never reaches the portfolio grid,
      generateStaticParams, the "next project" link or the sitemap. Flip it back
      to publish, rather than deleting the entry and losing the copy. */
  hidden?: boolean;
  /* Two-stop tint used for the abstract cover — stays inside the brand range */
  cover: { from: string; to: string; glyph: string };
};

const allCaseStudies: CaseStudy[] = [
  {
    slug: "mobile-amusements",
    seoTitle: "Mobile Amusements Website Case Study",
    proof: {
      before: [
        {
          src: "/images/work/mobile-amusements/proof/before-ahrefs-site-audit.webp",
          alt: "Ahrefs Site Audit overview for mobileamusements.com.au showing a health score of 57",
          source: "Ahrefs Site Audit",
          caption: "Health score 57 (Fair), with 36 errors, 28 warnings and 36 URLs carrying errors.",
        },
        {
          src: "/images/work/mobile-amusements/proof/before-pagespeed-mobile.webp",
          alt: "PageSpeed Insights mobile report scoring 66 for performance",
          source: "PageSpeed Insights, mobile",
          caption: "Performance 66. Accessibility, best practices and SEO were already passing.",
        },
        {
          src: "/images/work/mobile-amusements/proof/before-gtmetrix.webp",
          alt: "GTmetrix report showing grade E and a 3.5 second largest contentful paint",
          source: "GTmetrix",
          caption: "Grade E. Performance 35%, LCP 3.5s, TBT 1.4s, CLS 0.11.",
        },
      ],
      after: [
        {
          src: "/images/work/mobile-amusements/proof/after-ahrefs-site-audit.webp",
          alt: "Ahrefs Site Audit overview showing a health score of 100",
          source: "Ahrefs Site Audit",
          caption: "Health score 100 (Excellent). Errors down to 0, and all 84 crawled URLs error free.",
        },
        {
          src: "/images/work/mobile-amusements/proof/after-pagespeed-desktop.webp",
          alt: "PageSpeed Insights desktop report scoring 100 for performance",
          source: "PageSpeed Insights, desktop",
          caption: "Performance 100. LCP 0.7s, TBT 60ms, CLS 0.",
        },
        {
          src: "/images/work/mobile-amusements/proof/after-pagespeed-mobile.webp",
          alt: "PageSpeed Insights mobile report scoring 98 for performance",
          source: "PageSpeed Insights, mobile",
          caption: "Performance 98, up from 66. LCP 2.5s, TBT 10ms, CLS 0.001.",
        },
        {
          src: "/images/work/mobile-amusements/proof/after-analytics.webp",
          alt: "Google Analytics home showing active users by country and most viewed pages",
          source: "Google Analytics 4",
          caption: "Traffic reporting in place, with the rides and booking pages leading views.",
        },
        {
          src: "/images/work/mobile-amusements/proof/after-business-profile-performance.webp",
          alt: "Google Business Profile performance panel showing 12 interactions",
          source: "Google Business Profile",
          caption: "Business Profile interactions tracked from March to August 2026.",
        },
        {
          src: "/images/work/mobile-amusements/proof/after-business-profile.webp",
          alt: "The Mobile Amusements Google Business Profile as it appears in search",
          source: "Google Business Profile",
          caption: "The local listing live in search, with address, hours and photos in place.",
        },
      ],
    },
    gallery: [
      { src: "/images/work/mobile-amusements/1.webp", alt: "A Mobile Amusements ferris wheel set up at an event in South Australia" },
      { src: "/images/work/mobile-amusements/2.webp", alt: "The Carnival Express ride on site" },
      { src: "/images/work/mobile-amusements/3.webp", alt: "Tea cup ride at a Mobile Amusements event" },
      { src: "/images/work/mobile-amusements/4.webp", alt: "The Trippa ride in operation" },
      { src: "/images/work/mobile-amusements/5.webp", alt: "Jumping castles set up for a family event" },
    ],
    coverImage: {
      src: "/images/work/mobile-amusements.webp",
      alt: "A Mobile Amusements ferris wheel set up at an event in South Australia",
    },
    client: "Mobile Amusements",
    industry: "Events & Entertainment",
    serviceSlug: "seo-and-ai-seo",
    serviceName: "Search Engine Optimisation",
    title: "A Website Built For Mobile Amusements",
    disciplines: ["Technical SEO", "On Page SEO", "Performance SEO"],
    summary:
      "The project created a stronger technical and content foundation for organic search growth, with improved page targeting, crawlability, internal linking and website performance.",
    challenge:
      "Mobile Amusements needed a stronger SEO foundation to improve its visibility for amusement rides, games and event entertainment searches across South Australia. The website required improvements across technical SEO, performance, content structure, keyword targeting and crawlability.",
    approach: [
      {
        title: "Technical SEO",
        body: "Google Search Console, sitemap, robots.txt, canonicals, indexability, redirects and URL structure.",
      },
      {
        title: "On Page SEO",
        body: "Keyword mapping, metadata, H1 to H3 structure, service page optimisation and internal linking.",
      },
      {
        title: "Performance SEO",
        body: "LCP optimisation, image compression, Next.js optimisation, JavaScript, CSS, fonts, caching and mobile performance.",
      },
      {
        title: "Content & Search Readiness",
        body: "Optimisation of the homepage, Rides, Games, Booking, About, Safety, Contact and Gallery pages based on search intent.",
      },
    ],
    results: [
      { value: "Page targeting", label: "Homepage, Rides, Games, Booking and Contact" },
      { value: "Crawlability", label: "Sitemap, robots.txt, canonicals and indexing" },
      { value: "Internal linking", label: "Strategy implemented across the website" },
      { value: "Performance", label: "LCP, images, caching and mobile" },
    ],
    deliverables: [
      "Complete technical SEO audit",
      "Keyword mapping and on page optimisation",
      "Core service page optimisation",
      "Website performance improvements",
      "Image and LCP optimisation",
      "Internal linking strategy",
      "Next.js SEO optimisation",
      "Mobile SEO improvements",
      "Technical QA and indexing validation",
    ],
    outcome:
      "The website is now better structured to compete for relevant amusement rides and event entertainment searches in South Australia, while providing a scalable foundation for ongoing SEO and local search growth. A technically stronger, search focused website built for long term organic growth.",
    stack: ["Google Search Console", "Next.js"],
    cover: { from: "#1d3f66", to: "#4f81bc", glyph: "◈" },
  },

  {
    slug: "southern-clinic",
    seoTitle: "Southern Clinic Website Case Study",
    coverImage: {
      src: "/images/work/southern-clinic.webp",
      alt: "The Southern Clinic homepage, headed \"Comprehensive Healthcare in Clovelly Park\"",
    },
    proof: {
      before: [
        {
          src: "/images/work/southern-clinic/proof/before-search-console-performance.webp",
          alt: "Google Search Console performance report showing 115 clicks over seven days",
          source: "Google Search Console",
          caption: "115 clicks and 1.24K impressions over seven days, average position 10.",
        },
        {
          src: "/images/work/southern-clinic/proof/before-url-not-indexed.webp",
          alt: "Search Console URL inspection reporting that the homepage is not on Google",
          source: "Google Search Console",
          caption: "The homepage was not indexed at all, excluded by a noindex tag.",
        },
        {
          src: "/images/work/southern-clinic/proof/before-sitemap-404.webp",
          alt: "The sitemap_index.xml URL returning a page not found error",
          source: "southernclinic.com.au",
          caption: "The submitted sitemap index returned a 404.",
        },
        {
          src: "/images/work/southern-clinic/proof/before-sitemaps-submitted.webp",
          alt: "Search Console sitemaps list showing two unrelated ecommerce sitemaps",
          source: "Google Search Console",
          caption: "Two unrelated sitemaps were submitted, reporting 1,001 discovered pages each.",
        },
        {
          src: "/images/work/southern-clinic/proof/before-spam-pages-indexed.webp",
          alt: "A site search returning Japanese language spam pages on the clinic domain",
          source: "Google search",
          caption: "The malware left Japanese spam pages indexed on the clinic own domain.",
        },
        {
          src: "/images/work/southern-clinic/proof/before-pagespeed-mobile.webp",
          alt: "PageSpeed Insights mobile report scoring 74 for performance",
          source: "PageSpeed Insights, mobile",
          caption: "Performance 74, SEO 92.",
        },
      ],
      after: [
        {
          src: "/images/work/southern-clinic/proof/after-pagespeed-desktop.webp",
          alt: "PageSpeed Insights desktop report scoring 99 for performance",
          source: "PageSpeed Insights, desktop",
          caption: "Performance 99. LCP 0.6s, TBT 80ms, CLS 0.",
        },
        {
          src: "/images/work/southern-clinic/proof/after-pagespeed-mobile.webp",
          alt: "PageSpeed Insights mobile report scoring 97 for performance",
          source: "PageSpeed Insights, mobile",
          caption: "Performance 97, up from 74, with SEO and best practices at 100.",
        },
        {
          src: "/images/work/southern-clinic/proof/after-gtmetrix.webp",
          alt: "GTmetrix report showing grade A with a 569 millisecond largest contentful paint",
          source: "GTmetrix",
          caption: "Grade A. Performance and structure both 100%, LCP 569ms, CLS 0.",
        },
        {
          src: "/images/work/southern-clinic/proof/after-analytics-realtime.webp",
          alt: "Google Analytics 4 realtime overview for the Southern Clinic property",
          source: "Google Analytics 4",
          caption: "GA4 configured and reporting, with the clinic key pages tracked.",
        },
        {
          src: "/images/work/southern-clinic/proof/after-search-console-insights.webp",
          alt: "Search Console insights showing 380 clicks and 4.55 thousand impressions",
          source: "Search Console Insights",
          caption: "380 clicks and 4.55K impressions over 28 days, from a base of zero.",
        },
        /* The AI-readiness half of the brief, evidenced. The engagement
           structured entities, FAQs and consistent business information around
           direct answers; these two show assistants and Google’s own AI mode
           returning that information and citing the site. */
        {
          src: "/images/work/southern-clinic/proof/after-ai-assistant-listing.webp",
          alt: "An AI assistant answering a query about the clinic with its address, phone, email and booking platforms",
          source: "AI assistant",
          caption:
            "Assistants return the clinic’s address, phone, email and booking platforms correctly.",
        },
        {
          src: "/images/work/southern-clinic/proof/after-google-ai-mode.webp",
          alt: "Google AI Mode describing the clinic and citing southernclinic.com.au among its sources",
          source: "Google AI Mode",
          caption:
            "Google’s AI answer describes the practice and cites southernclinic.com.au as a source.",
        },
      ],
    },
    client: "Southern Clinic",
    industry: "Healthcare",
    serviceSlug: "seo-and-ai-seo",
    serviceName: "Search Engine Optimisation",
    title: "A Better Digital Experience For Southern Clinic",
    disciplines: ["Technical SEO", "On Page SEO", "Content SEO", "AI Search SEO"],
    summary:
      "Technical recovery and on page optimisation across a healthcare website, resolving canonical, redirection, indexing and sitemap problems while rebuilding page structure, content and search readiness.",
    challenge:
      "Southern Clinic's website had several technical and SEO issues affecting its search visibility, including canonical and redirection problems, indexing issues, duplicate H1s, sitemap problems and unexpected Japanese pages appearing in Google Search Console. The website also needed stronger content, page structure and healthcare focused search optimisation.",
    approach: [
      {
        title: "Technical SEO",
        body: "Audited redirects, canonical tags, 404 issues, indexing, sitemap and Google Search Console. The old sitemap was removed and a new sitemap was generated and submitted.",
      },
      {
        title: "Security & Recovery",
        body: "Investigated unexpected Japanese pages appearing in Search Console and worked on resolving the website's malware related issue.",
      },
      {
        title: "On Page SEO",
        body: "Optimised titles, meta descriptions, H1, H2 and H3 structure and SEO focused content across key pages including Home, Services, About, Doctors, Fees, FAQ, Contact and Gallery.",
      },
      {
        title: "Content & Internal Linking",
        body: "Reworked content to make it more natural, useful and human focused, while adding FAQs and contextual internal links across the website.",
      },
      {
        title: "AI & Search Readiness",
        body: "Structured content around direct answers, conversational queries, entities, topical relevance, FAQs, structured data, EEAT and consistent business information.",
      },
    ],
    results: [
      {
        value: "Technical recovery",
        label: "Indexing, sitemap, canonical and Search Console issues addressed",
      },
      {
        value: "On page SEO",
        label: "Key healthcare pages structured around relevant search intent",
      },
      {
        value: "Content architecture",
        label: "FAQs, internal links and answer focused content",
      },
      {
        value: "AI search readiness",
        label: "Entity signals structured for AI driven discovery",
      },
    ],
    deliverables: [
      "Technical SEO audit and recovery",
      "Google Search Console, GA4 and GTM setup",
      "Sitemap and indexing optimisation",
      "Canonical and redirect auditing",
      "On page SEO across key pages",
      "Healthcare content optimisation",
      "FAQ and internal linking strategy",
      "EEAT and entity optimisation",
      "AI and LLM search readiness",
      "Structured data and technical QA",
    ],
    outcome:
      "The project established a stronger technical and content foundation for Southern Clinic's organic search growth.",
    stack: ["Google Search Console", "GA4", "GTM"],
    cover: { from: "#16314f", to: "#3573b6", glyph: "◐" },
  },

  {
    slug: "engineering-product-store",
    hidden: true,
    coverImage: {
      src: "/images/work/engineering-product-store.webp",
      alt: "The Burk.pk storefront, showing the product catalogue and a featured hardware module",
    },
    /* No "before" set: this engagement was a growth programme rather than a
       recovery, so the evidence is what the site reaches, not what it escaped. */
    proof: {
      after: [
        {
          src: "/images/work/engineering-product-store/proof/after-search-console-3-months.webp",
          alt: "Search Console performance over three months showing 1.93 thousand clicks",
          source: "Google Search Console",
          caption: "1.93K clicks and 59.5K impressions over three months, average position 10.1.",
        },
        {
          src: "/images/work/engineering-product-store/proof/after-search-console-7-days.webp",
          alt: "Search Console performance over seven days showing 71 clicks",
          source: "Google Search Console",
          caption: "71 clicks and 2.38K impressions in a single week.",
        },
        {
          src: "/images/work/engineering-product-store/proof/after-pagespeed-desktop.webp",
          alt: "PageSpeed Insights desktop report scoring 99 for performance",
          source: "PageSpeed Insights, desktop",
          caption: "Performance 99, SEO 100. LCP 0.8s, TBT 70ms.",
        },
        {
          src: "/images/work/engineering-product-store/proof/after-pagespeed-mobile.webp",
          alt: "PageSpeed Insights mobile report scoring 90 for performance",
          source: "PageSpeed Insights, mobile",
          caption: "Performance 90 on mobile, with best practices and SEO at 100.",
        },
        {
          src: "/images/work/engineering-product-store/proof/after-ai-answer-ranking.webp",
          alt: "An AI assistant answer naming the store as the top tier engineering supplier",
          source: "Gemini",
          caption: "Answer engines return the store first, rated 9.5/10 for reliability.",
          portrait: true,
        },
      ],
    },
    client: "Online engineering product store",
    industry: "Ecommerce",
    serviceSlug: "seo-and-ai-seo",
    serviceName: "Search Engine Optimisation",
    title: "Taking an Engineering Product Store to the Top of Search",
    disciplines: ["Technical SEO", "On Page SEO", "Off Page SEO", "AEO"],
    summary:
      "Work across the complete SEO ecosystem covering technical, on page, off page and Answer Engine Optimisation, for an online engineering product store competing in highly competitive product and category searches.",
    challenge:
      "An online engineering product store serving the Pakistani market needed stronger organic visibility across highly competitive product and category searches. The goal was to improve the website's technical foundation, strengthen product and category relevance, and make its content easier for both search engines and answer engines to understand.",
    approach: [
      {
        title: "Technical SEO",
        body: "Improved crawlability, indexability, site structure, technical errors, metadata, canonicalisation and overall website health.",
      },
      {
        title: "On Page SEO",
        body: "Optimised product and category pages around relevant search intent, structured content and commercially valuable keywords.",
      },
      {
        title: "Off Page SEO",
        body: "Strengthened the website's authority and relevance through strategic off page SEO activities.",
      },
      {
        title: "AEO",
        body: "Structured content around direct answers, conversational searches, entities, FAQs and information that answer engines can understand and reference.",
      },
    ],
    results: [
      {
        value: "No. 1",
        label: "For “Quality Engineering Product Store in Pakistan”",
      },
      { value: "Top Ranked Across AI Search" },
    ],
    deliverables: [
      "Technical SEO",
      "On Page SEO",
      "Off Page SEO",
      "Product SEO",
      "Category SEO",
      "Keyword strategy",
      "Internal linking",
      "Content optimisation",
      "Answer Engine Optimisation",
      "Entity optimisation",
      "Search intent optimisation",
      "AI search readiness",
    ],
    outcome:
      "From an e commerce website competing for visibility to a leading organic result for a high intent engineering product search in Pakistan. This demonstrated the impact of combining traditional SEO with Answer Engine Optimisation rather than relying on keyword targeting alone.",
    cover: { from: "#24486f", to: "#6a9bd1", glyph: "◇" },
  },

  {
    slug: "snowads",
    seoTitle: "Snowads Website Case Study",
    proof: {
      after: [
        {
          src: "/images/work/snowads/1.webp",
          alt: "The SnowAds landing page, headed Turn Traffic Into Income, beside a live earnings demo panel",
          source: "snowads.net",
          caption:
            "The publisher landing page, with a live demo showing per impression earnings as they accrue.",
        },
        {
          src: "/images/work/snowads/2.webp",
          alt: "Accepted website types and the supported ad formats: banner, popunder, native and video",
          source: "snowads.net",
          caption:
            "Website and ad slot management: accepted site types, and banner, popunder, native and video formats.",
        },
        {
          src: "/images/work/snowads/3.webp",
          alt: "Advertising partner logos and the SnowAds footer with platform, legal and connect links",
          source: "snowads.net",
          caption:
            "Advertising partners and the platform footer, across a responsive multi device experience.",
        },
      ],
    },
    /* Screenshots of the delivered platform, from the brief. Two or more turn
       the card cover into a hover cycle with a lightbox. */
    gallery: [
      { src: "/images/work/snowads/1.webp", alt: "The SnowAds landing page, headed Turn Traffic Into Income, with a live earnings demo" },
      { src: "/images/work/snowads/2.webp", alt: "The accepted site types and supported ad formats: banner, popunder, native and video" },
      { src: "/images/work/snowads/3.webp", alt: "Advertising partner logos and the SnowAds footer with platform, legal and connect links" },
    ],
    coverImage: {
      src: "/images/work/snowads/1.webp",
      alt: "The SnowAds landing page, headed Turn Traffic Into Income, with a live earnings demo",
    },
    client: "SnowAds",
    industry: "Advertising Technology",
    serviceSlug: "development-solutions",
    serviceName: "Web Application Development",
    title: "Building A Better Digital Experience For Snowads",
    disciplines: ["Web Development", "Dashboard Development", "Backend Development", "UI/UX"],
    summary:
      "An ad publishing platform designed and developed from the ground up, combining a responsive frontend with a PHP and MySQL backend so publishers can manage websites, advertising, earnings and payments in one place.",
    challenge:
      "SnowAds needed a modern platform that could help publishers manage their websites, integrate advertising, track earnings and manage payments, while giving administrators complete control over platform operations.",
    approach: [
      {
        title: "Publisher Dashboard",
        body: "Built dedicated sections for earnings, website submissions, payments and support.",
      },
      {
        title: "Admin Platform",
        body: "Developed tools to approve or reject websites, manage ad slots, update earnings, process payment requests and communicate with publishers.",
      },
      {
        title: "Authentication & Security",
        body: "Implemented signup, login, email verification and access controls to ensure only verified publishers could access the platform.",
      },
      {
        title: "Interactive Experience",
        body: "Created a responsive interface with interactive elements, including a custom snow animation with an on and off control.",
      },
    ],
    results: [
      {
        value: "Publisher dashboard",
        label: "Self service earnings, website submissions, payments and support",
      },
      {
        value: "Admin control",
        label: "Website approvals, ad slot management, earnings and payment requests",
      },
      {
        value: "Secure access",
        label: "Signup, login, email verification and publisher access controls",
      },
      {
        value: "Multi device",
        label: "Responsive experience with dynamic frontend and backend integration",
      },
    ],
    deliverables: [
      "Publisher self service dashboard",
      "Centralised admin management",
      "Website and ad slot management",
      "Earnings and payment tracking",
      "Secure publisher authentication",
      "Responsive multi device experience",
      "Dynamic frontend and backend integration",
    ],
    outcome:
      "SnowAds was delivered as a complete ad management platform connecting publishers, advertising inventory, earnings and administration in one system. A publishing platform designed to simplify ad management for publishers while giving administrators control over the entire operation.",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "MySQL"],
    cover: { from: "#1a3a60", to: "#5b8fc9", glyph: "◆" },
  },

  {
    slug: "vps-api-deployment",
    hidden: true,
    client: "Web & software client",
    industry: "Web & Software",
    serviceSlug: "development-solutions",
    serviceName: "Web Application Development",
    title: "Solving Complex VPS, API & Production Deployment Challenges",
    disciplines: ["Laravel", "API Deployment", "Server Configuration", "Debugging"],
    summary:
      "Troubleshooting across both server infrastructure and frontend application to take a blocked Laravel deployment to a working, SSL enabled production environment.",
    challenge:
      "A Laravel application was facing multiple production issues involving Nginx configuration, API routing, PHP processing, CORS errors and a Telegram game that was stuck on its loading screen. The challenge required troubleshooting across both the server infrastructure and frontend application.",
    approach: [
      {
        title: "Server Configuration",
        body: "Investigated Nginx virtual host configurations, API routing, PHP FPM and server response behaviour. After multiple configuration conflicts, the application was successfully migrated to Apache2 with working frontend and Laravel APIs.",
      },
      {
        title: "SSL & Production Setup",
        body: "Configured Apache virtual hosts, SSL on port 443 and HTTP to HTTPS redirection before deploying the application successfully.",
      },
      {
        title: "CORS Debugging",
        body: "Used React debugging tools to trace a persistent cross origin request issue and identified Google Tag Manager as the source of the problematic request.",
      },
      {
        title: "Telegram Game Debugging",
        body: "Simulated the Telegram environment, analysed console logs and identified an outdated /api/api endpoint. The frontend was updated, rebuilt and redeployed with the correct API structure.",
      },
    ],
    results: [
      {
        value: "Working APIs",
        label: "Laravel APIs live with correct frontend and backend communication",
      },
      {
        value: "SSL enabled",
        label: "Apache virtual hosts, port 443 and HTTP to HTTPS redirection",
      },
      {
        value: "CORS resolved",
        label: "Google Tag Manager identified as the source of the conflict",
      },
      {
        value: "Telegram game fixed",
        label: "Outdated endpoint corrected, frontend rebuilt and redeployed",
      },
    ],
    deliverables: [
      "Working Laravel APIs",
      "Correct frontend and backend communication",
      "SSL enabled production environment",
      "Resolved API routing issues",
      "Identified and managed CORS conflicts",
      "Fixed Telegram game loading issue",
      "Updated and redeployed frontend build",
    ],
    outcome:
      "From a production environment blocked by server, API and frontend issues to a fully deployed application with working APIs and a functional Telegram game.",
    stack: [
      "Laravel",
      "PHP",
      "Apache2",
      "Nginx",
      "PHP FPM",
      "React.js",
      "APIs",
      "SSL",
      "Linux",
      "Telegram",
    ],
    cover: { from: "#122b48", to: "#3f76ad", glyph: "◑" },
  },

  {
    slug: "matrimonial-platform",
    hidden: true,
    gallery: [
      { src: "/images/work/matrimonial-platform/1.webp", alt: "The matrimonial platform hero" },
      { src: "/images/work/matrimonial-platform/2.webp", alt: "The trust and privacy section of the platform" },
      { src: "/images/work/matrimonial-platform/3.webp", alt: "The consultation led matchmaking journey" },
    ],
    coverImage: {
      src: "/images/work/matrimonial-platform.webp",
      alt: "The matrimonial platform hero, built around trust and a private, consultation led journey",
    },
    client: "Matrimonial & family services client",
    industry: "Matrimonial & Family Services",
    serviceSlug: "development-solutions",
    serviceName: "Web Application Development",
    title: "Building a Private, Family Focused Matrimonial Web Platform",
    disciplines: ["Web Application Development", "UI/UX", "Responsive Development"],
    summary:
      "A modern web experience built around a private, structured and consultation driven matchmaking journey, rather than another generic profile browsing platform.",
    challenge:
      "The platform needed to provide a trustworthy digital experience for individuals and families looking for suitable marriage matches. The challenge was to combine a modern web experience with a private, structured and consultation driven matchmaking journey, rather than creating another generic profile browsing platform.",
    approach: [
      {
        title: "Modern Web Experience",
        body: "Designed and developed a responsive interface that communicates trust, privacy and professionalism across desktop and mobile.",
      },
      {
        title: "Structured User Journey",
        body: "Built the experience around a clear process, from free registration and personal consultation through match shortlisting and confidential introduction.",
      },
      {
        title: "Trust & Privacy Focus",
        body: "The interface and content architecture were designed around confidentiality, human verification and family involvement, which are central to the platform's positioning.",
      },
      {
        title: "Content Driven Platform",
        body: "Developed dedicated sections for success stories, FAQs, guides and educational content, creating a broader information ecosystem around the core service.",
      },
    ],
    results: [
      {
        value: "Consultation flow",
        label: "Registration and structured matchmaking journey",
      },
      {
        value: "Privacy focused",
        label: "Confidentiality, human verification and family involvement",
      },
      {
        value: "Content ecosystem",
        label: "Success stories, FAQ architecture and blog platform",
      },
      {
        value: "Responsive build",
        label: "Mobile friendly interface across desktop and mobile",
      },
    ],
    deliverables: [
      "Responsive web experience",
      "Consultation driven registration flow",
      "Structured matchmaking journey",
      "Privacy focused user experience",
      "Success stories section",
      "FAQ architecture",
      "Content and blog platform",
      "Contact and consultation functionality",
      "Mobile friendly interface",
    ],
    outcome:
      "A modern web application that transforms a traditionally offline matchmaking process into a structured, private and accessible digital experience.",
    cover: { from: "#203f68", to: "#6390c4", glyph: "❖" },
  },

  {
    slug: "iot-hardware-social-growth",
    seoTitle: "IoT Hardware Social Media Case Study",
    coverImage: {
      src: "/images/work/iot-hardware-social-growth/after-2-views.webp",
      alt: "Instagram Insights showing 572.7K views on the best performing post",
    },
    proof: {
      before: [
        {
          src: "/images/work/iot-hardware-social-growth/before-1-latest-posts.webp",
          alt: "Instagram Insights, latest posts, showing view counts in the hundreds to low thousands",
          source: "Instagram Insights",
          caption: "Latest posts before the engagement, sorted by recency.",
          portrait: true,
        },
        {
          src: "/images/work/iot-hardware-social-growth/before-2-viewers.webp",
          alt: "Instagram Insights, posts sorted by viewers, before the engagement",
          source: "Instagram Insights",
          caption: "The same account sorted by viewers per post.",
          portrait: true,
        },
      ],
      after: [
        {
          src: "/images/work/iot-hardware-social-growth/after-2-views.webp",
          alt: "Instagram Insights over two years, sorted by views, led by 572.7K",
          source: "Instagram Insights",
          caption:
            "572,700 views on the best performing post, and 400K+ on two more.",
          portrait: true,
        },
        {
          src: "/images/work/iot-hardware-social-growth/after-1-saves.webp",
          alt: "Instagram Insights over two years, sorted by saves, led by 12.4K",
          source: "Instagram Insights",
          caption: "12,400 saves on one post.",
          portrait: true,
        },
        {
          src: "/images/work/iot-hardware-social-growth/after-6-top-views.webp",
          alt: "A content grid with per post view counts from 428,171 down to 18,405",
          source: "Instagram Insights",
          caption:
            "The top of the catalogue: 428,171 and 384,750 views, then a long tail in the tens of thousands.",
          portrait: true,
        },
        {
          src: "/images/work/iot-hardware-social-growth/after-5-content-grid-3.webp",
          alt: "A content grid with per post view counts in the ten to fifteen thousand range",
          source: "Instagram Insights",
          caption: "Consistent five figure reach across the technical content.",
          portrait: true,
        },
        {
          src: "/images/work/iot-hardware-social-growth/after-4-content-grid-2.webp",
          alt: "A content grid with per post view counts in the six to nine thousand range",
          source: "Instagram Insights",
          caption: "Regular posts, Reels and Stories holding four figure reach.",
          portrait: true,
        },
        {
          src: "/images/work/iot-hardware-social-growth/after-3-content-grid.webp",
          alt: "A content grid of recent posts with view counts around five to six thousand",
          source: "Instagram Insights",
          caption:
            "Recent output across microcontrollers, PCB design and embedded systems.",
          portrait: true,
        },
      ],
    },
    client: "Electronics, Mechatronics & IoT Hardware Brand",
    industry: "Electronics, Mechatronics & IoT Hardware",
    serviceSlug: "digital-marketing",
    serviceName: "Digital Marketing",
    year: "Mid 2025 to June 2026",
    title: "From 150 Views To A 500K+ View Audience",
    disciplines: ["Digital Marketing", "Social Media Strategy", "Content Management"],
    summary:
      "End to end social media strategy, content production and account management for a technical hardware brand, building visibility with an engineering audience that does not respond to generic brand content.",
    challenge:
      "A technical hardware brand serving engineers, makers and IoT professionals had strong products but limited social visibility. Most Instagram posts were generating only 100 to 200 views, with inconsistent content, limited engagement and no clear strategy around topics, formats or publishing frequency. The challenge was simple: build visibility with a highly technical audience that does not respond to generic brand content.",
    approach: [
      {
        title: "Audience First Strategy",
        body: "Built the content strategy around what engineers and makers actually want to consume, including technical explainers, comparisons, educational content and engineering insights.",
      },
      {
        title: "Consistent Content Production",
        body: "Created and published regular posts, Reels and Stories around microcontrollers, PCB design, embedded systems and hardware fundamentals.",
      },
      {
        title: "End to End Social Management",
        body: "Managed the account across strategy, content, creative production, publishing and ongoing optimisation to create consistent growth rather than depend on one viral post.",
      },
    ],
    results: [
      { value: "572,700", label: "Views on the best performing post" },
      { value: "400K+", label: "Views on two additional posts" },
      { value: "88K+", label: "Views across nine posts" },
      { value: "12,400", label: "Saves on one post" },
    ],
    outcome:
      "The account moved from 100 to 200 views per post to consistently reaching large technical audiences across multiple content formats. We turned an inconsistent social presence into a repeatable content and growth system built around the audience, not the brand.",
    quote: {
      quote:
        "Really impressed with the quality and professionalism of the work. The team was responsive, worked quickly, maintained clear communication, and provided proper reporting. The content and designs were highly relevant to our business, and we were very happy with the social media growth results.",
      name: "Client",
      role: "Electronics & IoT Hardware Brand",
      company: "Stuttgart, Germany, Brand Owner",
      initials: "C",
    },
    cover: { from: "#17335a", to: "#4a86c2", glyph: "◉" },
  },

  {
    slug: "erp-integration-automation",
    seoTitle: "ERP Integration & Automation Case Study",
    coverImage: {
      src: "/images/work/erp-integration-automation/1-architecture.svg",
      alt: "Architecture: the existing PHP ERP connected through a Python integration layer to FedEx and UPS, Microsoft Graph and a custom OCR pipeline",
    },
    /* The brief gives no screenshots for this engagement — it is server side
       work with no interface to show. The diagram is drawn from the brief’s own
       description of the integration, and every label in it is the brief’s. */
    proof: {
      after: [
        {
          src: "/images/work/erp-integration-automation/1-architecture.svg",
          alt: "The PHP ERP on the left, a Python microservices integration layer in the middle, and shipping, Microsoft 365 and OCR services on the right, with extracted data flowing back into the ERP",
          source: "Integration architecture",
          caption:
            "A modular Python layer lets the existing PHP ERP talk to FedEx, UPS, Microsoft Graph and a PDF OCR pipeline through structured JSON, without replacing the core system.",
        },
      ],
    },
    client: "US based business",
    industry: "Business Operations",
    serviceSlug: "automation",
    serviceName: "Automation & AI Workflows",
    title: "Connecting ERP Systems And Business Workflows",
    disciplines: ["Custom Development", "API Integration", "Automation", "OCR"],
    summary:
      "A modular integration layer built with Python microservices, allowing an existing PHP ERP to communicate with external platforms through structured JSON interfaces.",
    challenge:
      "A US based business was operating on a PHP based ERP that needed to connect with multiple external systems without replacing its existing infrastructure. The business needed to automate shipping, communication, document processing and operational workflows while keeping the existing ERP as the central system.",
    approach: [
      {
        title: "Shipping Automation",
        body: "Integrated FedEx and UPS for label generation, pickup scheduling, tracking and address validation.",
      },
      {
        title: "Microsoft 365 Integration",
        body: "Connected Microsoft Graph with Outlook Mail and Calendar for email, attachments and calendar management.",
      },
      {
        title: "Custom OCR",
        body: "Built a PDF based OCR workflow using Tesseract and Poppler to extract structured information from supplier and customer documents and map it directly into the ERP.",
      },
      {
        title: "Reliability & Security",
        body: "Implemented token management, retry logic, idempotency, error handling, secure environment variables and cron safe operations.",
      },
    ],
    results: [
      {
        value: "Order to shipping",
        label: "Automated workflows with FedEx and UPS integration",
      },
      {
        value: "Outlook connected",
        label: "Email, attachments and calendar through Microsoft Graph",
      },
      {
        value: "PDF extraction",
        label: "Automated document data capture mapped into the ERP",
      },
      {
        value: "Modular architecture",
        label: "Ready for future integrations without a system rebuild",
      },
    ],
    deliverables: [
      "Automated order to shipping workflows",
      "FedEx and UPS integration",
      "Automated pickup and tracking processes",
      "Address validation",
      "Outlook email and calendar integration",
      "Automated PDF data extraction",
      "Reduced manual data entry",
      "Fewer operator errors",
      "Modular architecture ready for future integrations",
    ],
    outcome:
      "The solution reduced manual operational work across shipping and document processing while extending the capabilities of the existing ERP. An existing system transformed into a more connected, automated operational platform without replacing the core.",
    stack: [
      "Python",
      "PHP",
      "Microsoft Graph",
      "FedEx API",
      "UPS API",
      "Tesseract OCR",
      "Poppler",
      "PDF.js",
      "Flask",
    ],
    cover: { from: "#1b3c62", to: "#5486bd", glyph: "▣" },
  },

  {
    slug: "ecommerce-product-discovery",
    seoTitle: "Ecommerce Product Discovery Case Study",
    coverImage: {
      src: "/images/work/ecommerce-product-discovery/1-storefront.webp",
      alt: "The Shop.co storefront homepage, headed Find Clothes That Matches Your Style",
    },
    /* The delivered storefront, from the brief. Captions name the feature each
       screen shows in the brief's own wording. No "before" — this was a build,
       not a recovery. */
    proof: {
      after: [
        {
          src: "/images/work/ecommerce-product-discovery/1-storefront.webp",
          alt: "The Shop.co homepage, headed Find Clothes That Matches Your Style, above a row of brand logos",
          source: "Shop.co",
          caption:
            "The storefront homepage, built for a responsive shopping experience across devices.",
        },
        {
          src: "/images/work/ecommerce-product-discovery/2-new-arrivals.webp",
          alt: "A New Arrivals product grid with prices, discounts and star ratings",
          source: "Shop.co",
          caption:
            "Automated product discovery: the New Arrivals grid, populated from product attributes rather than manual merchandising.",
        },
        {
          src: "/images/work/ecommerce-product-discovery/3-browse-by-style.webp",
          alt: "A Browse By Dress Style section with casual, formal, party and gym categories",
          source: "Shop.co",
          caption:
            "Category context feeding the recommendation engine, alongside customer behaviour and click patterns.",
        },
        {
          src: "/images/work/ecommerce-product-discovery/4-reviews.webp",
          alt: "Verified customer reviews with star ratings, above a newsletter sign up band",
          source: "Shop.co",
          caption:
            "Verified reviews and sign up, delivered through the same fast, cached front end.",
        },
        {
          src: "/images/work/ecommerce-product-discovery/5-product-assistant.webp",
          alt: "A product detail page with an assistant panel answering a question about the catalogue",
          source: "Shop.co",
          caption:
            "Real time contextual suggestions: the assistant answers from the catalogue inside the shopping experience.",
        },
      ],
    },
    client: "E commerce platform",
    industry: "E Commerce",
    serviceSlug: "automation",
    serviceName: "Automation & AI Workflows",
    title: "Making Ecommerce Product Discovery Easier",
    disciplines: ["AI Automation", "Smart Recommendations", "UX Optimisation", "Web Development"],
    summary:
      "A behaviour driven recommendation engine wired directly into the shopping experience, introducing personalised product discovery while keeping the store fast, responsive and simple.",
    challenge:
      "The e commerce platform needed a smarter way to help customers discover relevant products without relying entirely on manual merchandising. The goal was to introduce personalised product recommendations while keeping the shopping experience fast, responsive and simple.",
    approach: [
      {
        title: "AI Product Recommendations",
        body: "Built a recommendation engine using customer behaviour, click patterns, category context and product attributes to dynamically suggest relevant products.",
      },
      {
        title: "Smart UX Automation",
        body: "Integrated recommendation logic directly into the shopping experience so product suggestions could adapt to the user's browsing context in real time.",
      },
      {
        title: "Scalable Architecture",
        body: "Designed the recommendation layer to be modular and ML ready, allowing more advanced personalisation to be introduced later.",
      },
      {
        title: "Performance Automation",
        body: "Implemented caching, progressive loading and optimised delivery through Vercel's CDN to maintain a fast experience across devices.",
      },
    ],
    results: [
      { value: "22%", label: "Increase in product engagement from recommendations" },
      { value: "Under 2s", label: "Page load time" },
      { value: "Real time", label: "Contextual suggestions across the shopping experience" },
      { value: "ML ready", label: "Modular recommendation architecture for later personalisation" },
    ],
    deliverables: [
      "Behaviour based product recommendations",
      "Automated product discovery",
      "Real time contextual suggestions",
      "Responsive shopping experience",
      "Faster content delivery",
      "ML ready recommendation architecture",
      "Scalable deployment infrastructure",
    ],
    outcome:
      "An automated product discovery system that uses customer behaviour and product context to deliver more relevant shopping experiences at scale.",
    stack: ["React.js", "Next.js", "TailwindCSS", "AI Recommendation Logic", "Vercel", "GitHub"],
    cover: { from: "#14304f", to: "#4278b4", glyph: "◍" },
  },

  {
    slug: "tax-document-automation",
    seoTitle: "Tax Document Automation Case Study",
    coverImage: {
      src: "/images/work/tax-document-automation/1-workflow.webp",
      alt: "The document automation architecture, from upload through extraction to Drake integration",
    },
    proof: {
      after: [
        {
          src: "/images/work/tax-document-automation/1-workflow.webp",
          alt: "End to end architecture: upload, AI powered document intelligence, extraction engine, organisation, Drake integration, dashboard and monitoring",
          source: "System architecture",
          caption:
            "The end to end workflow, from document upload through classification and extraction to Drake integration and monitoring.",
        },
      ],
    },
    client: "Tax & accounting client",
    industry: "Tax & Accounting",
    serviceSlug: "automation",
    serviceName: "Automation & AI Workflows",
    title: "Automating Tax Document Processing",
    disciplines: ["AI Automation", "OCR", "Document Processing", "API Integration"],
    summary:
      "An intelligent document workflow that replaces manual sorting, form identification and data entry, processing large volumes of financial documents and transferring the extracted data straight into tax software.",
    challenge:
      "Tax professionals spend significant time manually sorting documents, identifying tax forms, entering information and organising client files. The goal was to replace this repetitive workflow with an intelligent automated system capable of processing large volumes of financial documents with greater speed and accuracy.",
    approach: [
      {
        title: "Intelligent Document Processing",
        body: "Built an automated workflow that identifies, classifies and processes tax forms, invoices, receipts and financial documents.",
      },
      {
        title: "AI & OCR Automation",
        body: "Combined machine learning, OCR, natural language processing and handwriting recognition to extract structured information from documents automatically.",
      },
      {
        title: "Automated Organisation",
        body: "Documents are automatically categorised, grouped, renamed, merged or split according to configurable processing rules.",
      },
      {
        title: "Drake Integration",
        body: "Connected the system directly with Drake tax software to automatically transfer extracted data through secure API integration.",
      },
      {
        title: "Quality Control Automation",
        body: "Implemented confidence scoring, anomaly detection, validation, error handling and review workflows to identify documents requiring human attention.",
      },
    ],
    results: [
      { value: "80%", label: "Reduction in document processing time" },
      { value: "99%+", label: "Accuracy rate, according to the project report" },
      { value: "Drake integration", label: "Extracted data transferred through secure API" },
      { value: "Bulk processing", label: "High volume operations with secure audit trails" },
    ],
    deliverables: [
      "Automated document classification",
      "Automated data extraction",
      "Intelligent document organisation",
      "Duplicate detection",
      "Automated file naming",
      "Drake software integration",
      "Real time processing monitoring",
      "Error detection and review workflows",
      "Bulk processing for high volume operations",
      "Secure audit trails",
    ],
    outcome:
      "An end to end document automation system that transforms unstructured tax documents into organised, structured data ready for tax preparation.",
    stack: [
      "Machine Learning",
      "OCR",
      "Tesseract",
      "Azure Cognitive Services",
      "NLP",
      "API Integration",
      "Drake Integration",
    ],
    cover: { from: "#223f6a", to: "#6b9ccf", glyph: "▤" },
  },
  {
    slug: "customer-portal-security-assessment",
    seoTitle: "Customer Portal Security Case Study",
    coverImage: {
      src: "/images/work/customer-portal-security-assessment/2-delivery-flow.svg",
      alt: "Delivery flow: security assessment, vulnerability report, remediation plan and fix verification",
    },
    client: "Professional services client",
    industry: "Professional Services",
    serviceSlug: "cyber-security",
    serviceName: "Cyber Security",
    title: "Securing A Customer Portal Before Growth",
    disciplines: ["Customer Portal Security Assessment"],
    summary:
      "A more secure customer portal with clearer access controls and greater confidence before scaling the platform.",
    challenge:
      "The client was preparing to expand its customer portal, which allowed users to log in, access account information and submit requests. Before expanding the platform, the business needed confidence that existing security controls could withstand real world attacks. The main concerns were weaknesses in authentication, user permission issues, exposed API endpoints, sensitive customer information and outdated third party dependencies.",
    approach: [
      {
        title: "What We Did",
        body: "OnyxEra performed a full security assessment of the portal and supporting APIs.",
      },
      {
        title: "What We Found",
        body: "The assessment identified several security weaknesses that could have allowed unauthorised access to application functionality and sensitive information. Each finding was documented with severity, business impact, technical evidence, reproduction steps and recommended remediation.",
      },
      {
        title: "What We Delivered",
        body: "Security Assessment, Vulnerability Report, Remediation Plan, Fix Verification. The development team used the findings to address the identified vulnerabilities before the platform expansion.",
      },
    ],
    results: [
      { value: "A more secure customer portal" },
      { value: "Clearer access controls" },
      { value: "Greater confidence before scaling" },
    ],
    deliverables: [
      "Tested authentication and session controls",
      "Reviewed role based access",
      "Tested API endpoints",
      "Checked input validation",
      "Assessed sensitive data exposure",
      "Reviewed application dependencies",
      "Tested common OWASP vulnerabilities",
    ],
    outcome:
      "A more secure customer portal with clearer access controls and greater confidence before scaling the platform.",
    proof: {
      after: [
        {
          src: "/images/work/customer-portal-security-assessment/1-test-coverage.svg",
          alt: "The customer portal and its APIs, with the seven areas assessed against them",
          source: "Assessment scope",
          caption: "The portal and its supporting APIs, and the seven areas assessed against them.",
        },
        {
          src: "/images/work/customer-portal-security-assessment/2-delivery-flow.svg",
          alt: "Four stage delivery: security assessment, vulnerability report, remediation plan and fix verification, with the five fields each finding carried",
          source: "Delivery",
          caption:
            "Security Assessment, Vulnerability Report, Remediation Plan, Fix Verification, and what each finding was documented with.",
        },
      ],
    },
    cover: { from: "#14283d", to: "#4f81bc", glyph: "◎" },
  },

  {
    slug: "cloud-security-assessment",
    seoTitle: "Cloud Security Assessment Case Study",
    coverImage: {
      src: "/images/work/cloud-security-assessment/1-improvement-plan.svg",
      alt: "Seven areas reviewed across a cloud environment, feeding a prioritised plan across identity, access, infrastructure, monitoring and remediation",
    },
    client: "SaaS platform client",
    industry: "SaaS",
    serviceSlug: "cyber-security",
    serviceName: "Cyber Security",
    title: "Strengthening Security Across Cloud Infrastructure",
    disciplines: ["Cloud Security Assessment"],
    summary:
      "Stronger access controls, reduced unnecessary exposure and clearer visibility across the client's cloud environment.",
    challenge:
      "The client had moved a growing business platform into the cloud. As the environment expanded, so did the number of users, services, permissions and integrations. Security had become difficult to manage consistently. Key concerns included excessive user permissions, privileged account exposure, misconfigured cloud services, limited security monitoring and inconsistent access policies.",
    approach: [
      {
        title: "What We Did",
        body: "OnyxEra reviewed the client's cloud environment from both infrastructure and identity perspectives.",
      },
      {
        title: "The Solution",
        body: "We created a prioritised security improvement plan covering Identity, Access, Infrastructure, Monitoring and Remediation. High risk issues were addressed first, followed by improvements to access management and ongoing monitoring.",
      },
    ],
    results: [
      { value: "Stronger access controls" },
      { value: "Reduced unnecessary exposure" },
      { value: "Clearer visibility" },
    ],
    deliverables: [
      "Audited user permissions",
      "Reviewed privileged accounts",
      "Assessed cloud security configurations",
      "Examined access policies",
      "Reviewed logging and monitoring",
      "Identified publicly exposed resources",
      "Assessed third party integrations",
    ],
    outcome:
      "Stronger access controls, reduced unnecessary exposure and clearer visibility across the client's cloud environment.",
    proof: {
      after: [
        {
          src: "/images/work/cloud-security-assessment/1-improvement-plan.svg",
          alt: "The seven areas reviewed, above a five stage prioritised plan running identity, access, infrastructure, monitoring and remediation",
          source: "Improvement plan",
          caption:
            "The seven areas reviewed, and the prioritised plan they fed: Identity, Access, Infrastructure, Monitoring, Remediation.",
        },
      ],
    },
    cover: { from: "#16314f", to: "#3573b6", glyph: "◍" },
  },

  {
    slug: "web-application-penetration-testing",
    seoTitle: "Web Application Penetration Testing Case Study",
    coverImage: {
      src: "/images/work/web-application-penetration-testing/1-coverage-to-impact.svg",
      alt: "Ten penetration test areas mapped to business impact, and the seven items delivered",
    },
    client: "Business services client",
    industry: "Business Services",
    serviceSlug: "cyber-security",
    serviceName: "Cyber Security",
    title: "Finding Vulnerabilities Before They Become A Business Risk",
    disciplines: ["Web Application Penetration Testing"],
    summary:
      "The client addressed the identified weaknesses and gained a clearer understanding of its application's real security exposure before continuing further development.",
    challenge:
      "The client relied on a custom business application to manage internal operations and customer information. The application had grown significantly over time and included multiple user roles, APIs and third party integrations. The business needed to know: if someone targeted this application today, what could they actually access?",
    approach: [
      {
        title: "What We Did",
        body: "OnyxEra carried out an application penetration test covering authentication, authorisation, user roles, API endpoints, session management, input validation, file handling, business logic, sensitive data exposure and third party integrations.",
      },
      {
        title: "What We Found",
        body: "Testing uncovered vulnerabilities across application logic and access controls that could create unnecessary exposure if left unresolved. Rather than simply providing a vulnerability list, we mapped each issue to its potential business impact.",
      },
    ],
    results: [
      { value: "Weaknesses addressed" },
      { value: "Real security exposure understood" },
    ],
    deliverables: [
      "Penetration testing report",
      "Technical vulnerability findings",
      "Executive risk summary",
      "Reproduction evidence",
      "Remediation recommendations",
      "Prioritised fix plan",
      "Retesting after remediation",
    ],
    outcome:
      "The client addressed the identified weaknesses and gained a clearer understanding of its application's real security exposure before continuing further development.",
    proof: {
      after: [
        {
          src: "/images/work/web-application-penetration-testing/1-coverage-to-impact.svg",
          alt: "Ten test areas on the left, a business impact mapping step in the middle, and seven deliverables on the right",
          source: "Test coverage",
          caption:
            "The ten areas covered, each issue mapped to its potential business impact, and the seven items delivered.",
        },
      ],
    },
    cover: { from: "#1d334c", to: "#6a9bd1", glyph: "◈" },
  },

];

/* The published list. Everything downstream — the portfolio grid, the sitemap,
   generateStaticParams, getCaseStudyByService — reads this, so hiding an entry
   removes it from all of them at once. */
export const caseStudies: CaseStudy[] = allCaseStudies.filter((c) => !c.hidden);

export const caseStudyMap = new Map(caseStudies.map((c) => [c.slug, c]));

export function getCaseStudy(slug: string) {
  return caseStudyMap.get(slug);
}

/* Every published engagement in a discipline, in file order. Three services
   have more than one, so the service page renders the whole list rather than
   the single `.find()` result it used to show — two of the three SEO studies
   were sitting in this file unreachable from /services/seo. */
export function getCaseStudiesByService(serviceSlug: string) {
  return caseStudies.filter((c) => c.serviceSlug === serviceSlug);
}

export function getCaseStudyByService(serviceSlug: string) {
  return caseStudies.find((c) => c.serviceSlug === serviceSlug);
}
