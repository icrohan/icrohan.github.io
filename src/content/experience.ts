export type Experience = {
  company: string;
  role: string;
  /** "YYYY-MM". Leave empty if unknown — dates are then hidden rather than guessed. */
  start: string;
  /** "YYYY-MM", "present", or empty */
  end: string;
  location: string;
  type: "Internship" | "Contract" | "Freelance" | "Part-time" | "Full-time" | "Campus";
  /** Square logo in /public/logos */
  logo?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Optional link, e.g. a public repo for the work */
  link?: { label: string; href: string };
};

/** Listed newest first. Overlapping roles are shown as separate entries with their real dates. */
export const experience: Experience[] = [
  {
    company: "Cognizant",
    logo: "/logos/cognizant.webp",
    role: "Full Stack Engineer Intern",
    start: "2026-04",
    end: "2026-08",
    location: "Chennai, India",
    type: "Internship",
    summary:
      "Built ReleasePilot — a Jira-inspired platform for managing products, roadmaps, backlogs, releases, environments and QA gates — on a React/Vite frontend and a Spring Cloud microservices backend.",
    highlights: [
      "Developed REST services in Java/Spring Boot with an independent MySQL schema per service.",
      "Wired up Spring Cloud infrastructure: API Gateway routing, Eureka service discovery and a centralized Config Server.",
      "Implemented JWT authentication with role-based access control across services.",
      "Used OpenFeign for service-to-service calls with Resilience4j for fault tolerance.",
      "Containerized services with Docker; used GenAI-assisted development throughout the workflow.",
    ],
    stack: ["React", "Vite", "Java", "Spring Boot", "Spring Cloud", "MySQL", "Eureka", "OpenFeign", "Resilience4j", "JWT", "Docker"],
    link: { label: "ReleasePilot on GitHub", href: "https://github.com/icrohan/Release-Pilot" },
  },
  {
    company: "Mindrift",
    logo: "/logos/mindrift.webp",
    role: "AI Data Annotator",
    start: "2025-01",
    end: "2025-12",
    location: "Remote",
    type: "Freelance",
    summary: "Produced and reviewed training and evaluation data for AI models through human feedback workflows.",
    highlights: [
      "Annotated data and evaluated model responses against task-specific instructions.",
      "Applied data-quality standards to improve the reliability of feedback signals.",
      "Worked within instruction-based evaluation and human-feedback pipelines.",
    ],
    stack: ["Data Annotation", "Model Evaluation", "Human Feedback", "Data Quality"],
  },
  {
    company: "Outlier AI",
    logo: "/logos/outlier.webp",
    role: "LLM Evaluation & Prompt Engineer",
    start: "2024-10",
    end: "2025-06",
    location: "Remote",
    type: "Freelance",
    summary: "Evaluated large language model outputs and engineered prompts as part of human-in-the-loop AI training workflows.",
    highlights: [
      "Assessed LLM responses for correctness, instruction following and overall quality.",
      "Designed and refined prompts to probe model behaviour and failure modes.",
      "Analysed model responses to produce structured, actionable feedback.",
    ],
    stack: ["LLM Evaluation", "Prompt Engineering", "Instruction Following", "RLHF Workflows"],
  },
  {
    company: "Sky Trade",
    logo: "/logos/skytrade.webp",
    role: "Blockchain & Full-Stack Intern",
    start: "2024-11",
    end: "2024-12",
    location: "Remote",
    type: "Internship",
    summary: "Worked on full-stack and blockchain application development.",
    highlights: ["Contributed to full-stack web application features.", "Worked with blockchain application development workflows."],
    stack: ["Full-Stack", "Blockchain"],
  },
  {
    company: "Webacy",
    role: "Web3 Security Data Analyst",
    start: "2024-08",
    end: "2024-10",
    location: "Remote",
    type: "Internship",
    summary: "Analysed blockchain and Web3 security data.",
    highlights: ["Reviewed and analysed on-chain and security-related data in the Web3 space."],
    stack: ["Web3", "Blockchain Security", "Data Analysis"],
  },
  {
    company: "KL University",
    logo: "/logos/kl-university.webp",
    role: "Peer Mentor",
    // TODO: add the real dates, e.g. start: "2024-07", end: "2025-04"
    start: "",
    end: "",
    location: "Andhra Pradesh, India",
    type: "Campus",
    summary: "Mentored fellow students at KL University.",
    highlights: ["Supported peers academically as part of the university's peer mentoring programme."],
    stack: ["Mentoring", "Communication"],
  },
];
