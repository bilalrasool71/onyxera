/* Barrel. The data lives in ./services/<slug>.ts — one file per service so
   they can be edited independently. Import sites are unchanged. */
import { services } from "./services/index";

export * from "./services/types";
export { services };

export const serviceMap = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string) {
  return serviceMap.get(slug);
}
