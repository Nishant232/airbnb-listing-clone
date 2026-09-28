# Interaction & Behavior Notes

> Important caveat: the live site blocks automated (Playwright) browser access with a
> Vercel bot checkpoint, so this pass is based on **static screenshots you captured
> manually**, not live DOM/interaction testing. That means hover states, keyboard
> navigation, animation timing/easing, and focus-trap behavior below are either inferred
> from what's structurally visible in the screenshots, or explicitly marked "not
> verified — needs manual check." Don't treat unverified items as fact; spend 10 minutes
> clicking through the real site with DevTools open before you build those bits.

## Confirmed from screenshots

- **Amenities modal** ("Show all 50 amenities"): opens as a centered white dialog on a
  dimmed backdrop (~60–70% black overlay). Dialog has a close (X) button top-left,
  section-grouped content (Bathroom, Bedroom and laundry, Entertainment, Family, Heating
  and cooling, Home safety, Internet and office, Kitchen and dining, Location features,
  Outdoor, Parking and facilities, Services), and scrolls independently inside the panel
  (rest of the page stays put behind the dim overlay, no page-level scroll).
- **Photo tour** ("Show all photos" / hero click): opens as a **full page/route**, not a
  small popup — it has its own URL (`?modal=PHOTO_TOUR_SCROLLABLE` was visible in the
  address bar), its own back arrow (top-left, "<"), a "Photo tour" title, and
  share/save icons top-right. It's a long vertically-scrollable page grouped by room
  (Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior,
  Pool, Additional photos), each section showing a heading + amenity tags + a large hero
  photo + supporting thumbnail pairs.
- **Sticky secondary nav**: once you scroll past the photo gallery on the main listing
  page, a slim sticky bar appears with section tabs (Photos / Amenities / Reviews /
  Location) plus a compact price/rating/Reserve summary docked top-right — this persists
  while scrolling through the rest of the page.
- **Reviews section categories**: horizontally-scrollable pill/chip row above the review
  cards (Comfort, Accuracy, Hot tub, Condition, Hospitality, Cleanliness, Amenities, …) —
  implies a horizontal scroll or carousel interaction, not full wrap.
- **"More stays nearby"** carousel at the bottom has explicit prev/next arrow controls and
  a "1 / 2" page indicator, confirming it's a paginated/scrollable card carousel, not a
  static grid.
- **Review "Show more"**: long review text is truncated with a "Show more" link
  (expand-in-place pattern, standard for Airbnb-style review cards).

## Not verified — needs a manual pass on the live site

- **Lightbox** (clicking a single photo for a full-bleed image viewer): no screenshot was
  captured of this state. Needs manual capture — click any individual photo (not the
  "Show all photos" pill) and screenshot the resulting overlay.
- **Hover states**: card hover (nearby stays), button hover (Reserve, Show all photos),
  gallery image hover (zoom/darken?) — none observed; check for scale/opacity/shadow
  changes on hover.
- **Photo Tour open/close transition**: type (fade vs. slide), duration, and easing —
  not observable from static screenshots. Given it behaves like a route change
  (own URL), it may be a simple page transition rather than a modal animation — verify.
- **Lightbox open/close transition** — unknown, not captured.
- **Lightbox prev/next via ← / → keys** — not tested.
- **Esc to close overlays** (amenities modal, photo tour, lightbox) — not tested; standard
  a11y pattern would expect this to work but must be confirmed.
- **Tab order / focus visibility** — not tested. Check: is there a visible focus ring on
  interactive elements (buttons, tabs, date inputs)? Is tab order logical (header → hero
  gallery → title/booking card → content tabs)?
- **Focus trap in overlays** — not tested. When the amenities modal or photo tour is open,
  does Tab cycle only within the overlay, and does focus return to the trigger element
  (e.g. "Show all 50 amenities" button) when closed?

## Recommendation

Before building the Photo Tour, Lightbox, and any keyboard/focus behavior, do a quick
5–10 minute manual pass on the live site (regular Chrome, not automation) covering the
"Not verified" list above, since a take-home grader will likely test exactly these
interaction details (Esc, arrow keys, focus return) on both the reference and your clone.
