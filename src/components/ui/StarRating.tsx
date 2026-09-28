import { cn } from "@/lib/utils";

export interface StarRatingProps {
  /** Rating value, e.g. 4.95. Supports partial fill, not just whole stars. */
  rating: number;
  /** Total number of stars in the row. */
  max?: number;
  /** Pixel size of each star icon. */
  size?: number;
  className?: string;
}

/**
 * Solid-black star row (reference/design-tokens.md `rating-star`: `#222222`,
 * a deliberate deviation from the usual yellow/gold star convention). Used
 * for the small 5-star rows next to review dates
 * (reference/listing-page/11-reviews-list-a.png, e.g. "★★★★★ · 1 week ago").
 *
 * Not the same component as the compact "★ 4.95 · 19 reviews" single-star +
 * numeric format used in the sticky nav / booking card
 * (reference/listing-page/01-title-host-highlights-booking-card.png,
 * 02-nav-tabs-sleep-amenities.png) — that's one star glyph plus text, not a
 * 5-star row, and isn't built here.
 *
 * Purely presentational/read-only (not an input for submitting a rating), so
 * no focus ring or keyboard handling. Each star icon is `aria-hidden`; the
 * wrapping element carries a single `aria-label` stating the rating in words
 * for screen readers.
 */
export function StarRating({ rating, max = 5, size = 12, className }: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(rating, max));

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const fillPercent = Math.max(0, Math.min(clampedRating - index, 1)) * 100;
        return (
          <span
            key={index}
            className="relative inline-block shrink-0"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 h-full w-full text-border-default"
              fill="currentColor"
            >
              <path d="M12 2.5l2.9 6.6 7.2.6-5.5 4.7 1.7 7-6.3-4-6.3 4 1.7-7-5.5-4.7 7.2-.6z" />
            </svg>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="text-text-primary"
                fill="currentColor"
                style={{ width: size, height: size }}
              >
                <path d="M12 2.5l2.9 6.6 7.2.6-5.5 4.7 1.7 7-6.3-4-6.3 4 1.7-7-5.5-4.7 7.2-.6z" />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}
