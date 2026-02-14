# Architecture & System Design

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                        │
│  (SSR/SSG for SEO, 16 KB min JavaScript per page)            │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
    ┌───▼────┐                    ┌──────▼──────┐
    │ Layout │ (Metadata)         │ Page.tsx    │
    └────────┘                    │ (Sections)  │
        │                         └─────────────┘
        │
    ┌───▼──────────────────────────┐
    │  GameProvider (Context)       │
    │  ├─ isUnlocked (state)        │
    │  ├─ isOpen (modal state)      │
    │  └─ localStorage persistence  │
    └───┬──────────────────────────┘
        │
        ├─ <Hero />
        ├─ <TechStack />
        ├─ <ProjectCard /> (array)
        ├─ <Contact />
        ├─ <UnlockModal />
        │  ├─ Stage 0: Intro
        │  ├─ Stage 1: StatsChallenge
        │  ├─ Stage 2: MarkovChallenge
        │  └─ Stage 3: Success
        └─ <Navbar /> (sticky, scroll links)
```

## Component Hierarchy

### Root: src/app/layout.tsx
- **Purpose**: Root layout, metadata injection, provider setup
- **Key Exports**:
  - `Metadata` object (SEO, OG tags, JSON-LD)
  - `RootLayout` component
- **Children**: GameProvider → Page

### Page: src/app/page.tsx
- **Purpose**: Single-page portfolio with all sections
- **Sections** (with scroll IDs):
  - `#hero` - Hero section
  - `#tech` - Tech stack
  - `#work` - Projects grid
  - `#contact` - Contact form
- **Key State**: Uses `useGame()` context for unlock status

### Components: src/components/
| Component | Props | State | Purpose |
|-----------|-------|-------|---------|
| `Hero` | None | None | Name, tagline, social links |
| `Navbar` | None | None | Sticky nav with scroll links |
| `TechStack` | None | None | Skill tags |
| `ProjectCard` | `project`, `index` | None | Single project display |
| `Contact` | None | None | Email/social contact |
| `UnlockModal` | None | `stage` (0-3) | Multi-stage puzzle orchestrator |

### Puzzles: src/components/puzzles/
| Component | Props | Purpose | Answer |
|-----------|-------|---------|--------|
| `StatsChallenge` | `onComplete: () => void` | Identify uniform distribution | Index 2 |
| `MarkovChallenge` | `onComplete: () => void` | Markov chain analysis | (See component) |

## Data Models

### Project Interface
```typescript
interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    featured: boolean;
    icon: LucideIcon;
    clue?: string; // Optional hint for puzzle
}
```

### GameContextType
```typescript
interface GameContextType {
    isUnlocked: boolean;
    unlock: () => void;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}
```

## State Management Flow

### GameContext Lifecycle

**Initialization**:
```
App Mount
  ↓
GameProvider render
  ↓
useState initializer runs
  ↓
localStorage.getItem("portfolio_unlocked") ?
  ├─ YES → setIsUnlocked(true)
  └─ NO → setIsUnlocked(false)
  ↓
Component subscribes via useGame()
  ↓
Re-render with state
```

**Unlock Flow**:
```
User clicks "Begin Verification"
  ↓
openModal() → isOpen = true
  ↓
Stage 1: StatsChallenge → User solves
  ↓
onComplete() → Stage 2
  ↓
MarkovChallenge → User solves
  ↓
onComplete() → Stage 3 (success)
  ↓
unlock() → isUnlocked = true, localStorage.setItem("portfolio_unlocked", "true")
  ↓
Portfolio content reveals (mapped from isUnlocked)
```

**Modal Close**:
```
User presses Escape (if stage < 3)
  ↓
closeModal() → isOpen = false
  ↓
Modal unmounts with exit animation
  ↓
Unlock state unchanged
```

## Styling Architecture

### Color Palette
```
Background: #000000 (black)
Primary: #ffffff (white)
Secondary: #a1a1a1 (zinc-400)
Borders: #18181b (zinc-900)
Accent: #10b981 (emerald-500)
Accent Hover: #34d399 (emerald-400)
Error: #ef4444 (red-500)
Success: #10b981 (emerald-500)
```

### Responsive Breakpoints
- `sm`: 640px (small phones)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large screens)

### Animation Timing
```
Fast: 150ms (button interactions)
Normal: 300-500ms (section transitions)
Slow: 800ms+ (modal entrance)
```

### Framer Motion Presets

**Modal Backdrop**:
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.2 }}
```

**Modal Body**:
```typescript
initial={{ scale: 0.9, y: 20, opacity: 0 }}
animate={{ scale: 1, y: 0, opacity: 1 }}
exit={{ scale: 0.9, y: 20, opacity: 0 }}
transition={{ duration: 0.3 }}
```

**Buttons**:
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
transition={{ type: "spring", stiffness: 400 }}
```

## SEO & Metadata Strategy

