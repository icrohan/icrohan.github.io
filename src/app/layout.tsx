import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BootSequence } from "@/components/fx/BootSequence";
import { CircuitBackground } from "@/components/fx/CircuitBackground";
import { VisionCursor } from "@/components/fx/VisionCursor";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { themeScript } from "@/lib/theme";
import { site } from "@/content/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic", "normal"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Generative AI & Computer Vision Engineer`, template: `%s · ${site.name}` },
  description: site.seoDescription,
  keywords: ["Rohan Immidichetty", "Generative AI Engineer", "Forward Deployed AI Engineer", "Computer Vision", "LLM", "RAG", "YOLO", "OpenCV", "Full-Stack", "IoT", "Robotics", "Portfolio"],
  authors: [{ name: site.name, url: site.links.github }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    title: `${site.name} — Generative AI & Computer Vision Engineer`,
    description: site.seoDescription,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.seoDescription, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/rohan.webp`,
  jobTitle: "Generative AI Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "KL University" },
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: ["Generative AI", "Large Language Models", "Computer Vision", "Full-Stack Development", "Internet of Things", "Robotics"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" data-mode="robot" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <BootSequence />
        <CircuitBackground />
        <VisionCursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
