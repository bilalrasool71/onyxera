import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Renders inline links written into body copy as `[text](/path)`.
 *
 * The copy on this site lives in plain .ts data files, which cannot hold JSX.
 * Where the client's own document links a phrase, the link is part of the copy
 * rather than decoration, so it is stored with the text as a marker and turned
 * into an anchor here.
 *
 * A string with no marker is handed back untouched, so every existing caller
 * is unaffected.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function withLinks(text: string): ReactNode {
  if (!text.includes("](")) return text;

  const out: ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <Link key={at} href={m[2]} className="prose-link">
        {m[1]}
      </Link>,
    );
    last = at + m[0].length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}
