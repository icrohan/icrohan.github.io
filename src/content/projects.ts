export type Stage = { id: string; label: string; detail: string; tech?: string[] };

export type Project = {
  slug: string;
  title: string;
  /** One-line pitch used on cards */
  tagline: string;
  domain: "Computer Vision" | "Generative AI" | "Robotics" | "IoT" | "Blockchain" | "Full-Stack";
  /** Cover artwork style — rendered as an SVG illustration until you add real media */
  visual: "vision" | "pipeline" | "robot" | "sensors" | "mesh" | "home" | "chain" | "services";
  /** Only set when known. Shown as a badge. */
  status?: "In active development" | "Concept" | "Prototype";
  problem: string;
  solution: string;
  architecture: Stage[];
  architectureNote?: string;
  features: string[];
  stack: string[];
  repo?: string;
  /** Repositories that contain related code, shown as "Related code" */
  related?: { label: string; href: string }[];
  demo?: string;
  /** Put files in /public/projects/<slug>/ and list them here, e.g. { src: "/projects/luna/1.webp", alt: "..." } */
  media?: { src: string; alt: string; /** CSS object-position for cropped covers */ position?: string }[];
  /** Short muted loop shown on the card and project header */
  preview?: { src: string; poster: string; alt: string };
  /** Optional video (YouTube embed URL or /public path) */
  video?: string;
  recognition?: string;
};

const gh = (repo: string) => `https://github.com/icrohan/${repo}`;

/**
 * Featured case studies — kept deliberately to five, one per pillar:
 * Gen AI, computer vision, robotics, IoT, full-stack. The first one is shown
 * with its live pipeline diagram on the homepage.
 */
