"use client";

import { useId, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HomePinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

const NEIGHBOURHOOD_TEXT =
  "This quiet residential pocket sits a few minutes' walk from Candolim Beach and the " +
  "beachfront promenade, with small cafés, beach shacks, a vibrant evening market, and a " +
  "handful of independent boutiques nearby. It's an easy base for exploring North Goa " +
  "on foot during the day and winds down nicely in the evenings, so it suits " +
  "travelers looking for a calmer, upscale stay close to the coast. " +
  "Auto-rickshaws, rental scooters, and local taxis are readily available right outside the gated community.";

interface MapSectionProps {
  onToast?: (message: string) => void;
}

export function MapSection({ onToast }: MapSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const neighbourhoodId = useId();

  function handleZoomIn() {
    setZoomLevel((prev) => {
      const next = Math.min(prev + 0.25, 2.0);
      onToast?.(`🔍 Map zoomed in (${Math.round(next * 100)}%)`);
      return next;
    });
  }

  function handleZoomOut() {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.25, 0.75);
      onToast?.(`🔍 Map zoomed out (${Math.round(next * 100)}%)`);
      return next;
    });
  }

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 md:px-10 py-8">
      <div className="flex flex-col gap-4 border-t border-border-light pt-8">
        <h2 className="text-heading font-semibold text-text-primary">Where you&apos;ll be</h2>
        <p className="text-body text-text-primary">Candolim, Goa, India</p>

        {/* Stylized interactive map preview */}
        <div
          role="group"
          aria-label="Map showing the approximate location of the property in Candolim, Goa"
          className="relative h-[380px] md:h-[500px] w-full overflow-hidden rounded-panel bg-map-land transition-all duration-300"
        >
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
            aria-hidden="true"
          >
            {/* Water / Arabian Sea representation */}
            <div
              className="absolute inset-0 bg-map-water"
              style={{ clipPath: "polygon(0 0, 55% 0, 0 85%)" }}
            />

            {/* Accent geographical circles */}
            <div className="absolute top-[20%] right-[25%] h-36 w-36 rounded-full bg-map-accent/30" />
            <div className="absolute bottom-[15%] left-[20%] h-48 w-48 rounded-full bg-map-accent/20" />
            <div className="absolute top-[50%] right-[40%] h-24 w-24 rounded-full bg-map-accent/25" />

            {/* Roads / Paths */}
            <div className="absolute top-0 right-1/3 h-full w-2 bg-white/40 rotate-12" />
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white/30 -rotate-6" />

            {/* Center home pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg animate-bounce">
                <HomePinIcon className="h-7 w-7 text-white" />
              </div>
              <span className="mt-1 rounded-full bg-white/90 px-3 py-0.5 text-xs font-semibold text-text-primary shadow-sm backdrop-blur-sm">
                Candolim Jacuzzi 1BHK
              </span>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 shadow-md rounded-full bg-surface p-1">
            <IconButton
              variant="ghost"
              aria-label="Zoom in"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.0}
            >
              <PlusIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              aria-label="Zoom out"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.75}
            >
              <MinusIcon className="h-4 w-4" />
            </IconButton>
          </div>
        </div>

        <p className="text-meta text-text-secondary">
          Exact location will be provided after booking.
        </p>

        {/* Neighbourhood highlights */}
        <div className="flex flex-col gap-2 pt-4">
          <h3 className="text-card-title font-semibold text-text-primary">
            Neighbourhood highlights
          </h3>
          <p
            id={neighbourhoodId}
            className={
              expanded
                ? "text-body text-text-primary"
                : "text-body text-text-primary line-clamp-3"
            }
          >
            {NEIGHBOURHOOD_TEXT}
          </p>
          <button
            type="button"
            className="flex w-fit items-center gap-1 rounded-sm text-body font-semibold text-text-primary underline underline-offset-2 transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-expanded={expanded}
            aria-controls={neighbourhoodId}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </div>
  );
}
