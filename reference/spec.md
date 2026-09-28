# Reference Spec — Airbnb Listing Page Clone

Source of truth for rebuilding https://airbnb-clone-umber-two.vercel.app (desktop only).
Built from manually-captured screenshots (the live site blocks automated browser access
via a Vercel bot checkpoint) — see caveats inline. No source HTML/CSS/JS was copied;
everything below is observed/estimated visual behavior for independent reimplementation.

## Contents of ./reference

- `listing-page/` — main listing page, section by section (hero/gallery, title/host,
  amenities incl. the "show all amenities" modal states, reviews, location/map, host,
  things to know, nearby stays), in capture order (numbered filenames).
- `photo-tour/` — the full-page "Photo tour" view, scrolled section by section
  (Living room 1 & 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool,
  Additional photos).
- `lightbox/` — **empty / not captured**. See Gaps below.
- `design-tokens.md` — visually-estimated colors, type scale, spacing, radii, shadows.
- `interactions.md` — confirmed vs. unverified interaction/behavior notes.

## Page structure (top to bottom)

1. **Header/nav** — white bar, Airbnb-style logo left, pill-shaped search bar centered
   ("Anywhere / Anytime / Add guests" + red circular search icon), "Become a host" link +
   globe icon + hamburger menu right. Thin bottom border, no shadow.
2. **Title row** — H1 listing title + Share / Save actions (icon + label) aligned right.
3. **Hero gallery grid** — 1 large photo (left, spans full height) + 2×2 grid of 4 smaller
   photos (right), rounded as one unit, "Show all photos" pill overlaid bottom-right of
   the grid. Clicking it (or the hero image) opens the **Photo Tour** full-page view.
4. **Summary row** — "Entire serviced apartment in Candolim, India" subtitle + guest/
   bedroom/bed/bathroom counts; "Guest favourite" badge with leaf icons + rating (4.95) +
   review count (19 Reviews); host row with avatar, "Hosted by Mirashya Homes", "2 years
   hosting"; 3 highlight rows with icon + bold title + description (Outdoor
   entertainment, Designed for staying cool, Self check-in); auto-translation notice bar;
   listing description text with emoji bullet points and a "Show more" expander.
5. **Reservation card** (right column, sticky) — promo banner ("Get 10% off your next
   stay" + Claim button) above the main card; price total for N nights; Check-in/Checkout
   two-box date picker; Guests dropdown; free-cancellation note; full-width pink
   "Reserve" CTA; "You won't be charged yet" microcopy; "Report this listing" link below
   the card.
6. **Sticky sub-nav** (appears on scroll) — tab links Photos / Amenities / Reviews /
   Location, with a docked compact price + rating + Reserve summary on the right that
   persists while scrolling.
7. **Where you'll sleep** — 2-up card grid (Bedroom / Living room), each a photo + label +
   short spec line ("1 double bed", "1 sofa").
8. **What this place offers** — 2-column amenity list (icon + label), ~8 items visible,
   struck-through items for unavailable amenities (e.g. Carbon monoxide alarm, Smoke
   alarm), "Show all 50 amenities" pill button opens a **modal** (see below).
9. **Amenities modal** — centered white dialog on a dark ~60–70% overlay, close (X)
   top-left, full categorized amenity list (Bathroom, Bedroom and laundry, Entertainment,
   Family, Heating and cooling, Home safety, Internet and office, Kitchen and dining,
   Location features, Outdoor, Parking and facilities, Services), scrolls internally.
10. **Calendar / stay dates** — "5 nights in Candolim" heading + date range, two-month
    calendar grid (October/November 2026) with prev/next month arrows.
11. **Reviews** — big centered "4.95" stat with leaf icons + "Guest favourite" + "How
    reviews work" link; 6-column rating breakdown bars (Overall, Cleanliness, Accuracy,
    Check-in, Communication, Location, Value); horizontal-scroll category chip row
    (Comfort, Accuracy, Hot tub, Condition, Hospitality, Cleanliness, Amenities, …);
    2-column review card grid (avatar, name, "X time on Airbnb", star row + date, review
    text with "Show more" truncation).
