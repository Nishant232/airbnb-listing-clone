"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

/**
 * Original abstract mark for the wordmark — three overlapping shapes forming
 * a loose "loop" motif. Intentionally NOT a recreation of Airbnb's
 * trademarked Bélo symbol; this is a simple, generic abstract shape used
 * purely as a placeholder brand mark for this independent clone.
 */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3c2 4.5 8 13.5 8 18a8 8 0 1 1-16 0c0-4.5 6-13.5 8-18Z"
        fill="currentColor"
      />
      <circle cx="16" cy="23" r="2.5" fill="white" />
    </svg>
  );
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 11.5 12 4l8 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v8.5a1 1 0 0 0 1 1h3.5v-5h3v5H17a1 1 0 0 0 1-1V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="3.5" ry="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Site header/nav bar: logo, centered pill search bar, and right-hand
 * "Become a host" link + globe/menu controls. Sits above the hero gallery.
 */
export function Header({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <header className="w-full border-b border-border-light bg-surface">
      {/* Full-width row (not the 1400px content column used below the fold —
          pixel-reviewer measured the reference header hugging much closer to
          the viewport edges, ~112px, than the body content max-width). A
          3-column grid keeps the search pill truly centered regardless of
          the left/right content being unequal widths (flex `justify-between`
          was pulling it off-center). */}
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-28 py-8">
        {/* Logo / wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-input text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <LogoMark className="h-8 w-8" />
          <span className="text-card-title font-semibold tracking-tight">
            airbnb
          </span>
        </Link>

        {/* Search pill — centered independently via the grid's middle column
             Wrapped in form[role="search"] for correct accessibility landmark. */}
        <form
          role="search"
          aria-label="Search stays"
          className="flex h-14 items-center justify-self-center rounded-pill border border-border-default pl-2 pr-2"
          onSubmit={(e) => { e.preventDefault(); onToast("🔍 Search submitted!"); }}
        >
          <button
            type="button"
            onClick={() => onToast("📍 Location picker would open here")}
            className="flex items-center gap-2 rounded-pill px-5 py-3.5 text-body font-semibold text-text-primary transition-colors hover:bg-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <HouseIcon className="h-5 w-5 text-text-primary" />
            Anywhere
          </button>
          <span className="h-6 w-px bg-border-default" aria-hidden="true" />
          <button
            type="button"
            onClick={() => onToast("📅 Date picker would open here")}
            className="rounded-pill px-5 py-3.5 text-body font-semibold text-text-primary transition-colors hover:bg-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Anytime
          </button>
          <span className="h-6 w-px bg-border-default" aria-hidden="true" />
          <button
            type="button"
            onClick={() => onToast("👥 Guest picker would open here")}
            className="rounded-pill px-5 py-3.5 text-body text-text-secondary transition-colors hover:bg-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Add guests
          </button>
          <Button
            variant="primary"
            icon
            aria-label="Search"
            type="submit"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        </form>

        {/* Right-hand actions */}
        <div className="flex items-center justify-self-end gap-4">
          <Link
            href="#"
            className="rounded-pill px-3 py-2 text-body font-semibold text-text-primary transition-colors hover:bg-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={() => onToast("🏡 Become a host flow would open here")}
          >
            Become a host
          </Link>
          <div className="flex items-center gap-2">
            <IconButton aria-label="Choose a language and region" onClick={() => onToast("🌐 Language selector would open here")}>
              <GlobeIcon className="h-5 w-5" />
            </IconButton>
            <IconButton aria-label="Open menu" onClick={() => onToast("☰ Navigation menu would open here")}>
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
