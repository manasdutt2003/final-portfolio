# Copilot Instructions for Deploy-Ready Portfolio

## Project Overview
A gamified Next.js 16 portfolio with an interactive "security clearance" unlock system. Users solve puzzle challenges to reveal the full resume. The site features smooth animations (Framer Motion), dark theme, Tailwind styling, and WCAG accessibility compliance.

## Recent Enhancements (v2.0)
- ✅ Comprehensive SEO metadata with Open Graph and JSON-LD schema
- ✅ WCAG 2.1 AA accessibility compliance (ARIA labels, keyboard navigation, 44px touch targets)
- ✅ Jest/React Testing Library setup with unit tests for GameContext and StatsChallenge
- ✅ Production-ready Next.js configuration with security headers
- ✅ Complete documentation (ARCHITECTURE.md, DEPLOYMENT.md)
- ✅ Environment variable template (.env.example)
- ✅ JSDoc comments on all key functions

## Architecture & Data Flow

### Client-Server Structure
- **Root Layout** (src/app/layout.tsx): JSON-LD schema, Open Graph tags, GameProvider
- **Homepage** (src/app/page.tsx): Single-page with hero, tech stack, projects, contact
- **All components**: Client Components ("use client") for full interactivity

### State Management: GameContext
- **Context** (src/context/GameContext.tsx):
  - `isUnlocked`: Boolean persisted to localStorage as `"portfolio_unlocked"`
  - `isOpen`: Controls modal visibility
  - Methods: `unlock()`, `openModal()`, `closeModal()`
  - Use `useGame()` hook in components; includes error handling
- **localStorage Pattern**: Loads on mount, survives page reloads, reset with `localStorage.removeItem("portfolio_unlocked")`

### Data Models
- **Projects** (src/data/projects.ts): Typed array with:
  - `title`, `description`, `tags`, `link`, `featured`, `icon` (Lucide), `clue?`
  - Mapped to src/app/page.tsx via ProjectCard component

## Component Patterns

### Modal & Puzzle System
- **UnlockModal** (src/components/UnlockModal.tsx): Multi-stage orchestration
  - Stage 0: Intro with "Begin Verification" button
  - Stage 1: `StatsChallenge` (correct answer: index 2)
  - Stage 2: `MarkovChallenge` (see component file)
  - Stage 3: Success animation, then `unlock()` + `closeModal()`
  - **Keyboard Support**: Escape key closes modal (if stage ≠ 3)
  - **ARIA**: `role="dialog"`, `aria-labelledby`, `aria-modal="true"`

- **Puzzle Components** (src/components/puzzles/):
  - Props: `onComplete: () => void` fires on correct answer
  - Framer Motion: `initial`, `animate`, `exit` on transitions
  - Error states: `role="alert"` for error messages
  - Accessibility: `aria-pressed`, `aria-label` on buttons

### Component Organization
- Shared: src/components/ (Hero, Navbar, ProjectCard, TechStack, Contact)
- Puzzle-specific: src/components/puzzles/
- All use Tailwind; prefer `clsx` for conditional styles

## Styling & Animation Conventions

### Tailwind + Framer Motion
- **Dark theme**: `bg-black`, zinc palette, emerald-500 accent
- **Color Scheme**:
  - Action: `bg-emerald-500 hover:bg-emerald-400 text-black`
  - Borders: `border-zinc-900` → `border-emerald-500/50` on hover
  - Text: `text-white` (primary), `text-zinc-400` (secondary)
  - Error: `text-red-500`
- **Framer Motion**:
  - Modal backdrop: `opacity: 0 → 1`
  - Modal body: `scale: 0.9, y: 20 → 1, 0`
  - Buttons: `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`
- **Responsive**: `md:` and `lg:` breakpoints; `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` pattern

### Touch & Accessibility
- Minimum 44x44px touch targets (`min-h-[44px] min-w-[44px]`)
- Focus visible on all buttons
- Color contrast ≥ 4.5:1 (WCAG AA)
- Decorative elements: `aria-hidden="true"`

## SEO & Meta Configuration

### Metadata Strategy (src/app/layout.tsx)
- Title: "Manas Dutt | Full Stack Developer & ML Specialist"
- Description: Includes "puzzle challenges", "interactive"
- Keywords: Next.js, React, ML, Portfolio
- Open Graph: 1200x630px image, Twitter card, locale
- JSON-LD: Person schema with sameAs links
- Canonical URL: https://manas-portfolio.vercel.app
- robots: `index: true, follow: true`

