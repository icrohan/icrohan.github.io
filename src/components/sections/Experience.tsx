"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { experience } from "@/content/experience";
import { cn, duration, formatMonth } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { Tag } from "../ui";

const dates = (start: string, end: string) => (start ? `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}` : "");

export function ExperienceList() {
  const [open, setOpen] = useState<string | null>(experience[0]?.company ?? null);

  return (
    <ol className="divide-y divide-line border-y border-line">
      {experience.map((e, i) => {
        const id = `${e.company}-${e.start}`;
        const isOpen = open === e.company;
        return (
          <li key={id}>
            <Reveal delay={0.03 * i} y={10}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : e.company)}
                aria-expanded={isOpen}
                aria-controls={`exp-${i}`}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[150px_auto_1fr_auto] sm:gap-6"
              >
                <span className="hidden font-mono text-xs text-muted sm:block">
                  {dates(e.start, e.end)}
                </span>
                {e.logo ? (
                  <span
                    className={cn(
                      "relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-white ring-1 transition-shadow",
                      isOpen ? "ring-2 ring-accent" : "ring-line-strong group-hover:ring-accent/60",
                    )}
                  >
                    <Image src={e.logo} alt={`${e.company} logo`} width={44} height={44} className="h-full w-full object-contain p-1" />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-lg border font-semibold tracking-tight transition-colors",
                      isOpen ? "border-accent/50 bg-accent-soft text-accent" : "border-line-strong bg-elev text-fg-soft group-hover:text-fg",
                    )}
                    aria-hidden
                  >
                    {e.company.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-lg font-medium tracking-tight sm:text-xl">{e.role}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {e.company} · {e.location}
                    {e.start && <span className="sm:hidden"> · {dates(e.start, e.end)}</span>}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted md:inline">
                    {e.type}{e.start && e.end ? ` · ${duration(e.start, e.end)}` : ""}
                  </span>
                  <ChevronDown className={cn("h-5 w-5 text-muted transition-transform duration-300", isOpen && "rotate-180 text-accent")} aria-hidden />
                </span>
              </button>
            </Reveal>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`exp-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-8 sm:grid-cols-[150px_1fr] sm:gap-6 sm:pl-0">
                    <div className="hidden sm:block" />
                    <div className="sm:pl-[68px]">
                      <p className="max-w-3xl leading-relaxed text-fg-soft">{e.summary}</p>
                      <ul className="mt-4 space-y-2">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-soft">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {e.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                      </div>
                      {e.link && (
                        <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm text-accent hover:underline">
                          {e.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
