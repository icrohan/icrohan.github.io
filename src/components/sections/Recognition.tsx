import { Award, BadgeCheck, Camera, ExternalLink, Newspaper, Trophy, Tv, Users } from "lucide-react";
import Image from "next/image";
import { achievements, certifications, highlights, mediaFeatures, mediaGallery } from "@/content/profile";
import { CountUp } from "../CountUp";
import { Reveal } from "../Reveal";
import { Section } from "../ui";

const tagIcon = { Hackathon: Trophy, Organizer: Users, Community: Award } as const;
const placeholders = [
  { icon: Newspaper, label: "Newspaper clipping" },
  { icon: Tv, label: "Television feature" },
  { icon: BadgeCheck, label: "Certificate" },
  { icon: Camera, label: "Event photo" },
];

export function Recognition() {
  return (
    <Section code="06" id="recognition" eyebrow="Recognition" title={<>Built at hackathons. <span className="font-serif italic font-normal text-accent">Noticed beyond them.</span></>}>
      {/* stats */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {highlights.map((h, i) => (
          <Reveal key={h.label} delay={0.05 * i} className="bg-bg">
            <div className="p-6 sm:p-8">
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl"><CountUp value={h.value} /></p>
              <p className="mt-2 text-sm text-muted">{h.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">Hackathons & community</p>
          <ul className="space-y-3">
            {achievements.map((a, i) => {
              const Icon = tagIcon[a.tag as keyof typeof tagIcon] ?? Award;
              return (
                <Reveal as="li" key={a.title} delay={0.04 * i} className="panel flex items-start gap-4 rounded-xl p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><Icon className="h-5 w-5" /></span>
                    <div>
                      <p className="font-medium tracking-tight">{a.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{a.detail}</p>
                    </div>
                    <span className="ml-auto rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">{a.tag}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">In the media</p>
          <ul className="space-y-3">
            {mediaFeatures.map((m, i) => (
              <Reveal as="li" key={m.title} delay={0.04 * i} className="flex items-baseline gap-4 border-b border-line pb-3">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium tracking-tight">{m.title}</p>
                    <p className="text-sm text-muted">{m.detail}</p>
                  </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {mediaGallery.length > 0
              ? mediaGallery.map((m) => (
                  <figure key={m.src} className="overflow-hidden rounded-xl border border-line">
                    <div className="relative aspect-[4/3]"><Image src={m.src} alt={m.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" /></div>
                    <figcaption className="px-3 py-2 text-xs text-muted">{m.caption}</figcaption>
                  </figure>
                ))
              : placeholders.map((p) => (
                  <div key={p.label} className="grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-line-strong bg-elev/40 text-center">
                    <span>
                      <p.icon className="mx-auto h-5 w-5 text-muted" aria-hidden />
                      <span className="mt-2 block text-xs text-muted">{p.label}</span>
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div id="certifications" className="mt-20 scroll-mt-24">
        <p className="eyebrow mb-5">Certifications</p>
        <div className="grid gap-4 md:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={0.05 * i} className="h-full">
              <div className="panel group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" aria-hidden />
                <BadgeCheck className="h-6 w-6 text-accent" aria-hidden />
                <p className="mt-5 font-medium leading-snug tracking-tight">{c.name}</p>
                <p className="mt-1 text-sm text-muted">{c.issuer}{c.date ? ` · ${c.date}` : ""}</p>
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm text-accent hover:underline">
                    Verify credential <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