12. **Location** — "Where you'll be" heading, city/country line, stylized map (light
    blue water / light green land fill, black home-pin icon, +/− zoom controls, search
    icon top-left), "Exact location will be provided after booking" caption,
    "Neighbourhood highlights" text block with "Show more" expander.
13. **Meet your host** — host card (avatar w/ verified badge, name, review count, rating,
    years hosting) + Co-Hosts grid (avatar + name, up to 6+), Host details (response
    rate/time), "Message host" button, payment-safety notice.
14. **Things to know** — 3-column block (Cancellation policy / House rules / Safety &
    property), each with icon, heading, short bullet text, "Learn more" link.
15. **More stays nearby** — horizontally paginated card carousel (prev/next arrows, "1/2"
    indicator), each card: photo, title, price, rating.
16. **Footer** — not captured in the provided screenshots; treat as a gap (see below).

## Photo Tour (full-page overlay)

Opens as its own routed view (`?modal=PHOTO_TOUR_SCROLLABLE` appeared in the URL bar),
not a small popup. Layout: back arrow + "Photo tour" title + share/save icons in a header
bar; below that, an overview thumbnail grid of every room (Living room 1, Living room 2,
Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos) with labels;
then a long vertically-scrolling detail section per room — heading, amenity tag line
(e.g. "Sofa · Air conditioning · Ceiling fan · TV"), one large hero photo, then a 2-up row
of supporting thumbnails, repeated per room in the same order as the overview grid.

## Lightbox

**Not captured.** Clicking an individual photo (not "Show all photos") is expected to
open a full-bleed single-image lightbox with prev/next controls, but no screenshot exists
for this state. Capture it manually before building, or treat the Photo Tour's per-room
hero image as the closest available reference.

## Design tokens

See `design-tokens.md` for the full breakdown. Headlines:
- Primary accent: Airbnb pink/rose (~`#FF385C`) for CTAs, active tab underline, "Reserve".
- Neutral text: near-black (~`#222`) primary, mid-gray (~`#6A6A6A`) secondary.
- Rounded corners throughout: ~12–16px on cards/images/modals, pill-shaped buttons.
- Soft card shadow on the reservation card; stronger shadow + dark backdrop on modals.
- Humanist sans-serif type (Airbnb's real font is proprietary — substitute with Inter or
  similar); H1 ~26–28px/600, section headings ~22–24px/600, body ~15–16px/400.
- Desktop-only, ~1920px capture width, content column ~1400px max-width, centered.

## Interactions

See `interactions.md`. Confirmed: modal/photo-tour structural behavior (dim backdrop,
independent scroll, own route for photo tour), sticky sub-nav on scroll, horizontally
scrollable review-category chips and nearby-stays carousel with explicit prev/next +
page indicator. **Unverified — needs a manual live-site pass**: hover states, transition
type/duration/easing for Photo Tour and Lightbox, Esc-to-close, arrow-key navigation in
the lightbox, tab order, visible focus ring, and focus-trap/return-to-trigger behavior in
overlays.

## Known gaps (before you start building)

1. **Lightbox** — no screenshots. Needs a manual capture (click a single photo).
2. **True footer** — screenshots end at "More stays nearby"; if there's a legal/links
   footer below that, it wasn't captured.
3. **All keyboard/focus/hover behavior** — listed as unverified above; do a quick manual
   pass with DevTools open (Esc, arrow keys, Tab order, hover states) since a take-home
   grader is likely to test exactly these details.
4. Design token values are **visual estimates** from screenshots, not computed CSS —
   expect to nudge spacing/colors/font-sizes by eye during the build rather than trusting
   these as pixel-exact.
