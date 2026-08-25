# Context for Claude Code

This is the landing page for a two-person product studio: **Lukass Sicevs**
(builds) and **Daniels Kalnins** (client side). Read this before making
changes so you don't contradict prior decisions.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind. No CMS, no database, no
auth. It's a single static marketing page. Keep it that way unless
explicitly asked to add something — this is a services page, not a SaaS app.
Do not introduce a SaaS-style boilerplate (auth, billing, multi-tenancy)
into this repo; that would be the wrong tool for what this page does.

## Source of truth for copy

The copy in `app/page.tsx` was finalized through many rounds of editing in
a Notion doc and a long conversation with Claude. Live Notion page:
https://app.notion.com/p/3c3ab0267d8f81679d2dffd1936dc982

If asked to update copy, prefer small, surgical edits over rewrites. The
copy has been deliberately trimmed of filler multiple times — don't add
generic agency language back in (no "results-driven," "synergy," "we deliver
excellence," etc). House style: short sentences, no em dashes, active voice,
concrete claims over adjectives, no hedging.

## Brand decisions already made (don't relitigate these)

- **Studio name: VELC Agency**, but displayed as just **"VELC"** almost
  everywhere (header, page title/metadata). Chosen 2026-08-25, reversing
  the earlier "personal names over company name" preference (see history
  below) — this was a deliberate, knowing tradeoff, not an accident, so
  don't revert it without being asked. The "you talk to the people
  building it, no account manager" differentiator is preserved a level
  down: the header/metadata carry just "VELC", but the "Who you're working
  with" section still names Lukass and Daniels personally, with photos and
  direct contact info — that's what actually delivers on the "no overhead"
  claim now. The full form "VELC Agency" only appears where a bare
  four-letter word genuinely isn't enough: the footer copyright line, and
  (once picked) the domain/legal name. Don't spell out "VELC Agency" on
  the visible page elsewhere without being asked — the whole point is that
  it stays backgrounded.
- **Location: Dubai, UAE** (footer). Not Riga — Riga is where Lukass and
  Daniels met, a separate fact from where the studio is now based; don't
  conflate the two if editing either.
- **Fixed price only.** No hourly billing language anywhere on the page.
- **Three packages**: Build (fixed scope/fee), Ongoing (retainer), Audit
  and roadmap (smaller engagement). Keep exactly these three unless told
  otherwise.
- **Daniels' bio** deliberately avoids "closing deals" language — earlier
  drafts framed him as only useful for landing the sale, which read as
  serving the agency's interest, not the client's. Current framing is
  "managing high-stakes clients and high-trust relationships," which
  implies ongoing care, not just closing. Preserve that framing if editing.
- **Lukass' bio** explicitly distinguishes "his own apps built solo" from
  "company products where he owned the architecture and led the team" — do
  not collapse this back into vague language that could read as him being
  staffed onto projects rather than leading them.

## Naming history (context, not an open decision anymore)

The name is decided (VELC Agency, see above). Earlier ideas considered
and rejected before landing there, kept for context in case this comes up
again:

- Acronym-based names off "TKS" (initials tied to a place in Riga where
  they met) — rejected because they require explanation to any
  non-Latvian-speaking client, which is the entire target market (Western
  Europe / US, explicitly not Latvia).
- Generic "[X] Solutions" / "[X] Agency" suffixes — originally rejected as
  generic-sounding. Note: VELC Agency itself uses this suffix pattern —
  that rejection was knowingly overridden, not forgotten. If a future
  rename comes up, this tension is worth surfacing again rather than
  silently re-deciding it.
- Playful/ironic names riffing on "vibe coding" (e.g. "Vibe Police") —
  rejected as too unserious for high-value client pitches.

A stale Notion page title ("TKS Solutions") was found during the VELC
rename and is not evidence the TKS direction was ever finalized — it was
just never updated after that idea was rejected. Watch for other stale
mentions of "TKS Solutions" or "Lukass & Daniels" as the site's name
elsewhere (docs, Notion, deploy configs) if this file's checklist wasn't
followed exactly.

## Design system (do not casually change)

Chosen deliberately to avoid generic AI-generated design defaults. Theme:
precision / engineering / technical drawing, grounded in the "engineered to
last, not thrown together" positioning. Flipped from a dark navy+teal theme
to a monochrome light theme on 2026-08-25 at Daniels' direction ("slim and
elegant" vibe) — this was a deliberate full palette swap, not a partial
one, so don't reintroduce color accents without being asked.

- Colors: bg `#FAFAF8`, surface `#F2F2EF`, ink `#151515`, muted `#6E6E6B`,
  hairline `#E6E6E3`, accent `#151515` (same as ink — the site is
  intentionally monochrome, no color accent anywhere).
- Type: Space Grotesk (display/headings), Inter (body), IBM Plex Mono
  (small mono labels/eyebrows — the "spec sheet" annotation feel).
- Signature element: the hero schematic (`Schematic` component in
  `app/page.tsx`) — Idea → Design → Build → Deploy → Support, drawn as
  connected icon-badge nodes (lucide-react icons). No longer names Lukass
  or Daniels directly (removed 2026-08-25 — see "Who you're working with"
  for where their names now live instead). This is the one deliberate
  visual risk on the page; don't dilute it by adding more decoration
  elsewhere. On mobile/tablet (below the `lg` breakpoint, 1024px) it
  switches to a vertical stacked layout rather than a horizontal scroller —
  the horizontal chain needs ~800px to fit without clipping, so don't lower
  that breakpoint without re-checking the fit.

## What's NOT done yet

- Not deployed anywhere yet, but the name is no longer the blocker — this
  deploys cleanly to Vercel (`vercel deploy` from this directory, or
  connect the GitHub repo in the Vercel dashboard) whenever it's time.
- No analytics.
- Screenshots and app icons ARE wired in now (animated marquee rows per
  project in `SelectedWork`, pulled from each app's App Store/Play Store
  listing) — this used to be an open item, it isn't anymore.

## Running locally

```
npm install
npm run dev
```

Opens on http://localhost:3000
