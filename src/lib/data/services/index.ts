import type { Service } from "./types";
import { web_application } from "./web-application";
import { seo } from "./seo";
import { digital_marketing } from "./digital-marketing";
import { automation } from "./automation";
import { cyber_security } from "./cyber-security";

/* Order here is the order they appear in the nav, footer and grid. */
export const services: Service[] = [
  web_application,
  seo,
  digital_marketing,
  automation,
  cyber_security,
];
