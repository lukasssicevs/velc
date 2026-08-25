# VELC Agency — landing page

Single-page Next.js site for VELC Agency, the two-person product studio
run by Lukass Sicevs (build) and Daniels Kalnins (client side). See
`CLAUDE.md` for full context, brand decisions already made, and what's
still open — read that first before making changes, especially with
Claude Code.

## Run locally

```
npm install
npm run dev
```

Then open http://localhost:3000

## Structure

- `app/page.tsx` — all page content and sections
- `app/layout.tsx` — fonts + page metadata (title/description)
- `app/globals.css` — base styles, hairline/eyebrow utility classes
- `tailwind.config.ts` — color and font tokens
- `CLAUDE.md` — context for AI coding sessions: decisions made, design
  rationale

## Deploying

Not deployed yet. Name is decided (VELC Agency); run `vercel deploy`
from this directory (needs the Vercel CLI and an account) or connect this
repo in the Vercel dashboard for automatic deploys on
push.
