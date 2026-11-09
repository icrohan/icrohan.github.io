"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((x) => (x + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length, reduce]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom" aria-live="off">
      <span className="sr-only">{roles.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          aria-hidden
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap text-accent"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
