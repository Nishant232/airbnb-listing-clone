"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { stockPhotoUrl } from "@/lib/stock-photos";

/**
 * Small 2x2-squares grid icon for the "Show all photos" pill — an original
 * generic glyph, not traced from any icon library or the reference site.
 */
function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" fill="currentColor" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" fill="currentColor" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" fill="currentColor" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Room photo standing in for the real listing's photography. No licensed
 * photos of the actual reference listing exist for this clone, so this
 * renders a free-license Unsplash photo matched to the room type
 * (src/lib/stock-photos.ts) instead — real interior/exterior photography,
 * not a flat placeholder block. Falls back to the original flat
 * token-backed block + label if a room type has no mapped photo, so this
 * never silently renders broken.
 */
function PlaceholderImage({
  label,
  className,
  seed,
}: {
  label: string;
  className?: string;
  seed?: string;
}) {
  const src = stockPhotoUrl(label, seed);
  return (
    <div
      className={`relative overflow-hidden bg-border-light ${className ?? ""}`}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 1480px) 50vw, 740px"
          className="object-cover"
        />
      ) : (
        <div role="img" aria-label={`Photo: ${label}`} className="flex h-full w-full items-center justify-center">
          <span className="text-meta font-medium text-text-secondary">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

export interface GalleryGridProps {
  /**
   * Called with the DOM element that was clicked (hero image or "Show all
   * photos" button) so the parent can remember it and return focus there
   * when the Photo Tour overlay closes — see PhotoTour.tsx's documented
   * parent contract for focus-return-to-trigger.
   */
  onOpenPhotoTour: (trigger: HTMLElement) => void;
  /**
   * Called with the clicked grid photo's index (matching the order of
   * `src/app/page.tsx`'s GALLERY_IMAGES array — hero at 0, then the 4
   * smaller cells) and the DOM element clicked, so the parent can open
   * the Lightbox at that specific photo and return focus there on close.
   * Only the 4 smaller cells open the Lightbox — the large hero cell (and
   * "Show all photos") keep opening the Photo Tour, matching how the
   * reference/spec.md's two overlays were already split by trigger: a
   * quick single-photo peek from a small tile vs. the full room-by-room
   * tour from the hero/pill, avoiding the hero having two conflicting
   * click behaviors.
   */
  onOpenLightbox: (index: number, trigger: HTMLElement) => void;
}

/**
 * Static hero gallery grid: one large photo on the left (spanning both
 * rows) plus a 2x2 grid of four smaller photos on the right, rounded as a
 * single unit with a "Show all photos" pill overlaid bottom-right. The
 * hero image and "Show all photos" open the Photo Tour overlay
 * (src/components/overlays/PhotoTour.tsx); the 4 smaller cells open the
 * Lightbox overlay (src/components/overlays/Lightbox.tsx) at that specific
 * photo, per reference/spec.md.
 */
export function GalleryGrid({ onOpenPhotoTour, onOpenLightbox }: GalleryGridProps) {
  return (
    <div className="mx-auto w-full max-w-[1480px] px-10">
      <div className="relative grid aspect-[7/3] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-panel">
        {/* hover:brightness-95 gives the page's single largest clickable
            element some rollover feedback — hover audit found it felt
            completely dead/static next to every other interactive control
            on the page, which all darken/shift on hover. */}
        <button
          type="button"
          className="col-span-2 row-span-2 text-left transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
          aria-label="Open photo tour"
          onClick={(event) => onOpenPhotoTour(event.currentTarget)}
        >
          <PlaceholderImage label="Living room" seed="gallery-hero" className="h-full w-full" />
        </button>

        {(
          [
            ["Bedroom", 1],
            ["Full kitchen", 2],
            ["Full bathroom", 3],
            ["Exterior", 4],
          ] as const
        ).map(([label, index]) => (
          <button
            key={label}
            type="button"
            className="text-left transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            aria-label={`Open photo: ${label}`}
            onClick={(event) => onOpenLightbox(index, event.currentTarget)}
          >
            <PlaceholderImage label={label} seed="gallery" className="h-full w-full" />
          </button>
        ))}

        <Button
          variant="outline"
          className="absolute bottom-4 right-4 gap-2"
          onClick={(event) => onOpenPhotoTour(event.currentTarget)}
        >
          <GridIcon className="h-4 w-4" />
          Show all photos
        </Button>
      </div>
    </div>
  );
}
