/**
 * Global site configuration — edit this file to update your identity, links and availability.
 * Leave a field as an empty string to hide whatever depends on it (no dead buttons are rendered).
 */
export const site = {
  name: "Rohan Immidichetty",
  shortName: "Rohan",
  initials: "RI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://icrohan.github.io",

  headline: "Engineering intelligent systems for real-world impact.",
  roleLine: "Generative AI Engineer · Forward Deployed AI Engineer · Computer Vision",
  rotatingRoles: [
    "Generative AI Engineer",
    "Forward Deployed AI Engineer",
    "AI & Computer Vision Engineer",
    "Full-Stack Developer",
    "IoT & Robotics Builder",
  ],
  description:
    "I build AI-powered applications, computer vision pipelines, intelligent automation systems, and scalable full-stack products.",
  tagline: "Building intelligent systems for real-world impact.",
  seoDescription:
    "Rohan Immidichetty — Generative AI engineer and full-stack developer working across LLM applications, computer vision, IoT and robotics. Building AI systems from problem discovery to deployment.",

  location: "Bangalore, India",

  /** Availability pill in the hero. Set `show: false` to hide it. */
  availability: {
    show: true as boolean,
    open: true as boolean,
    label: "Open to AI engineering roles & collaborations",
  },

  links: {
    github: "https://github.com/icrohan",
    linkedin: "https://www.linkedin.com/in/rohan-immidichetty-59a752249/",
    email: "icrohan.works@gmail.com",
    /** TODO: optional phone, e.g. "+91 ..." — shown in the contact section only when set */
    phone: "",
    /** TODO: drop your resume at /public/resume.pdf and set this to "/resume.pdf" */
    resume: "",
  } as { github: string; linkedin: string; email: string; phone: string; resume: string },

  githubUsername: "icrohan",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#approach", label: "Approach" },
  { href: "#skills", label: "Skills" },
  { href: "#recognition", label: "Recognition" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
] as const;
