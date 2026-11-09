"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "01<>/\\[]{}#$%&*+=?ABCDEFXYZ";

/** Terminal-style decode: random glyphs resolve left-to-right into the real text when scrolled into view. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0, raf = 0;
    const total = 22;
    const run = () => {
      frame++;
      const k = frame / total;
      setOut(text.split("").map((ch, i) => (ch === " " || i < k * text.length ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
      if (frame < total) raf = requestAnimationFrame(run); else setOut(text);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, text]);

  return <span ref={ref} className={className} aria-label={text}><span aria-hidden>{out}</span></span>;
}
