"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/listing/Header";
import { GalleryGrid } from "@/components/listing/GalleryGrid";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { BookingCard } from "@/components/listing/BookingCard";
import { Amenities } from "@/components/listing/Amenities";
import { Description } from "@/components/listing/Description";
import { Reviews } from "@/components/listing/Reviews";
import { MapSection } from "@/components/listing/MapSection";
import { Footer } from "@/components/listing/Footer";
import { PhotoTour } from "@/components/overlays/PhotoTour";
import { Lightbox } from "@/components/overlays/Lightbox";
import { Toast } from "@/components/ui/Toast";
import { MobileBookingBar } from "@/components/listing/MobileBookingBar";
import { stockPhotoUrl } from "@/lib/stock-photos";

/**
 * Same label/seed pairs GalleryGrid.tsx renders, in the same order (hero
 * first, then the 4 smaller cells) — used to build the Lightbox's image
 * list for the "click a small gallery tile" entry point. Photo Tour's own
 * photos get their own, separate Lightbox instance (see PhotoTour.tsx),
 * since they're a different, much larger image set.
 */
const GALLERY_IMAGES = [
  { src: stockPhotoUrl("Living room", "gallery-hero")!, alt: "Living room" },
  { src: stockPhotoUrl("Bedroom", "gallery")!, alt: "Bedroom" },
  { src: stockPhotoUrl("Full kitchen", "gallery")!, alt: "Full kitchen" },
  { src: stockPhotoUrl("Full bathroom", "gallery")!, alt: "Full bathroom" },
  { src: stockPhotoUrl("Exterior", "gallery")!, alt: "Exterior" },
];

