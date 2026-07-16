# Claude Design Prompt — Monterey Minivan Campers

> Paste everything below the line into Claude Design. It is self-contained: brand, layout,
> section-by-section content, responsive rules, animation choreography, per-asset image/video
> descriptions, and the interactive behaviors. Designed for **both desktop and mobile**.

---

## PROJECT

Design a marketing + booking landing page for **Monterey Minivan Campers** — an affordable
Toyota Sienna camper-minivan rental company serving Monterey, Carmel, and Big Sur, California.
The audience is road-trippers and couples who want the freedom of van life without the cost or
bulk of a full RV. The site must feel warm, adventurous, and trustworthy, and must drive one
action: **check availability and book**.

- **Tagline:** "Explore More. Sleep Anywhere."
- **Pricing:** $59 / weeknight, $79 / weekend night.
- **Vehicle:** Toyota Sienna converted camper minivan (sleeps 2, pop-top or rear platform bed,
  compact galley).
- **Vibe:** Pacific coast, redwoods, golden-hour surf, cozy-but-capable. Not luxury, not
  budget-grungy — approachable and clean.

## BRAND / VISUAL SYSTEM

- **Palette:**
  - Pine green `#2F5D50` (primary — headers, nav, trust)
  - Sunset orange `#E8763A` (accent / CTAs — warmth, action)
  - Sand `#EFE6D5` (background wash — calm, paper-like)
  - Deep charcoal `#22201C` (body text)
  - Off-white `#FBF8F2` (cards / surfaces)
- **Type:** a rounded, friendly geometric sans for headings (think Poppins / Nunito energy) and a
  highly legible humanist sans for body. Big, confident headlines. Generous line-height.
- **Texture:** subtle grain/paper on the sand background; soft, large corner radii (12–20px);
  soft shadows, never harsh. A thin topographic-contour line motif can recur as a divider between
  sections (map/trail feel).
- **Photography treatment:** warm, slightly golden white balance. Real-feeling, not stock-sterile.

## RESPONSIVE INTENT (design BOTH)

- **Desktop (≥1024px):** full-bleed hero, multi-column grids (3–4 up), sticky top nav, a
  side-by-side booking layout (calendar left, price summary right).
- **Mobile (≤600px):** single column, thumb-reachable CTAs, hamburger nav that slides in, the
  booking calendar stacks above the price summary, sticky bottom "Check availability" bar that
  follows the scroll. Tap targets ≥44px. Hero text scales down but stays punchy.
- **Tablet:** 2-up grids, hero keeps full-bleed.

---

## PAGE STRUCTURE (top to bottom)

### 1. Sticky nav
Logo left (a small van + pine icon), links right: Vans · Pricing · Destinations · FAQ · a solid
sunset-orange **"Book now"** button. On scroll past the hero, nav background transitions from
transparent to frosted pine-green with a subtle shadow.
- *Mobile:* logo + hamburger; menu slides down as a sand panel.

### 2. Hero (full viewport)
Headline: **"Explore More. Sleep Anywhere."** Subhead: "Affordable Toyota Sienna camper rentals
for the Monterey coast — from $59/night." Primary CTA **"Check availability"** (sunset orange),
secondary ghost button "See the van." A small trust row underneath: "★★★★★ · Free cancellation ·
Insured · Monterey local."
- **Background:** the HERO VIDEO (see assets). Dark pine gradient scrim bottom-left so text is
  always legible.

### 3. Value strip (why us)
A horizontal band of 3–4 icon + label pairs: "From $59/night" · "Sleeps 2 comfortably" · "Park &
sleep anywhere legal" · "No RV license needed." Pine icons on sand.

### 4. Hotel vs. RV vs. Us comparison
A 3-column comparison card. Columns: Hotel / Big RV / **Monterey Minivan (highlighted)**. Rows:
nightly cost, mobility, parking ease, setup time, "wake up here" (with a scenic thumbnail in our
column). Our column has the sunset-orange border + "Best value" ribbon.

