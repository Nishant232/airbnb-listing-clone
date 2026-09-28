"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@/components/ui/IconButton";
import { StarRating } from "@/components/ui/StarRating";
import { stockPhotoUrl } from "@/lib/stock-photos";

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12h17M12 3.5c2.5 2.2 3.8 5.3 3.8 8.5s-1.3 6.3-3.8 8.5c-2.5-2.2-3.8-5.3-3.8-8.5S9.5 5.7 12 3.5Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PlaceholderPhoto({
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
      className={`relative aspect-square w-full overflow-hidden rounded-card bg-border-light ${className ?? ""}`}
    >
      {src ? (
        <Image src={src} alt={label} fill sizes="260px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-raised text-meta text-text-muted">
          {label}
        </div>
      )}
    </div>
  );
}

interface NearbyStay {
  id: number;
  title: string;
  price: string;
  rating: number;
  photoLabel: string;
}

const NEARBY_STAYS_PAGES: NearbyStay[][] = [
  [
    { id: 1, title: "Candolim Beachfront Villa", price: "₹8,499 / night", rating: 4.96, photoLabel: "Living room" },
    { id: 2, title: "Calangute Sunset Suite", price: "₹5,200 / night", rating: 4.88, photoLabel: "Bedroom" },
    { id: 3, title: "Aguada Heritage Cottage", price: "₹6,750 / night", rating: 4.92, photoLabel: "Full kitchen" },
    { id: 4, title: "Sinquerim Sea View Studio", price: "₹4,900 / night", rating: 4.85, photoLabel: "Full bathroom" },
    { id: 5, title: "Baga Luxury Apartment", price: "₹7,100 / night", rating: 4.98, photoLabel: "Exterior" },
  ],
  [
    { id: 6, title: "Anjuna Bohemian Loft", price: "₹6,300 / night", rating: 4.89, photoLabel: "Living room" },
    { id: 7, title: "Vagator Cliffside Villa", price: "₹9,500 / night", rating: 4.97, photoLabel: "Exterior" },
    { id: 8, title: "Assagao Portuguese Home", price: "₹8,800 / night", rating: 4.94, photoLabel: "Bedroom" },
    { id: 9, title: "Morjim River Retreat", price: "₹5,600 / night", rating: 4.87, photoLabel: "Full kitchen" },
    { id: 10, title: "Ashwem Beach Hut Luxury", price: "₹7,800 / night", rating: 4.91, photoLabel: "Full bathroom" },
  ],
];

const FOOTER_COLUMNS = [
  {
    heading: "Support",
    links: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
  },
  {
    heading: "Hosting",
    links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly"],
  },
  {
    heading: "Airbnb",
    links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

interface FooterProps {
  onToast?: (message: string) => void;
}

export function Footer({ onToast }: FooterProps) {
  const [page, setPage] = useState(0);
  const isFirstPage = page === 0;
  const isLastPage = page === NEARBY_STAYS_PAGES.length - 1;

  return (
    <footer className="flex flex-col">
      {/* More stays nearby */}
      <div className="mx-auto w-full max-w-[1480px] px-4 md:px-10 py-8">
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-heading font-semibold text-text-primary">
              More stays nearby
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-meta text-text-secondary" aria-hidden="true">
                {page + 1} / {NEARBY_STAYS_PAGES.length}
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  variant="outline"
                  aria-label="Previous nearby stays"
                  disabled={isFirstPage}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </IconButton>
                <IconButton
                  variant="outline"
                  aria-label="Next nearby stays"
                  disabled={isLastPage}
                  onClick={() => setPage((p) => Math.min(NEARBY_STAYS_PAGES.length - 1, p + 1))}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Stays list: 1 col on mobile, 2 on sm, 3 on md, 5 on lg */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {NEARBY_STAYS_PAGES[page].map((stay) => (
              <li key={stay.id}>
                <button
                  type="button"
                  className={`group flex w-full flex-col gap-2 rounded-card text-left ${focusRing}`}
                  onClick={() => onToast?.(`🏡 Navigating to "${stay.title}" (prototype preview)`)}
                >
                  <PlaceholderPhoto
                    label={stay.photoLabel}
                    seed={String(stay.id)}
                    className="transition-[filter] group-hover:brightness-95"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body font-semibold text-text-primary transition-colors group-hover:text-text-secondary">
                      {stay.title}
                    </span>
                    <span className="flex items-center gap-1.5 text-body text-text-primary">
                      {stay.price}
                      <span className="flex items-center gap-1 text-meta text-text-secondary">
                        <span aria-hidden="true">
                          <StarRating rating={stay.rating} max={1} size={11} />
                        </span>
                        {stay.rating.toFixed(2)}
                      </span>
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Generic site footer */}
      <div className="border-t border-border-light bg-border-light/40">
        <div className="mx-auto w-full max-w-[1480px] px-4 md:px-10 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={`${column.heading} links`}>
                <h2 className="mb-4 text-body font-semibold text-text-primary">
                  {column.heading}
                </h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => onToast?.(`📄 Opening "${link}" page`)}
                        className={`rounded-sm text-left text-meta text-text-secondary hover:underline hover:underline-offset-2 ${focusRing}`}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Fourth column: language/region selector */}
            <div className="flex flex-col gap-4">
              <h2 className="text-body font-semibold text-text-primary">
                Settings
              </h2>
              <button
                type="button"
                className={`flex w-fit items-center gap-2 rounded-pill border border-border-default bg-surface px-4 py-2 text-meta font-medium text-text-primary hover:border-text-primary ${focusRing}`}
                onClick={() => onToast?.("🌐 Language & Currency settings: English (IN) · ₹ INR")}
              >
                <GlobeIcon className="h-4 w-4" />
                {"English (IN) · ₹ INR"}
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-default pt-6">
            <p className="text-meta text-text-secondary text-center sm:text-left">
              &copy; {new Date().getFullYear()} Stayfinder, Inc. &middot; Candolim Jacuzzi 1BHK Showcase Prototype
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onToast?.("📜 Privacy Policy")}
                className={`rounded-sm text-meta text-text-secondary hover:underline hover:underline-offset-2 ${focusRing}`}
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => onToast?.("📜 Terms of Service")}
                className={`rounded-sm text-meta text-text-secondary hover:underline hover:underline-offset-2 ${focusRing}`}
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => onToast?.("🗺️ Site Map")}
                className={`rounded-sm text-meta text-text-secondary hover:underline hover:underline-offset-2 ${focusRing}`}
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
