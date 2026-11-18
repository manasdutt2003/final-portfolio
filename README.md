# Portfolio (Puzzle Edition)

Personal portfolio of Manas Dutt, built with Next.js. Project demo links are
locked behind a two-stage puzzle: spot the uniform distribution among four
histograms, then solve a Markov-chain question.

**Live:** https://final-portfolio-chi-azure.vercel.app

## Features

- Animated hero, tech stack, project cards and contact section
- Puzzle modal that unlocks the live demo links; the result is remembered in
  the browser
- Statically rendered, so it loads fast and deploys anywhere Next.js runs
- Unit tests for the puzzle, the unlock state and the daily-activity script
- Dockerfile for self-hosting

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion,
Jest and React Testing Library.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # unit tests
npm run lint
npm run typecheck
npm run build
```

## Configuration

All variables are optional.

| Variable | Used by | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `src/app/layout.tsx` | Sets `metadataBase` so social/SEO URLs resolve against your domain. Invalid values are ignored with a warning. |
| `NEXT_OUTPUT=standalone` | `next.config.ts` | Emits a self-contained server in `.next/standalone`. The Dockerfile sets this; Vercel builds do not need it. |

## Docker

```bash
docker build -t portfolio .
# optionally: --build-arg NEXT_PUBLIC_SITE_URL=https://example.com
docker run -p 3000:3000 portfolio
```

The image is a multi-stage build that runs the standalone Next.js server as a
non-root user. The build downloads Google fonts, so it needs network access.

## Editing content

| What | Where |
| --- | --- |
| Projects and skills | `src/data/projects.ts` |
| Hero, contact, navigation | `src/components/` |
| Puzzles | `src/components/puzzles/` |
| Unlock state | `src/context/GameContext.tsx` |

## Project layout

```
src/
├── app/            layout, page, global styles
├── components/     Hero, Navbar, ProjectCard, TechStack, Contact, UnlockModal
│   └── puzzles/    StatsChallenge, MarkovChallenge (+ tests)
├── context/        GameContext (+ tests)
└── data/           projects.ts, daily-activity.json
scripts/            scheduled scripts that rewrite daily-activity.json (+ tests)
Dockerfile          multi-stage container build
```

`ARCHITECTURE.md` and `DEPLOYMENT.md` go into more detail. Parts of them may be
aspirational rather than a description of the current code, so check against
the source.

## Notes

`scripts/update-daily.js` and `scripts/update_activity.js` are run by the
scheduled workflows in `.github/workflows/`. They write a randomly chosen
"current focus", quote and commit count to `src/data/daily-activity.json`;
those values are generated, not measured. The two scripts currently write
different JSON shapes to the same file. `update-daily.js` exposes
`buildActivity` and `writeActivity` and is covered by
`scripts/update-daily.test.js`.
