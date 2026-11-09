import { Mail } from "lucide-react";
import { nav, site } from "@/content/site";
import { BackToTop } from "./BackToTop";
import { Container, GithubIcon, LinkedinIcon } from "./ui";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none select-none px-2 pt-12 text-center font-serif text-[clamp(5rem,24vw,22rem)] italic leading-[0.85] tracking-[-0.04em]">
        <span style={{ backgroundImage: "linear-gradient(180deg, var(--fg) 25%, color-mix(in oklab, var(--fg) 0%, transparent) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Rohan</span>
        <span className="not-italic text-accent">.</span>
      </div>
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-1 max-w-xs font-serif text-lg italic text-fg-soft">{site.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-soft transition-colors hover:border-accent hover:text-accent"><GithubIcon /></a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-soft transition-colors hover:border-accent hover:text-accent"><LinkedinIcon /></a>
              {site.links.email && (
                <a href={`mailto:${site.links.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-soft transition-colors hover:border-accent hover:text-accent"><Mail className="h-4 w-4" /></a>
              )}
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
              {nav.map((n) => (
                <li key={n.href}><a href={`/${n.href}`} className="text-muted transition-colors hover:text-fg">{n.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. Built with Next.js & Motion.</p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
