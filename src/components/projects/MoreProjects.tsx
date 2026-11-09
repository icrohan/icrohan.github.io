"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { moreProjects } from "@/content/projects";
import { cn } from "@/lib/utils";
import { Tag } from "../ui";

export function MoreProjects() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-16">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="more-projects"
        className="group flex w-full items-center justify-between rounded-2xl border border-line bg-elev/60 px-6 py-5 text-left transition-colors hover:border-line-strong"
      >
        <span>
          <span className="block text-lg font-medium tracking-tight">More builds & experiments</span>
          <span className="mt-0.5 block text-sm text-muted">{moreProjects.length} smaller projects across AI, IoT, robotics and Web3</span>
        </span>
        <span className={cn("grid h-9 w-9 place-items-center rounded-full border border-line transition-transform duration-300", open && "rotate-45 border-accent text-accent")}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id="more-projects"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {moreProjects.map((p) => {
              const inner = (
                <>
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-medium tracking-tight">{p.title}</span>
                    {p.repo && <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden />}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-fg-soft">{p.summary}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</span>
                </>
              );
              return (
                <li key={p.title} className="bg-bg">
                  {p.repo ? (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="group block h-full p-6 transition-colors hover:bg-elev">
                      {inner}
                      <span className="sr-only"> (GitHub repository)</span>
                    </a>
                  ) : (
                    <div className="h-full p-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
