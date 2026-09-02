/* Barrel. Each policy lives in ./legal/<name>.ts so they can be edited
   independently. Import sites are unchanged. */
export * from "./legal/shared";
export { privacySections } from "./legal/privacy";
export { termsSections } from "./legal/terms";
export { cookieSections } from "./legal/cookie";
export { disclaimerSections } from "./legal/disclaimer";
export { refundSections } from "./legal/refunds";
