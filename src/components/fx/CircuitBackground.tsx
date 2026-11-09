"use client";

import { useEffect, useRef } from "react";

type Trace = { pts: [number, number][]; len: number; segs: number[] };
type Pulse = { tr: number; d: number; v: number };

/**
 * Site-wide PCB layer: Manhattan/45° traces with electrical pulses that
 * accelerate with scroll velocity. Static traces are pre-rendered once.
 */
export function CircuitBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const staticLayer = document.createElement("canvas");
    let W = 0, H = 0, dpr = 1, raf = 0;
    let traces: Trace[] = [];
    const pulses: Pulse[] = [];
    let accent = "#f2a65a", base = "255,255,255";
    let lastY = window.scrollY, boost = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      base = document.documentElement.dataset.theme === "light" ? "17,17,19" : "255,255,255";
    };

    const build = () => {
      const G = 34;
      const cols = Math.ceil(W / G), rows = Math.ceil(H / G);
      const count = Math.round((W * H) / 38000);
      const dirs: [number, number][] = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
      traces = [];
      for (let k = 0; k < count; k++) {
        let x = Math.floor(Math.random() * cols), y = Math.floor(Math.random() * rows);
        let di = [0, 2, 4, 6][Math.floor(Math.random() * 4)];
        const pts: [number, number][] = [[x * G, y * G]];
        const steps = 3 + Math.floor(Math.random() * 6);
        for (let s = 0; s < steps; s++) {
          const run = 1 + Math.floor(Math.random() * 4);
          x += dirs[di][0] * run; y += dirs[di][1] * run;
          pts.push([x * G, y * G]);
          const r = Math.random();
          di = (di + (r < 0.35 ? 1 : r < 0.7 ? 7 : 0)) % 8;
          if (di % 2 === 1 && Math.random() < 0.6) di = (di + (Math.random() < 0.5 ? 1 : 7)) % 8; // keep diagonals short
        }
        const segs: number[] = []; let len = 0;
        for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); len += l; }
        traces.push({ pts, len, segs });
      }
      // pre-render static traces
      staticLayer.width = W * dpr; staticLayer.height = H * dpr;
      const s = staticLayer.getContext("2d")!;
      s.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.clearRect(0, 0, W, H);
      s.lineWidth = 1; s.lineJoin = "round";
      s.strokeStyle = `rgba(${base},0.055)`;
      for (const t of traces) {
        s.beginPath(); s.moveTo(t.pts[0][0], t.pts[0][1]);
        for (const p of t.pts.slice(1)) s.lineTo(p[0], p[1]);
        s.stroke();
        for (const p of [t.pts[0], t.pts[t.pts.length - 1]]) {
          s.beginPath(); s.arc(p[0], p[1], 2.6, 0, Math.PI * 2);
          s.fillStyle = `rgba(${base},0.08)`; s.fill();
        }
      }
      pulses.length = 0;
      for (let i = 0; i < Math.min(42, traces.length); i++) pulses.push({ tr: Math.floor(Math.random() * traces.length), d: Math.random() * 400, v: 0.6 + Math.random() * 1.2 });
    };

    const at = (t: Trace, d: number): [number, number] => {
      let rem = d;
      for (let i = 0; i < t.segs.length; i++) {
        if (rem <= t.segs[i]) { const k = rem / t.segs[i]; const a = t.pts[i], b = t.pts[i + 1]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; }
        rem -= t.segs[i];
      }
      return t.pts[t.pts.length - 1];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColors(); build(); render();
    };

    function render() {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(staticLayer, 0, 0, W, H);
      if (reduce) return;
      boost *= 0.92;
      ctx.lineCap = "round";
      for (const p of pulses) {
        const t = traces[p.tr];
        p.d += p.v * (1 + boost);
        if (p.d > t.len + 40) { p.tr = Math.floor(Math.random() * traces.length); p.d = 0; p.v = 0.6 + Math.random() * 1.2; continue; }
        const head = at(t, Math.min(p.d, t.len)), tail = at(t, Math.max(0, p.d - 34));
        const g = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1]);
        g.addColorStop(0, "transparent"); g.addColorStop(1, accent);
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.75;
        // draw along the path between tail and head
        ctx.beginPath(); ctx.moveTo(tail[0], tail[1]);
        let acc = 0;
        for (let i = 0; i < t.segs.length; i++) { acc += t.segs[i]; if (acc > Math.max(0, p.d - 34) && acc < p.d) ctx.lineTo(t.pts[i + 1][0], t.pts[i + 1][1]); }
        ctx.lineTo(head[0], head[1]); ctx.stroke();
        if (p.d <= t.len) { ctx.globalAlpha = 0.9; ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(head[0], head[1], 1.6, 0, Math.PI * 2); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    }

    const loop = () => { if (!document.hidden) render(); raf = requestAnimationFrame(loop); };
    const onScroll = () => { const y = window.scrollY; boost = Math.min(9, boost + Math.abs(y - lastY) * 0.04); lastY = y; };

    resize();
    if (!reduce) raf = requestAnimationFrame(loop);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(resize, 150); };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const mo = new MutationObserver(() => { setTimeout(() => { readColors(); build(); render(); }, 750); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-mode"] });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); window.removeEventListener("scroll", onScroll); mo.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />;
}
