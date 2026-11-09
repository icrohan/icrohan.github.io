# Rohan Immidichetty — Portfolio

Personal portfolio built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion**.

Live at **https://icrohan.github.io** — a fully static site hosted on GitHub Pages.

## Concept: ROHAN.OS

- **Preloader** (`components/fx/BootSequence.tsx`): a pure-CSS 000→100 counter with a boot log. It plays once per browser session and can be skipped.
- **Hero** (`components/hero/`): a particle "camera feed" that morphs between a robot, an eye, a neural net and an IoT chip. The four system buttons under it re-color the site's accent.
- **Circuit background**, **vision cursor** and **decoding section labels** (`components/fx/`).
- Light theme only, editorial serif headings, project demo videos that play only while on screen, and a giant closing wordmark in the footer.

Every effect respects `prefers-reduced-motion` and pauses off-screen.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also type-checks)
npm start            # serve the production build
```

## Editing content — no component changes needed

| What | File |
| --- | --- |
| Name, headline, links, email, phone, résumé, availability | `src/content/site.ts` |
| Experience | `src/content/experience.ts` |
| Featured projects, architecture stages, "more builds" | `src/content/projects.ts` |
| About, timeline, skills + levels, recognition, certifications, approach steps | `src/content/profile.ts` |
| GitHub repos to feature first | `featuredRepoNames` in `src/lib/github.ts` |
| Blog posts | Markdown files in `content/blog/` (see its README) |
| Portrait | `public/rohan.webp` (1200×1500) |

Empty values hide what depends on them, so nothing renders as a dead button:

- **Résumé** — put `resume.pdf` in `public/`, then set `links.resume: "/resume.pdf"`. Résumé buttons appear in the hero and contact section.
- **Email / phone** — set `links.email` / `links.phone`.
- **Project media** — add images to `public/projects/<slug>/` and list them in the project's `media` array. The first one replaces the illustrated cover. `video` takes a YouTube embed URL or a `/public` path. `demo` adds a live-demo button.
- **Media gallery** — add images to `public/media/` and list them in `mediaGallery`. The dashed placeholders disappear.
- **Certificate links** — set `credentialUrl` on a certification.
- **Skill levels** — self-assessed defaults (`Experienced` / `Hands-on` / `Familiar`). Adjust them to be accurate.

## Contact form

GitHub Pages only serves static files, so there is no server. When a visitor presses **Send message**, the form validates their input and opens their own email app with a message to `links.email` already filled in (subject, message, name and reply address).

## GitHub data

The GitHub section reads your profile and repositories from the public GitHub API **at build time**. The deploy workflow rebuilds the site every day, so stars, languages and repo counts stay current. If the API is unreachable, it falls back to a link to your profile.

## Deploy (GitHub Pages)

Deployment is automatic. `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, once a day, and on demand from the **Actions** tab.

```bash
git add -A && git commit -m "Update content" && git push
```

- The repository is `icrohan/icrohan.github.io`, so the site is served from the root URL. If you move it to another repository name, set `BASE_PATH=/<repo>` in the workflow and update `NEXT_PUBLIC_SITE_URL`.
- **Settings → Pages → Source** must be set to **GitHub Actions**.
- `scripts/flatten-segments.mjs` runs after `next build`. It copies Next's prefetch files to the names the router requests, so in-site navigation stays instant on a static host.
- Original source photos and videos (`projects pic/`) are git-ignored. Compressed copies live in `public/projects/<slug>/`.

SEO is built in: metadata, Open Graph/Twitter cards (`public/og.png`), JSON-LD `Person` schema, `sitemap.xml` and `robots.txt`. All of them use `NEXT_PUBLIC_SITE_URL`.

## Structure

```
src/
  app/            routes: home, /projects/[slug], /blog/[slug], sitemap, robots
  components/     hero/, sections/, projects/, shared UI (Nav, Footer, Reveal…)
  content/        all editable content
  lib/            github, blog, contact validation, icons, theme, utils
content/blog/     Markdown posts
```

Animations respect `prefers-reduced-motion`. The hero renders without JavaScript (its entrance uses CSS only), and the canvas background pauses when it's off-screen.
