export type Mode = "robot" | "vision" | "neural" | "iot";
export const MODES: Mode[] = ["robot", "vision", "neural", "iot"];

/** Accent per mode: [dark theme, light theme]. Mirrors the CSS in globals.css. */
export const modeColors: Record<Mode, [string, string]> = {
  robot: ["#f2a65a", "#b85c12"],
  vision: ["#5fd39a", "#0d7f52"],
  neural: ["#a48bff", "#6342d6"],
  iot: ["#4cc2ff", "#0a74ad"],
};

/** Inline script (site is light-only) that applies the saved mode before paint (prevents a flash) and skips the boot screen after the first visit. */
export const themeScript = `(function(){var d=document.documentElement;d.dataset.theme='light';try{var m=localStorage.getItem('mode');d.dataset.mode=['robot','vision','neural','iot'].indexOf(m)>-1?m:'robot';if(sessionStorage.getItem('booted'))d.dataset.booted='1';}catch(e){d.dataset.mode='robot';}})();`;
