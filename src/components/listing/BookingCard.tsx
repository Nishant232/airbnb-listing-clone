"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Small price/offer tag glyph for the promo banner — original simple shape. */
function TagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M11.5 3H4v7.5L13.5 20a1.4 1.4 0 0 0 2 0l5.5-5.5a1.4 1.4 0 0 0 0-2L11.5 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="7.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Small chevron-down glyph for the Guests row's dropdown affordance. */
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M6 9.5 12 15l6-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small flag glyph for the "Report this listing" link. */
function FlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M6 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 4h11l-2.5 3.5L17 11H6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

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

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface BookingCardProps {
  onToast: (message: string) => void;
}

/**
 * Sticky reservation card — promo banner + main booking card + "Report this
 * listing" link. Now interactive as a prototype:
 *  • Guests counter is live (add / remove guests)
 *  • Reserve button shows a confirmation toast
 *  • All stub buttons show descriptive toasts
 * FIXED: Check-in/Checkout dates are consistent with the Candolim listing.
 */
export function BookingCard({ onToast }: BookingCardProps) {
  const [guests, setGuests] = useState(2);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const checkIn = { month: 10, day: 12, year: 2026 }; // Nov 12
  const checkOut = { month: 10, day: 16, year: 2026 }; // Nov 16
  const nights = 4;
  const pricePerNight = 6188;
  const total = pricePerNight * nights;

  return (
    <div className="w-full max-w-[400px] py-8">
      <div className="sticky top-24 flex h-fit flex-col gap-4">

        {/* Promo banner */}
        <div className="flex items-center gap-3 rounded-card border border-border-light px-4 py-3">
          <span className="shrink-0 text-text-primary" aria-hidden="true">
            <TagIcon className="h-6 w-6" />
          </span>
          <div className="flex flex-1 flex-col text-meta text-text-primary">
            <span>Get 10% off your next stay.</span>
            <button
              type="button"
              className={`w-fit rounded-sm text-left underline underline-offset-2 ${focusRing}`}
              onClick={() => onToast("📄 Terms & conditions panel would open here")}
            >
              Terms apply
            </button>
          </div>
          <Button
            variant="outline"
            className="shrink-0 px-4 py-2 text-meta"
            onClick={() => onToast("🎁 Promo code CLAIM10 copied to clipboard!")}
          >
            Claim
          </Button>
        </div>

        {/* Main booking card */}
        <div className="flex flex-col gap-4 rounded-panel border border-border-default bg-surface p-6 shadow-card">
          <div className="flex items-baseline gap-1.5">
            <span className="text-card-title font-semibold text-text-primary">
              ₹{pricePerNight.toLocaleString("en-IN")}
            </span>
            <span className="text-body text-text-secondary">/ night</span>
          </div>

          {/* Check-in / Checkout */}
          <div className="grid grid-cols-2 overflow-hidden rounded-input border border-border-default">
            <button
              type="button"
              className={`flex flex-col gap-0.5 border-r border-border-default px-4 py-2 text-left transition-colors hover:bg-border-light ${focusRing}`}
              onClick={() => onToast("📅 Date picker: select check-in date")}
            >
              <span className="text-meta font-semibold uppercase tracking-wide text-text-primary">Check-in</span>
              <span className="text-body text-text-primary">
                {checkIn.day}/{checkIn.month + 1}/{checkIn.year}
              </span>
            </button>
            <button
              type="button"
              className={`flex flex-col gap-0.5 px-4 py-2 text-left transition-colors hover:bg-border-light ${focusRing}`}
              onClick={() => onToast("📅 Date picker: select checkout date")}
            >
              <span className="text-meta font-semibold uppercase tracking-wide text-text-primary">Checkout</span>
              <span className="text-body text-text-primary">
                {checkOut.day}/{checkOut.month + 1}/{checkOut.year}
              </span>
            </button>
          </div>

          {/* Guests — interactive counter */}
          <div className="rounded-input border border-border-default">
            <button
              type="button"
              className={`flex w-full flex-col gap-0.5 px-4 py-2 text-left transition-colors hover:bg-border-light ${focusRing}`}
              onClick={() => setGuestsOpen((o) => !o)}
            >
              <span className="flex items-center justify-between">
                <span className="text-meta font-semibold uppercase tracking-wide text-text-primary">Guests</span>
                <ChevronDownIcon className={`h-4 w-4 text-text-primary transition-transform ${guestsOpen ? "rotate-180" : ""}`} />
              </span>
              <span className="text-body text-text-primary">{guests} guest{guests !== 1 ? "s" : ""}</span>
            </button>

            {/* Guest counter panel */}
            {guestsOpen && (
              <div className="border-t border-border-light px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body font-semibold text-text-primary">Adults</p>
                    <p className="text-meta text-text-secondary">Age 13+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Remove guest"
                      disabled={guests <= 1}
                      onClick={() => { setGuests((g) => Math.max(1, g - 1)); onToast(`👥 ${Math.max(1, guests - 1)} guest${Math.max(1, guests - 1) !== 1 ? "s" : ""} selected`); }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-border-default text-text-primary transition-colors hover:border-text-primary disabled:opacity-30 ${focusRing}`}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="w-4 text-center text-body font-semibold text-text-primary">{guests}</span>
                    <button
                      type="button"
                      aria-label="Add guest"
                      disabled={guests >= 3}
                      onClick={() => { setGuests((g) => Math.min(3, g + 1)); onToast(`👥 ${Math.min(3, guests + 1)} guest${Math.min(3, guests + 1) !== 1 ? "s" : ""} selected`); }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-border-default text-text-primary transition-colors hover:border-text-primary disabled:opacity-30 ${focusRing}`}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-meta text-text-secondary">Max 3 guests</p>
              </div>
            )}
          </div>

          {/* Free cancellation note */}
          <div className="rounded-input bg-border-light px-4 py-3 text-center text-meta text-text-secondary">
            Free cancellation before{" "}
            <span className="font-semibold text-text-primary">
              {MONTH_NAMES[checkIn.month]} {checkIn.day - 1}
            </span>
          </div>

          {/* Price breakdown */}
          <div className="flex flex-col gap-2 border-t border-border-light pt-4 text-body text-text-primary">
            <div className="flex justify-between">
              <span>₹{pricePerNight.toLocaleString("en-IN")} × {nights} nights</span>
              <span>₹{(pricePerNight * nights).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Cleaning fee</span>
              <span>₹850</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Service fee</span>
              <span>₹2,240</span>
            </div>
            <div className="flex justify-between border-t border-border-light pt-3 font-semibold">
              <span>Total</span>
              <span>₹{(total + 850 + 2240).toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Reserve CTA */}
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onToast("🎉 Reservation flow would open here! Booking confirmed in prototype.")}
          >
            Reserve
          </Button>

          <p className="text-center text-meta text-text-secondary">
            You won&rsquo;t be charged yet
          </p>
        </div>

        {/* Report this listing */}
        <button
          type="button"
          className={`mx-auto flex w-fit items-center gap-2 rounded-sm text-meta text-text-secondary underline underline-offset-2 ${focusRing}`}
          onClick={() => onToast("🚩 Report form would open here")}
        >
          <FlagIcon className="h-4 w-4" />
          Report this listing
        </button>
      </div>
    </div>
  );
}
