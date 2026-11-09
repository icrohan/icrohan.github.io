"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

// Coordinates in the 1200×1500 image space of /public/rohan.webp
const KP = {
  head: [552, 545], neck: [552, 704], ls: [352, 768], rs: [720, 760], le: [248, 984], re: [792, 1040],
  lw: [204, 1064], rw: [872, 1216], lh: [392, 1270], rh: [640, 1270],
} as const;
const BONES: [keyof typeof KP, keyof typeof KP][] = [
  ["head", "neck"], ["neck", "ls"], ["neck", "rs"], ["ls", "le"], ["le", "lw"], ["rs", "re"], ["re", "rw"],
  ["ls", "lh"], ["rs", "rh"], ["lh", "rh"],
];

/** Portrait with a computer-vision style overlay: detection box, pose skeleton and scan line. */
export function VisionPortrait({ alt }: { alt: string }) {
  const reduce = useReducedMotion();
  const [overlay, setOverlay] = useState(true);
  const d = (i: number) => (reduce ? 0 : 0.6 + i * 0.06);

  return (
    <figure className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-[var(--shadow)]">
        <Image
          src="/rohan.webp"
          alt={alt}
          fill
         
          sizes="(min-width: 1024px) 360px, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" aria-hidden />

        {overlay && (
          <svg viewBox="0 0 1200 1500" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* detection box */}
            <motion.rect
              x="150" y="400" width="770" height="1080" rx="6" fill="none" stroke="var(--accent)" strokeWidth="3"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.g initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}>
              <rect x="150" y="352" width="290" height="46" rx="4" fill="var(--accent)" />
              <text x="168" y="384" fontFamily="var(--font-mono)" fontSize="26" fill="var(--accent-fg)" fontWeight="600">operator · rohan</text>
            </motion.g>
            {/* face box */}
            <motion.rect
              x="470" y="425" width="175" height="250" rx="4" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeDasharray="10 8"
              initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 0.9 }} viewport={{ once: true }} transition={{ delay: 1.4 }}
            />
            {/* skeleton */}
            {BONES.map(([a, b], i) => (
              <motion.line
                key={a + b} x1={KP[a][0]} y1={KP[a][1]} x2={KP[b][0]} y2={KP[b][1]}
                stroke="var(--signal)" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.85"
                initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: d(i) + 0.4, duration: 0.4 }}
              />
            ))}
            {Object.entries(KP).map(([k, [x, y]], i) => (
              <motion.circle
                key={k} cx={x} cy={y} r="9" fill="var(--bg)" stroke="var(--signal)" strokeWidth="4"
                initial={reduce ? false : { scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: d(i), type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            ))}
          </svg>
        )}

        {overlay && !reduce && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%]" aria-hidden>
            <div className="scan-line h-full w-full bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--signal)_25%,transparent)] to-transparent" />
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-white/85">
          <span className="flex items-center gap-1.5 rounded-md bg-black/45 px-2 py-1 backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--signal)]" /> detect · pose · track
          </span>
          <button
            type="button"
            onClick={() => setOverlay((o) => !o)}
            className="pointer-events-auto rounded-md bg-black/45 px-2 py-1 backdrop-blur transition-colors hover:bg-black/65"
            aria-pressed={overlay}
          >
            {overlay ? "Hide overlay" : "Show overlay"}
          </button>
        </div>
      </div>
      <figcaption className="sr-only">Photo of Rohan Immidichetty with a decorative computer-vision overlay.</figcaption>
    </figure>
  );
}
