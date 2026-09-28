import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /**
   * Small leading icon/emoji slot, e.g. the review-category glyphs
   * ("Comfort", "Hot tub", "Cleanliness"...) shown in the reviews section.
   * Accepts any ReactNode so callers can pass whatever icon system gets
   * built later — this primitive doesn't hardcode specific icons.
   */
  icon?: ReactNode;
  /** Trailing numeric count, e.g. the "6" in "Comfort 6". */
  count?: number | string;
  /** Visible label text, e.g. "Comfort". */
  children: ReactNode;
};

/**
 * Static, informational pill "chip" — matches the review-category chip row
 * (reference/listing-page/11-reviews-list-a.png, "Comfort 6", "Hot tub 5",
 * etc.): bordered pill, white surface, leading icon, label, trailing count.
 *
 * This is presentational, not interactive — the reference screenshots show
 * this row as a static summary, not clickable filters, so no button
 * semantics or focus ring are applied here. If the live reference turns out
 * to make these clickable, this should become a `button`-based component.
 */
export function Badge({ className, icon, count, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-border-default bg-surface px-4 py-2 text-meta text-text-primary",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="font-medium">{children}</span>
      {count !== undefined ? <span className="font-semibold">{count}</span> : null}
    </span>
  );
}
