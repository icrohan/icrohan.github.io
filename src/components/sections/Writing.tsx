import { ArrowUpRight, PenLine } from "lucide-react";
import Link from "next/link";
import { blogTopics } from "@/content/profile";
import { getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Reveal } from "../Reveal";

export function Writing() {
  const posts = getPosts();

  if (posts.length === 0) {
    return (
      <Reveal>
        <div className="panel grid gap-8 rounded-2xl p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><PenLine className="h-5 w-5" /></span>
            <p className="mt-5 text-xl font-medium tracking-tight">Engineering notes are on the way.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              I&apos;ll be writing about what I learn building real systems — the parts that break, and what fixes them.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Planned topics</p>
            <ul className="flex flex-wrap gap-2">
              {blogTopics.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1.5 text-sm text-fg-soft">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.slice(0, 5).map((p, i) => (
        <Reveal as="li" key={p.slug} delay={0.04 * i}>
            <Link href={`/blog/${p.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-6">
              <span className="font-mono text-xs text-muted">{formatDate(p.date)}</span>
              <span>
                <span className="block text-lg font-medium tracking-tight transition-colors group-hover:text-accent">{p.title}</span>
                {p.summary && <span className="mt-1 block text-sm text-muted">{p.summary}</span>}
              </span>
              <ArrowUpRight className="hidden h-4 w-4 text-muted transition-colors group-hover:text-accent sm:block" />
            </Link>
        </Reveal>
      ))}
    </ul>
  );
}
