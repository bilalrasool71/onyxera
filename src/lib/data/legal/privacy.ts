import type { LegalSection } from "./shared";
import { AU, AU_ADDRESS } from "./shared";
import { site } from "@/lib/site";

/* Client's final Privacy Policy copy, one entry per numbered clause (01-19).
   Body text is the client's, reproduced as written. The only edits are
   Australian English spelling (organisational, unauthorised, authorised,
   fulfil), the "fulfilll" typo, a grammar slip in clause 19 ("recommend you to
   read" -> "recommend you read"), and missing sentence punctuation in
   clause 10. Headings are the client's own wording, normalised to sentence
   case with "&" spelled out; no meaning has been changed.

   The document's preamble is rendered by the page itself (the `intro` prop on
   /privacy-policy). Its second preamble sentence, about processing under
   Australian privacy law, is not in that intro, so it opens clause 01 rather
   than being dropped.

   NOTE (not for publication): the source document closes with an internal note
   that this copy is website-ready but should be reviewed by legal before
   publication, because privacy obligations depend on OnyxEra's actual legal
   entity, technology stack, data flows and client locations. Recorded here
   instead of in the published sections. Clauses carrying a specific legal
   commitment are marked `needsReview`. */

export const privacySections: LegalSection[] = [
  {
    heading: "To whom this policy applies",
    body: [
      "We process personal information in accordance with applicable Australian privacy and data protection legislation.",
      "This policy applies to OnyxEra Tech, our website, our digital services, client communications and our business operations.",
      "This includes data gathered from visitors to our website, prospective and current clients, business partners, suppliers and individuals who engage with us.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "The information we collect is based on how you interact with us. This may be your name, business name, email, phone number, job title, and other contact details.",
      "When you inquire about our services, we may collect information about your business, project needs, objectives, current systems and the services you might be considering.",
      "We may collect technical information such as your IP address, browser type, device information, pages visited and interactions with the website. We may also collect billing and transaction information, where applicable.",
    ],
  },
  {
    heading: "How we gather it",
    body: [
      "We usually gather information directly from you when you inquire, request a proposal, schedule a consultation, communicate with our team, become a client or provide information during a project.",
      "Information may also be collected from authorised representatives, business partners, service providers or from publicly available sources if this is lawful and reasonably necessary.",
    ],
  },
  {
    heading: "Technical info and website",
    body: [
      "When you visit our website some information may be collected automatically to operate and secure the website and to improve the website.",
      "This may include information like your device, browser, approximate location, referring URL, pages viewed, and interactions with the website.",
      "We may also use cookies, analytics programs, and similar technology. For further information please see our Cookie Policy.",
    ],
  },
  {
    heading: "Why we gather information",
    body: [
      "We collect data to answer questions, understand your business needs, prepare proposals, provide our services, and manage client relationships.",
      "We may also use data to improve our website and services, measure performance of marketing, maintain security, prevent misuse and meet legal, contractual and regulatory obligations.",
      "We only want information that is reasonably required for these purposes.",
    ],
  },
  {
    heading: "How we use your data",
    body: [
      "An inquiry can help us understand your needs, identify the relevant services, and propose a suitable methodology, scope, and next steps.",
      "If you become a client, we may use your information to manage projects, support you, communicate with your team, process payments and keep appropriate business records.",
    ],
  },
  {
    heading: "Who we share information with",
    body: [
      "We never sell your personal information.",
      "We may share information with authorised team members, contractors, technology providers, hosting and infrastructure providers, CRM and project management platforms, analytics and marketing providers, payment processors, and professional advisers where necessary.",
      "We may also disclose information if required by law, regulation, legal process, or as necessary to protect our rights, security or legitimate business interests.",
    ],
  },
  {
    heading: "Cross-border data transfers",
    body: [
      "Some of our technology and service providers may be located outside of Australia. This means personal information may be processed or stored internationally.",
      "Where this is the case, we take reasonable steps to ensure that appropriate safeguards are in place and that your information continues to be afforded appropriate protection under applicable privacy requirements.",
    ],
    needsReview: true,
  },
  {
    heading: "Personal selling",
    body: [
      "Where permitted by law we may contact you with relevant services, company updates, industry insights, guides, resources or other business communications.",
      "You can choose to opt out of marketing communications at any time by using the unsubscribe link provided or by contacting us.",
      "Where required, necessary communications relating to an existing project or business relationship may still be sent.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "We use cookies and similar technologies on our website to make the website work, to understand how visitors use it, to improve performance, to measure marketing activity and to support security.",
      "You may control and/or delete cookies as desired — for details see aboutcookies.org. You may also restrict or block cookies through your browser settings and any cookie controls available on our website.",
    ],
  },
  {
    heading: "How we safeguard your information",
    body: [
      "We have implemented reasonable technical, administrative and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.",
      "Such measures may include control of access, authentication, secure infrastructure, encryption where appropriate, back-ups, monitoring, security testing, confidentiality obligations and secure deletion.",
      "Absolutely no online system is 100% secure. We therefore continually monitor and improve our security practices in light of the information we process.",
    ],
    needsReview: true,
  },
  {
    heading: "Data leaks",
    body: [
      "If we learn of a security incident involving personal information, we will investigate and respond to the incident as appropriate.",
      "Where applicable law requires notification, we will notify the affected individuals and relevant authorities within the required timeframe.",
    ],
    needsReview: true,
  },
  {
    heading: "How long we hold information",
    body: [
      "We will only keep personal information for as long as reasonably necessary to fulfil our services, maintain business records, resolve disputes, enforce agreements or comply with legal and regulatory obligations.",
      "Information no longer needed may be securely deleted, destroyed or de-identified.",
    ],
  },
  {
    heading: "Viewing your information",
    body: [
      "You have the right to ask us for a copy of the information we hold about you.",
      "We may need to confirm your identity before we process your request. Access may be limited or denied in limited circumstances as allowed or required by law. Where appropriate we will give the reason.",
    ],
  },
  {
    heading: "Fix your info",
    body: [
      "If you think that information we hold about you is inaccurate, incomplete or out of date, you can ask us to correct it.",
      "We will consider reasonable requests for correction and update information as appropriate.",
    ],
  },
  {
    heading: "Your privacy rights",
    body: [
      "Depending on the circumstances and applicable law, you may have the right to access, correct or request the deletion of your personal information, opt out of marketing communications and make inquiries about how your information is handled.",
      "Please contact us using the contact information below to exercise a privacy right. We may have to check your identity before we can answer.",
    ],
    needsReview: true,
  },
  {
    heading: "How to complain about privacy",
    body: [
      "If you are concerned about how we have handled your personal information, please contact us in the first instance so that we can investigate and deal with the matter.",
      `Privacy contact — OnyxEra Tech, ${AU_ADDRESS}. Email ${site.email}, phone ${AU.phone}.`,
      "Please give us all the information we need to understand your concern. We will consider your message and respond in a timely manner.",
      "If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner (OAIC) or another relevant privacy regulator.",
    ],
  },
  {
    heading: "Privacy of children",
    body: [
      "Our services are intended for use by business and professional users, not for children.",
      "We do not knowingly collect personal information from children where such collection is prohibited by applicable law.",
    ],
  },
  {
    heading: "Third-party websites",
    body: [
      "Our website may include links to third party websites, platforms or services.",
      "We are not responsible for the privacy or security practices of any third party. We recommend you read their privacy policies before you provide personal information.",
    ],
  },
];
