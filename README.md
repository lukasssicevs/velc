# VELC Product Studio — landing page

Single-page Next.js site for VELC Product Studio, built by Lukass Sicevs
(build) and Daniels Kalnins (client side). See
`CLAUDE.md` for full context, brand decisions already made, and what's
still open — read that first before making changes, especially with
Claude Code.

## Run locally

```
npm install
cp .env.local.example .env.local   # add your Resend API key
npm run dev
```

Then open http://localhost:3000

The contact form needs `RESEND_API_KEY` set (see `.env.local.example`) to
actually send email — without it, submitting shows a "not configured"
error but doesn't crash.

## Structure

- `app/page.tsx` — all page content and sections
- `app/api/contact/route.ts` — serverless API route that sends the contact
  form via Resend
- `app/layout.tsx` — fonts + page metadata (title/description)
- `app/globals.css` — base styles, hairline/eyebrow utility classes
- `tailwind.config.ts` — color and font tokens
- `CLAUDE.md` — context for AI coding sessions: decisions made, design
  rationale

## Deploying

Not deployed yet. Name is decided (VELC Product Studio); run `vercel deploy`
from this directory (needs the Vercel CLI and an account) or connect this
repo in the Vercel dashboard for automatic deploys on push. Set
`RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL`) in the Vercel
project's env vars, or the contact form will fail in production.