export const projects: Project[] = [
  {
    slug: "egocentric-video-qc-platform",
    title: "Egocentric Video Processing & Quality Control Platform",
    tagline: "Separating useful work footage from noise in hours-long first-person video — with pose-level QC.",
    domain: "Generative AI",
    visual: "pipeline",
    status: "In active development",
    problem:
      "Long egocentric recordings of people working contain large stretches of irrelevant footage, and the human pose data extracted from them is only useful if it is complete and temporally consistent. Reviewing either by hand doesn't scale.",
    solution:
      "A pipeline that samples long videos, uses a vision-language model to label segments KEEP / REMOVE / REVIEW, cuts clean clips with FFmpeg, then estimates and tracks human pose and runs skeleton quality checks — with a review dashboard for everything the system isn't sure about.",
    architecture: [
      { id: "upload", label: "Upload", detail: "Long-duration videos are uploaded and registered with their metadata.", tech: ["FastAPI", "PostgreSQL"] },
      { id: "pre", label: "Preprocess", detail: "Videos are normalized and chunked for parallel processing.", tech: ["FFmpeg"] },
      { id: "sample", label: "Frame sampling", detail: "Frames are sampled at a configurable rate to keep inference cost bounded.", tech: ["OpenCV"] },
      { id: "activity", label: "Activity detection", detail: "Segments are scored for the presence of meaningful work activity." },
      { id: "vlm", label: "VLM triage", detail: "A vision-language model labels each segment KEEP, REMOVE or REVIEW.", tech: ["VLMs"] },
      { id: "filter", label: "Clip filtering", detail: "REMOVE segments are cut and KEEP segments stitched into clean clips.", tech: ["FFmpeg"] },
      { id: "pose", label: "Pose estimation", detail: "Human skeletal keypoints are extracted per frame.", tech: ["YOLO Pose", "MediaPipe"] },
      { id: "track", label: "Person tracking", detail: "People are tracked across frames so each skeleton keeps a consistent identity.", tech: ["ByteTrack", "BoT-SORT"] },
      { id: "qc", label: "Skeleton QC", detail: "Keypoints are validated for completeness and temporal consistency; failures are flagged." },
      { id: "review", label: "Review dashboard", detail: "Humans resolve REVIEW segments and QC failures.", tech: ["React", "Next.js", "Streamlit"] },
      { id: "export", label: "Export", detail: "Clean videos are exported alongside structured metadata.", tech: ["PostgreSQL"] },
    ],
    architectureNote: "Target architecture of a project in active development — not every stage is complete.",
    features: [
      "Long-video upload and preprocessing",
      "VLM-assisted KEEP / REMOVE / REVIEW decisions",
      "Automatic clip filtering with FFmpeg",
      "Pose estimation and person tracking",
      "Skeletal keypoint and temporal consistency checks",
      "Human review dashboard",
      "Export of clean video and structured metadata",
    ],
    stack: ["Python", "OpenCV", "FFmpeg", "YOLO Pose", "MediaPipe", "VLMs", "ByteTrack / BoT-SORT", "FastAPI", "Next.js", "PostgreSQL", "Cloud GPUs", "Streamlit"],
  },
  {
    slug: "video-intelligence-campus-safety",
    title: "AI Video Intelligence for Campus Safety",
    tagline: "Turning raw CCTV footage into structured, reviewable vehicle events.",
    domain: "Computer Vision",
    visual: "vision",
    problem:
      "Campus security teams record hours of CCTV footage, but answering simple questions — which vehicles entered, when, and whether riders wore helmets — still means scrubbing video by hand.",
    solution:
      "A computer vision pipeline that detects and tracks vehicles across frames, logs entry and exit events against virtual boundaries, runs a number-plate recognition workflow, and routes low-confidence detections to a human for review instead of guessing.",
    architecture: [
      { id: "ingest", label: "CCTV ingest", detail: "Recorded or live camera streams are read frame-by-frame with OpenCV.", tech: ["OpenCV"] },
      { id: "detect", label: "Vehicle detection", detail: "A YOLO model localizes vehicles (and riders) in each sampled frame.", tech: ["YOLO"] },
      { id: "track", label: "Multi-object tracking", detail: "Detections are linked into persistent tracks so each vehicle keeps one identity across frames.", tech: ["Object Tracking"] },
      { id: "events", label: "Entry / exit logic", detail: "Track trajectories crossing a configured boundary line become directional entry or exit events." },
      { id: "plate", label: "Plate & helmet analysis", detail: "Plate regions are cropped for OCR; helmet detection is explored as an additional safety check.", tech: ["OCR", "YOLO"] },
      { id: "log", label: "Event log & review", detail: "Events are written as structured records; uncertain detections are flagged for human review." },
    ],
    features: [
      "Vehicle detection and multi-object tracking",
      "Directional entry and exit monitoring",
      "Number-plate recognition workflow",
      "Helmet detection concepts",
      "Structured event logging",
      "Human review of uncertain detections",
    ],
    stack: ["Python", "OpenCV", "YOLO", "Object Tracking", "OCR"],
    preview: {
      src: "/projects/video-intelligence-campus-safety/preview.mp4",
      poster: "/projects/video-intelligence-campus-safety/poster.webp",
      alt: "Camera feed with rider, helmet and number-plate detections drawn as bounding boxes",
    },
    video: "/projects/video-intelligence-campus-safety/demo.mp4",
    related: [{ label: "People counting with directional tracking", href: gh("Real-Time-People-Counting-System-Using-OpenCV-and-Directional-Tracking") }],
  },
  {
    slug: "luna-humanoid-robot",
    title: "Luna — AI-Powered Humanoid Robot",
    tagline: "A 3D-printed humanoid that sees, talks and shakes hands.",
    domain: "Robotics",
    visual: "robot",
    problem:
      "Most conversational AI lives behind a screen. Luna explores what changes when a language model gets a camera, a voice and a physical body that people can interact with.",
    solution:
      "A humanoid assistant that combines camera-based visual input, LLM-powered conversation, speech output and servo-driven gestures in a 3D-printed body — including a physical handshake interaction.",
    architecture: [
      { id: "see", label: "Vision", detail: "A camera feeds frames to OpenCV for visual context.", tech: ["OpenCV"] },
      { id: "hear", label: "Voice input", detail: "Spoken input is captured and converted for the language model." },
      { id: "think", label: "LLM reasoning", detail: "External AI model APIs generate conversational responses.", tech: ["LLM APIs"] },
      { id: "speak", label: "Speech", detail: "Responses are spoken aloud with text-to-speech.", tech: ["pyttsx3"] },
      { id: "move", label: "Motion", detail: "Servo motors drive gestures such as the handshake.", tech: ["Servo Motors"] },
    ],
    features: [
      "Camera-based visual input",
      "AI-powered conversation",
      "Voice interaction and text-to-speech",
      "Servo-driven physical gestures",
      "Handshake interaction",
      "3D-printed robotic structure",
    ],
    stack: ["Python", "OpenCV", "LLM APIs", "pyttsx3", "Servo Motors", "3D Printing"],
    media: [
      {
        src: "/projects/luna-humanoid-robot/robot.webp",
        alt: "The robot build: screen face, wooden shoulder mounts, wired servo arm and 3D-printed hand",
        position: "50% 0%",
      },
    ],
    related: [
      { label: "AI Companion Robot (intent + RAG + vision)", href: gh("AI-Companion-Robot") },
      { label: "AI Voice-Controlled Robotic Assistant", href: gh("AI-Voice-Controlled-Robotic-Assistant") },
    ],
    recognition: "Featured in media coverage of my robotics work.",
  },
  {
    slug: "smart-greenhouse",
    title: "Smart Greenhouse Monitoring System",
    tagline: "Distributed sensor nodes watching soil, air and climate in real time.",
    domain: "IoT",
    visual: "mesh",
    problem: "Greenhouse conditions change quickly, and a single sensor in one corner doesn't capture what plants across the space experience.",
    solution:
      "Distributed ESP32 sensor nodes measure soil moisture, temperature, humidity, CO₂ and air quality, communicate over ESP-NOW and LoRa/LoRaWAN, and publish to a dashboard over MQTT.",
    architecture: [
      { id: "nodes", label: "Sensor nodes", detail: "Soil moisture, temperature, humidity, CO₂ and air-quality sensors on ESP32.", tech: ["ESP32"] },
      { id: "espnow", label: "ESP-NOW mesh", detail: "Low-power peer-to-peer links between nodes.", tech: ["ESP-NOW"] },
      { id: "lora", label: "LoRa gateway", detail: "Long-range uplink from the greenhouse.", tech: ["LoRa", "LoRaWAN"] },
      { id: "mqtt", label: "MQTT broker", detail: "Readings are published to topics per node.", tech: ["MQTT"] },
      { id: "dash", label: "Dashboard", detail: "Real-time monitoring of all nodes.", tech: ["Python"] },
    ],
    features: ["Real-time environmental monitoring", "Soil moisture", "Temperature & humidity", "CO₂ and air quality", "Wireless sensor networking", "Dashboard monitoring"],
    stack: ["ESP32", "ESP-NOW", "LoRa / LoRaWAN", "MQTT", "IoT Sensors", "Python"],
    repo: gh("Smart-Greenhouse-IoT-Monitoring-System"),
    media: [{ src: "/projects/smart-greenhouse/greenhouse.webp", alt: "Inside the greenhouse: misting system running over hanging planters" }],
  },
  {
    slug: "releasepilot",
    title: "ReleasePilot — Release Management Platform",
    tagline: "A Jira-inspired product lifecycle platform on Spring Cloud microservices.",
    domain: "Full-Stack",
    visual: "services",
    problem:
      "Software teams track products, roadmaps, backlogs, releases, environments and QA sign-off across scattered tools, which makes it hard to see whether a release is actually ready to ship.",
    solution:
      "A full-stack platform — built during my Cognizant internship — that brings those stages together: a React/Vite frontend talks through an API gateway to independent Spring Boot services, each with its own MySQL schema, with JWT auth and role-based access throughout.",
    architecture: [
      { id: "ui", label: "React / Vite UI", detail: "Single frontend for products, backlogs, releases and QA.", tech: ["React", "Vite"] },
      { id: "gateway", label: "API Gateway", detail: "Routes every request and validates JWTs at the edge.", tech: ["Spring Cloud Gateway", "JWT"] },
      { id: "discovery", label: "Discovery & config", detail: "Services register with Eureka and pull configuration from a central Config Server.", tech: ["Eureka", "Config Server"] },
      { id: "services", label: "Domain services", detail: "Independent services for auth, products, backlogs, releases and more.", tech: ["Spring Boot"] },
      { id: "comms", label: "Service-to-service calls", detail: "Declarative clients with circuit breakers for resilient communication.", tech: ["OpenFeign", "Resilience4j"] },
      { id: "data", label: "Data per service", detail: "Each service owns an independent MySQL schema.", tech: ["MySQL"] },
    ],
    features: [
      "Product and roadmap management",
      "Backlog and sprint management",
      "Release planning and environment promotion tracking",
      "QA testing and release gates",
      "Release notes and notifications",
      "JWT authentication with role-based access control",
      "Audit logging",
    ],
    stack: ["React", "Vite", "Java", "Spring Boot", "Spring Cloud", "Eureka", "OpenFeign", "Resilience4j", "MySQL", "JWT", "Docker"],
    repo: gh("Release-Pilot"),
  },
];

