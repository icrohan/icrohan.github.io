import type { ReactNode } from "react";
import type { Project } from "@/content/projects";

/**
 * Illustrated, theme-aware cover art per project domain.
 * Replaced automatically by the first image in `project.media` when you add screenshots.
 */
export function ProjectCover({ visual, className }: { visual: Project["visual"]; className?: string }) {
  return (
    <svg viewBox="0 0 400 240" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`g-${visual}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`r-${visual}`} cx="70%" cy="20%" r="80%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="var(--bg-elev-2)" />
      <rect width="400" height="240" fill={`url(#g-${visual})`} />
      <rect width="400" height="240" fill={`url(#r-${visual})`} />
      {art[visual]}
    </svg>
  );
}

const A = "var(--accent)";
const S = "var(--signal)";
const F = "var(--fg-soft)";
const mono = { fontFamily: "var(--font-mono)", fontSize: 9 } as const;

const art: Record<Project["visual"], ReactNode> = {
  vision: (
    <g>
      <line x1="40" y1="170" x2="360" y2="170" stroke={A} strokeWidth="1.5" strokeDasharray="6 5" />
      <text x="44" y="185" fill={A} {...mono}>ENTRY LINE</text>
      <path d="M90 210 C 140 180, 170 150, 210 120" fill="none" stroke={S} strokeWidth="1.5" className="flow-line" />
      <path d="M330 60 C 300 90, 280 130, 260 175" fill="none" stroke={S} strokeWidth="1.5" className="flow-line" />
      <rect x="180" y="80" width="80" height="54" rx="3" fill="none" stroke={A} strokeWidth="2" />
      <rect x="180" y="68" width="74" height="13" fill={A} />
      <text x="184" y="77.5" fill="var(--accent-fg)" {...mono}>vehicle · 07</text>
      <rect x="236" y="150" width="58" height="42" rx="3" fill="none" stroke={S} strokeWidth="2" />
      <rect x="236" y="138" width="56" height="13" fill={S} />
      <text x="240" y="147.5" fill="var(--bg)" {...mono}>bike · 12</text>
      <rect x="196" y="118" width="30" height="10" rx="2" fill="none" stroke={F} strokeDasharray="2 2" />
      <text x="40" y="40" fill={F} {...mono}>CAM-02 · REC</text>
      <circle cx="34" cy="37" r="3" fill="#e5484d" className="pulse-dot" />
    </g>
  ),
  pipeline: (
    <g>
      {[60, 140, 220, 300].map((x, i) => (
        <g key={x}>
          <rect x={x - 26} y="96" width="52" height="48" rx="8" fill="var(--bg-elev)" stroke={i === 2 ? A : "var(--line-strong)"} />
          <text x={x} y="124" textAnchor="middle" fill={i === 2 ? A : F} {...mono}>{["video", "frames", "VLM", "pose"][i]}</text>
          {i < 3 && <line x1={x + 26} y1="120" x2={x + 54} y2="120" stroke={A} strokeWidth="1.5" className="flow-line" />}
        </g>
      ))}
      <line x1="326" y1="120" x2="360" y2="120" stroke={A} strokeWidth="1.5" className="flow-line" />
      {[["KEEP", S, 60], ["REVIEW", A, 168], ["REMOVE", "#e5484d", 290]].map(([t, c, x]) => (
        <g key={t as string}>
          <rect x={x as number} y="176" width="70" height="20" rx="10" fill="none" stroke={c as string} />
          <text x={(x as number) + 35} y="189" textAnchor="middle" fill={c as string} {...mono}>{t as string}</text>
        </g>
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={40 + i * 13.5} y="48" width="10" height="22" rx="1.5" fill={i % 5 === 3 ? "#e5484d" : i % 7 === 0 ? A : "var(--line-strong)"} opacity={0.8} />
      ))}
    </g>
  ),
  robot: (
    <g>
      <rect x="160" y="58" width="80" height="70" rx="22" fill="var(--bg-elev)" stroke="var(--line-strong)" strokeWidth="1.5" />
      <circle cx="185" cy="92" r="7" fill={S} className="pulse-dot" />
      <circle cx="215" cy="92" r="7" fill={S} className="pulse-dot" />
      <path d="M186 112 Q200 120 214 112" fill="none" stroke={F} strokeWidth="2" strokeLinecap="round" />
      <rect x="170" y="134" width="60" height="62" rx="12" fill="var(--bg-elev)" stroke="var(--line-strong)" strokeWidth="1.5" />
      <path d="M230 150 L268 168 L292 160" fill="none" stroke={A} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="268" cy="168" r="5" fill="var(--bg)" stroke={A} strokeWidth="2" />
      <path d="M170 150 L140 178" stroke="var(--line-strong)" strokeWidth="5" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${258 + i * 12} ${78 - i * 6} q 10 14 0 28`} fill="none" stroke={A} strokeWidth="1.5" opacity={1 - i * 0.28} />
      ))}
      <text x="300" y="166" fill={A} {...mono}>servo</text>
      <text x="282" y="70" fill={F} {...mono}>tts</text>
    </g>
  ),
  sensors: (
    <g>
      {[0, 1, 2, 3].map((r) => (
        <path key={r} d={`M20 ${150 + r * 22} Q 200 ${130 + r * 22} 380 ${150 + r * 22}`} fill="none" stroke="var(--line-strong)" />
      ))}
      {[[90, 140, "T°"], [200, 128, "RH"], [310, 140, "SOIL"], [150, 172, "AQ"], [260, 168, "pH"]].map(([x, y, t]) => (
        <g key={t as string}>
          <circle cx={x as number} cy={y as number} r="5" fill={A} />
          <circle cx={x as number} cy={y as number} r="12" fill="none" stroke={A} opacity="0.4" className="pulse-dot" />
          <text x={(x as number) + 9} y={(y as number) - 9} fill={F} {...mono}>{t as string}</text>
          <line x1={x as number} y1={(y as number) - 6} x2="200" y2="58" stroke={S} strokeOpacity="0.45" className="flow-line" />
        </g>
      ))}
      <rect x="172" y="34" width="56" height="26" rx="6" fill="var(--bg-elev)" stroke={S} />
      <text x="200" y="51" textAnchor="middle" fill={S} {...mono}>MQTT</text>
    </g>
  ),
  mesh: (
    <g>
      {(() => {
        const pts: [number, number][] = [[70, 80], [130, 160], [190, 70], [250, 170], [110, 200], [230, 110], [60, 150]];
        const links = [[0, 2], [0, 6], [6, 1], [1, 4], [1, 5], [2, 5], [5, 3], [1, 3]];
        return (
          <>
            {links.map(([a, b]) => <line key={`${a}${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={S} strokeOpacity="0.5" className="flow-line" />)}
            <line x1={pts[3][0]} y1={pts[3][1]} x2="330" y2="96" stroke={A} strokeWidth="1.5" className="flow-line" />
            {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill="var(--bg-elev)" stroke={S} strokeWidth="2" />)}
          </>
        );
      })()}
      <line x1="330" y1="96" x2="330" y2="56" stroke={A} strokeWidth="2" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${318 - i * 8} ${54 - i * 6} a ${12 + i * 8} ${12 + i * 8} 0 0 1 ${24 + i * 16} 0`} fill="none" stroke={A} opacity={1 - i * 0.3} />)}
      <rect x="306" y="96" width="48" height="26" rx="5" fill="var(--bg-elev)" stroke={A} />
      <text x="330" y="113" textAnchor="middle" fill={A} {...mono}>LoRa</text>
      <text x="40" y="40" fill={F} {...mono}>ESP-NOW MESH</text>
    </g>
  ),
  home: (
    <g>
      <path d="M120 120 L200 60 L280 120 V196 H120 Z" fill="var(--bg-elev)" stroke="var(--line-strong)" strokeWidth="1.5" />
      <rect x="146" y="134" width="40" height="30" rx="4" fill="none" stroke={A} />
      <circle cx="166" cy="149" r="5" fill={A} className="pulse-dot" />
      <rect x="214" y="134" width="40" height="30" rx="4" fill="none" stroke="var(--line-strong)" />
      <circle cx="234" cy="149" r="5" fill="var(--line-strong)" />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={300} y={78 + i * 44} width="64" height="28" rx="14" fill="var(--bg-elev)" stroke="var(--line-strong)" />
          <circle cx={i === 0 ? 350 : 314} cy={92 + i * 44} r="10" fill={i === 0 ? A : "var(--line-strong)"} />
        </g>
      ))}
      <line x1="280" y1="110" x2="300" y2="92" stroke={S} className="flow-line" />
      <text x="40" y="40" fill={F} {...mono}>home/livingroom/light → ON</text>
    </g>
  ),
  chain: (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const x = 46 + i * 84;
        return (
          <g key={i}>
            <rect x={x} y="88" width="62" height="64" rx="8" fill="var(--bg-elev)" stroke={i === 3 ? A : "var(--line-strong)"} strokeWidth="1.5" />
            <text x={x + 8} y="106" fill={i === 3 ? A : F} {...mono}>#{1040 + i}</text>
            <rect x={x + 8} y="114" width="46" height="5" rx="2" fill="var(--line-strong)" />
            <rect x={x + 8} y="124" width="34" height="5" rx="2" fill="var(--line-strong)" />
            <text x={x + 8} y="144" fill={S} {...mono}>0x{(0xa3f + i * 791).toString(16)}</text>
            {i < 3 && <line x1={x + 62} y1="120" x2={x + 84} y2="120" stroke={A} strokeWidth="2" className="flow-line" />}
          </g>
        );
      })}
      <text x="46" y="186" fill={F} {...mono}>contract.verify(role, record) ✓</text>
    </g>
  ),
  services: (
    <g>
      <rect x="150" y="26" width="100" height="30" rx="6" fill="var(--bg-elev)" stroke="var(--line-strong)" />
      <text x="200" y="45" textAnchor="middle" fill={F} {...mono}>React UI</text>
      <line x1="200" y1="56" x2="200" y2="78" stroke={A} strokeWidth="1.5" className="flow-line" />
      <rect x="135" y="78" width="130" height="32" rx="6" fill="var(--bg-elev)" stroke={A} strokeWidth="1.5" />
      <text x="200" y="98" textAnchor="middle" fill={A} {...mono}>API GATEWAY · JWT</text>
      {["auth", "product", "backlog", "release"].map((n, i) => {
        const x = 40 + i * 84;
        return (
          <g key={n}>
            <path d={`M200 110 V128 H${x + 34} V146`} fill="none" stroke={S} strokeOpacity="0.6" className="flow-line" />
            <rect x={x} y="146" width="68" height="30" rx="6" fill="var(--bg-elev)" stroke="var(--line-strong)" />
            <text x={x + 34} y="165" textAnchor="middle" fill={F} {...mono}>{n}</text>
            <line x1={x + 34} y1="176" x2={x + 34} y2="192" stroke="var(--line-strong)" />
            <ellipse cx={x + 34} cy="197" rx="16" ry="5" fill="none" stroke={S} />
            <path d={`M${x + 18} 197 v12 a16 5 0 0 0 32 0 v-12`} fill="none" stroke={S} />
          </g>
        );
      })}
      <rect x="300" y="78" width="70" height="32" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="3 3" />
      <text x="335" y="98" textAnchor="middle" fill={F} {...mono}>eureka</text>
      <line x1="265" y1="94" x2="300" y2="94" stroke="var(--line-strong)" strokeDasharray="2 3" />
    </g>
  ),
};