## Critical Workflows

### Development
```bash
npm run dev           # Next.js dev server (port 3000)
npm run build         # Production build (includes TypeScript checks)
npm start             # Run production build
npm run lint          # ESLint (config: eslint.config.mjs)
npm run test          # Jest tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Adding New Features
1. **Component**: Create in src/components/; use "use client" if stateful
2. **Section**: Add to src/app/page.tsx with scroll ID (`id="hero"`, `id="work"`)
3. **Project**: Add to `projects` array in src/data/projects.ts
4. **Puzzle**: Create in src/components/puzzles/ with `onComplete` callback; wire stage logic in UnlockModal
5. **Test**: Add test file with `.test.tsx` suffix

### Testing Patterns
- Unit tests for GameContext state transitions
- Component tests for puzzle success/failure paths
- Use `jest.useFakeTimers()` for setTimeout calls
- Mock callbacks with `jest.fn()`

### localStorage Patterns
- Write: `localStorage.setItem("portfolio_unlocked", "true")`
- Read: Load on GameProvider mount
- Delete: `localStorage.removeItem("portfolio_unlocked")`
- Graceful fallback if localStorage unavailable

## Dependencies & Import Paths

### Key Libraries
- `next`: 16.1.4 (App Router, server components)
- `react`: 19.2.3
- `framer-motion`: 12.29.0 (animations)
- `tailwindcss`: 4 (via @tailwindcss/postcss)
- `lucide-react`: 0.563.0 (icons)
- `react-scroll`: 1.9.3 (smooth scroll)
- `clsx`: 2.1.1 (conditional CSS)
- `tailwind-merge`: 3.4.0 (class merging)
- **Dev**: Jest, React Testing Library, @types packages

### Path Aliases
- `@/*` → `./src/*` (tsconfig.json)
- Always import: `@/components/`, `@/context/`, `@/data/`

## Code Style & Conventions

### TypeScript
- Strict mode enabled (`strict: true`)
- Explicit prop interfaces
- JSDoc comments on exported functions
- Error handling in context hooks with descriptive messages

### Naming
- Components: PascalCase (ProjectCard, StatsChallenge)
- Functions/data: camelCase (projects, handleUnlock)
- CSS classes: Tailwind conventions
- Test files: `ComponentName.test.tsx`

### File Organization
- Components self-contained with local state
- Shared utilities in `src/utils/` (if needed)
- Data in `src/data/`
- Tests co-located with source: `src/components/__tests__/` or `file.test.tsx`

## Deployment & Production

### Configuration Files
- **next.config.ts**: Security headers, image optimization, compression
- **vercel.json**: Vercel platform configuration
- **.env.example**: Template for environment variables
- **jest.config.js / jest.setup.js**: Test configuration

### Production Builds
- Next.js enables static generation where possible
- TypeScript strict mode catches errors pre-deploy
- ESLint validation runs in build pipeline
- Environment variables validated before runtime

### Deployment Checklist
- Pre-deployment code quality checks
- Vercel deployment steps
- Alternative hosting (Docker, Node.js server)
- Post-deployment monitoring
- Rollback procedures

## Common Pitfalls to Avoid

1. **Forgetting "use client"** in interactive components (modals, buttons, forms)
2. **Breaking scroll IDs** in src/app/page.tsx (Navbar links depend on them)
3. **Not persisting unlock state** to localStorage for new features
4. **Missing `onComplete` callbacks** in puzzle components (modal stage logic depends on them)
5. **Inconsistent emerald-500 accent** color in new elements
6. **Accessibility regressions**: Always test with keyboard (Tab, Enter, Escape)
7. **localStorage access without try-catch** (can fail in some browsers)
8. **Hardcoding URLs** instead of using environment variables
9. **Missing ARIA labels** on interactive elements
10. **Not updating tests** when changing component behavior

## Quick Debugging Tips

- **Modal not opening?** Check GameContext provider in layout
- **Unlock state not persisting?** Verify localStorage is enabled; check DevTools Application tab
- **Puzzle answer wrong?** Remember StatsChallenge correct answer is index 2
- **Build fails?** Clear `.next/` and run `npm install` again
- **TypeScript errors?** Check `tsconfig.json` strict mode and prop types
- **Tests failing?** Use `jest.useFakeTimers()` for timeout-based tests

---

**Last Updated**: February 2026 | **Version**: 2.0 (Puzzle Edition)
