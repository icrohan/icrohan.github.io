import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center pt-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent">404 · no detections in frame</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-fg-soft">The link may be outdated, or the page may have moved.</p>
        <div className="mt-8 flex justify-center"><ButtonLink href="/">Back to home</ButtonLink></div>
      </Container>
    </section>
  );
}
