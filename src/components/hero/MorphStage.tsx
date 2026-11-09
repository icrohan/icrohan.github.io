"use client";

import { Bot, BrainCircuit, Cpu, RefreshCw, ScanEye } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Mode, MODES, modeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

const META: Record<Mode, { label: string; caption: string; icon: typeof Bot; code: string }> = {
  robot: { label: "Robotics", caption: "Servos · ESP32 · embodied AI", icon: Bot, code: "LUNA_01" },
  vision: { label: "Vision", caption: "OpenCV · YOLO · tracking", icon: ScanEye, code: "CAM_02" },
  neural: { label: "Gen AI", caption: "LLMs · RAG · agents", icon: BrainCircuit, code: "LLM_03" },
  iot: { label: "IoT", caption: "Sensors · LoRa · MQTT", icon: Cpu, code: "ESP_04" },
};

const S = 500; // shape design space

/* ---------- Shape drawing (white on transparent, then sampled) ---------- */
function draw(ctx: CanvasRenderingContext2D, mode: Mode) {
  ctx.clearRect(0, 0, S, S);
  ctx.strokeStyle = ctx.fillStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const circle = (x: number, y: number, r: number, fill = false) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); fill ? ctx.fill() : ctx.stroke(); };
  const line = (x1: number, y1: number, x2: number, y2: number) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
  const rr = (x: number, y: number, w: number, h: number, r: number, fill = false) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); fill ? ctx.fill() : ctx.stroke(); };

  if (mode === "robot") {
    ctx.lineWidth = 11;
    rr(105, 120, 290, 215, 50);
    circle(190, 210, 36); circle(190, 210, 13, true);
    circle(310, 210, 36); circle(310, 210, 13, true);
    rr(185, 268, 130, 38, 14);
    for (let i = 1; i < 5; i++) { ctx.lineWidth = 6; line(185 + i * 26, 272, 185 + i * 26, 302); }
    ctx.lineWidth = 11;
    line(250, 120, 250, 72); circle(250, 56, 15, true);
    rr(72, 185, 26, 80, 10, true); rr(402, 185, 26, 80, 10, true);
    line(215, 335, 215, 362); line(285, 335, 285, 362);
    ctx.beginPath(); ctx.moveTo(95, 470); ctx.quadraticCurveTo(105, 372, 200, 365); ctx.lineTo(300, 365); ctx.quadraticCurveTo(395, 372, 405, 470); ctx.stroke();
    circle(250, 420, 18);
  } else if (mode === "vision") {
    ctx.lineWidth = 11;
    const [x1, y1, x2, y2, L] = [55, 95, 445, 415, 62];
    line(x1, y1, x1 + L, y1); line(x1, y1, x1, y1 + L); line(x2, y1, x2 - L, y1); line(x2, y1, x2, y1 + L);
    line(x1, y2, x1 + L, y2); line(x1, y2, x1, y2 - L); line(x2, y2, x2 - L, y2); line(x2, y2, x2, y2 - L);
    ctx.fillRect(55, 52, 170, 26);
    ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(100, 255); ctx.quadraticCurveTo(250, 105, 400, 255); ctx.quadraticCurveTo(250, 405, 100, 255); ctx.stroke();
    circle(250, 255, 70); circle(250, 255, 30, true);
    ctx.lineWidth = 7;
    line(250, 140, 250, 165); line(250, 345, 250, 370); line(135, 255, 158, 255); line(342, 255, 365, 255);
  } else if (mode === "neural") {
    const layers = [[110, 4], [250, 5], [390, 3]] as const;
    const pts = layers.map(([x, n]) => Array.from({ length: n }, (_, i) => [x, 250 + (i - (n - 1) / 2) * 82] as const));
    ctx.lineWidth = 3.5;
    for (let l = 0; l < pts.length - 1; l++) for (const a of pts[l]) for (const b of pts[l + 1]) line(a[0], a[1], b[0], b[1]);
    ctx.lineWidth = 9;
    for (const layer of pts) for (const [x, y] of layer) { ctx.save(); ctx.globalCompositeOperation = "destination-out"; circle(x, y, 24, true); ctx.restore(); circle(x, y, 22); circle(x, y, 7, true); }
  } else {
    ctx.lineWidth = 11;
    rr(150, 215, 200, 200, 20);
    ctx.lineWidth = 9;
    for (let i = 0; i < 5; i++) {
      const o = 245 + i * 35;
      line(o, 215, o, 188); line(o, 415, o, 442); line(150, o, 123, o); line(350, o, 377, o);
    }
    ctx.font = "bold 44px ui-monospace, Menlo, monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("ESP32", 250, 318);
    ctx.lineWidth = 10;
    for (const r of [38, 72, 106]) { ctx.beginPath(); ctx.arc(250, 160, r, Math.PI * 1.22, Math.PI * 1.78); ctx.stroke(); }
    circle(250, 160, 10, true);
  }
}

