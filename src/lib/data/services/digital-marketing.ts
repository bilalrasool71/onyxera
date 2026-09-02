import type { Service } from "./types";
import { LineChart, Megaphone, MousePointerClick, Search, Target, Users } from "lucide-react";

export const digital_marketing: Service = /* ------------------------------------------------------------------ */
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    navLabel: "Digital Marketing",
    icon: Megaphone,
    tagline: "From clicks to customers",
    summary:
      "Paid ads, social media and conversion strategies built to turn attention into qualified leads and measurable business growth.",
    hero: {
      eyebrow: "Digital Marketing",
      headline: "Digital marketing that turns",
      highlight: "attention into growth.",
      sub:
        "We connect your ads, content, landing pages and tracking to turn marketing spend into qualified leads and measurable growth.",
    },
    /* The only three figures the brief supplies. They render once, here —
       `heroStats` would put the same numbers on the page a second time. */
    metrics: [
      { value: "2×", label: "Qualified leads from targeted campaigns" },
      { value: "20%+", label: "Improvement in conversion rates" },
      { value: "30%", label: "Reduction in wasted ad spend" },
    ],
    capabilities: [
      { icon: Search, title: "Google Ads & Search", body: "Reach high intent customers when they are actively searching for your products or services." },
      { icon: Megaphone, title: "Meta Ads & Social", body: "Build targeted campaigns across Facebook and Instagram that generate attention, traffic and leads." },
      { icon: Target, title: "Performance Marketing", body: "Connect campaigns, audiences and budgets around measurable business outcomes." },
      { icon: Users, title: "Social Media Marketing", body: "Build a consistent social presence that keeps your brand visible, relevant and trusted." },
      { icon: MousePointerClick, title: "Conversion Rate Optimisation", body: "Turn more website visitors into enquiries and customers through better pages and user journeys." },
      { icon: LineChart, title: "Analytics & Attribution", body: "Track where your leads come from and understand which marketing activities drive real results." },
    ],
    deliverables: [
      "Channel & budget strategy",
      "Full tracking implementation",
      "Campaign build & launch",
      "Landing page system",
      "Creative testing matrix",
      "Lifecycle email flows",
      "Weekly optimisation log",
      "Executive revenue dashboard",
    ],
    process: [
      { title: "Audit & Understand", body: "Understand your audience, competitors, current performance and growth gaps.", duration: "Step 01" },
      { title: "Strategy & Build", body: "Define the channels, messaging, campaigns and budget around clear business goals.", duration: "Step 02" },
      { title: "Launch & Optimise", body: "Launch campaigns, test what works and continuously improve performance.", duration: "Step 03" },
      { title: "Scale & Grow", body: "Increase investment in winning campaigns and turn performance into sustainable growth.", duration: "Step 04" },
    ],
    stack: [
      "Google Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "GA4",
      "Server-Side GTM",
      "HubSpot",
      "Klaviyo",
      "Segment",
      "Looker Studio",
      "Hotjar",
    ],
    faqs: [
      { q: "How much should I spend on digital marketing?", a: "There is no fixed number. We recommend a budget based on your goals, market, competition and the results we need to achieve." },
      { q: "How will I know if my marketing is working?", a: "You will see clear reporting on leads, conversions, costs and revenue, not just clicks and impressions." },
      { q: "Can you work with my existing marketing team?", a: "Yes. We can work alongside your team, fill the gaps and handle specific channels or the complete marketing process." },
      { q: "Do I need to spend more to get better results?", a: "Not necessarily. We first identify what is working, remove wasted spend and improve performance before recommending a larger budget." },
      { q: "Can you manage Google and Meta ads for my business?", a: "Yes. We can plan, build, manage and optimise campaigns across Google, Meta and other relevant channels." },
      { q: "What happens if my campaigns are not generating leads?", a: "We identify where the problem is, whether it is the audience, offer, creative, landing page or campaign, then focus on fixing the weakest point." },
    ],
    seo: {
      title: "Digital Marketing Services & Performance Marketing",
      description:
        "Grow your business with digital marketing, Google Ads, Meta Ads, social media and performance marketing focused on qualified leads and revenue.",
      ogTitle: "Digital Marketing Built To Drive Business Growth",
      ogDescription:
        "Drive qualified traffic, generate leads and improve conversions with digital marketing, paid advertising, social media and performance marketing.",
      /* Primary keyword first, then the brief's secondary list in its order. */
      keywords: [
        "digital marketing",
        "digital marketing services", "digital marketing agency", "digital marketing strategy",
        "performance marketing", "online marketing services", "Google Ads management",
        "Google advertising", "Meta Ads management", "Facebook advertising",
        "Instagram advertising", "paid search marketing", "paid social advertising",
        "PPC management", "social media marketing", "lead generation",
        "conversion rate optimisation", "customer acquisition", "digital advertising",
        "campaign management", "marketing analytics", "marketing automation",
        "landing page optimisation", "paid media strategy", "ecommerce marketing",
        "B2B digital marketing",
      ],
      heroAlt: "Digital marketing services by OnyxEra Tech",
    },
    problem: {
      title: "Your marketing is spending. But is it selling?",
      sub: "When campaigns, landing pages and tracking work separately, budgets get wasted and it becomes difficult to see what is actually driving leads and revenue.",
      /* The brief lists one set of four symptoms and the service page renders
         both this block and `painPoints`. The four live in `painPoints`, which
         is required and drives a whole column; repeating them here would print
         the same list twice on one page. This block keeps the statement and
         the solution the brief pairs with it. */
      points: [],
      solution:
        "We turn marketing spend into qualified leads, better conversions and measurable revenue.",
    },
    cta: {
      title: "Ready to turn your marketing into growth?",
      body: "Tell us what is not working. We will identify the gaps, build a clear plan to generate better leads and measurable results.",
    },
    /* Empty on purpose. The three entries that were here — named people at
       Fieldstone SaaS, Bloomstate and Ardent Coffee Co., with ROAS and cost
       per lead figures — appear nowhere in the page brief. The one real
       testimonial the brief carries is anonymous ("Client, Electronics & IoT
       Hardware Brand, Stuttgart Germany"), so it cannot fill `name` and
       `initials` without inventing a person; it belongs with that client's
       case study rather than here. */
    testimonials: [],
    timeline: "3-month minimum",
  };
