import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { site } from "@/content/site";
import { Reveal } from "../Reveal";
import { Container, GithubIcon, HudLabel, LinkedinIcon } from "../ui";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const links = [
    site.links.email && { href: `mailto:${site.links.email}`, label: "Email me", sub: site.links.email, icon: Mail },
    { href: site.links.linkedin, label: "LinkedIn", sub: "rohan-immidichetty", icon: LinkedinIcon },
    { href: site.links.github, label: "GitHub", sub: `@${site.githubUsername}`, icon: GithubIcon },
    site.links.phone && { href: `tel:${site.links.phone.replace(/\s+/g, "")}`, label: "Phone", sub: site.links.phone, icon: Phone },
    site.links.resume && { href: site.links.resume, label: "Download résumé", sub: "PDF", icon: Download, download: true },
  ].filter(Boolean) as { href: string; label: string; sub: string; icon: ComponentType<{ className?: string }>; download?: boolean }[];

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,var(--glow),transparent)]" aria-hidden />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <HudLabel code="09" text="Contact" />
              <h2 id="contact-title" className="mt-5 font-serif text-5xl font-normal leading-[1] tracking-[-0.01em] text-balance sm:text-7xl">
                Have an interesting <span className="font-serif italic font-normal text-accent">problem</span> to solve?
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-fg-soft">
                I&apos;m always interested in connecting with engineers, founders, researchers, and teams building meaningful AI-powered products.
              </p>
            </Reveal>
            <ul className="mt-10 space-y-2">
              {links.map((l, i) => (
                <Reveal as="li" key={l.label} delay={0.05 * i}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(l.download ? { download: true } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-elev/50 px-4 py-3.5 transition-colors hover:border-accent/50"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-elev-2 text-fg-soft transition-colors group-hover:text-accent"><l.icon className="h-4 w-4" /></span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{l.label}</span>
                      <span className="block truncate text-xs text-muted">{l.sub}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </Container>
    </section>
  );
}