### Layout Metadata (src/app/layout.tsx)
- **Title**: "Manas Dutt | Full Stack Developer & ML Specialist"
- **Description**: 160-character tagline with keywords
- **Keywords**: Next.js, React, TypeScript, ML, Portfolio
- **Canonical URL**: https://manas-portfolio.vercel.app
- **Robots**: `index: true, follow: true`

### Open Graph (Social Sharing)
```
og:title, og:description, og:image (1200x630)
og:type: "website"
og:locale: "en_US"
twitter:card: "summary_large_image"
theme-color: "#000000" (for browser chrome)
```

### JSON-LD Structured Data
```typescript
// Person schema
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Manas Dutt",
  "url": "https://manas-portfolio.vercel.app",
  "sameAs": [
    "https://github.com/...",
    "https://linkedin.com/..."
  ]
}
```

## Accessibility (WCAG 2.1 AA)

### ARIA Attributes
- `role="dialog"` on UnlockModal
- `aria-modal="true"` on modal backdrop
- `aria-labelledby` on modal (connects to heading)
- `role="alert"` on error messages
- `aria-label` on icon-only buttons (Navbar, Contact)
- `aria-hidden="true"` on decorative elements

### Keyboard Navigation
- **Tab**: Focus cycle through all interactive elements
- **Enter**: Activate buttons, submit forms
- **Escape**: Close modal (if stage < 3)
- **Space**: Activate buttons (alternative to Enter)

### Touch Targets
- Minimum 44x44 px for all clickable elements
- `min-h-[44px] min-w-[44px]` Tailwind classes

### Color Contrast
- Text on background: 4.5:1 (WCAG AA minimum)
- Focus indicators: 3:1 against adjacent colors
- No information conveyed by color alone (icons + text)

### Semantic HTML
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `<button>` for actions, `<a>` for navigation
- `<form>` for contact inputs
- `<img>` with descriptive `alt` text

## Testing Strategy

### Unit Tests

**GameContext** (src/context/GameContext.test.tsx):
- ✅ Initial locked state
- ✅ Unlock state transition
- ✅ Modal open/close
- ✅ localStorage persistence
- ✅ useGame() hook error handling

**StatsChallenge** (src/components/puzzles/StatsChallenge.test.tsx):
- ✅ Renders 4 options
- ✅ Correct answer (index 2) → onComplete
- ✅ Wrong answer → error message
- ✅ onComplete not called on error

### Integration Tests (Ready to Implement)
- Full puzzle flow: Stage 0 → 1 → 2 → 3
- localStorage persistence across page reload
- Navbar scroll link navigation

### Coverage Goals
- **Target**: 70%+ code coverage
- **Priority**: GameContext, UnlockModal, Puzzles
- **Exclusions**: Layout styling, decorative animations

### Testing Tools
- **Framework**: Jest 29
- **Component Testing**: React Testing Library 15
- **Matchers**: @testing-library/jest-dom
- **Utilities**: jest.fn(), jest.useFakeTimers()

## Performance Considerations

### Optimizations Implemented
1. **Image Optimization**: Next.js Image component with lazy loading
2. **Code Splitting**: Per-route code splitting via Next.js App Router
3. **CSS**: Tailwind CSS purging unused styles (production build)
4. **Fonts**: Geist fonts via next/font (preloaded, optimized)
5. **JavaScript Minification**: Turbopack production build

### Metrics
- Largest Contentful Paint (LCP): < 2.5s target
- First Input Delay (FID): < 100ms target
- Cumulative Layout Shift (CLS): < 0.1 target

### Bundle Size
- Initial JS: ~16 KB (Next.js optimized)
- CSS: ~30 KB (Tailwind production)
- Total: ~50-60 KB gzipped

## Security Configuration

### next.config.ts Headers
```typescript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ]
  }]
}
```

### Dependencies
- Regular npm audit checks
- Pinned versions in package-lock.json
- No untrusted CDN scripts
- All external links have `rel="noopener noreferrer"`

## Future Enhancement Opportunities

### Quick Wins
1. **Toast Notifications**: Replace `alert()` with a toast component (npm: react-toastify)
2. **Analytics**: Integrate Vercel Analytics or Plausible for visitor tracking
3. **Dark/Light Mode**: Toggle theme via context + Tailwind dark: class
4. **Email Validation**: Add regex validation to Contact form before sending

### Medium-Effort
1. **PWA Support**: Service worker, offline support, install prompt
2. **Internationalization (i18n)**: next-intl for multi-language support
3. **Blog Section**: MDX-based blog with dynamic routes
4. **Comment System**: Disqus or custom comments for portfolio pieces

### High-Impact
1. **Backend API**: Node.js/Express for contact form email delivery
2. **Admin Dashboard**: Manage projects, blog posts, analytics
3. **Real-time Notifications**: WebSocket updates (new project added)
4. **CMS Integration**: Headless CMS (Sanity, Contentful) for content management

---

**Last Updated**: February 2026 | **Architecture Version**: 2.0
