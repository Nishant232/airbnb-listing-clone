"use client";

import { type ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { StarRating } from "@/components/ui/StarRating";

/**
 * Share icon — simple outward-arrow-from-box glyph, an original generic
 * shape (not traced from any icon library or the reference site).
 */
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 7.5 12 3l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Save icon — simple outline heart, an original generic shape. */
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 20.5s-7.5-4.6-9.8-9A5.3 5.3 0 0 1 12 6.3 5.3 5.3 0 0 1 21.8 11.5c-2.3 4.4-9.8 9-9.8 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Leaf glyph flanking the "Guest favourite" label — an original simple leaf
 * shape (not the actual Airbnb "double leaf" mark), mirrored via a CSS
 * transform on the right-hand instance rather than drawing two variants.
 */
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 19c8-1 12-6 13-13-8 1-12 6-13 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6 18c3-4 6-7 11-11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Outdoor entertainment highlight icon — a simple umbrella-over-table glyph. */
function OutdoorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3c4 0 7.5 2.8 8 6.5H4C4.5 5.8 8 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 9.5V21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M9 21h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Designed-for-staying-cool highlight icon — a simple 3-blade fan/pinwheel glyph. */
function FanIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path
        d="M12 10.5c-1-3-.5-6 1.5-7.3 2 1.6 2 4.8-1.5 7.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 12.7c3-1 5.8.2 6.6 2.5-1.9 1.7-5 1-6.6-2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10.8 12.7c-3 1-5.8-.2-6.6-2.5 1.9-1.7 5-1 6.6 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Self-check-in highlight icon — a simple door glyph. */
function DoorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="6"
        y="3"
        width="12"
        height="18"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="14.5" cy="12" r="0.9" fill="currentColor" />
    </svg>
  );
}

interface Highlight {
  icon: ReactNode;
  title: string;
  description: string;
}

/**
 * Three highlight rows shown under the host row — copy taken from
 * reference/listing-page/01-title-host-highlights-booking-card.png.
 */
const HIGHLIGHTS: Highlight[] = [
  {
    icon: <OutdoorIcon className="h-6 w-6" />,
    title: "Outdoor entertainment",
    description: "The pool and alfresco dining are great for summer trips.",
  },
  {
    icon: <FanIcon className="h-6 w-6" />,
    title: "Designed for staying cool",
    description: "Beat the heat with the A/C and ceiling fan.",
  },
  {
    icon: <DoorIcon className="h-6 w-6" />,
    title: "Self check-in",
    description: "You can check in with the building staff.",
  },
];

/**
 * Title/host/highlights block that sits between the hero gallery grid and
 * the Amenities section. Scoping note (flagged to the project owner): the
 * reference shows more content in this visual region than a literal
 * "title/location/host" reading suggests — no other section in the planned
 * build-out owns the subtitle counts, "Guest favourite" badge, host row, or
 * the 3 highlight rows, so all of that lives here too. Stops before the
 * auto-translation notice + description paragraph, which belong to the
 * separate Description section built next.
 *
 * Layout note: renders as a bare flex column (no outer max-width/padding
 * wrapper of its own) so it can sit directly as the left column of the
 * shared two-column grid built in page.tsx, alongside `BookingCard` in the
 * right column — see the grid wiring documented in BookingCard.tsx.
 */
export function ListingHeader({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <div className="w-full py-8">
      <div className="flex flex-col gap-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-title font-semibold text-text-primary">
              Entire serviced apartment in Candolim, India
            </h1>
            <p className="text-body text-text-secondary">
              3 guests &middot; 1 bedroom &middot; 1 bed &middot; 1 bathroom
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <IconButton
              aria-label="Share this listing"
              onClick={() => onToast("🔗 Share sheet would open here")}
            >
              <ShareIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              aria-label="Save this listing"
              onClick={() => onToast("❤️ Added to your Wishlist!")}
            >
              <HeartIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        {/* Guest favourite badge */}
        <div className="flex items-center gap-4 rounded-card border border-border-default px-6 py-4">
          <div className="flex shrink-0 items-center gap-1 text-text-primary">
            <LeafIcon className="h-5 w-5" />
            <span className="text-meta font-semibold leading-tight">
              Guest
              <br />
              favourite
            </span>
            <LeafIcon className="h-5 w-5 -scale-x-100" />
          </div>

          <p className="flex-1 text-meta text-text-primary">
            One of the most loved homes on Airbnb, according to guests.
          </p>

          <div className="ml-auto flex flex-col items-center px-4">
            <span className="text-card-title font-semibold text-text-primary">
              4.95
            </span>
            <StarRating rating={4.95} size={12} />
          </div>

          <span className="h-10 w-px shrink-0 bg-border-default" aria-hidden="true" />

          <div className="flex flex-col items-center px-2 text-center">
            <span className="text-card-title font-semibold text-text-primary">
              19
            </span>
            <span className="text-meta text-text-secondary">Reviews</span>
          </div>
        </div>

        {/* Host row */}
        <div className="flex items-center gap-4">
          <Avatar name="Mirashya Homes" size={56} />
          <div className="flex flex-col">
            <span className="text-card-title font-semibold text-text-primary">
              Hosted by Mirashya Homes
            </span>
            <span className="text-meta text-text-secondary">2 years hosting</span>
          </div>
        </div>

        <div className="border-t border-border-light" />

        {/* Highlight rows */}
        <div className="flex flex-col gap-6">
          {HIGHLIGHTS.map((highlight) => (
            <div key={highlight.title} className="flex items-start gap-4">
              <span className="mt-0.5 shrink-0 text-text-primary" aria-hidden="true">
                {highlight.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-body font-semibold text-text-primary">
                  {highlight.title}
                </span>
                <span className="text-body text-text-secondary">
                  {highlight.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
