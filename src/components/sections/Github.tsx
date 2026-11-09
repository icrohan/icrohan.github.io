import { ArrowUpRight, Star } from "lucide-react";
import { experience } from "@/content/experience";
import { moreProjects, projects } from "@/content/projects";
import { site } from "@/content/site";
import { getGithubData, languageBreakdown, languageColors, recentRepos } from "@/lib/github";
import { formatDate } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { ButtonLink, GithubIcon } from "../ui";

const repoName = (url?: string) => url?.match(/github\.com\/[^/]+\/([^/?#]+)/)?.[1];

/** Every repo already linked from a project, "more builds" or experience — the activity list skips these. */
const linkedRepos = new Set(
  [
    ...projects.flatMap((p) => [p.repo, ...(p.related ?? []).map((r) => r.href)]),
    ...moreProjects.map((p) => p.repo),
    ...experience.map((e) => e.link?.href),
  ]
    .map(repoName)
    .filter((n): n is string => !!n),
);

const pretty = (name: string) => name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

export async function GithubSection() {
  const data = await getGithubData();

  if (!data.ok) {
    return (
      <div className="panel flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Live repository data is unavailable right now.</p>
          <p className="mt-1 text-sm text-muted">Browse everything directly on GitHub.</p>
        </div>
        <ButtonLink href={site.links.github} variant="secondary"><GithubIcon /> github.com/{site.githubUsername}</ButtonLink>
      </div>
    );
  }

  const repos = recentRepos(data.repos, linkedRepos, 6);
  const langs = languageBreakdown(data.repos);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <Reveal className="h-full">
        <div className="panel flex h-full flex-col rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-elev-2"><GithubIcon className="h-5 w-5" /></span>
            <div>
              <p className="font-medium">@{site.githubUsername}</p>
              <p className="text-xs text-muted">Live from the GitHub API</p>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            <div><dt className="text-xs text-muted">Public repositories</dt><dd className="mt-1 text-3xl font-semibold tracking-tight">{data.profile.public_repos}</dd></div>
            <div><dt className="text-xs text-muted">Followers</dt><dd className="mt-1 text-3xl font-semibold tracking-tight">{data.profile.followers}</dd></div>
          </dl>
          <p className="mt-8 text-xs text-muted">Primary languages across repositories</p>
          <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-elev-2" aria-hidden>
            {langs.map((l) => <span key={l.name} style={{ width: `${l.pct}%`, background: languageColors[l.name] ?? "var(--muted)" }} />)}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {langs.map((l) => (
              <li key={l.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: languageColors[l.name] ?? "var(--muted)" }} />
                <span className="text-fg-soft">{l.name}</span>
                <span className="ml-auto font-mono text-xs text-muted">{l.count}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href={site.links.github} variant="secondary" className="mt-8 self-start">
            View all repositories <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal className="h-full">
        <div className="panel flex h-full flex-col rounded-2xl">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <p className="eyebrow">Recently pushed</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">git log --all</p>
          </div>
          {repos.length > 0 ? (
            <ul className="divide-y divide-line">
              {repos.map((r) => (
                <li key={r.name}>
                  <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-6 py-4 transition-colors hover:bg-elev-2/50">
                    <span className="min-w-0">
                      <span className="block truncate font-medium tracking-tight transition-colors group-hover:text-accent">{pretty(r.name)}</span>
                      {r.description && <span className="mt-0.5 block truncate text-sm text-muted">{r.description}</span>}
                    </span>
                    <span className="flex items-center gap-4 font-mono text-[11px] text-muted">
                      {r.language && (
                        <span className="hidden items-center gap-1.5 sm:flex">
                          <span className="h-2 w-2 rounded-full" style={{ background: languageColors[r.language] ?? "var(--muted)" }} />{r.language}
                        </span>
                      )}
                      {r.stargazers_count > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3" />{r.stargazers_count}</span>}
                      <span className="w-[86px] text-right">{formatDate(r.pushed_at)}</span>
                      <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-accent" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-8 text-sm text-muted">Everything recent is already featured above.</p>
          )}
        </div>
      </Reveal>
    </div>
  );
}

export function GithubSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]" aria-busy="true" aria-label="Loading GitHub data">
      <div className="h-[420px] animate-pulse rounded-2xl bg-elev" />
      <div className="h-[420px] animate-pulse rounded-2xl bg-elev" />
    </div>
  );
}
