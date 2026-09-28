"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { IconButton } from "@/components/ui/IconButton";
import { stockPhotoUrl } from "@/lib/stock-photos";
import { Lightbox, type LightboxImage } from "@/components/overlays/Lightbox";

/**
 * Back-arrow icon used as the Photo Tour's close control — per
 * reference/photo-tour screenshots the overlay closes via a "<" icon
 * top-left, not an "X". Original simple chevron glyph.
 */
function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Share icon — reused visual language from ListingHeader.tsx's ShareIcon. */
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

/** Save (heart) icon — reused visual language from ListingHeader.tsx's HeartIcon. */
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
 * Flat-color placeholder standing in for a real listing photo — same
 * convention established in GalleryGrid.tsx/Amenities.tsx. No licensed/
 * scraped photography is available for this clone.
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
    <div className={`relative overflow-hidden bg-border-light ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={label} fill sizes="740px" className="object-cover" />
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

interface Room {
  name: string;
  /** Short made-up amenity tag line, not copied from the reference. */
  tags: string;
}

/**
 * Room order/names and tag lines are original placeholder content inspired
 * by the general shape of reference/photo-tour screenshots (e.g. "Sofa ·
 * Air conditioning · Ceiling fan · TV" for Living room 1), not copied text.
 */
const ROOMS: Room[] = [
  { name: "Living room 1", tags: "Sofa · Air conditioning · Ceiling fan · TV" },
  { name: "Living room 2", tags: "Ceiling fan · Hot tub" },
  { name: "Full kitchen", tags: "Refrigerator · Stovetop · Cookware · Dining table" },
  { name: "Bedroom", tags: "Double bed · Wardrobe · Blackout curtains" },
  { name: "Full bathroom", tags: "Rain shower · Hair dryer · Towels" },
  { name: "Gym", tags: "Treadmill · Free weights · Yoga mat" },
  { name: "Exterior", tags: "Balcony · Garden view · Parking" },
  { name: "Pool", tags: "Shared pool · Loungers · Poolside shower" },
  { name: "Additional photos", tags: "Lobby · Hallway · Building exterior" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Flattened list of every room's hero + 2 supporting photos, in ROOMS
 * order, 3 per room (seeds "b"/"c"/"d" — matching the seeds each room's
 * detail section already renders with). This is what the nested Lightbox
 * (opened by clicking a photo inside the tour) browses — NOT the overview
 * thumbnails (seed "a"), which stay non-interactive navigation aids to
 * jump to a room section, matching how the overview grid itself isn't a
 * distinct "photo" so much as a way to get around the tour.
 */
const TOUR_IMAGE_SEEDS = ["b", "c", "d"] as const;
const TOUR_IMAGES: LightboxImage[] = ROOMS.flatMap((room) =>
  TOUR_IMAGE_SEEDS.map((seed) => ({
    src: stockPhotoUrl(room.name, seed)!,
    alt: room.name,
  })),
);

export interface PhotoTourProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-page Photo Tour overlay.
 *
 * PARENT CONTRACT (focus-return-to-trigger):
 * This component only manages focus WHILE open (moves focus in on open,
 * traps Tab within the overlay while mounted). It intentionally does NOT
 * try to remember/refocus whatever triggered it, because state (isOpen)
 * lives in the parent and this component has no reliable way to know which
 * DOM node opened it. Contract: the parent must keep a ref to its trigger
 * element (e.g. the "Show all photos" button) and call `triggerRef.current
 * ?.focus()` inside its own `onClose` handler (or in a `useEffect` keyed off
 * `isOpen` flipping back to false) before/after calling this component's
 * `onClose`. That keeps focus-return colocated with the trigger, which only
 * the parent knows about.
 *
 * SCROLL POSITION:
 * This component never touches `window.scrollTo`. It only toggles
 * `document.body.style.overflow` (and compensates `padding-right` for the
 * removed scrollbar width, restoring both on close) to lock/unlock
 * background scroll. Since nothing here scrolls the window, the page
 * returns to its exact prior scroll position for free the moment
 * `overflow` is restored — no explicit scrollY capture/restore needed.
 *
 * ANIMATION (Step 5, documented assumption — not verified from screenshots
 * per reference/interactions.md's "Photo Tour open/close transition" being
 * explicitly unverified): a simple opacity fade (0 -> 1 on enter, 1 -> 0 on
 * exit), ~200ms, ease-out on enter / ease-in on exit. Kept mounted briefly
 * during exit via local `visible` state so the fade-out is visible instead
 * of an instant unmount.
 */
export function PhotoTour({ isOpen, onClose }: PhotoTourProps) {
  // Controls whether the component is in the DOM at all — stays true a
  // moment past isOpen=false so the exit transition can play out.
  const [mounted, setMounted] = useState(isOpen);
  // Controls the opacity transition class itself (a tick behind `mounted`
  // on open so the browser registers the initial "invisible" state before
  // transitioning to visible).
  const [visible, setVisible] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollLockCleanupRef = useRef<(() => void) | null>(null);

  // Nested Lightbox, opened by clicking a photo inside the tour (hero or
  // either supporting thumbnail). Same trigger-ref/focus-return contract
  // Lightbox.tsx documents for its parents. Kept as a value (not just a
  // ref) `isLightboxOpen` is also read by the Escape-key effect below, to
  // stop that Escape press from *also* closing Photo Tour underneath —
  // both components independently listen for Escape on `window`, so
  // without this guard, closing the nested Lightbox would close Photo Tour
  // too in the same keypress (the exact "closing an overlay closes the
  // wrong thing" bug the project was explicitly warned to watch for).
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  function handleOpenLightbox(index: number, trigger: HTMLElement) {
    lightboxTriggerRef.current = trigger;
    setLightboxStartIndex(index);
    setIsLightboxOpen(true);
  }

  function handleCloseLightbox() {
    setIsLightboxOpen(false);
  }

  useEffect(() => {
    if (!isLightboxOpen) {
      lightboxTriggerRef.current?.focus();
    }
  }, [isLightboxOpen]);

  // Mount-on-open is a render-phase state adjustment (React's documented
  // pattern for "adjusting state when a prop changes"), not an effect —
  // it needs to happen before paint so the dialog is in the DOM in time
  // for the rAF-driven fade-in below, and setState-during-render is exactly
  // what React recommends over setState-inside-effect for that case.
  if (isOpen && !mounted) {
    setMounted(true);
  }
  // Same render-phase reasoning as mounted, above, but for the opacity
  // class: flip it off the instant isOpen goes false so the CSS transition
  // has a true 1 -> 0 to animate across, rather than deferring the flip to
  // an effect that fires after the commit.
  if (!isOpen && visible) {
    setVisible(false);
  }

  // Unmount-after-exit-transition + enter transition sequencing.
  useEffect(() => {
    let raf1: number;
    let raf2: number;
    let exitTimeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
      // Two rAFs ensure the initial opacity-0 state is painted before
      // flipping to opacity-100, so the fade actually animates.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
    } else {
      exitTimeout = setTimeout(() => setMounted(false), 220);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(exitTimeout);
    };
  }, [isOpen]);

  // Real scroll lock, with scrollbar-width compensation so the page behind
  // doesn't jump horizontally when the scrollbar disappears. Locking only
  // `document.body.style.overflow` does nothing in standards-mode Chrome —
  // the actual scrolling element is `document.documentElement` (<html>), so
  // both must be set (pixel-reviewer caught this: window scroll kept
  // working with only `body` locked).
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPaddingRight = parseFloat(
        window.getComputedStyle(document.body).paddingRight || "0",
      );
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    const cleanup = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
    scrollLockCleanupRef.current = cleanup;

    return cleanup;
  }, [isOpen]);

  // Move focus to the close/back button on open. Depends on `mounted`, not
  // just `isOpen`: on the render where `isOpen` first flips true, `mounted`
  // is still false (it's set by a separate effect in the same commit), so
  // the dialog hasn't rendered yet and `closeButtonRef.current` is null —
  // pixel-reviewer confirmed focus silently stayed on <body> because this
  // effect never re-ran once the dialog actually mounted.
  useEffect(() => {
    if (isOpen && mounted) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen, mounted]);

  // Escape-to-close, while open. Guarded on `isLightboxOpen`: the nested
  // Lightbox also listens for Escape on `window` independently — without
  // this guard, one Escape press would close both the Lightbox AND Photo
  // Tour in the same keystroke, when it should only close whichever
  // overlay is topmost.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isLightboxOpen) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLightboxOpen]);

  // Focus trap: Tab/Shift+Tab wraps within the dialog's focusable elements.
  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !dialogRef.current.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last || !dialogRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  if (!mounted) return null;

  return (
    <>
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-tour-title"
      onKeyDown={handleKeyDown}
      // `inert` while the nested Lightbox is open — same belt-and-suspenders
      // reasoning as page.tsx's own `inert` on <main> while Photo Tour is
      // open: Lightbox's opaque backdrop already blocks mouse/visual access
      // to this content, but a screen-reader user could still swipe into it
      // without this, since it isn't literally removed from the a11y tree.
      inert={isLightboxOpen ? true : undefined}
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface transition-opacity ${
        visible ? "opacity-100 duration-200 ease-out" : "opacity-0 duration-200 ease-in"
      }`}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-surface px-10 py-4">
        <IconButton
          ref={closeButtonRef}
          variant="ghost"
          aria-label="Go back to listing"
          onClick={onClose}
        >
          <BackArrowIcon className="h-5 w-5" />
        </IconButton>

        <h2
          id="photo-tour-title"
          className="text-modal-title font-bold text-text-primary"
        >
          Photo tour
        </h2>

        <div className="flex items-center gap-2">
          <IconButton
            variant="ghost"
            aria-label="Share this listing"
            onClick={() => console.log("share listing")}
          >
            <ShareIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            variant="ghost"
            aria-label="Save this listing"
            onClick={() => console.log("save listing")}
          >
            <HeartIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-16 px-10 pb-16">
        {/* Overview thumbnail grid */}
        <div className="flex flex-wrap gap-6 pt-4">
          {ROOMS.map((room) => (
            <div key={room.name} className="flex w-36 flex-col gap-2">
              <PlaceholderImage
                label={room.name}
                seed="a"
                className="aspect-square w-full overflow-hidden rounded-card"
              />
              <span className="text-body text-text-secondary">{room.name}</span>
            </div>
          ))}
        </div>

        {/* Per-room detail sequence — two-column layout per
            reference/photo-tour/02-living-room-1.png: heading+tags sit in a
            left text column, hero + 2-up supporting images in a right
            column (pixel-reviewer found the initial build stacked
            everything full-width in one column instead). */}
        <div className="flex flex-col gap-16">
          {ROOMS.map((room, roomIdx) => {
            // This room's 3 slots (hero, sub-0, sub-1) occupy consecutive
            // indices in TOUR_IMAGES, since it's built by flatMapping ROOMS
            // in the same order with the same 3 seeds.
            const baseIndex = roomIdx * TOUR_IMAGE_SEEDS.length;
            return (
              <div
                key={room.name}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-10"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-title font-bold text-text-primary">
                    {room.name}
                  </h3>
                  <p className="text-body text-text-secondary">{room.tags}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="text-left transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                    aria-label={`Open photo: ${room.name}`}
                    onClick={(event) =>
                      handleOpenLightbox(baseIndex, event.currentTarget)
                    }
                  >
                    <PlaceholderImage
                      label={room.name}
                      seed="b"
                      className="aspect-[16/9] w-full overflow-hidden rounded-panel"
                    />
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="text-left transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                      aria-label={`Open photo: ${room.name}`}
                      onClick={(event) =>
                        handleOpenLightbox(baseIndex + 1, event.currentTarget)
                      }
                    >
                      <PlaceholderImage
                        label={room.name}
                        seed="c"
                        className="aspect-[3/2] w-full overflow-hidden rounded-card"
                      />
                    </button>
                    <button
                      type="button"
                      className="text-left transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                      aria-label={`Open photo: ${room.name}`}
                      onClick={(event) =>
                        handleOpenLightbox(baseIndex + 2, event.currentTarget)
                      }
                    >
                      <PlaceholderImage
                        label={room.name}
                        seed="d"
                        className="aspect-[3/2] w-full overflow-hidden rounded-card"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <Lightbox
      isOpen={isLightboxOpen}
      images={TOUR_IMAGES}
      startIndex={lightboxStartIndex}
      onClose={handleCloseLightbox}
    />
    </>
  );
}
