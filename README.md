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
- Unit tests for the puzzle and the unlock state

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
scripts/            scheduled scripts that rewrite daily-activity.json
```

`ARCHITECTURE.md` and `DEPLOYMENT.md` go into more detail.

## Notes

`scripts/update-daily.js` and `scripts/update_activity.js` are run by the
scheduled workflows in `.github/workflows/`. They write a randomly chosen
"current focus", quote and commit count to `src/data/daily-activity.json`;
those values are generated, not measured.