### 5. Meet the van (gallery)
Section title "Meet your home on wheels." A gallery: one large feature image + a row of smaller
tiles (interior galley, bed made up, pop-top open, rear hatch view). Clicking any tile opens a
lightbox. Short spec chips under the gallery: sleeps 2 · 2-burner galley · cooler · bedding
included · phone-charging · easy to drive.

### 6. Pricing
Two big price cards side by side: **Weeknight $59** and **Weekend $79**, each listing what's
included (bedding, kitchen kit, unlimited local miles, roadside support). A note: "Stripe fees
passed through at checkout." CTA under each: "Pick your dates."

### 7. Destinations
Section "Where you'll wake up." A grid of 8 destination cards, each a photo + name + one-line hook:
Big Sur, Point Lobos, Carmel Beach, 17-Mile Drive, Pfeiffer Beach, Monterey Bay, Andrew Molera,
Garrapata. Hover lifts the card and reveals the hook.

### 8. Itineraries
Three curated trip cards (2-night, weekend, 3-day) with a mini topographic route line, stops
listed, and a "Book this route" CTA that pre-notes the trip in the booking form.

### 9. What's included
A clean checklist grid (bedding & pillows, camp kitchen, cooler, chairs, maps, 24/7 support,
free cancellation, easy pickup in Monterey).

### 10. Booking calendar (THE conversion moment — see Interactivity)
Title "Check availability & book." Desktop: month calendar on the left, live price summary on the
right. Mobile: calendar on top, summary sticky below. This is the interactive centerpiece.

### 11. FAQ
Accordion: license needed? · where do I sleep legally? · what's the deposit? · cancellation? ·
pets? · pickup location? · insurance?

### 12. Contact / final CTA
Warm closing band on pine green: "Your coast trip starts here." Simple contact form (name, email,
dates, message) + the booking CTA repeated. Footer: logo, nav, socials, local Monterey line,
copyright.

---

## ANIMATION CHOREOGRAPHY

Motion should feel **calm and premium**, never busy. Respect `prefers-reduced-motion` — disable
all non-essential motion when set.

- **Hero:** video plays muted/looping. Headline words rise + fade in with a 60ms stagger on load.
  The scrim subtly breathes (very slow opacity drift). Scroll-cue chevron bounces gently at the
  bottom.
- **Scroll reveals:** each section's content fades up 16px as it enters the viewport (Intersection
  Observer, once). Stagger children in grids by ~80ms.
- **Parallax:** hero video and a couple of destination photos drift slightly slower than scroll
  (subtle, ≤12% offset).
- **Nav:** transparent → frosted-pine transition tied to scroll position, 250ms ease.
- **Cards:** hover = lift 4px + shadow bloom + image zoom 1.03 (200ms). Destination hooks slide up
  from behind the title.
- **Comparison table:** our column's "Best value" ribbon draws in; the row checkmarks pop
  sequentially when the section reveals.
- **Pricing cards:** the selected card gets a soft sunset-orange glow pulse on hover.
- **Counters / trust numbers:** count up when they scroll into view (e.g., "500+ nights booked").
- **Buttons:** sunset-orange CTAs have a soft press-down + a slight shine sweep on hover.
- **Section dividers:** the topographic contour line animates a subtle left-to-right draw as it
  enters view.
- **Booking calendar interactions:** see below — these are functional, not decorative.

## INTERACTIVITY (must be stateful, not a flat mockup)

Rick's explicit ask: **not flat, stateless, or static.** Build these as real interactive
behaviors:

1. **Booking calendar (centerpiece):**
   - Month view; past dates disabled/greyed; already-booked dates blocked with a diagonal hatch.
   - Click a start date, then an end date → the range highlights in sunset orange.
   - Live **price summary** updates in real time: it counts weeknights × $59 + weekend nights ×
     $79, shows a line-item breakdown, subtotal, "Stripe fee (passed through)", and total.
   - Nights count animates when the range changes.
   - Invalid selections (end before start, overlapping a booked block) shake gently + show a hint.
   - A **"Reserve"** button activates only when a valid range is chosen; disabled state is obvious.
   - *(In the live build this reads real availability from Google Calendar and hands off to Stripe
     Checkout — design it so a real backend can plug in. For the design, mock a few booked ranges.)*
