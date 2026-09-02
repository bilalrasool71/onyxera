type ClassValue = string | number | bigint | boolean | null | undefined;

/** Joins truthy class names — small on purpose, no merge magic. */
export function cn(...classes: ClassValue[]) {
  return classes.filter((c) => typeof c === "string" && c.length > 0).join(" ");
}

/**
 * Spells a small count so prose can be generated from data rather than typed.
 * Copy that hard-codes "Six disciplines" goes stale the moment a service is
 * merged or added — and did, when website design was folded into web
 * applications and five pages carried on claiming six.
 */
const WORDS = [
  "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten",
];

export function numberWord(n: number) {
  return WORDS[n] ?? String(n);
}

export function titleCaseWord(w: string) {
  return w.charAt(0).toUpperCase() + w.slice(1);
}
