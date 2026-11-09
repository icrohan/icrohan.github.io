import { ArrowDownRight, ArrowRight, Download, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink, Container, GithubIcon, LinkedinIcon } from "../ui";
import { HeroIntro } from "./HeroIntro";
import { MorphStage } from "./MorphStage";
import { RoleRotator } from "./RoleRotator";

export function Hero() {
  const [first, ...rest] = site.name.split(" ");
  return (
    <section className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20" aria-label="Introduction">
      <div className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" aria-hidden />
      <div className="absolute right-[-10%] top-[5%] -z-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" aria-hidden />

      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <HeroIntro>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">rohan.os</span>
            <span aria-hidden>/</span>
            <span>operator profile</span>
            {site.availability.show && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev/70 px-2.5 py-1 normal-case tracking-normal text-fg-soft backdrop-blur">
                <span className={site.availability.open ? "pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--signal)]" : "h-1.5 w-1.5 rounded-full bg-muted"} aria-hidden />
                {site.availability.label}
              </span>
            )}
          </div>

          <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,5.2rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            <span className="block text-gradient">{first}</span>
            <span className="block text-gradient">{rest.join(" ")}<span className="text-accent">.</span></span>
          </h1>

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2 font-mono text-base sm:text-lg">
            <span className="text-muted">&gt; role:</span>
            <RoleRotator roles={site.rotatingRoles} />
          </p>

          <p className="mt-6 max-w-xl font-serif text-2xl italic leading-snug text-fg sm:text-[1.9rem]">
            I build machines that <span className="text-accent">see</span>, <span className="text-accent">think</span>, <span className="text-accent">sense</span> and <span className="text-accent">move</span>.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-soft">{site.description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects">
              View my work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </ButtonLink>
            {site.links.resume && (
              <ButtonLink href={site.links.resume} variant="secondary" download>
                <Download className="h-4 w-4" /> Resume
              </ButtonLink>
            )}
            <ButtonLink href="#contact" variant="secondary">
              Let&apos;s connect <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
              <GithubIcon /> icrohan
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
              <LinkedinIcon /> LinkedIn
            </a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {site.location}</span>
          </div>
        </HeroIntro>

        <div className="hero-in" style={{ animationDelay: "300ms" }}>
          <MorphStage />
        </div>
      </Container>
    </section>
  );
}
