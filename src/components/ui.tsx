import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { techIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Scramble } from "./fx/Scramble";
import { Reveal } from "./Reveal";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function HudLabel({ code, text }: { code?: string; text: string }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent-soft px-1.5 py-0.5 text-accent">
        <span className="h-1.5 w-1.5 bg-accent blink" aria-hidden />
        {code ?? "SYS"}
      </span>
      <Scramble text={text} />
      <span className="h-px flex-1 max-w-24 bg-gradient-to-r from-line-strong to-transparent" aria-hidden />
    </p>
  );
}

export function Section({
  id, eyebrow, title, intro, children, className, code,
}: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; className?: string; code?: string }) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)} aria-labelledby={id ? `${id}-title` : undefined}>
      <Container>
        <Reveal>
          <HudLabel code={code} text={eyebrow} />
          <h2 id={id ? `${id}-title` : undefined} className="mt-5 max-w-3xl font-serif text-[2.6rem] font-normal leading-[1.02] tracking-[-0.01em] text-balance sm:text-6xl">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-soft sm:text-lg">{intro}</p>}
        </Reveal>
        <div className="mt-14">{children}</div>
      </Container>
    </section>
  );
}

type BtnVariant = "primary" | "secondary" | "ghost";
const btn: Record<BtnVariant, string> = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-accent-fg",
  secondary: "border border-line-strong bg-elev/60 text-fg backdrop-blur hover:border-accent/60 hover:text-accent",
  ghost: "text-fg-soft hover:text-fg",
};

export function ButtonLink({
  href, variant = "primary", className, children, external, ...rest
}: { href: string; variant?: BtnVariant; external?: boolean; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  const cls = cn(
    "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-200",
    btn[variant], className,
  );
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal || href.endsWith(".pdf"))
    return (
      <a href={href} className={cls} {...(isExternal && href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  return <Link href={href} className={cls} {...rest}>{children}</Link>;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-line bg-elev-2/60 px-2 py-0.5 font-mono text-[11px] text-fg-soft", className)}>
      {children}
    </span>
  );
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" className={cn("h-4 w-4 fill-current", className)}>
      <path d={icon.path} />
    </svg>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4 fill-current", className)}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4 fill-current", className)}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
