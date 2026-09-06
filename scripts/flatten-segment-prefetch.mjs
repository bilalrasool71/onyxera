/*
 * Post-build fixup for `output: "export"`.
 *
 * Next's Link prefetches per-segment RSC payloads from paths that spell the
 * route out in dots:
 *
 *   /services/automation/__next.services.$d$slug.__PAGE__.txt
 *
 * The export writes those same payloads as nested directories instead:
 *
 *   out/services/automation/__next.services/$d$slug/__PAGE__.txt
 *
 * Nothing serves the dotted form, so on static hosting every prefetch 404s —
 * four console errors on the home page alone, which Lighthouse counts against
 * Best Practices, and the prefetch itself never lands.
 *
 * This renames each payload to the name the client actually asks for. A rename
 * rather than a copy: the nested form is what 404s, so nothing reads it.
 */
import { readdir, rename, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

/** Every file under `dir`, as path segments relative to it. */
async function collect(dir, trail = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const next = [...trail, entry.name];
    if (entry.isDirectory()) files.push(...(await collect(join(dir, entry.name), next)));
    else files.push(next);
  }
  return files;
}

/** Walks `out/`, flattening any `__next.*` directory it finds. */
async function walk(dir) {
  let moved = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const trail of await collect(path)) {
        await rename(join(path, ...trail), join(dir, entry.name + "." + trail.join(".")));
        moved += 1;
      }
      await rm(path, { recursive: true, force: true });
    } else {
      moved += await walk(path);
    }
  }
  return moved;
}

try {
  await stat(OUT);
} catch {
  console.error("flatten-segment-prefetch: no out/ directory — run after `next build`.");
  process.exit(0);
}

const moved = await walk(OUT);
console.log(`flatten-segment-prefetch: flattened ${moved} segment payload(s).`);
