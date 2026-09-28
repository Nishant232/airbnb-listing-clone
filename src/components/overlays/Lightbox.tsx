"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { IconButton } from "@/components/ui/IconButton";

/** Close ("X") icon — original simple glyph, not copied from any source. */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron pointing left — used for the "previous" control. */
function ChevronLeftIcon({ className }: { className?: string }) {
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

/** Chevron pointing right — used for the "next" control. Mirror of ChevronLeftIcon. */
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface LightboxImage {
  src: string;
  alt: string;
}

export interface LightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}

/**
 * Full-screen single-image Lightbox overlay, opened by clicking any
 * individual photo (as opposed to PhotoTour, the "show all photos" grid
 * view). See reference/interactions.md — every behavior below is explicitly
 * unverified against the live site ("needs a manual pass") and is instead
 * built from well-established, common lightbox conventions. Nothing here is
 * presented as matching the reference; each behavioral choice is flagged
 * below as an assumption, same as PhotoTour.tsx already does for its own
 * unverified transition timing.
 *
 * PARENT CONTRACT (focus-return-to-trigger) — identical pattern to
 * PhotoTour.tsx: this component only manages focus WHILE open (moves focus
 * to the close button on open, traps Tab within close/prev/next while
 * mounted). It does NOT remember or refocus whatever triggered it, because
 * `isOpen`/`images`/`startIndex` live in the parent and this component has
 * no reliable way to know which DOM node opened it — and per the prompt,
 * this same component will be instantiated twice (once for the static
 * gallery grid, once for Photo Tour's own photos), each with a different
 * trigger. Contract: each parent must keep a ref to its own trigger element
 * (the specific thumbnail/photo that was clicked) and call
 * `triggerRef.current?.focus()` itself when its `onClose` handler runs,
 * before/after calling this component's `onClose`. Focus-return stays
 * colocated with the trigger, which only the parent knows about.
 *
 * STACKING: Lightbox can be opened from within an already-open PhotoTour
 * (clicking a photo inside the tour), so it must render above PhotoTour's
 * `z-50` — uses `z-[60]`.
 *
 * BACKDROP: unlike PhotoTour (full opaque white page, no dim), Lightbox
 * uses the `overlay` token (`bg-overlay`, rgba(0,0,0,0.7)) per
 * design-tokens.md, which explicitly lists "lightbox" as an intended usage
 * for that token — dark backdrop + centered, letterboxed image is the
 * standard/common lightbox pattern, and is a deliberate difference from
 * PhotoTour's treatment, not an inconsistency between the two overlays.
 *
 * SCROLL POSITION: same as PhotoTour — never touches `window.scrollTo`,
 * only locks/restores `body`/`documentElement` overflow (with scrollbar
 * width compensation), so the page returns to its exact prior scroll
 * position for free.
 *
 * BOUNDARY BEHAVIOR (assumption, not verified): prev/next LOOP — going
 * next from the last image wraps to the first, and vice versa. This is the
 * single most common real-world lightbox convention.
 *
 * IMAGE TRANSITION (assumption, not verified): simple crossfade between
 * images on index change, ~200ms, matching PhotoTour's fade timing for
 * consistency across the app.
 *
 * DARK-BACKDROP TOKEN EXCEPTION: text/icons that normally use
 * `text-primary` (near-black) would be invisible on `bg-overlay`. Close
 * button, arrows, and the image counter deliberately use `text-white`
 * instead — a documented, intentional exception to the usual token, not an
 * oversight. `IconButton`'s `ghost` variant is used for these controls: its
 * hover state (`hover:bg-border-light`, a very light near-white gray) was
 * checked against the dark backdrop and reads correctly as a light "hover
 * halo" behind the icon, which is in fact a common lightbox hover
 * treatment — no one-off dark-background variant was needed, only an
 * override of the variant's default `text-text-primary` to `text-white`
 * via `className`. On hover the icon color is additionally switched back
 * to `text-text-primary` (`hover:text-text-primary`) so it stays legible
 * against the light `border-light` hover halo instead of going
 * white-on-white.
 */
