"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { type Level, skillGroups } from "@/content/profile";
import { cn } from "@/lib/utils";
import { onSpotlight } from "../projects/ProjectCard";
import { TechIcon } from "../ui";

const levels: Level[] = ["Experienced", "Hands-on", "Familiar"];
const bars: Record<Level, number> = { Experienced: 3, "Hands-on": 2, Familiar: 1 };

function Meter({ level }: { level: Level }) {
  return (
    <span className="flex items-end gap-[3px]" aria-label={level} title={level}>
      {[1, 2, 3].map((b) => (
        <span key={b} className={cn("w-[3px] rounded-full", b <= bars[level] ? "bg-accent" : "bg-line-strong")} style={{ height: 4 + b * 3 }} />
      ))}
    </span>
  );
}

export function SkillsGrid() {
  const [filter, setFilter] = useState<Level | "All">("All");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter skills by level">
        {(["All", ...levels] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setFilter(l)}
            aria-pressed={filter === l}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              filter === l ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:text-fg",
            )}
          >
            {l !== "All" && <Meter level={l} />}
            {l}
          </button>
        ))}
        <span className="ml-auto hidden text-xs text-muted sm:block">Self-assessed · hover a skill for its level</span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <motion.div
            key={g.title}
            onMouseMove={onSpotlight}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 * gi }}
            className="spotlight panel rounded-2xl p-6"
          >
            <h3 className="font-medium tracking-tight">{g.title}</h3>
            <p className="mt-1 text-sm text-muted">{g.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.skills.map((s) => {
                const dim = filter !== "All" && s.level !== filter;
                return (
                  <li
                    key={s.name}
                    title={`${s.name} — ${s.level}`}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[13px] transition-all duration-300",
                      dim ? "border-transparent opacity-25" : "border-line bg-elev-2/50 hover:border-accent/50",
                    )}
                  >
                    {s.icon && <TechIcon name={s.icon} className="h-3.5 w-3.5 text-fg-soft" />}
                    <span>{s.name}</span>
                    <Meter level={s.level} />
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
