import { marqueeIcons, techIcons } from "@/lib/icons";
import { TechIcon } from "../ui";

export function TechMarquee() {
  const items = [...marqueeIcons, ...marqueeIcons];
  return (
    <div className="relative border-y border-line bg-bg py-6" aria-label="Technologies I work with">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee flex w-max items-center gap-12 pr-12">
          {items.map((k, i) => (
            <li key={`${k}-${i}`} className="flex items-center gap-3 text-fg-soft transition-colors hover:text-accent" aria-hidden={i >= marqueeIcons.length}>
              <TechIcon name={k} className="h-5 w-5" />
              <span className="whitespace-nowrap font-serif text-2xl italic">{techIcons[k].title}</span>
              <span className="ml-9 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
