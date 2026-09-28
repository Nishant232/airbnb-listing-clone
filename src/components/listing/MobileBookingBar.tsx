"use client";

import { Button } from "@/components/ui/Button";

interface MobileBookingBarProps {
  onToast: (message: string) => void;
}

/**
 * Sticky bottom booking bar — visible only on mobile (hidden above md).
 * Mirrors the key info from BookingCard: price, dates, and a Reserve CTA.
 * Sits outside <main> so it's never inert while overlays are open.
 * The `pb-24 md:pb-0` on <main> in page.tsx ensures content doesn't hide
 * behind this bar.
 */
export function MobileBookingBar({ onToast }: MobileBookingBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border-default bg-surface px-4 py-3 shadow-modal md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-body font-semibold text-text-primary">
            ₹24,750{" "}
            <span className="text-body font-normal text-text-secondary">
              for 4 nights
            </span>
          </span>
          <button
            type="button"
            className="w-fit text-left text-meta text-text-secondary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            onClick={() => onToast("📅 Opening date picker…")}
          >
            Nov 12 – 16 · 2 guests
          </button>
        </div>
        <Button
          variant="primary"
          className="shrink-0 px-6 py-3"
          onClick={() => onToast("🎉 Reservation flow would open here!")}
        >
          Reserve
        </Button>
      </div>
    </div>
  );
}
