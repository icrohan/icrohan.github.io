"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { approachSteps } from "@/content/profile";
import { cn } from "@/lib/utils";

const R = 150, C = 200;

/** Interactive "problem → production" loop for the Forward Deployed Engineering section. */
export function ApproachLoop() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();
  const n = approachSteps.length;

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 2400);
    return () => clearInterval(id);
  }, [auto, inView, reduce, n]);

  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [C + R * Math.cos(a), C + R * Math.sin(a)] as const;
  };
  const pick = (i: number) => { setActive(i); setAuto(false); };
  const step = approachSteps[active];

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
      {/* Ring */}
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line-strong)" strokeDasharray="2 6" />
          <motion.circle
            cx={C} cy={C} r={R} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
            transform={`rotate(-90 ${C} ${C})`}
            animate={{ pathLength: (active + 1) / n }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <circle cx={C} cy={C} r="88" fill="var(--bg-elev)" stroke="var(--line)" />
          {approachSteps.map((_, i) => {
            const [x, y] = pos(i);
            const on = i === active, past = i < active;
            return (
              <g key={i}>
                {on && <circle cx={x} cy={y} r="22" fill="var(--accent)" opacity="0.15" />}
                <circle cx={x} cy={y} r="14" fill={on ? "var(--accent)" : "var(--bg-elev)"} stroke={on || past ? "var(--accent)" : "var(--line-strong)"} strokeWidth="1.5" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill={on ? "var(--accent-fg)" : past ? "var(--accent)" : "var(--muted)"}>
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        {/* clickable hit areas for nodes */}
        {approachSteps.map((s, i) => {
          const [x, y] = pos(i);
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => pick(i)}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${(x / 400) * 100}%`, top: `${(y / 400) * 100}%` }}
            />
          );
        })}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }} className="max-w-[150px] text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Step {active + 1}</p>
              <p className="mt-1 text-sm font-medium leading-tight">{step.title}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Step list */}
      <ol className="space-y-1">
        {approachSteps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              aria-current={i === active ? "step" : undefined}
              className={cn(
                "grid w-full grid-cols-[32px_1fr] gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                i === active ? "bg-elev ring-1 ring-line-strong" : "hover:bg-elev/60",
              )}
            >
              <span className={cn("font-mono text-xs leading-6", i === active ? "text-accent" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className={cn("block font-medium tracking-tight", i === active ? "text-fg" : "text-fg-soft")}>{s.title}</span>
                <span className={cn("grid transition-all duration-300", i === active ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <span className="overflow-hidden text-sm leading-relaxed text-muted">{s.detail}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
