import { Suspense } from "react";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { ApproachLoop } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { ExperienceList } from "@/components/sections/Experience";
import { GithubSection, GithubSkeleton } from "@/components/sections/Github";
import { Projects } from "@/components/sections/Projects";
import { Recognition } from "@/components/sections/Recognition";
import { SkillsGrid } from "@/components/sections/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Writing } from "@/components/sections/Writing";
import { Section } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />

      <Section
        id="experience"
        code="02"
        eyebrow="Experience"
        title={<>Enterprise engineering, <span className="font-serif italic font-normal text-accent">and inside the AI training loop.</span></>}
        intro="From Spring Cloud microservices at Cognizant to evaluating LLM outputs in human-in-the-loop workflows. Each role is listed with its real dates."
      >
        <ExperienceList />
      </Section>

      <Projects />

      <Section
        id="approach"
        code="04"
        eyebrow="Forward Deployed AI Engineering"
        title={<>From problem discovery <span className="font-serif italic font-normal text-accent">to production deployment.</span></>}
        intro="How I approach a real-world problem: start with the people and constraints, design the whole system, then build, measure and iterate. Click any step."
        className="bg-elev/30"
      >
        <ApproachLoop />
      </Section>

      <Section
        id="skills"
        code="05"
        eyebrow="Skills"
        title={<>A toolkit that spans <span className="font-serif italic font-normal text-accent">models to microcontrollers.</span></>}
        intro="Grouped by domain, with an honest level for each: experienced, hands-on, or familiar."
      >
        <SkillsGrid />
      </Section>

      <Recognition />

      <Section id="github" code="07" eyebrow="Open source" title={<>Building in public on <span className="font-serif italic font-normal text-accent">GitHub.</span></>}>
        <Suspense fallback={<GithubSkeleton />}>
          <GithubSection />
        </Suspense>
      </Section>

      <Section id="writing" code="08" eyebrow="Writing" title={<>Engineering <span className="font-serif italic font-normal text-accent">notes.</span></>}>
        <Writing />
      </Section>

      <Contact />
    </>
  );
}
