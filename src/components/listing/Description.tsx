"use client";

import { useId, useState } from "react";

/**
 * Chevron glyph for the "Show more"/"Show less" toggle — a simple original
 * chevron shape, rotated 180° when expanded to point up instead of down.
 */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Original placeholder listing description, written in the same warm,
 * amenity-highlighting host voice as the reference screenshot — not copied
 * from the reference listing's actual text. Long enough (~600+ characters)
 * that the line-clamp truncation is genuinely demonstrable.
 */
const DESCRIPTION_TEXT =
  "🌴 Unwind at this stylish Romantic Jacuzzi 1BHK in the heart of Candolim, Goa! " +
  "This beautifully designed serviced apartment features a private jacuzzi 🛁 " +
  "perfect for couples and honeymooners looking for an intimate Goa escape. " +
  "Splash in the shared pool 🏊, sip your morning chai on the balcony, and enjoy " +
  "fast WiFi 💻 plus a fully equipped kitchen for easy home-cooked meals. " +
  "Free parking on premises, self check-in with building staff, and dedicated " +
  "workspace make it equally great for bleisure travellers. The apartment is " +
  "air-conditioned with ceiling fans throughout — perfect for Goa's warm " +
  "climate. Candolim beach is just a short walk away, with shacks, water sports, " +
  "and local restaurants all within easy reach. Mirashya Homes is always " +
  "reachable for any questions — your comfort is their priority. 🌊";

/**
 * Auto-translation notice + listing description, with a real client-side
 * expand/collapse toggle on the description text ("Show original" is a
 * static no-op affordance, matching the reference — it doesn't have a real
 * translation feature to toggle either, just the one link).
 */
export function Description() {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();

  return (
    <div className="w-full py-8">
      <div className="flex flex-col gap-4">
        {/* Auto-translation notice */}
        <div className="flex items-center gap-1 rounded-card bg-border-light px-6 py-4 text-body text-text-primary">
          <span>Some info has been automatically translated.</span>
          <button
            type="button"
            className="rounded-sm font-medium underline underline-offset-2 transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-border-light"
            onClick={() => console.log("show original")}
          >
            Show original
          </button>
        </div>

        {/* Description text */}
        <div className="flex flex-col gap-4">
          <p
            id={descriptionId}
            className={
              expanded
                ? "text-body text-text-primary"
                : "text-body text-text-primary line-clamp-4"
            }
          >
            {DESCRIPTION_TEXT}
          </p>

          <button
            type="button"
            className="flex w-fit items-center gap-1 rounded-sm text-body font-semibold text-text-primary underline underline-offset-2 transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-expanded={expanded}
            aria-controls={descriptionId}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronIcon
              className={expanded ? "h-4 w-4 -rotate-90" : "h-4 w-4 rotate-90"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
