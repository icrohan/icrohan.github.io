import { site } from "@/content/site";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type GithubProfile = { public_repos: number; followers: number; html_url: string };

export type GithubData =
  | { ok: true; profile: GithubProfile; repos: Repo[] }
  | { ok: false; error: string };

const headers = (): HeadersInit => {
  const h: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
};

/** Fetches GitHub data at build time (the deploy workflow rebuilds daily). Never throws. */
export async function getGithubData(): Promise<GithubData> {
  const user = site.githubUsername;
  try {
    const [pRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers: headers(), next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, { headers: headers(), next: { revalidate: 3600 } }),
    ]);
    if (!pRes.ok || !rRes.ok) return { ok: false, error: `GitHub API responded ${pRes.status}/${rRes.status}` };
    const profile = (await pRes.json()) as GithubProfile;
    const all = ((await rRes.json()) as Repo[]).filter((r) => !r.fork && !r.archived && r.name !== user);
    return { ok: true, profile, repos: all };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

/** Most recently pushed repos that aren't already linked elsewhere on the site. */
export function recentRepos(repos: Repo[], exclude: Set<string>, count = 6): Repo[] {
  return [...repos]
    .filter((r) => !exclude.has(r.name))
    .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1))
    .slice(0, count);
}

export function languageBreakdown(repos: Repo[]) {
  const counts = new Map<string, number>();
  for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, n]) => ({ name, count: n, pct: total ? (n / total) * 100 : 0 }));
}

export const languageColors: Record<string, string> = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", Java: "#b07219", "C++": "#f34b7d", C: "#555555",
  "Jupyter Notebook": "#DA5B0B", Dart: "#00B4AB", PHP: "#4F5D95", Solidity: "#AA6746", HTML: "#e34c26",
};
