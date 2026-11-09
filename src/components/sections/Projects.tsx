import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { MoreProjects } from "../projects/MoreProjects";
import { PipelineDiagram } from "../projects/PipelineDiagram";
import { ProjectCard } from "../projects/ProjectCard";
import { Reveal } from "../Reveal";
import { Section } from "../ui";

export function Projects() {
  const [lead, ...rest] = projects;
  return (
    <Section
      code="03"
      id="projects"
      eyebrow="Selected work"
      title={<>Five systems where AI meets <span className="font-serif italic font-normal text-accent">the physical world.</span></>}
      intro="One case study per discipline — generative AI, computer vision, robotics, IoT and full-stack — each built around a concrete problem."
    >
      <div className="grid gap-5">
        {/* Lead project with its live architecture */}
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <ProjectCard project={lead} index={0} />
            <div className="flex flex-col">
              <PipelineDiagram stages={lead.architecture} note={lead.architectureNote} title="Live pipeline · egocentric video QC" />
              <Link href={`/projects/${lead.slug}`} className="group mt-3 inline-flex items-center gap-1.5 self-end text-sm text-muted transition-colors hover:text-accent">
                Read the full breakdown <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * (i % 2)} className="h-full">
              <ProjectCard project={p} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
      <MoreProjects />
    </Section>
  );
}
