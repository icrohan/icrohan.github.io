"use client";

import { useEffect, useState } from "react";

const LINES = ["camera online", "yolo weights loaded", "esp32 mesh linked", "servos calibrated", "llm context ready"];

/**
 * First-visit preloader: a 000 → 100 counter and boot log.
 * Timing is pure CSS (it always clears itself, even without JS);
 * JS only remembers it for the session and lets visitors skip it.
 */
export function BootSequence() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try { sessionStorage.setItem("booted", "1"); } catch {}
    const t = setTimeout(() => setGone(true), 3300);
    const skip = () => setGone(true);
    window.addEventListener("keydown", skip, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("keydown", skip); };
  }, []);

  if (gone) return null;

  return (
    <div className="boot !place-items-stretch" onClick={() => setGone(true)} role="presentation">
      <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span><span className="text-accent">ROHAN.OS</span> — booting</span>
          <span className="hidden sm:inline">sense · see · think · act</span>
        </div>

        <div className="grid items-end gap-8 sm:grid-cols-[1fr_auto]">
          <div className="flex items-end gap-4">
            <span className="boot-count font-serif text-[clamp(6rem,22vw,15rem)] leading-[0.8] tracking-[-0.04em] text-fg" />
            <span className="mb-3 font-serif text-4xl italic text-accent sm:mb-6 sm:text-6xl">%</span>
          </div>
          <ul className="space-y-1 font-mono text-[11px] uppercase tracking-wider text-muted sm:pb-4 sm:text-right">
            {LINES.map((l, i) => (
              <li key={l} className="boot-line" style={{ animationDelay: `${180 + i * 330}ms` }}>
                {l} <span className="text-accent">✓</span>
              </li>
            ))}
            <li className="boot-line pt-2 text-[10px] opacity-70" style={{ animationDelay: "500ms" }}>click or press any key to skip</li>
          </ul>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line"><div className="boot-bar h-full w-full bg-accent" /></div>
      </div>
    </div>
  );
}