export type MiniProject = { title: string; summary: string; tags: string[]; repo?: string };

/** Smaller builds, collapsed by default on the homepage. */
export const moreProjects: MiniProject[] = [
  {
    title: "Intelligent RAG Conversational Agent",
    summary: "A college-specific assistant combining retrieval-augmented generation, classifier-based query routing and text-to-speech.",
    tags: ["RAG", "LangChain", "Vector DB", "Python"],
    repo: gh("Intelligent-RAG-Based-Conversational-Agent"),
  },
  {
    title: "AI Companion Robot",
    summary: "Intent classification routes questions to RAG and scene requests to a vision API, with an animated robot face.",
    tags: ["RAG", "OpenCV", "Python"],
    repo: gh("AI-Companion-Robot"),
  },
  {
    title: "AI Crowd / Devotee Counting",
    summary: "Vision-based people counting with direction-aware tracking for occupancy and crowd management.",
    tags: ["OpenCV", "Tracking"],
    repo: gh("Real-Time-People-Counting-System-Using-OpenCV-and-Directional-Tracking"),
  },
  {
    title: "Human-Following Robot",
    summary: "An ESP32 robot that uses OpenCV to detect and follow a person.",
    tags: ["OpenCV", "ESP32", "Robotics"],
    repo: gh("Human-Following-Robot"),
  },
  {
    title: "Smart Street Lighting & LoRa Gateway",
    summary: "Street lighting control over a LoRa gateway — work that was covered by local media.",
    tags: ["LoRa", "IoT"],
  },
  {
    title: "Smart Home Automation",
    summary: "ESP32 devices controlled and monitored in real time over MQTT from a React + Node.js web app.",
    tags: ["ESP32", "MQTT", "React", "Node.js"],
    repo: gh("Smart-Home-Automation"),
  },
  {
    title: "Smart Electronic Health Records",
    summary: "Role-based medical records for admins, doctors and patients on Ethereum smart contracts (Solidity, Truffle, Ganache).",
    tags: ["Solidity", "Ethereum", "React", "Web3.js"],
    repo: gh("Smart-Electronic-Health-Records"),
  },
  {
    title: "GoldChain — Jewellery Traceability",
    summary: "Gold identity and purity verification traced from manufacturer to retailer to consumer with smart contracts.",
    tags: ["Solidity", "Ethereum", "React", "MetaMask"],
    repo: gh("jewel-supply-chain-and-Traceabilty"),
  },
  {
    title: "Computer vision experiments",
    summary: "Helmet detection, traffic monitoring and cricket ball tracking — short experiments in detection and fast-object tracking.",
    tags: ["YOLO", "OpenCV", "Tracking"],
  },
  {
    title: "More IoT builds",
    summary: "AgroEye smart-agriculture concept, RFID student identification, a solar-powered air-quality station and smart city monitoring.",
    tags: ["ESP32", "Sensors", "RFID", "MQTT"],
  },
];
