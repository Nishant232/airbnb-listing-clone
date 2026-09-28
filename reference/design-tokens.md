# Design Tokens (visual estimate)

> These values were derived by visually inspecting screenshots (not DOM/computed-style
> inspection — the live site blocks automated browser access). Treat pixel/hex values as
> close approximations, good enough to seed a Tailwind config. Verify/tune against your
> own eye once you're building, rather than copying these as exact truth.

## Viewport

- Screenshots captured at a maximized ~1920×1080 desktop viewport.
- Page content is centered in a constrained column, roughly **max-width: 1400–1450px**,
  with symmetric side gutters (~250–270px at 1920 width). At narrower desktop widths
  (e.g. 1440px) that gutter shrinks proportionally — treat it as `max-w-7xl` (1280px) to
  `max-w-[1400px]` with `mx-auto px-10`/`px-16` in Tailwind terms; the clone target
  doesn't need to match Airbnb's real breakpoints exactly, just look right desktop-only.
- Design for **desktop only**, single breakpoint ≥ 1280px. No mobile layout needed.

## Color palette

| Token | Approx. hex | Usage |
|---|---|---|
| `brand-pink` | `#FF385C` | Primary CTA (Reserve button, active tab underline, price emphasis, search button); **correction (pixel-sampled during build):** also the host-avatar verified-badge checkmark — the badge is brand-pink, not green, despite reading as "success" at a glance |
| `brand-pink-dark` | `#E31C5F` (assumed hover/gradient partner) | Reserve button often has a subtle gradient toward this on hover |
| `text-primary` | `#222222` | Headings, primary body text |
| `text-secondary` | `#6A6A6A` | Secondary text (subtitles, meta info, muted descriptions) |
| `text-muted` | `#B0B0B0` | Disabled/struck-through amenities (e.g. "Carbon monoxide alarm" with strikethrough) |
| `border-default` | `#DDDDDD` / `#EBEBEB` | Card borders, dividers, input borders |
| `bg-white` | `#FFFFFF` | Page and card background |
| `bg-overlay` | `rgba(0,0,0,0.6–0.7)` | Modal/dialog backdrop (amenities modal, lightbox); **correction (verified against reference/photo-tour/01-overview-grid.png):** the Photo Tour does NOT use this — it's a full opaque white page (own scrollable route, no dimmed backdrop, no centered panel), structurally different from the amenities modal despite both being called "overlays" |
| `success-green` | `#008A05`-ish | Unused by the verified badge (see correction below); reserved for other green success/accuracy indicators (e.g. the green circular check icon in the review ratings breakdown) |
| `map-water` | `#AADAFF`-ish light blue | Map water fill (stylized, non-Google-styled map) |
| `map-land` | `#D8ECD1`-ish light green | Map land fill |
| `rating-star` | `#222222` (filled black star, not yellow) | Star ratings use solid black/dark stars, not the typical yellow |

## Typography

- Font family: a humanist sans-serif very close to **Airbnb Cereal / Circular** —
  for an independent build, use a close open-source substitute such as **"Inter"** or
  **"Sofia Pro"/"Figtree"** rather than trying to source the proprietary Airbnb font.
- Scale (visual estimate, desktop):

| Role | Size | Weight | Line-height | Example |
|---|---|---|---|---|
| Listing title (H1) | ~26–28px | 600 (semibold) | 1.2 | "Entire serviced apartment in Candolim, India" |
| Section headings (H2) | ~22–24px | 600 | 1.25 | "What this place offers", "Where you'll sleep", "Meet your host" |
| Modal/overlay title | ~28–32px | 700 | 1.2 | "Photo tour", "What this place offers" (modal) |
| Big stat number | ~64px | 500–600 | 1.1 | "4.95" rating hero number |
| Card/subsection title | ~18–20px | 600 | 1.3 | "Living room 1", host name "Mirashya Homes" |
| Body text | ~15–16px | 400 | 1.5 | Descriptions, review text |
| Small/meta text | ~13–14px | 400 | 1.4 | "2 years hosting", amenity captions, dates |
| Button text | ~15–16px | 600 | 1 | "Reserve", "Show all photos" |

## Spacing scale

Approximate 4/8px-based scale, consistent with Tailwind defaults:

- `1` = 4px, `2` = 8px, `3` = 12px, `4` = 16px, `6` = 24px, `8` = 32px, `10` = 40px,
  `12` = 48px, `16` = 64px
- Section vertical rhythm: large gaps between major sections (~32–40px), with a full-width
  divider (`border-t`, `#EBEBEB`) between most sections (Amenities / Calendar / Reviews /
  Location / Host / Things to know).
- Card internal padding: ~24px (amenity cards, host card, review cards).
- Grid gaps: gallery grid ~8px gutters; amenities two-column list ~24px column gap / ~24px
  row gap; photo tour thumbnail grid ~16–24px gaps.

## Border radius

- Large image containers / modal panels: **12–16px**
- Buttons (Reserve, Show all photos, pill buttons like "Guest favourite" badge, "Show all
  50 amenities"): **8–24px** — the Reserve button and search pill look fully rounded
  (pill shape, ~24px+), while general content cards use **12px**.
- Host avatar, small circular badges: fully rounded (`rounded-full`).
- Input/date fields in the booking card: **8px**.

## Shadows

- Booking/reservation card: a soft elevated shadow, roughly
  `box-shadow: 0 6px 16px rgba(0,0,0,0.12)` with a `1px solid #DDDDDD` border — it reads as
  "card floating slightly above the page."
- Modal/dialog panels (amenities modal): stronger shadow,
  roughly `0 8px 28px rgba(0,0,0,0.28)`, sitting on a dimmed backdrop.
- Gallery images and photo tour thumbnails: no visible shadow, just `overflow: hidden` +
  `border-radius`.
- Nav bar: none visible at rest; likely a hairline `border-bottom` (`#EBEBEB`) rather than
  a shadow.

## Layout notes per section

- **Header/nav**: full-width white bar, logo left, search pill center, "Become a host" +
  globe icon + hamburger/avatar menu right. Thin bottom border, no shadow.
- **Gallery grid**: 1 large image left (spans 2 rows) + 2×2 grid of smaller images right,
  all within one rounded-corner container (rounded as a whole, ~12–16px), with a
  "Show all photos" pill button overlaid bottom-right of the grid.
- **Booking/reservation card**: sticky-positioned white card, right column, ~380–400px
  wide, contains price, date pickers (Check-in/Checkout as two boxes), guests dropdown,
  cancellation note, Reserve CTA, "You won't be charged yet" microcopy.
- **Sticky sub-nav**: once scrolled past the hero, a secondary sticky bar appears with
  tab links (Photos / Amenities / Reviews / Location) on the left and a compact
  price+rating+Reserve summary on the right.