2. **Gallery lightbox:** click any van image → full-screen lightbox with prev/next, swipe on mobile,
   ESC/× to close, keyboard arrows on desktop.
3. **FAQ accordion:** one-open-at-a-time, smooth height transition, chevron rotates.
4. **Itinerary → booking link:** clicking "Book this route" scrolls to the calendar and pre-fills a
   note ("2-night Big Sur route").
5. **Mobile sticky booking bar:** a bottom bar showing "from $59/night · Check availability" that
   appears after the hero scrolls away and jumps to the calendar on tap.
6. **Nav smooth-scroll** to sections with an active-section highlight as you scroll.
7. **Contact form:** inline validation (email format, dates required), success state without a page
   reload.

---

## ASSET DESCRIPTIONS

All assets are **AI-generated** for the 5-hour build (no real client photos yet). Generate to the
brand palette and warm golden treatment. Keep a consistent van (silver/white Toyota Sienna with a
simple pine-green + sand decal, pop-top or rear platform bed).

### VIDEO

- **`hero-loop.mp4` (8–12s seamless loop, muted, 1920×1080 + 1080×1920 mobile crop):**
  A silver Toyota Sienna camper parked at a Big Sur bluff at golden hour. Slow push-in / gentle
  drift. Pop-top or rear hatch open, warm interior light glowing, string lights. Ocean and fog in
  the background, tall grass moving in the breeze. A couple sits on the tailgate with mugs, out of
  focus. Warm, calm, cinematic. First and last frame match for a clean loop. Deliver a poster
  still for fast first paint.
- **`van-interior-360.mp4` (optional, 6–8s):** slow pan across the made-up bed, little galley,
  cooler, and charging nook — showing "it really is comfortable."

### IMAGES

- **`van-feature.jpg`** — hero of the gallery: the Sienna parked on a coastal pull-off, side door
  open, bed made with warm bedding, sunset light. 3:2.
- **`interior-galley.jpg`** — the compact 2-burner galley + cooler, tidy and inviting.
- **`bed-made.jpg`** — rear platform bed made up with pillows, warm light through windows.
- **`poptop-open.jpg`** — pop-top raised at dusk with interior glow (or rear-hatch sleeping setup).
- **`hatch-view.jpg`** — POV from inside the open rear hatch looking out at the ocean/redwoods.
- **Destinations (8, ~4:3, warm golden treatment):**
  - `bigsur.jpg` — Bixby Bridge / cliffs and fog.
  - `pointlobos.jpg` — turquoise coves, cypress.
  - `carmel.jpg` — white-sand beach, cypress silhouettes at sunset.
  - `17mile.jpg` — the Lone Cypress on a rocky point.
  - `pfeiffer.jpg` — purple-tinted sand, Keyhole Arch light beam.
  - `montereybay.jpg` — kelp forest coastline / wharf glow.
  - `andrewmolera.jpg` — meadow-to-beach trail, golden grass.
  - `garrapata.jpg` — calla-lily coastline, wildflowers.
- **`comparison-thumb.jpg`** — small "wake up here" scenic used in the Us column of the comparison.
- **`og-share.jpg` (1200×630)** — the van at a bluff with tagline overlaid, for social sharing.
- **Icons (line style, pine green):** van, bed, dollar, map-pin, kitchen/pot, shield/insurance,
  cancel/clock, charge/bolt, topographic-contour divider.

### LOGO

- **`logo.svg`** — wordmark "Monterey Minivan Campers" with a compact van + pine-tree glyph.
  Provide a light version (for pine backgrounds) and a dark version (for sand). Also a favicon
  crop of just the glyph.

---

## DELIVERABLES REQUESTED FROM CLAUDE DESIGN

1. **Desktop** full-page design.
2. **Mobile** full-page design (with the sticky bottom booking bar + slide-in nav).
3. The **interactive booking calendar** state shown in at least: empty, mid-range-selected (with
   live price summary), and error states.
4. Hover/active states for cards, nav, and CTAs.
5. Animation notes annotated on the frames (or a short motion list) so we can implement them.
6. Exportable color + type tokens.

Keep the whole thing feeling like a warm coastal road trip you can afford this weekend.
