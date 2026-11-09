/** About, timeline, skills, recognition and certifications. Edit freely. */

export const about = {
  lead: "I'm an engineer interested in building intelligent systems that connect AI research with practical applications.",
  paragraphs: [
    "My work spans Generative AI, LLM applications, computer vision, full-stack development, IoT, and robotics.",
    "I enjoy solving engineering problems end-to-end — from understanding requirements and designing architectures to developing applications, integrating models, testing on real-world data, and deploying working solutions.",
    "I've worked on AI-based video analytics, object detection and tracking, intelligent automation, voice-interactive robotics, agricultural monitoring, and distributed applications.",
  ],
  belief: "The best technology isn't just technically impressive — it solves a genuine problem and works reliably in the real world.",
  education: { degree: "B.Tech, Internet of Things", school: "KL University", logo: "/logos/kl-university.webp", period: "2022 – 2026", detail: "CGPA 9.34" },
};

export type TimelineItem = { date: string; title: string; detail: string; kind: "education" | "work" | "ai" | "build" | "cert" };

/** Chronological, oldest first */
export const timeline: TimelineItem[] = [
  { date: "2022", title: "Started B.Tech in IoT", detail: "KL University — began building with ESP32, sensors and computer vision.", kind: "education" },
  { date: "2024", title: "Hardware + vision builds", detail: "Face-tracking device, ball- and human-following robots with OpenCV and ESP32.", kind: "build" },
  { date: "Aug 2024", title: "Web3 Security Data Analyst", detail: "Webacy.", kind: "work" },
  { date: "Oct 2024", title: "LLM Evaluation & Prompt Engineering", detail: "Outlier AI — evaluating model outputs in human-in-the-loop workflows.", kind: "ai" },
  { date: "Nov 2024", title: "Blockchain & Full-Stack Intern", detail: "Sky Trade.", kind: "work" },
  { date: "2025", title: "AI data & evaluation", detail: "Mindrift — annotation and model response evaluation. Built RAG agents and AI robotics projects.", kind: "ai" },
  { date: "Apr 2026", title: "Full Stack Engineer Intern", detail: "Cognizant, Chennai — Spring Cloud microservices and React.", kind: "work" },
  { date: "Jun 2026", title: "Claude Certified Architect", detail: "Anthropic — Foundations.", kind: "cert" },
  { date: "Now", title: "Video intelligence platform", detail: "Building a VLM- and pose-driven video QC pipeline.", kind: "ai" },
];

export type Level = "Experienced" | "Hands-on" | "Familiar";
export type Skill = { name: string; level: Level; icon?: string };
export type SkillGroup = { title: string; blurb: string; skills: Skill[] };

