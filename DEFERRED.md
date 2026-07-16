# Deferred — Monterey Minivan Campers (mmc-vertical)

Governed by special-files-manager. Entries are impact-tagged and sorted highest-impact first.
This is the reusable MVP-foundation repo. The live proposal-tier site is the proof-of-concept
built on it. Everything below is what turns the proposal teaser into the MVP and then Production.

**Architecture directive (Rick, 2026-07-16):** for the full build, all tools must be **INTERNAL,
integrated into the website** — custom booking/admin/CRM built inside the Next.js app, NOT
third-party SaaS embeds. This is a deliberate sell for the optional monthly management fee: we own
the surface, so we're the ones who maintain it. Google Calendar + Stripe remain as backend
primitives (calendar = availability store, Stripe = payments), but every operator-facing and
guest-facing tool is our own UI, not an embedded widget.

## Open (highest impact first)

- **[HIGH]** Real booking engine (MVP core) — replace the stubbed `BookingCalendar` in `app/page.tsx`
  with a working reserve flow. Backend: Google Calendar API for per-van availability (free/busy read
  + event-write on booking), one calendar per van for 1→N fleet. Payment: Stripe Checkout (fees
  passed through). This is the single feature that makes the MVP "functional bare-minimum." Requires
  a server runtime (static export can't hold secrets / hit APIs) — see next item.

- **[HIGH]** Stand up a server runtime — the proposal ships as static export to GitHub Pages (no
  server). The moment we add Calendar/Stripe we need server routes for secrets + API calls. Move to
  Next.js server mode (Vercel Pro, $20/mo — Hobby license prohibits commercial/payments use) or add
  serverless functions. Blocks the booking engine and the Next 15/16 upgrade below.

- **[HIGH]** Upgrade Next 14.2.35 → 15/16 when the server lands — residual npm-audit advisories
  (image optimizer, middleware, RSC, rewrites, WebSocket) are all **server-runtime** paths that
  don't exist in the current static CDN export, so they're inert today. They become live attack
  surface the instant we add a server, so the upgrade is a hard prerequisite of shipping any server
  route. Requires React 19. Red line: no shipping known vulnerabilities — this is how we honor it.

- **[MED]** Remaining destination scenics — the 8 destination cards (Big Sur, Point Lobos, Carmel,
  17-Mile, Pfeiffer, Monterey Bay, Andrew Molera, Garrapata) currently render as branded pine-gradient
  cards with topo-contour texture + name/hook overlays (a deliberate, on-brand fallback — not broken
  frames). They want real coast photography when available. **Partially unblocked:** the client's
  brand assets *were* in the room-upload folder after all — the Trail Map build now uses the real
  logo/brand sheet, two real Sienna-at-camp photos (hero + "Meet the van" feature), and the real
  interior dimensions diagram. Still missing: dedicated per-destination scenics and a hero video.

- **[MED]** Internal admin dashboard (integrated tool #1) — operator view inside the app: upcoming
  bookings, per-van calendar, block-out dates, guest contact info, booking status. Custom UI over the
  Calendar backend, not a Google Calendar embed. Core to the "internal integrated tools" directive
  and the monthly-management-fee sell.

- **[MED]** Double-booking race mitigation — Google Calendar has no unique constraint, so two
  simultaneous checkouts can book the same van/dates. Production mitigation: write a tentative HOLD
  event at checkout start, confirm/release on Stripe success/failure. Deferred to Production tier.

- **[MED]** Guest-facing booking management (integrated tool #2) — lookup/modify/cancel a reservation,
  confirmation + reminder emails. Our own UI + transactional email, not a third-party portal.

- **[MED]** Fleet scale-out (1 → N vans) — the Sienna van(s) get purchased only after interest is
  verified, so fleet size is undetermined. Booking/admin must treat van count as data (one calendar
  per van), not hardcode a single vehicle.

- **[LOW]** AI-generated media pipeline — hero video + supplementary imagery (interior, sunset, road)
  generated to brand palette (pine-green / sunset-orange / sand) for the 5hr build until real client
  photos exist. See the claude-design prompt artifact.

- **[LOW]** SEO / analytics / OpenGraph polish — richer structured data, sitemap, conversion analytics
  once the funnel (view → book → pay) is real.

## Done (archive)

- "Trail Map" design handoff implemented in `app/page.tsx` — all 15 sections ported to an idiomatic
  React client component (scroll-spy nav, frosted-on-scroll bar, IntersectionObserver reveals,
  count-up, interactive booking calendar w/ live weekday/weekend price math + passed-through Stripe
  fee, FAQ accordion, lightbox, contact-form validation, mobile menu + sticky bar). Real client
  photos wired in (hero, feature, dimensions diagram). Build green, desktop + mobile verified via
  Playshot. `assetPrefix` de-trailing-slashed to fix `//_next` double-slash on imported images. — 2026-07-16
- Next.js 14 static-export scaffold + brand CSS + full SOW homepage (stub booking) — built 2026-07-16
- Production build green (4/4 static pages) + GitHub Pages deploy, live URL verified — 2026-07-16
- Security: bumped next 14.2.5 → 14.2.35; pinned TS toolchain to fix build crash — 2026-07-16
- screenshot-html put on PATH (launcher in ~/.local/bin, CRLF shebang stripped) — 2026-07-16