function sample(mode: Mode, off: HTMLCanvasElement): [number, number][] {
  const ctx = off.getContext("2d", { willReadFrequently: true })!;
  draw(ctx, mode);
  const { data } = ctx.getImageData(0, 0, S, S);
  const pts: [number, number][] = [];
  const step = 4;
  for (let y = 0; y < S; y += step) for (let x = 0; x < S; x += step) if (data[(y * S + x) * 4 + 3] > 140) pts.push([x, y]);
  for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; }
  return pts;
}

type P = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; s: number; ph: number };

export function MorphStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const [shape, setShape] = useState<Mode>("robot");
  const [theme, setTheme] = useState<Mode>("robot");
  const [auto, setAuto] = useState(true);
  const shapeRef = useRef<Mode>("robot");
  const setTargetsRef = useRef<(m: Mode) => void>(() => {});
  const shockRef = useRef<(x: number, y: number) => void>(() => {});

  // sync with saved mode
  useEffect(() => {
    const m = (document.documentElement.dataset.mode as Mode) || "robot";
    if (MODES.includes(m)) { setTheme(m); setShape(m); shapeRef.current = m; }
    // returning visitors who chose a system keep it locked
    try { if (localStorage.getItem("mode")) setAuto(false); } catch {}
  }, []);

  const pick = useCallback((m: Mode) => {
    setAuto(false); setShape(m); setTheme(m);
    document.documentElement.dataset.mode = m;
    try { localStorage.setItem("mode", m); } catch {}
  }, []);

  // auto-cycle shapes until the visitor picks one
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setShape((s) => MODES[(MODES.indexOf(s) + 1) % MODES.length]), 5200);
    return () => clearInterval(id);
  }, [auto]);

  useEffect(() => { shapeRef.current = shape; setTargetsRef.current(shape); }, [shape]);

  // engine
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const off = document.createElement("canvas"); off.width = off.height = S;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cache = new Map<Mode, [number, number][]>();
    const getPts = (m: Mode) => { if (!cache.has(m)) cache.set(m, sample(m, off)); return cache.get(m)!; };

    let W = 0, H = 0, scale = 1, ox = 0, oy = 0, raf = 0, visible = true, t = 0;
    const N = window.innerWidth < 640 ? 950 : 1700;
    const parts: P[] = Array.from({ length: N }, (_, i) => ({ x: Math.random() * 500, y: Math.random() * 500, vx: 0, vy: 0, tx: 0, ty: 0, s: i % 9 === 0 ? 2.4 : 1.5, ph: Math.random() * Math.PI * 2 }));
    const mouse = { x: -1e4, y: -1e4 };
    let color = modeColors.robot[0];
    const readColor = () => {
      const light = document.documentElement.dataset.theme === "light";
      color = modeColors[shapeRef.current][light ? 1 : 0];
    };

    const setTargets = (m: Mode) => {
      const pts = getPts(m);
      parts.forEach((p, i) => {
        const [x, y] = pts[i % pts.length];
        p.tx = ox + x * scale + (Math.random() - 0.5) * 1.5;
        p.ty = oy + y * scale + (Math.random() - 0.5) * 1.5;
        if (!reduce) { p.vx += (Math.random() - 0.5) * 9; p.vy += (Math.random() - 0.5) * 9; }
        else { p.x = p.tx; p.y = p.ty; }
      });
      readColor();
      if (reduce) frame();
    };
    setTargetsRef.current = setTargets;

    shockRef.current = (x, y) => {
      for (const p of parts) {
        const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy) || 1;
        if (d < 220) { const f = (1 - d / 220) * 22; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
      }
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = (Math.min(W, H) / S) * 0.94;
      ox = (W - S * scale) / 2; oy = (H - S * scale) / 2;
      setTargets(shapeRef.current);
    };

    let frames = 0, fpsT = performance.now();
    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      const light = document.documentElement.dataset.theme === "light";
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      const scanY = ((t * 70) % (H + 120)) - 60;
      ctx.fillStyle = color;
      const near: P[] = [];
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!reduce) {
          const bx = p.tx + Math.sin(t * 1.3 + p.ph) * 1.1, by = p.ty + Math.cos(t * 1.1 + p.ph) * 1.1;
          p.vx += (bx - p.x) * 0.045; p.vy += (by - p.y) * 0.045;
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 10000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 100) * 3.2; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
          p.vx *= 0.84; p.vy *= 0.84; p.x += p.vx; p.y += p.vy;
        }
        if (Math.abs(p.y - scanY) < 10) { near.push(p); continue; }
        ctx.globalAlpha = 0.55 + Math.min(0.45, Math.abs(p.vx) + Math.abs(p.vy));
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      // scanline highlight
      ctx.globalAlpha = 1;
      ctx.fillStyle = light ? "#111" : "#fff";
      for (const p of near) ctx.fillRect(p.x - 0.5, p.y - 0.5, p.s + 1, p.s + 1);
      if (!reduce) {
        const g = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
        g.addColorStop(0, "transparent"); g.addColorStop(0.5, color); g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.18; ctx.fillStyle = g; ctx.fillRect(0, scanY - 18, W, 36);
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
      // fps readout (real)
      frames++; const now = performance.now();
      if (now - fpsT > 1000) { if (fpsRef.current) fpsRef.current.textContent = String(Math.round((frames * 1000) / (now - fpsT))); frames = 0; fpsT = now; }
    }
    const loop = () => { if (visible && !document.hidden) frame(); raf = requestAnimationFrame(loop); };

    resize();
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);
    const mo = new MutationObserver(() => { readColor(); if (reduce) frame(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (coordRef.current) coordRef.current.textContent = mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H ? `${Math.round(mouse.x)},${Math.round(mouse.y)}` : "—";
    };
    const onLeave = () => { mouse.x = mouse.y = -1e4; };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); window.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", onLeave); };
  }, []);

  const meta = META[shape];

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="hud-corners relative aspect-square rounded-sm border border-line bg-[radial-gradient(circle_at_50%_45%,var(--glow),transparent_65%)]">
        <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          aria-label={`Particle visualization currently forming: ${meta.label}`}
          role="img"
          onPointerDown={(e) => { const r = e.currentTarget.getBoundingClientRect(); shockRef.current(e.clientX - r.left, e.clientY - r.top); }}
        />
        {/* HUD readouts — all values are live */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#e5484d] blink" /> feed://{meta.code}</span>
          <span><span ref={fpsRef}>--</span> fps</span>
        </div>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
          <span>xy <span ref={coordRef}>—</span></span>
          <span className="hidden sm:inline">click to disturb</span>
          <span>{auto ? "auto-cycle" : "locked"}</span>
        </div>
      </div>

      {/* Mode selector — re-themes the entire site */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Select system · retunes the site</p>
          {!auto && (
            <button type="button" onClick={() => setAuto(true)} className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-fg">
              <RefreshCw className="h-3 w-3" /> cycle
            </button>
          )}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Site theme">
          {MODES.map((m) => {
            const M = META[m], Icon = M.icon, on = theme === m, showing = shape === m;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => pick(m)}
                className={cn(
                  "group relative flex flex-col items-center gap-1.5 rounded-md border px-2 py-2.5 transition-all",
                  on ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                <Icon className={cn("h-4 w-4", (on || showing) && "text-accent")} />
                <span className="text-[11px] font-medium">{M.label}</span>
                {showing && <span className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-accent" />}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center font-mono text-[11px] text-muted">{meta.caption}</p>
      </div>
    </div>
  );
}
