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

**One deliberate exception**: `app/api/contact/route.ts`, a small
serverless API route that sends the contact form via Resend
(`RESEND_API_KEY` env var — see `.env.local.example`). Added 2026-08-26
because the earlier `mailto:` approach popped an external mail client,
which the user explicitly didn't want ("no in-between programs opening").
This is not a CMS/database/auth and doesn't change the "static site"
nature of the page — it's a single stateless endpoint with no persistence.
Don't expand it into anything more than that (no submission storage, no
admin view) without being asked. Current recipient list is intentionally
Lukass-only for now — see "What's NOT done yet" below before changing it.

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

- **Studio name: VELC Product Studio**, but displayed as just **"VELC"**
  almost everywhere (header, page title/metadata) — same backgrounding
  pattern as before, just a different suffix. Originally "VELC Agency"
  (chosen 2026-08-25), changed to "VELC Product Studio" on 2026-08-26
  after Lukass worked through what the studio actually is: pure client
  work, with Daniels having no ownership stake in anything shown on the
  page (see "Portfolio attribution" below) — so "product studio" is used
  here in its common sense (a team applying real product craft/design
  discipline to client work, the way Metalab or Ueno used the term), not
  as a venture-studio ownership claim. This also deliberately keeps
  "studio" available in Lukass's own vocabulary for a future venture he'd
  actually own outright — using it for VELC isn't meant to claim VELC owns
  what it ships for clients. Don't revert to "Agency" or relitigate this
  without being asked. The "you talk to the people building it, no
  account manager" differentiator is preserved a level down: the
  header/metadata carry just "VELC", but the "Who you're working with"
  section still names Lukass and Daniels personally, with photos and
  direct contact info. The full form "VELC Product Studio" only appears
  where a bare four-letter word genuinely isn't enough: the footer
  copyright line, the contact-form sender name
  (`app/api/contact/route.ts`), and (once picked) the domain/legal name.
  Don't spell it out on the visible page elsewhere without being asked —
  the whole point is that it stays backgrounded.
