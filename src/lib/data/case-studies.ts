import type { Testimonial } from "./services";

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
  summary: string;
  challenge: string;
  approach: { title: string; body: string }[];
  results: { value: string; label: string }[];
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
  /* Two-stop tint used for the abstract cover — stays inside the brand range */
  cover: { from: string; to: string; glyph: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mobile-amusements",
    gallery: [
      { src: "/images/work/mobile-amusements/1.jpg", alt: "A Mobile Amusements ferris wheel set up at an event in South Australia" },
      { src: "/images/work/mobile-amusements/2.jpg", alt: "The Carnival Express ride on site" },
      { src: "/images/work/mobile-amusements/3.jpg", alt: "Tea cup ride at a Mobile Amusements event" },
      { src: "/images/work/mobile-amusements/4.jpg", alt: "The Trippa ride in operation" },
      { src: "/images/work/mobile-amusements/5.jpg", alt: "Jumping castles set up for a family event" },
    ],
    coverImage: {
      src: "/images/work/mobile-amusements.jpg",
      alt: "A Mobile Amusements ferris wheel set up at an event in South Australia",
    },
    client: "Mobile Amusements",
    industry: "Events & Entertainment",
    serviceSlug: "seo",
    serviceName: "Search Engine Optimisation",
    title: "Building a Strong SEO Foundation for an Australian Amusement Business",
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
      "The website is now better structured to compete for relevant amusement rides and event entertainment searches in South Australia, while providing a scalable foundation for ongoing SEO and local search growth — a technically stronger, search focused website built for long term organic growth.",
    stack: ["Google Search Console", "Next.js"],
    cover: { from: "#1d3f66", to: "#4f81bc", glyph: "◈" },
  },

  {
    slug: "southern-clinic",
    client: "Southern Clinic",
    industry: "Healthcare",
    serviceSlug: "seo",
    serviceName: "Search Engine Optimisation",
    title: "Transforming a Healthcare Website with Technical & On Page SEO",
    disciplines: ["Technical SEO", "On Page SEO", "Content SEO", "AI Search SEO"],
    summary:
      "Technical recovery and on page optimisation across a healthcare website — resolving canonical, redirection, indexing and sitemap problems while rebuilding page structure, content and search readiness.",
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
        body: "Structured content around direct answers, conversational queries, entities, topical relevance, FAQs, structured data, E-E-A-T and consistent business information.",
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
      "E-E-A-T and entity optimisation",
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
    client: "Online engineering product store",
    industry: "E-commerce",
    serviceSlug: "seo",
    serviceName: "Search Engine Optimisation",
    title: "Taking an Engineering Product Store to the Top of Search",
    disciplines: ["Technical SEO", "On Page SEO", "Off Page SEO", "AEO"],
    summary:
      "Work across the complete SEO ecosystem — technical, on page, off page and Answer Engine Optimisation — for an online engineering product store competing in highly competitive product and category searches.",
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
    client: "SnowAds",
    industry: "Advertising Technology",
    serviceSlug: "web-application",
    serviceName: "Web Application Development",
    title: "Building a Complete Ad Publishing & Publisher Management Platform",
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
      "SnowAds was delivered as a complete ad management platform connecting publishers, advertising inventory, earnings and administration in one system — a publishing platform designed to simplify ad management for publishers while giving administrators control over the entire operation.",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "MySQL"],
    cover: { from: "#1a3a60", to: "#5b8fc9", glyph: "◆" },
  },

  {
    slug: "vps-api-deployment",
    client: "Web & software client",
    industry: "Web & Software",
    serviceSlug: "web-application",
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
    gallery: [
      { src: "/images/work/matrimonial-platform/1.jpg", alt: "The matrimonial platform hero" },
      { src: "/images/work/matrimonial-platform/2.jpg", alt: "The trust and privacy section of the platform" },
      { src: "/images/work/matrimonial-platform/3.jpg", alt: "The consultation-led matchmaking journey" },
    ],
    coverImage: {
      src: "/images/work/matrimonial-platform.jpg",
      alt: "The matrimonial platform hero, built around trust and a private, consultation-led journey",
    },
    client: "Matrimonial & family services client",
    industry: "Matrimonial & Family Services",
    serviceSlug: "web-application",
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
    client: "Electronics, Mechatronics & IoT Hardware Brand",
    industry: "Electronics, Mechatronics & IoT Hardware",
    serviceSlug: "digital-marketing",
    serviceName: "Digital Marketing",
    year: "Mid 2025 – June 2026",
    title: "From 150 Views a Post to a 500K+ View Audience",
    disciplines: ["Digital Marketing", "Social Media Strategy", "Content Management"],
    summary:
      "End to end social media strategy, content production and account management for a technical hardware brand — building visibility with an engineering audience that does not respond to generic brand content.",
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
      company: "Stuttgart, Germany",
      initials: "C",
    },
    cover: { from: "#17335a", to: "#4a86c2", glyph: "◉" },
  },

  {
    slug: "erp-integration-automation",
    client: "US based business",
    industry: "Business Operations",
    serviceSlug: "automation",
    serviceName: "Automation & AI Workflows",
    title: "Connecting an Existing ERP to Shipping, Communication & Document Automation",
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
      "The solution reduced manual operational work across shipping and document processing while extending the capabilities of the existing ERP — an existing system transformed into a more connected, automated operational platform without replacing the core.",
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
    coverImage: {
      src: "/images/work/ecommerce-product-discovery.jpg",
      alt: "The e-commerce storefront with personalised product recommendations in place",
    },
    client: "E commerce platform",
    industry: "E Commerce",
    serviceSlug: "automation",
    serviceName: "Automation & AI Workflows",
    title: "Turning E Commerce Personalisation Into an Automated Product Discovery Experience",
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
    client: "Tax & accounting client",
    industry: "Tax & Accounting",
    serviceSlug: "automation",
    serviceName: "Automation & AI Workflows",
    title: "Automating Tax Document Processing From Upload to Data Integration",
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
];

export const caseStudyMap = new Map(caseStudies.map((c) => [c.slug, c]));

export function getCaseStudy(slug: string) {
  return caseStudyMap.get(slug);
}

export function getCaseStudyByService(serviceSlug: string) {
  return caseStudies.find((c) => c.serviceSlug === serviceSlug);
}
