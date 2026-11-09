"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { GithubIcon, Tag } from "../ui";
import { PreviewVideo } from "./PreviewVideo";
import { ProjectCover } from "./ProjectCover";

export function onSpotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function ProjectCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const cover = project.media?.[0];
  return (
    <article
      onMouseMove={onSpotlight}
      className={cn(
        "spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-elev transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong",
        large && "lg:flex-row",
      )}
    >
      <div className={cn("relative aspect-[5/3] overflow-hidden border-b border-line", large && "lg:aspect-auto lg:w-[55%] lg:border-b-0 lg:border-r")}>
        {project.preview ? (
          <>
            <PreviewVideo src={project.preview.src} poster={project.preview.poster} label={project.preview.alt} className="transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden /> demo
            </span>
          </>
        ) : cover ? (
          <Image src={cover.src} alt={cover.alt} fill sizes="(min-width:1024px) 50vw, 100vw" style={{ objectPosition: cover.position }} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <ProjectCover visual={project.visual} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        )}
        <span className="absolute left-4 top-4 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className={cn("flex flex-1 flex-col p-6", large && "lg:p-8")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-accent">{project.domain}</span>
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[11px] text-fg-soft">
              <span className={cn("h-1.5 w-1.5 rounded-full", project.status === "In active development" ? "pulse-dot bg-[var(--signal)]" : "bg-muted")} />
              {project.status}
            </span>
          )}
        </div>
        <h3 className={cn("mt-3 text-xl font-semibold tracking-tight text-balance", large && "lg:text-3xl")}>
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-soft">{project.tagline}</p>
        {large && <p className="mt-4 hidden text-sm leading-relaxed text-muted lg:block">{project.solution}</p>}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, large ? 8 : 5).map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-fg transition-colors group-hover:text-accent">
            Case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-soft transition-colors hover:border-accent hover:text-accent"
              aria-label={`${project.title} on GitHub`}
            >
              <GithubIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