/**
 * Skill levels are self-assessed defaults — adjust them so they reflect you accurately.
 * `icon` is a simple-icons slug key from src/lib/icons.ts.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Generative AI & LLMs",
    blurb: "Prompting, evaluation, retrieval and agents.",
    skills: [
      { name: "Prompt Engineering", level: "Experienced" },
      { name: "LLM Evaluation", level: "Experienced" },
      { name: "Human-in-the-Loop AI", level: "Experienced" },
      { name: "RAG", level: "Hands-on" },
      { name: "Embeddings & Vector Search", level: "Hands-on" },
      { name: "LangChain", level: "Hands-on", icon: "langchain" },
      { name: "AI Agents", level: "Hands-on" },
      { name: "Hugging Face", level: "Hands-on", icon: "huggingface" },
      { name: "RLHF / SFT data", level: "Hands-on" },
      { name: "AI Alignment", level: "Familiar" },
      { name: "LLMOps", level: "Familiar" },
    ],
  },
  {
    title: "AI & Computer Vision",
    blurb: "Detection, tracking, pose and classical CV.",
    skills: [
      { name: "OpenCV", level: "Experienced", icon: "opencv" },
      { name: "YOLO", level: "Experienced" },
      { name: "Object Detection & Tracking", level: "Experienced" },
      { name: "Pose Estimation", level: "Hands-on", icon: "mediapipe" },
      { name: "Image Processing", level: "Hands-on" },
      { name: "PyTorch", level: "Hands-on", icon: "pytorch" },
      { name: "TensorFlow", level: "Familiar", icon: "tensorflow" },
      { name: "scikit-learn", level: "Hands-on", icon: "scikitlearn" },
      { name: "Pandas", level: "Hands-on", icon: "pandas" },
      { name: "NumPy", level: "Hands-on", icon: "numpy" },
      { name: "FFmpeg", level: "Hands-on", icon: "ffmpeg" },
    ],
  },
  {
    title: "Full-Stack",
    blurb: "Web apps, APIs and microservices.",
    skills: [
      { name: "React", level: "Experienced", icon: "react" },
      { name: "Next.js", level: "Hands-on", icon: "nextdotjs" },
      { name: "Node.js", level: "Hands-on", icon: "nodedotjs" },
      { name: "Spring Boot", level: "Hands-on", icon: "springboot" },
      { name: "Spring Cloud", level: "Hands-on", icon: "spring" },
      { name: "REST APIs & Microservices", level: "Hands-on" },
      { name: "FastAPI", level: "Hands-on", icon: "fastapi" },
      { name: "Flutter", level: "Familiar", icon: "flutter" },
      { name: "React Native", level: "Familiar", icon: "react" },
    ],
  },
  {
    title: "Languages",
    blurb: "What I write code in.",
    skills: [
      { name: "Python", level: "Experienced", icon: "python" },
      { name: "JavaScript", level: "Experienced", icon: "javascript" },
      { name: "Java", level: "Hands-on", icon: "openjdk" },
      { name: "TypeScript", level: "Hands-on", icon: "typescript" },
      { name: "C / C++", level: "Hands-on", icon: "cplusplus" },
      { name: "SQL", level: "Hands-on" },
      { name: "Solidity", level: "Hands-on", icon: "solidity" },
    ],
  },
  {
    title: "IoT & Robotics",
    blurb: "Embedded systems that touch the physical world.",
    skills: [
      { name: "ESP32", level: "Experienced", icon: "espressif" },
      { name: "Arduino", level: "Experienced", icon: "arduino" },
      { name: "MQTT", level: "Experienced", icon: "mqtt" },
      { name: "Sensors & Embedded", level: "Experienced" },
      { name: "LoRa / LoRaWAN", level: "Hands-on" },
      { name: "ESP-NOW", level: "Hands-on" },
      { name: "Servo Motors & Robotics", level: "Hands-on" },
      { name: "Real-Time Systems", level: "Familiar" },
    ],
  },
  {
    title: "Data, Cloud & Tools",
    blurb: "Storage, infrastructure and delivery.",
    skills: [
      { name: "MySQL", level: "Hands-on", icon: "mysql" },
      { name: "PostgreSQL", level: "Hands-on", icon: "postgresql" },
      { name: "MongoDB", level: "Familiar", icon: "mongodb" },
      { name: "Docker", level: "Hands-on", icon: "docker" },
      { name: "Git & GitHub", level: "Experienced", icon: "github" },
      { name: "Oracle Cloud (OCI)", level: "Familiar" },
      { name: "AWS", level: "Familiar" },
      { name: "Azure", level: "Familiar" },
      { name: "CI/CD", level: "Familiar", icon: "githubactions" },
    ],
  },
];

/** Recognition. `value` is shown large; edit numbers here. */
export const highlights = [
  { value: "4×", label: "Hackathon winner" },
  { value: "4×", label: "Newspaper & TV features" },
  { value: "9.34", label: "CGPA, B.Tech IoT" },
  { value: "40+", label: "Public repositories" },
];

export const achievements = [
  { title: "IIT BHU Eco Hackathon", detail: "Recognition at the IIT BHU Eco Hackathon.", tag: "Hackathon" },
  { title: "Unplugged 2.0", detail: "Hackathon achievement.", tag: "Hackathon" },
  { title: "HackWithIoT", detail: "Helped organize and host a 24-hour college hackathon.", tag: "Organizer" },
  { title: "Hardware, AI & IoT hackathons", detail: "Regular participant across innovation and hardware events.", tag: "Community" },
];

export const mediaFeatures = [
  { title: "Humanoid robotics", detail: "Luna, the AI-powered humanoid robot." },
  { title: "LoRa gateway & smart street lighting", detail: "Long-range IoT for city infrastructure." },
  { title: "AI / IoT innovation", detail: "Applied AI and IoT student projects." },
];

/**
 * Media gallery — add images to /public/media/ and list them here.
 * While empty, labelled placeholders are shown.
 */
export const mediaGallery: { src: string; alt: string; caption: string }[] = [];

export const certifications: { name: string; issuer: string; date?: string; credentialUrl?: string; image?: string }[] = [
  { name: "Claude Certified Architect — Foundations", issuer: "Anthropic", date: "June 2026" },
  { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic" },
  { name: "Oracle Cloud Infrastructure Foundations Associate", issuer: "Oracle" },
];

export const approachSteps = [
  { title: "Understand the problem", detail: "Start with the real-world business problem and the people who live with it." },
  { title: "Map constraints", detail: "Identify technical requirements, data realities, latency, cost and hardware limits." },
  { title: "Design the system", detail: "Sketch an end-to-end architecture before writing model code." },
  { title: "Build the AI pipeline", detail: "Develop the ML, LLM or computer vision pipeline that does the core work." },
  { title: "Build the product", detail: "Ship the frontend and backend people will actually use." },
  { title: "Integrate", detail: "Connect models, APIs, databases and infrastructure." },
  { title: "Test on real data", detail: "Validate against messy, real-world inputs — not just clean demos." },
  { title: "Evaluate", detail: "Measure quality and performance; route uncertainty to human review." },
  { title: "Deploy & iterate", detail: "Release, observe, gather feedback and improve." },
];

export const blogTopics = [
  "Building real-world AI systems",
  "Computer vision with YOLO and OpenCV",
  "LLM evaluation and prompt engineering",
  "RAG and AI agents",
  "IoT and edge AI",
  "Video analytics and pose estimation",
  "Lessons from hackathons",
];
