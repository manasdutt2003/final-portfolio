# Deployment Guide

## Pre-Deployment Checklist

### Code Quality
- [ ] `npm run build` passes (TypeScript strict mode)
- [ ] `npm run lint` passes (ESLint clean, 0 errors)
- [ ] `npm run test` passes (Jest test suite ✅)
- [ ] No console errors in development
- [ ] All imports use proper path aliases (@/)

### Functionality
- [ ] Hero section displays correctly
- [ ] All navigation links scroll to correct sections
- [ ] Modal opens on "Begin Verification" button click
- [ ] Both puzzle challenges work (answer at index 2 for stats)
- [ ] Unlock persists across page reload (localStorage)
- [ ] Contact form is functional
- [ ] All social links open in new tabs

### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Modal closes with Escape key
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets are 44x44 px minimum
- [ ] ARIA labels present on interactive elements
- [ ] No lighthouse accessibility warnings

### SEO & Meta
- [ ] Title tag is accurate and compelling
- [ ] Meta description summarizes portfolio
- [ ] Open Graph image is 1200x630 px
- [ ] JSON-LD schema validates (schema.org)
- [ ] robots.txt and sitemap.xml in place

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] No unused dependencies in package.json
- [ ] Images optimized (no oversized files)
- [ ] CSS is minified in production build

### Security
- [ ] No hardcoded API keys or secrets
- [ ] .env variables properly configured
- [ ] Security headers set in next.config.ts
- [ ] All external links have proper rel attributes
- [ ] No console.log() statements in production code

---

## Vercel Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Release: v2.0 Puzzle Edition - Production enhancements"
git push origin main
```

### Step 2: Vercel Auto-Deployment
1. Navigate to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select project: `final-portfolio`
3. Vercel automatically triggers build on git push
4. Monitor build logs for success/failure
5. Deployment completes in ~60 seconds

### Step 3: Verify Live Deployment
```bash
# Test the live URL
curl https://manas-portfolio.vercel.app

# Check SEO headers
curl -I https://manas-portfolio.vercel.app
```

**Expected Responses**:
- Status: 200 OK
- Content-Type: text/html
- X-Content-Type-Options: nosniff (security header)

### Step 4: Post-Deployment Testing

#### Browser Testing
1. **Desktop (Chrome, Firefox, Safari)**
   - [ ] Page loads in < 2 seconds
   - [ ] Hero section renders with animations
   - [ ] Puzzle modal opens and functions correctly
   - [ ] Portfolio unlocks after solving challenges
   - [ ] Scroll navigation smooth and responsive

2. **Mobile (iOS Safari, Chrome Android)**
   - [ ] Responsive layout adjusts properly
   - [ ] Touch targets are clickable (44px+)
   - [ ] Modal fit on small screens
   - [ ] No layout shifts (CLS < 0.1)

3. **Accessibility**
   - [ ] Tab through interactive elements (keyboard only)
   - [ ] Modal closes with Escape key
   - [ ] Screen reader announces interactive elements
   - [ ] Color contrast visible (not relying on color alone)

#### Lighthouse Audit
```bash
# Run Lighthouse via Chrome DevTools
# Target: Performance > 90, Accessibility > 95, Best Practices > 95

Chrome DevTools → Lighthouse → Generate Report
```

**Expected Scores**:
| Category | Target | Status |
|----------|--------|--------|
| Performance | > 90 | Check |
| Accessibility | > 95 | Check |
| Best Practices | > 95 | Check |
| SEO | > 95 | Check |

#### Monitoring
- **Vercel Analytics**: View in Vercel dashboard
  - Page views, unique visitors
  - Core Web Vitals (LCP, FID, CLS)
  - Browser/device breakdown

---

## Alternative Hosting Options

### Docker Deployment

#### Build Docker Image
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./
EXPOSE 3000

CMD ["npm", "start"]
```

#### Build & Push
```bash
docker build -t manas-portfolio:latest .
docker tag manas-portfolio:latest registry.example.com/manas-portfolio:latest
docker push registry.example.com/manas-portfolio:latest
```

#### Run Locally
```bash
docker run -p 3000:3000 manas-portfolio:latest
# Visit http://localhost:3000
```

### Node.js Server Deployment

#### PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Build the project
npm run build

# Start with PM2
pm2 start "npm start" --name "portfolio"

# Monitor
pm2 monit
```

#### Environment Setup (Linux Server)
```bash
# SSH into server
ssh user@server.com

# Clone repository
git clone https://github.com/manasdutt2003/final-portfolio.git
cd final-portfolio

# Install dependencies
npm install --production

# Build
npm run build

# Start with PM2
pm2 start "npm start" --name "portfolio"

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

#### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name manas-portfolio.com www.manas-portfolio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### SSL Certificate (Let's Encrypt)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d manas-portfolio.com
```

### Cloud Platform Deployment

#### AWS EC2
1. Launch Ubuntu 22.04 instance
2. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
3. Clone repo, install, build, run with PM2
4. Use Route 53 for DNS
5. CloudFront for CDN (static assets)
6. RDS (optional) for database

#### DigitalOcean App Platform
1. Connect GitHub repo
2. Configure build: `npm run build`
3. Configure run: `npm start`
4. Set environment variables in dashboard
5. Deploy (auto-deploys on git push)

#### Heroku (Legacy - Hobby dyno deprecated)
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create portfolio-manas

# Deploy
git push heroku main

# Logs
heroku logs --tail
```

---

## Monitoring & Maintenance

### Uptime Monitoring
- **Service**: UptimeRobot.com (free tier: 5-minute checks)
- **Setup**: Create monitor for https://manas-portfolio.vercel.app
- **Alert**: Email on downtime

### Error Tracking
- **Vercel**: Built-in error reporting in dashboard
- **Sentry** (optional): `npm install @sentry/nextjs`
  ```javascript
  // src/app/layout.tsx
  import * as Sentry from "@sentry/nextjs";
  
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
  ```

### Performance Monitoring
- **Vercel Analytics**: Real user monitoring (included)
- **Lighthouse CI**: Automated Lighthouse runs on PRs
  ```bash
  npm install --save-dev @lhci/cli@0.11.x @lhci/config-reader@0.11.x
  ```

### Log Rotation
- Vercel handles automatically (90-day retention)

---

## Rollback Procedures

### Vercel Rollback
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Project → Deployments
2. Find last stable deployment
3. Click "Redeploy" on the stable version
4. Confirm redeploy

### Git Rollback (If needed)
```bash
# View commit history
git log --oneline

# Revert to previous commit
git revert HEAD
# OR reset local branch (destructive)
git reset --hard <commit-hash>

# Push rollback
git push origin main
```

### Database Rollback (If applicable)
- Keep backup snapshots every deployment
- AWS RDS: Use automated snapshots or manual backups

---

## Version Management

### Semantic Versioning
- **Major** (2.0): Breaking changes or major features
- **Minor** (2.1): New features, backward compatible
- **Patch** (2.0.1): Bug fixes only

### Release Checklist
1. [ ] All tests passing
2. [ ] Update CHANGELOG.md
3. [ ] Bump version in package.json
4. [ ] Create git tag: `git tag v2.0.0`
5. [ ] Push tag: `git push origin v2.0.0`
6. [ ] Merge to main (auto-deploys)
7. [ ] Verify deployment on live URL

---

## Troubleshooting

### Build Fails on Vercel
```
Symptom: "Build failed"
Solution:
1. Check Vercel build logs (Dashboard → Deployments)
2. Locally run: npm run build
3. Look for TypeScript errors
4. Fix and push to trigger new build
```

### Page Blank/White Screen
```
Symptom: URL loads but shows blank page
Solution:
1. Check browser console (F12 → Console tab)
2. Look for JavaScript errors
3. Verify GameProvider is wrapping page
4. Check localStorage quota (rare)
```

### Modal Not Opening
```
Symptom: "Begin Verification" button clicked but nothing happens
Solution:
1. Check GameContext is properly provided in layout.tsx
2. Verify useGame() hook is used correctly in UnlockModal
3. Check browser console for errors
4. Verify Framer Motion is installed: npm list framer-motion
```

### Puzzle Answer Wrong
```
Symptom: All answers marked as incorrect
Solution:
- StatsChallenge correct answer is INDEX 2 (third option)
- MarkovChallenge: check component file for correct answer
- Verify onComplete() is called in puzzle component
```

### Slow Page Load
```
Symptom: Page takes > 3 seconds to load
Solution:
1. Check Lighthouse report (DevTools → Lighthouse)
2. Enable compression: npm install compression (if self-hosted)
3. Optimize images: use Next.js Image component
4. Check for large dependencies: npm list --depth=0
```

---

## Post-Deployment Checklist

- [ ] Deployment successful on Vercel
- [ ] Live URL accessible: https://manas-portfolio.vercel.app
- [ ] All features tested (hero, puzzles, unlock, contact)
- [ ] SEO validated (Google Search Console)
- [ ] Performance good (Lighthouse > 90)
- [ ] No console errors (DevTools)
- [ ] Mobile responsive (iPhone, Android)
- [ ] Uptime monitoring configured
- [ ] Error tracking enabled
- [ ] Team notified of deployment
- [ ] Documentation updated (README, CHANGELOG)

---

**Last Updated**: February 2026 | **Deployment Version**: 2.0
