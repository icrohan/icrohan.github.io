"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only "object tracking" cursor: a lagging reticle plus a detection
 * box that locks onto whatever interactive element is under the pointer.
 */
export function VisionCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("vc-on");
    const r = ring.current!, b = box.current!, l = label.current!;
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    let target: Element | null = null;
    let bx = 0, by = 0, bw = 0, bh = 0;

    const describe = (el: Element) => {
      const kind = el.tagName === "A" ? "link" : el.tagName === "BUTTON" ? "button" : el.tagName === "INPUT" || el.tagName === "TEXTAREA" ? "input" : "object";
      const text = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 22);
      return `${kind}${text ? ` · ${text.toLowerCase()}` : ""}`;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      r.style.opacity = "1";
      const el = (e.target as Element)?.closest?.("a, button, input, textarea, [data-track]") ?? null;
      if (el !== target) {
        target = el;
        if (el) { l.textContent = describe(el); b.style.opacity = "1"; } else b.style.opacity = "0";
      }
    };
    const onLeave = () => { r.style.opacity = "0"; b.style.opacity = "0"; target = null; };

    const tick = () => {
      rx += (mx - rx) * 0.22; ry += (my - ry) * 0.22;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (target) {
        const rect = target.getBoundingClientRect();
        const p = 6;
        bx += (rect.left - p - bx) * 0.3; by += (rect.top - p - by) * 0.3;
        bw += (rect.width + p * 2 - bw) * 0.3; bh += (rect.height + p * 2 - bh) * 0.3;
        b.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
        b.style.width = `${bw}px`; b.style.height = `${bh}px`;
        r.dataset.lock = "1";
      } else {
        bx = rx - 20; by = ry - 20; bw = 40; bh = 40;
        r.dataset.lock = "";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("vc-on");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden pointer-fine:block">
      <div ref={ring} className="group absolute -left-4 -top-4 h-8 w-8 opacity-0 transition-opacity duration-200">
        <svg viewBox="0 0 32 32" className="h-full w-full text-accent transition-transform duration-300 [[data-lock='1']_&]:scale-50 [[data-lock='1']_&]:rotate-45">
          <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M16 0v7M16 25v7M0 16h7M25 16h7" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div ref={box} className="absolute left-0 top-0 opacity-0 transition-opacity duration-200">
        <span className="absolute -left-px -top-px h-2.5 w-2.5 border-l-2 border-t-2 border-accent" />
        <span className="absolute -right-px -top-px h-2.5 w-2.5 border-r-2 border-t-2 border-accent" />
        <span className="absolute -bottom-px -left-px h-2.5 w-2.5 border-b-2 border-l-2 border-accent" />
        <span className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b-2 border-r-2 border-accent" />
        <span ref={label} className="absolute -top-5 left-0 whitespace-nowrap bg-accent px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-accent-fg" />
      </div>
    </div>
  );
}
