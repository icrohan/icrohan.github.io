export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-04" -> "Apr 2026" */
export function formatMonth(ym: string) {
  if (ym === "present") return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Inclusive month count, e.g. 2026-04 → 2026-08 = 5 mo */
export function duration(start: string, end: string) {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end === "present" ? [now.getFullYear(), now.getMonth() + 1] : end.split("-").map(Number);
  const months = (ey - sy) * 12 + (em - sm) + 1;
  if (months < 12) return `${months} mo`;
  const y = Math.floor(months / 12), r = months % 12;
  return r ? `${y} yr ${r} mo` : `${y} yr`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
