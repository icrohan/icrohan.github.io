"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Stage } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Interactive architecture diagram. Stages are laid out as a flowing grid;
 * a signal steps through the pipeline automatically until the user picks a stage.
 */
export function PipelineDiagram({ stages, note, title = "System architecture" }: { stages: Stage[]; note?: string; title?: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 2200);
    return () => clearInterval(id);
  }, [auto, reduce, stages.length]);

  const s = stages[active];

  return (
    <div className="panel overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="eyebrow">{title}</p>
        <button
          type="button"
          onClick={() => setAuto((a) => !a)}
          className="font-mono text-[11px] text-muted transition-colors hover:text-fg"
          aria-pressed={auto}
        >
          {auto ? "❚❚ pause" : "▶ play"}
        </button>
      </div>

      <div className="bg-grid p-5 sm:p-8">
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="tablist" aria-label="Pipeline stages">
          {stages.map((st, i) => {
            const done = i < active, isActive = i === active;
            return (
              <li key={st.id} className="relative">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="stage-detail"
                  onClick={() => { setActive(i); setAuto(false); }}
                  onMouseEnter={() => { setActive(i); setAuto(false); }}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300",
                    isActive ? "border-accent bg-accent-soft" : done ? "border-line-strong bg-elev" : "border-line bg-elev/70 hover:border-line-strong",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-md font-mono text-[11px] transition-colors",
                      isActive ? "bg-accent text-accent-fg" : done ? "bg-[color-mix(in_oklab,var(--signal)_20%,transparent)] text-[var(--signal)]" : "bg-elev-2 text-muted",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-sm font-medium leading-tight", isActive ? "text-fg" : "text-fg-soft")}>{st.label}</span>
                  {isActive && !reduce && (
                    <motion.span layoutId="pipeline-glow" className="absolute inset-0 -z-10 rounded-xl shadow-[0_0_40px_-8px_var(--accent)]" transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* progress rail */}
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-elev-2" aria-hidden>
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[var(--signal)] to-accent" animate={{ width: `${((active + 1) / stages.length) * 100}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
        </div>

        <div id="stage-detail" role="tabpanel" aria-live="polite" className="mt-6 min-h-[92px]">
          <AnimatePresence mode="wait">
            <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <p className="font-mono text-xs text-accent">Stage {active + 1} / {stages.length}</p>
              <p className="mt-1.5 text-lg font-medium tracking-tight">{s.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-soft">{s.detail}</p>
              {s.tech && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tech.map((t) => <span key={t} className="rounded-md border border-line bg-elev px-2 py-0.5 font-mono text-[11px] text-fg-soft">{t}</span>)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {note && <p className="border-t border-line px-5 py-3 text-xs text-muted">{note}</p>}
    </div>
  );
}
