import { Children, type ReactNode } from "react";

/**
 * Staggers the hero's children in on first load using pure CSS,
 * so the hero is visible immediately even before JavaScript hydrates.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0">
      {Children.toArray(children).map((child, i) => (
        <div key={i} className="hero-in" style={{ animationDelay: `${80 + i * 90}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
