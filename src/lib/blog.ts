import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type PostMeta = { slug: string; title: string; date: string; summary: string; tags: string[]; draft: boolean };
export type Post = PostMeta & { html: string; readingMinutes: number };

const DIR = path.join(process.cwd(), "content", "blog");

/** Minimal frontmatter parser: `key: value` lines between --- fences; `tags: [a, b]` supported. */
function parse(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: m[2] };
}

function files() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f.toLowerCase() !== "readme.md");
}

function toMeta(file: string, data: Record<string, string>): PostMeta {
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title || file,
    date: data.date || "",
    summary: data.summary || "",
    tags: (data.tags || "").replace(/^\[|\]$/g, "").split(",").map((t) => t.trim()).filter(Boolean),
    draft: data.draft === "true",
  };
}

export function getPosts(): PostMeta[] {
  return files()
    .map((f) => toMeta(f, parse(fs.readFileSync(path.join(DIR, f), "utf8")).data))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!files().includes(file)) return null;
  const { data, body } = parse(fs.readFileSync(path.join(DIR, file), "utf8"));
  const meta = toMeta(file, data);
  if (meta.draft) return null;
  const words = body.split(/\s+/).filter(Boolean).length;
  return { ...meta, html: marked.parse(body, { async: false }) as string, readingMinutes: Math.max(1, Math.round(words / 220)) };
}