- **Portfolio attribution — considered, deliberately kept minimal
  (2026-08-26).** None of the projects in `SelectedWork` involved
  Daniels — all five predate VELC and are Lukass's work alone. For
  context in case this comes up again: Drippler is his own solo project;
  Moneliq, FinMercado, and the white label mobile system were built while
  directly employed by those companies themselves (in-house, literally);
  Enterprise Web Solutions (Puma, Läderach, Cervera) was built while
  employed at a separate digital agency that had those brands as clients
  (not in-house at Puma etc.). A "built in-house / at a digital agency,
  before VELC" clause was briefly added to all four non-Drippler
  descriptions, then reverted the same day — decided it was solving a
  problem the page already handles: the "Who you're working with" bio
  already discloses the solo-vs-company-work distinction ("his own apps
  built solo to company products where he owned the architecture and led
  the team"), and repeating it per-project made the portfolio copy read
  hedgy/CV-like instead of the short, confident, declarative voice used
  everywhere else. Drippler's "built solo... all one person" line is a
  capability flex (one person, four platforms), not an attribution
  disclaimer — don't mistake it for a pattern to replicate on the other
  four. Don't re-add per-project employment clauses without being asked
  again.
- **Location: Dubai, UAE** (footer). Not Riga — Riga is where Lukass and
  Daniels met, a separate fact from where the studio is now based; don't
  conflate the two if editing either.
- **Fixed price only.** No hourly billing language anywhere on the page.
- **Three packages**: Build (fixed scope/fee), Ongoing (retainer), Audit
  and roadmap (smaller engagement). Keep exactly these three unless told
  otherwise.
- **Daniels' bio** deliberately avoids "closing deals" language — earlier
  drafts framed him as only useful for landing the sale, which read as
  serving the agency's interest, not the client's. As of 2026-08-26 the
  bio is Daniels' own proposed wording: "Runs the client side: scoping,
  commercials, and the relationship from first call to delivery and
  beyond. A tech and data background combined with years in sales,
  negotiation, and client management." This supersedes the earlier
  "high-stakes clients and high-trust relationships" phrasing (that
  framing is gone from the page now, not just paraphrased) — preserve the
  "ongoing relationship, not just closing" spirit if editing further, but
  don't reintroduce the old sentence verbatim thinking it's still current.
- **Hero claim: "Two people. No layers."** (changed 2026-08-26 from
  wording built around "no overhead"). Daniels' feedback was that "no
  overhead" reads as "cheap"; "no layers" communicates small + senior +
  direct + efficient instead. Don't revert to "no overhead" phrasing
  anywhere on the page.
- **Contact is a CTA, not a bare mailto list.** The old "Get in touch /
  [email] / [email]" ending was replaced 2026-08-26 with a proper CTA:
  headline "Have something you want built?", a supporting paragraph, a
  "Start a conversation" button, and (behind that button) a short,
  progressive-disclosure lead-qualification form — what they're building,
  platform, timeframe, budget, and a free-text field — not a long
  15-question form. Individual emails still exist but are now a secondary
  "Daniels · Lukass" byline below the CTA, not the primary display. The
  "Who you're working with" bios and this CTA are combined into one
  section (`WhoWeAreAndContact` in `app/page.tsx`) placed at the very end
  of the page, right before the footer — it used to be a standalone
  section right after the hero; don't split it back apart or move it back
  up without being asked. The form collects the visitor's own email plus
  the qualification answers and POSTs to `/api/contact` (see Stack
  exception above), which sends via Resend — no `mailto:` and no external
  app opens. This replaced an earlier `mailto:`-based version (2026-08-26)
  specifically because the user wanted a submission to go straight to both
  founders without switching the visitor to a mail client.
- **Lukass' bio** explicitly distinguishes "his own apps built solo" from
  "company products where he owned the architecture and led the team" — do
  not collapse this back into vague language that could read as him being
  staffed onto projects rather than leading them.

## Naming history (context, not an open decision anymore)

The name is decided (VELC Product Studio, see above). Earlier ideas
considered and rejected before landing there, kept for context in case
this comes up again:

- Acronym-based names off "TKS" (initials tied to a place in Riga where
  they met) — rejected because they require explanation to any
  non-Latvian-speaking client, which is the entire target market (Western
  Europe / US, explicitly not Latvia).
- Generic "[X] Solutions" / "[X] Agency" suffixes — originally rejected as
  generic-sounding, then "VELC Agency" was used anyway (2026-08-25) as a
  knowing tradeoff. Revisited the next day and changed to "VELC Product
  Studio" (2026-08-26, see "Studio name" above) once Lukass worked through
  what he actually wants "studio" to mean for him long-term. "Solutions"
  remains rejected either way — don't reintroduce it.
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
- **Type: Instrument Serif (display/headings), IBM Plex Sans (body), IBM
  Plex Mono (small labels/eyebrows — the "spec sheet" annotation feel).**
  Space Grotesk + Inter + Plex Mono was replaced on 2026-08-26 (the old
  trio was *itself* the generic default this section warns against —
  Space Grotesk + Inter is one of the most common startup-landing-page
  pairings going, and Inter is the most-used UI font on the web). Display
  went Newsreader → Instrument Serif on 2026-08-27, matching the pattern
  at blackboard.studio, which Lukass flagged as the reference: Instrument
  Serif 400 for the hero, section headings and *names*, a sans for body
  and anything that needs weight.
- **The `-webkit-text-stroke` on `.font-display` is load-bearing — do not
  remove it.** Instrument Serif has only a 400 cut and very fine hairlines,
  so on its own it renders thin and washed out, nothing like the reference.
  blackboard.studio fattens it with a same-colour text stroke instead of a
  bolder cut, measured at exactly **0.05em on every element** (96px hero,
  64px stats, 30px names alike). That stroke thickens the hairlines and
  drops the contrast, and is the entire difference between "thin and
  delicate" and the thick, juicy look. It lives in `globals.css` on
  `.font-display`, in `em` so it scales with any size. There is no bolder
  weight to reach for — this is the only lever.
- **Instrument Serif ships ONE weight (400).** This is the constraint that
  governs every heading decision here. Asking for 600 silently renders 400
  rather than erroring — verified in-browser — so display elements carry
  **no font-weight class at all**, and hierarchy comes from *size* instead.
  That is why names were sized up when the face changed: project names
  `text-xl`→`text-3xl`, package names and bios →`text-2xl`, hero
  →`text-5xl sm:text-7xl`, contact h2 →`text-4xl sm:text-5xl`. If you
  shrink these back you get thin, washed-out headings that stop reading as
  headings — that was the whole failure mode. `tracking-tight` was also
  dropped from the hero and h2: the face is already condensed.
- Plex Sans fixes a seam the old stack had: Inter and Plex Mono were
  unrelated faces, whereas Plex Sans and Plex Mono are a designed pair, so
  body and eyebrows belong together. Two directions were considered and
  rejected along the way: all-Plex (Plex Sans for display too) went plain,
  and DM Sans for display+body had the same problem — one family covering
  both roles collapses the hierarchy, and "clean low-contrast geometric"
  is precisely the default category this page is trying not to be in.
- Font CSS variables are semantic (`--font-display`, `--font-body`,
  `--font-mono`), not face-named, so a future swap touches `layout.tsx`
  only. Note `tailwind.config.ts` changes need a dev server restart —
  editing it alone leaves `.font-display` pointing at a deleted variable,
  which silently inherits the body font rather than erroring.
- **Header wordmark**: "VELC" in the display face, uppercase, `text-3xl`,
  `tracking-[0.18em]`. Nothing else — no indent or margin correction.
  (A `text-indent` was tried on 2026-08-26 to optically center the mark
  in the mobile header and reverted: it shifted the mark 5.4px right of
  the page margin on desktop, which is worse than the sub-pixel centering
  it fixed. Don't re-add one.)
  Drawn from the display face on purpose rather than given a dedicated
  logo font — the wordmark should follow the type system, not precede it.
  Wide-tracked serif caps read as a studio mark; a wide-tracked *sans* was
  tried first and rejected because it is the standard enterprise/technical
  vendor idiom and duplicated what the mono eyebrows already say.
- Signature element: the hero schematic (`Schematic` component in
  `app/page.tsx`) — Idea → Design → Build → Deploy → Support, drawn as
  connected icon-badge nodes (Phosphor icons, `@phosphor-icons/react` —
  swapped from lucide-react so brand logos like App Store/Google
  Play/Chrome are available). No longer names Lukass
  or Daniels directly (removed 2026-08-25 — see "Who you're working with"
  for where their names now live instead). This is the one deliberate
  visual risk on the page; don't dilute it by adding more decoration
  elsewhere. On mobile/tablet (below the `lg` breakpoint, 1024px) it
  switches to a vertical stacked layout rather than a horizontal scroller —
  the horizontal chain needs ~800px to fit without clipping, so don't lower
  that breakpoint without re-checking the fit.
- **Schematic animation (retuned 2026-08-26).** It is a *progress* chain, not
  a loop of blips: a dot travels each connector, the connector fills in behind
  it and stays filled, and each node lights as the dot arrives — so the chain
  visibly completes, holds at 11s, then resets. Two ordering rules were
  arrived at by trial and are easy to break:
  1. The node must begin lighting ~0.03s *before* the dot finishes landing.
     Making the dot vanish completely first is literally correct but leaves a
     ~0.3s dead beat that reads as a stutter.
  2. The fills cannot share one `@keyframes` driven by `animation-delay` the
     way the dot does. Lines fill at staggered times but must all clear at the
     same instant; with a delay the clear staggers too and line 3 stays dark
     six seconds into the next cycle. Hence one keyframe block per line, with
     absolute cycle positions and no delay.
  The full timeline is documented in the comment above the keyframes in
  `app/globals.css`. Vertical (`-v-`) and horizontal (`-h-`) variants must
  stay in lockstep — same percentages, different axis.

## What's NOT done yet

- Not deployed anywhere yet, but the name is no longer the blocker — this
  deploys cleanly to Vercel (`vercel deploy` from this directory, or
  connect the GitHub repo in the Vercel dashboard) whenever it's time. When
  it is deployed, `RESEND_API_KEY` needs to be set in the Vercel project's
  env vars or the contact form will fail — see `.env.local.example`.
- No analytics.
- Screenshots and app icons ARE wired in now (animated marquee rows per
  project in `SelectedWork`, pulled from each app's App Store/Play Store
  listing) — this used to be an open item, it isn't anymore.
- **Contact form only delivers to Lukass right now** (`TO_EMAILS` in
  `app/api/contact/route.ts`), a deliberate temporary call made
  2026-08-26, not an oversight — Daniels forwards manually until this is
  fixed. Cause: Resend's sandbox mode (no verified sending domain) only
  lets the shared `onboarding@resend.dev` sender deliver to the account
  owner's own inbox, so adding Daniels back in 403s until a domain is
  verified. The user only owns `drippler.xyz` right now, not a VELC
  domain, and chose not to verify a `drippler.xyz` subdomain as a
  stand-in for branding reasons. Real fix, once there's a VELC domain (or
  the user decides a drippler.xyz subdomain is fine after all): verify it
  in Resend (resend.com/domains), point `CONTACT_FROM_EMAIL` at an
  address on it, add Daniels back to `TO_EMAILS`.

## Running locally

```
npm install
npm run dev
```

Opens on http://localhost:3000
