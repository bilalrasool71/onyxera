import type { Service } from "./types";
import { ClipboardCheck, Eye, FileSearch, Fingerprint, Lock, ShieldCheck, Siren } from "lucide-react";

export const cyber_security: Service = /* ------------------------------------------------------------------ */
  {
    slug: "cyber-security",
    name: "Cyber Security",
    navLabel: "Cyber Security",
    icon: ShieldCheck,
    tagline: "Find it before someone else does",
    summary:
      "Penetration testing, secure code review, cloud and identity security, compliance readiness and incident response planning.",
    /* The brief names both hero buttons: "Talk to Us" and "Get Security
       Assessment". Every other service leads with "Discuss Project", so the
       first one is overridden here rather than in the template. */
    heroCtaPrimary: "Talk to Us",
    heroCta: "Get Security Assessment",
    capabilitiesHeading: {
      title: "Security Framework Built Around",
      highlight: " Your Business",
      body:
        "From testing your applications to strengthening cloud access and preparing for compliance, we focus on the security areas that matter most to your business.",
    },
    whatYouGet: {
      title: "A Clear Security Plan.",
      highlight: " Proven Protection",
      body:
        "Everything is scoped clearly, prioritised by risk and documented so your team knows what needs to happen next.",
    },
    stackIntro:
      "Trusted security tools selected to test, monitor and strengthen your systems without unnecessary complexity.",
    processHeading: {
      title: "How to move from Risk to",
      highlight: " Resolution",
      end: "?",
      body:
        "Four structured stages take you from understanding your exposure to fixing vulnerabilities and proving they are closed.",
    },
    faqHeading: {
      title: "Cyber Security,",
      highlight: " Answered Straight",
    },
    hero: {
      eyebrow: "Cyber Security",
      headline: "Cyber Security That",
      highlight: " Protects Your Business",
      sub:
        "Find vulnerabilities before they become expensive problems. We test your systems, explain the risks clearly and help your team fix what matters most.",
    },
    /* The brief's "Results Section", verbatim. This strip renders directly
       under the hero; `heroStats` renders a second, identical strip further
       down, so it is deliberately left unset — the brief supplies one set of
       figures, not two. */
    metrics: [
      { value: "100%", label: "Engagements include a free retest" },
      { value: "48 hrs", label: "Critical findings reported" },
      { value: "SOC 2", label: "Readiness support available" },
    ],
    /* The brief's unused alternative hero hook. The four points below are the
       brief's problem-section bullets, which also fill `problem.points` — the
       brief describes one problem section and the page renders two. */
    capabilities: [
      { icon: Fingerprint, title: "Penetration Testing", body: "Test your systems the way a real attacker would." },
      { icon: FileSearch, title: "Secure Code Review", body: "Find security weaknesses inside your application code." },
      { icon: Lock, title: "Cloud & Identity Security", body: "Strengthen access, permissions and cloud configurations." },
      { icon: ClipboardCheck, title: "Compliance Readiness", body: "Prepare your business for SOC 2, ISO 27001 and GDPR requirements." },
      { icon: Siren, title: "Incident Response Planning", body: "Know exactly what to do when a security incident happens." },
      { icon: Eye, title: "Monitoring & Security Training", body: "Detect important signals and help your team recognise common threats." },
    ],
    deliverables: [
      "Security Rules Of Engagement",
      "Technical Findings Report",
      "Executive Risk Summary",
      "Reproduction Steps",
      "Prioritised Remediation Plan",
      "Fix Verification Retest",
      "Security Questionnaire Support",
      "Client Attestation Letter",
    ],
    process: [
      { title: "Scope & Authorise", body: "Define what will be tested, when it will happen and how the work will be controlled.", duration: "Step 01" },
      { title: "Test", body: "We assess your systems through scanning, investigation and authorised security testing.", duration: "Step 02" },
      { title: "Report & Explain", body: "You receive clear findings, business impact and practical recommendations your team can act on.", duration: "Step 03" },
      { title: "Fix & Retest", body: "We help close the gaps, test the fixes and confirm that the findings are resolved.", duration: "Step 04" },
    ],
    stack: [
      "Burp Suite", "Nmap", "OWASP ZAP", "Semgrep", "Snyk",
      "Wazuh", "Terraform", "Vault", "AWS Security Hub",
    ],
    faqs: [
      { q: "Do I need cyber security if my business is small?", a: "Yes. The right level of security depends on what you store, who has access and how your business operates. We start by identifying your actual risks." },
      { q: "How do I know if my business is secure?", a: "You cannot know by simply having antivirus or passwords. A proper assessment can identify weaknesses across your applications, systems, access and infrastructure." },
      { q: "Will security testing affect my website or systems?", a: "Testing is planned and authorised before it starts. Where possible, we prefer a staging environment. If production testing is required, we agree controls and timing beforehand." },
      { q: "Can you help us fix the problems you find?", a: "Yes. We do not simply give you a report. We can work with your team on remediation and retest the findings after fixes are made." },
      { q: "Can you help with SOC 2 or ISO 27001 readiness?", a: "Yes. We can support the technical readiness process, including gap assessment, controls, evidence preparation and penetration testing. The formal audit must be completed by an independent firm." },
      { q: "How often should our business have security testing?", a: "An annual assessment is a sensible baseline. Additional testing should also be considered after major system changes, significant releases or new compliance requirements." },
    ],
    seo: {
      title: "Cyber Security Services",
      description:
        "Protect your business with cyber security services including penetration testing, security assessments, cloud security, compliance and risk management.",
      ogTitle: "Cyber Security Services | OnyxEra Tech",
      ogDescription:
        "Protect your business with cyber security services including penetration testing, security assessments, cloud security, compliance and risk management.",
      keywords: [
        "cyber security services",
        "penetration testing",
        "security audit",
        "compliance readiness",
        "incident response",
        "SOC 2 readiness",
        "ISO 27001",
        "cloud security",
      ],
      heroAlt: "cyber security services by OnyxEra Tech",
    },
    /* No `heroStats`: the brief has a single results strip and it is already
       in `metrics`. Populating both rendered the same three figures twice. */
    problem: {
      title: "Been hacked? Not sure where you are still exposed?",
      sub: "Security gaps are often invisible until someone finds them. We help you understand where your business is exposed and what needs to be fixed first.",
      points: [
        "Losing opportunities because you cannot confidently answer client security questions.",
        "Unsure which security gaps need fixing first.",
        "Too many people have access to systems they no longer need.",
        "Worried the same security problem could happen again.",
      ],
      solution:
        "We find the security gaps that put your business at risk and prioritise what needs attention. Then we help fix the issues and retest your systems to make sure the improvements hold.",
    },
    cta: {
      title: "Ready To Know Where Your Business Stands?",
      body: "Tell us what you are worried about. We will assess the situation, explain the risks and show you what should happen next.",
      primaryLabel: "Get Free Consultation",
      secondaryLabel: "Book A Security Assessment",
      note: "Typical reply within 4 business hours",
    },
    /* Empty by design. The three entries that were here (Sift Health, Fieldstone
       SaaS, Halden Industrial) were invented — named people, companies and
       outcome metrics with no support in the page brief — so they have been
       removed. Add real, attributable references only.
       Note: services/page.tsx renders `testimonials.length` as "N references"
       and will now show "0 references" until that card is gated. */
    testimonials: [],
    /* Not a duration. The same discipline covers a two-week job and a
       six-month one, so a range printed here is either meaningless or a
       promise nobody agreed to. What is true of every engagement is that the
       schedule is settled in the proposal, before the client commits — so
       that is what the card says. Keep all five services on this line. */
    timeline: "Agreed before we start",
  };
