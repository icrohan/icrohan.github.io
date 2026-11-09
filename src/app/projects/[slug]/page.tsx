import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, ImagePlus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PipelineDiagram } from "@/components/projects/PipelineDiagram";
import { PreviewVideo } from "@/components/projects/PreviewVideo";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GithubIcon, Tag } from "@/components/ui";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.tagline} ${p.solution}`.slice(0, 300),
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.tagline, type: "article" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="pt-28 pb-24 sm:pt-36">
      <Container>
        <Link href="/#projects" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> All projects
        </Link>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-accent">{p.domain}</span>
            {p.status && <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg-soft">{p.status}</span>}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{p.title}</h1>
          <p className="mt-5 max-w-2xl font-serif text-2xl italic leading-snug text-fg-soft">{p.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.repo && <ButtonLink href={p.repo}><GithubIcon /> View repository</ButtonLink>}
            {p.demo && <ButtonLink href={p.demo} variant="secondary"><ExternalLink className="h-4 w-4" /> Live demo</ButtonLink>}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl border border-line">
            {p.preview ? (
              <PreviewVideo src={p.preview.src} poster={p.preview.poster} label={p.preview.alt} />
            ) : p.media?.[0] ? (
              <Image src={p.media[0].src} alt={p.media[0].alt} fill priority sizes="(min-width:1152px) 1152px, 100vw" style={{ objectPosition: p.media[0].position }} className="object-cover" />
            ) : (
              <ProjectCover visual={p.visual} className="h-full w-full" />
            )}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="space-y-14">
            <Reveal>
              <section>
                <h2 className="eyebrow">The problem</h2>
                <p className="mt-4 text-xl leading-relaxed text-fg">{p.problem}</p>
              </section>
            </Reveal>
            <Reveal>
              <section>
                <h2 className="eyebrow">The approach</h2>
                <p className="mt-4 text-lg leading-relaxed text-fg-soft">{p.solution}</p>
              </section>
            </Reveal>
            <Reveal>
              <section>
                <h2 className="eyebrow mb-4">Architecture</h2>
                <PipelineDiagram stages={p.architecture} note={p.architectureNote} />
              </section>
            </Reveal>
            <Reveal>
              <section>
                <h2 className="eyebrow">Key features</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 rounded-xl border border-line bg-elev/50 p-4 text-sm text-fg-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            <Reveal>
              <section>
                <h2 className="eyebrow">Screenshots & demo</h2>
                {p.video ? (
                  <div className="mt-5 aspect-video overflow-hidden rounded-xl border border-line">
                    {p.video.startsWith("http") ? (
                      <iframe src={p.video} title={`${p.title} demo`} className="h-full w-full" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
                    ) : (
                      <video src={p.video} poster={p.preview?.poster} controls playsInline className="h-full w-full bg-black" preload="none" />
                    )}
                  </div>
                ) : null}
                {p.media && p.media.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {p.media.map((m) => (
                      <div key={m.src} className="relative aspect-video overflow-hidden rounded-xl border border-line">
                        <Image src={m.src} alt={m.alt} fill sizes="(min-width:1024px) 400px, 100vw" style={{ objectPosition: m.position }} className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : !p.video && (
                  <div className="mt-5 flex items-center gap-4 rounded-xl border border-dashed border-line-strong p-6 text-sm text-muted">
                    <ImagePlus className="h-5 w-5 shrink-0" aria-hidden />
                    Screenshots and a demo video for this project are coming soon.
                  </div>
                )}
              </section>
            </Reveal>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="eyebrow">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
            {p.recognition && (
              <div>
                <h2 className="eyebrow">Recognition</h2>
                <p className="mt-3 text-sm text-fg-soft">{p.recognition}</p>
              </div>
            )}
            {p.related && (
              <div>
                <h2 className="eyebrow">Related code</h2>
                <ul className="mt-3 space-y-2">
                  {p.related.map((r) => (
                    <li key={r.href}>
                      <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 text-sm text-fg-soft hover:text-accent">
                        <GithubIcon className="mt-0.5 h-4 w-4 shrink-0" /> <span>{r.label}</span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <Link href={`/projects/${next.slug}`} className="group mt-24 flex items-center justify-between gap-6 rounded-2xl border border-line bg-elev/50 p-6 transition-colors hover:border-line-strong sm:p-8">
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-2 block text-xl font-semibold tracking-tight sm:text-2xl">{next.title}</span>
          </span>
          <ArrowRight className="h-6 w-6 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </Container>
    </article>
  );
}