export function Lightbox({ isOpen, images, startIndex, onClose }: LightboxProps) {
  // Controls whether the component is in the DOM at all — stays true a
  // moment past isOpen=false so the exit transition can play out. Mirrors
  // PhotoTour.tsx's mount/transition sequencing exactly.
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  // The index of the currently displayed image. Reset from `startIndex`
  // whenever the lightbox transitions from closed -> open (not on every
  // render, and not on `startIndex` changing while already open, so a
  // reopen at a fresh startIndex always lands correctly instead of getting
  // stuck on whatever index it was last closed at).
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const wasOpenRef = useRef(isOpen);

  // Drives the crossfade: true = new image faded in, false = mid-crossfade
  // (briefly, right after currentIndex changes).
  const [imageVisible, setImageVisible] = useState(true);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset currentIndex exactly on the closed -> open transition.
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setCurrentIndex(startIndex);
      setImageVisible(true);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, startIndex]);

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

  // Unmount-after-exit-transition + enter opacity sequencing — identical
  // pattern to PhotoTour.tsx.
  useEffect(() => {
    let raf1: number;
    let raf2: number;
    let exitTimeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
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

  // Real scroll lock, with scrollbar-width compensation — reused verbatim
  // from PhotoTour.tsx (both `body` and `documentElement` overflow must be
  // locked; locking only `body` does nothing in standards-mode Chrome).
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

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  // Move focus to the close button on open. Depends on `mounted`, not just
  // `isOpen` — on the render where `isOpen` first flips true, `mounted` is
  // still false (set by a separate effect in the same commit), so the
  // dialog hasn't rendered yet and `closeButtonRef.current` is null. This
  // is the exact bug PhotoTour.tsx documents having fixed; guarding on
  // `mounted` here avoids reintroducing it.
  useEffect(() => {
    if (isOpen && mounted) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen, mounted]);

  // Escape-to-close, while open.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function goToIndex(nextIndex: number) {
    if (images.length === 0) return;
    // Loop at both boundaries (assumption — see file header).
    const looped = (nextIndex + images.length) % images.length;
    setImageVisible(false);
    // Swap the src slightly after the fade-out starts, then fade back in —
    // a simple sequential crossfade, ~200ms total to match PhotoTour's
    // fade timing.
    window.setTimeout(() => {
      setCurrentIndex(looped);
      setImageVisible(true);
    }, 100);
  }

  const goPrev = () => goToIndex(currentIndex - 1);
  const goNext = () => goToIndex(currentIndex + 1);

  // ArrowLeft/ArrowRight navigation, while open.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex, images.length]);

  // Focus trap: Tab/Shift+Tab cycles within the dialog's focusable controls
  // (close/prev/next) — identical approach to PhotoTour.tsx.
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

  if (!mounted || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const dialogLabel = `Photo ${currentIndex + 1} of ${images.length}: ${currentImage.alt}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      onKeyDown={handleKeyDown}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-overlay transition-opacity ${
        visible ? "opacity-100 duration-200 ease-out" : "opacity-0 duration-200 ease-in"
      }`}
    >
      {/* Close button — top-right, common convention. */}
      <div className="absolute right-4 top-4">
        <IconButton
          ref={closeButtonRef}
          variant="ghost"
          aria-label="Close photo"
          onClick={onClose}
          className="text-white hover:text-text-primary"
        >
          <CloseIcon className="h-5 w-5" />
        </IconButton>
      </div>

      {/* Previous control */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <IconButton
          variant="ghost"
          aria-label="Previous photo"
          onClick={goPrev}
          className="text-white hover:text-text-primary"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Next control */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <IconButton
          variant="ghost"
          aria-label="Next photo"
          onClick={goNext}
          className="text-white hover:text-text-primary"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Image counter — unobtrusive, bottom-center. */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-meta text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Centered, letterboxed image with crossfade on index change. */}
      <div
        className={`relative max-h-[85vh] max-w-[85vw] transition-opacity ${
          imageVisible ? "opacity-100 duration-200 ease-out" : "opacity-0 duration-100 ease-in"
        }`}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1600}
          height={1200}
          sizes="85vw"
          className="max-h-[85vh] max-w-[85vw] object-contain"
          priority
        />
      </div>
    </div>
  );
}