export default function ListingPage() {
  // ── Toast notification system ──────────────────────────────────────────
  // A single lightweight toast queue so every stub button gives visible
  // feedback instead of silently logging to console.
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const toastCounter = useRef(0);

  const showToast = useCallback((message: string) => {
    const id = ++toastCounter.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Photo Tour overlay ─────────────────────────────────────────────────
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  // Whichever element (hero image or "Show all photos" button) opened the
  // Photo Tour — per PhotoTour.tsx's documented parent contract, focus is
  // returned here when the overlay closes, since PhotoTour itself has no
  // way to know which DOM node opened it.
  const photoTourTriggerRef = useRef<HTMLElement | null>(null);

  function handleOpenPhotoTour(trigger: HTMLElement) {
    photoTourTriggerRef.current = trigger;
    setIsPhotoTourOpen(true);
  }

  function handleClosePhotoTour() {
    setIsPhotoTourOpen(false);
  }

  // Return focus to the trigger only after React actually commits the DOM
  // update that lifts `inert` off <main> — calling `.focus()` synchronously
  // inside handleClosePhotoTour races the re-render (React batches the
  // state update), so the target element is still `inert` at that instant
  // and `.focus()` silently no-ops, dropping focus to <body> instead.
  // Effects run after commit, so this fires once `inert` is truly gone.
  useEffect(() => {
    if (!isPhotoTourOpen) {
      photoTourTriggerRef.current?.focus();
    }
  }, [isPhotoTourOpen]);

  // ── Gallery Lightbox overlay ───────────────────────────────────────────
  // Lightbox opened by clicking one of the 4 small gallery-grid tiles (not
  // the hero, which opens Photo Tour — see GalleryGrid.tsx's prop comment).
  // Same trigger-ref/focus-return contract as Photo Tour, documented in
  // Lightbox.tsx.
  const [isGalleryLightboxOpen, setIsGalleryLightboxOpen] = useState(false);
  const [galleryLightboxStartIndex, setGalleryLightboxStartIndex] = useState(0);
  const galleryLightboxTriggerRef = useRef<HTMLElement | null>(null);

  function handleOpenGalleryLightbox(index: number, trigger: HTMLElement) {
    galleryLightboxTriggerRef.current = trigger;
    setGalleryLightboxStartIndex(index);
    setIsGalleryLightboxOpen(true);
  }

  function handleCloseGalleryLightbox() {
    setIsGalleryLightboxOpen(false);
  }

  useEffect(() => {
    if (!isGalleryLightboxOpen) {
      galleryLightboxTriggerRef.current?.focus();
    }
  }, [isGalleryLightboxOpen]);

  const isAnyOverlayOpen = isPhotoTourOpen || isGalleryLightboxOpen;

  return (
    <>
      {/* `inert` on the rest of the page while any overlay is open keeps it
          out of the accessibility tree and out of Tab/click reach entirely
          (belt-and-suspenders alongside each overlay's own internal focus
          trap) — covers the screen-reader-swipe case PhotoTour's own build
          report flagged as a residual gap it couldn't close from inside
          itself. Covers both Photo Tour and the gallery-grid Lightbox;
          Photo Tour's own internal Lightbox instance doesn't need this
          condition extended further, since <main> is already inert
          whenever Photo Tour itself is open. */}
      <main
        id="main-content"
        className="flex flex-1 flex-col pb-24 md:pb-0"
        inert={isAnyOverlayOpen ? true : undefined}
      >
        <Header onToast={showToast} />
        <GalleryGrid
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenGalleryLightbox}
        />

        {/* Left column (title/host block through amenities + description) +
            sticky BookingCard (right) share one grid, matching what the
            reference screenshots show: the booking card stays visible
            alongside the amenities list. Below this grid, Reviews (and later
            Map/Footer) run full-width — by that scroll depth the reference
            shows the card already gone, replaced by a compact sticky sub-nav
            that's explicitly out of scope for this build, so the card is not
            expected to stay pinned that far down. The tall combined height of
            ListingHeader+Amenities+Description vs. the much shorter
            BookingCard column is what gives `position: sticky` real room to
            clamp (a prior single-section grid left zero scroll slack, which
            is why sticky appeared completely broken).

            Explicit grid placement (col-start/row-start on each child)
            instead of a wrapper div around the left column — a11y audit
            found the previous wrapper-div structure put BookingCard LAST in
            DOM/tab order (after Amenities and Description), even though it
            sits visually right next to ListingHeader at the top. Tab order
            follows DOM order regardless of CSS Grid's visual placement, so
            keyboard users had to tab through the entire amenities list and
            calendar before ever reaching Reserve — contradicting
            reference/interactions.md's documented "header → hero gallery →
            title/booking card → content tabs" order. Explicit placement
            lets BookingCard be the DOM's 2nd child (right after
            ListingHeader, before Amenities/Description) while still
            visually spanning all 3 left-column rows for its sticky
            behavior to have scroll room. */}
        {/* Desktop two-column grid — hidden on mobile (single column below md) */}
        <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-10 px-4 md:grid-cols-[1fr_400px] md:px-10">
          <div className="col-start-1 row-start-1">
            <ListingHeader onToast={showToast} />
          </div>
          {/* BookingCard hidden on mobile — replaced by MobileBookingBar */}
          <div className="hidden md:block col-start-2 row-start-1 row-span-3">
            <BookingCard onToast={showToast} />
          </div>
          <div className="col-start-1 row-start-2">
            <Amenities onToast={showToast} />
          </div>
          <div className="col-start-1 row-start-3">
            <Description />
          </div>
        </div>

        <Reviews onToast={showToast} />
        <MapSection onToast={showToast} />
        <Footer onToast={showToast} />
      </main>

      {/* Mobile sticky bottom booking bar — visible only below md breakpoint */}
      <MobileBookingBar onToast={showToast} />

      <PhotoTour isOpen={isPhotoTourOpen} onClose={handleClosePhotoTour} />
      <Lightbox
        isOpen={isGalleryLightboxOpen}
        images={GALLERY_IMAGES}
        startIndex={galleryLightboxStartIndex}
        onClose={handleCloseGalleryLightbox}
      />

      {/* Toast notification stack — renders outside inert <main> so it
          stays visible and interactive even while an overlay is open. */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
