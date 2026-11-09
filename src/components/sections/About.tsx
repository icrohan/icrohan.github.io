import { BrainCircuit, Code2, Cpu, Eye } from "lucide-react";
import Image from "next/image";
import { about, timeline } from "@/content/profile";
import { VisionPortrait } from "../hero/VisionPortrait";
import { Reveal } from "../Reveal";
import { Section } from "../ui";
import { cn } from "@/lib/utils";

const pillars = [
  { icon: BrainCircuit, title: "Generative AI", text: "LLM apps, RAG, agents, evaluation" },
  { icon: Eye, title: "Computer Vision", text: "Detection, tracking, pose, video" },
  { icon: Code2, title: "Full-Stack", text: "React, Spring Cloud, APIs" },
  { icon: Cpu, title: "IoT & Robotics", text: "ESP32, LoRa, MQTT, servos" },
];

const kindColor: Record<string, string> = {
  education: "bg-fg", work: "bg-accent", ai: "bg-[var(--signal)]", build: "bg-fg-soft", cert: "bg-accent",
};

export function About() {
  return (
    <Section code="01" id="about" eyebrow="About" title={<>From research ideas to <span className="font-serif italic font-normal text-accent">systems that work.</span></>}>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="text-xl leading-relaxed text-fg sm:text-2xl">{about.lead}</p>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="mt-5 leading-relaxed text-fg-soft">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <blockquote className="mt-8 border-l-2 border-accent pl-5 font-serif text-xl italic leading-snug text-fg">
              {about.belief}
            </blockquote>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.05 * i}>
                <div className="panel h-full rounded-xl p-4">
                  <p.icon className="h-5 w-5 text-accent" aria-hidden />
                  <p className="mt-3 text-sm font-medium">{p.title}</p>
                  <p className="mt-1 text-xs text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="panel mt-3 flex items-center gap-4 rounded-xl p-4">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-line-strong">
                <Image src={about.education.logo} alt={`${about.education.school} logo`} width={48} height={48} className="h-full w-full object-contain p-1" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{about.education.degree}</p>
                <p className="text-xs text-muted">{about.education.school} · {about.education.period}</p>
              </div>
              <span className="ml-auto font-mono text-sm text-accent">{about.education.detail}</span>
            </div>
          </Reveal>
        </div>

        {/* Operator + journey timeline */}
        <div>
          <Reveal>
            <div className="mx-auto mb-12 max-w-[360px] lg:mx-0">
              <VisionPortrait alt="Portrait of Rohan Immidichetty" />
            </div>
          </Reveal>
          <Reveal><p className="eyebrow mb-6">The journey so far</p></Reveal>
          <ol className="relative">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-line-strong via-line-strong to-transparent" aria-hidden />
            {timeline.map((t, i) => (
              <li key={t.title} className="relative pb-7 pl-9 last:pb-0">
                <Reveal delay={0.04 * i} y={10}>
                  <span className={cn("absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-4 border-bg", kindColor[t.kind])} aria-hidden />
                  <p className="font-mono text-xs text-muted">{t.date}</p>
                  <p className="mt-1 font-medium tracking-tight">{t.title}</p>
                  <p className="mt-0.5 text-sm text-fg-soft">{t.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
