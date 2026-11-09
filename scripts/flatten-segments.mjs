/**
 * Post-build fix for static hosting (GitHub Pages).
 *
 * Next's static export writes per-segment prefetch data as nested folders,
 * e.g.  out/projects/x/__next.projects/$d$slug/__PAGE__.txt
 * but the client router requests the flattened name
 *       out/projects/x/__next.projects.$d$slug.__PAGE__.txt
 * Without this, client-side navigation falls back to full page loads.
 * This copies every nested segment file to its flattened name.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.argv[2] ?? "out";
let copied = 0;

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? filesUnder(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesUnder(p)) {
        const flat = join(dir, `${name}.${relative(p, file).split(sep).join(".")}`);
        if (!existsSync(flat)) {
          copyFileSync(file, flat);
          copied++;
        }
      }
    } else {
      walk(p);
    }
  }
}

if (existsSync(root)) walk(root);
console.log(`flatten-segments: wrote ${copied} prefetch file(s)`);
