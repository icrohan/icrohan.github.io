import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Tag } from "@/components/ui";
import { getPost, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  // Next requires at least one param for a static route with dynamicParams=false
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__none" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article", title: post.title, description: post.summary } };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-28 pb-24 sm:pt-36">
      <Container className="max-w-3xl">
        <Link href="/#writing" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> All writing
        </Link>
        <p className="mt-8 font-mono text-xs text-muted">{formatDate(post.date)} · {post.readingMinutes} min read</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
        {post.summary && <p className="mt-4 font-serif text-xl italic text-fg-soft">{post.summary}</p>}
        {post.tags.length > 0 && <div className="mt-5 flex flex-wrap gap-1.5">{post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
        <div className="prose-post mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </article>
  );
}
