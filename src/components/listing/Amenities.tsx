"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { stockPhotoUrl } from "@/lib/stock-photos";

function PlaceholderImage({ label, className, seed }: { label: string; className?: string; seed?: string }) {
  const src = stockPhotoUrl(label, seed);
  return (
    <div className={`relative overflow-hidden bg-border-light ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={label} fill sizes="480px" className="object-cover" />
      ) : (
        <div role="img" aria-label={`Photo: ${label}`} className="flex h-full w-full items-center justify-center">
          <span className="text-meta font-medium text-text-secondary">{label}</span>
        </div>
      )}
    </div>
  );
}

interface SleepCard { room: string; spec: string; }
const SLEEP_CARDS: SleepCard[] = [
  { room: "Bedroom", spec: "1 double bed" },
  { room: "Living room", spec: "1 sofa" },
];

function KitchenIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M7 3v7a2 2 0 0 0 4 0V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 10v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M16 3c-1.4 0-2.5 1.8-2.5 4s1.1 4 2.5 4v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function WifiIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M3.5 9.5a13 13 0 0 1 17 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M6.5 13a9 9 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M9.5 16.5a4.5 4.5 0 0 1 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="20" r="1" fill="currentColor" /></svg>);
}
function WorkspaceIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 18v-3.5h16V18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M7 14.5V9l4-3 4 3v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>);
}
function ParkingIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M4 12h16" stroke="currentColor" strokeWidth="1.6" /><circle cx="8" cy="17.5" r="1.2" fill="currentColor" /><circle cx="16" cy="17.5" r="1.2" fill="currentColor" /></svg>);
}
function PoolIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M3 9c3-2 5 2 8 0s5 2 8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 14c3-2 5 2 8 0s5 2 8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 19c3-2 5 2 8 0s5 2 8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function HotTubIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M9 4c0 1-1 1-1 2s1 1 1 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M13 4c0 1-1 1-1 2s1 1 1 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><rect x="3" y="11" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M3 15h18" stroke="currentColor" strokeWidth="1.6" /><path d="M5 18v1.5M19 18v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
}
function PawIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><circle cx="12" cy="15" r="3.3" stroke="currentColor" strokeWidth="1.6" /><circle cx="6.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" /><circle cx="17.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" /><circle cx="9" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="15" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>);
}
function SecurityCameraIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M3 6h5l2 2h9v3H10l-2 2H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="16.5" cy="9.5" r="1.2" fill="currentColor" /><path d="M6 13v3M6 20h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
}
function CoAlarmIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 8v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="0.9" fill="currentColor" /></svg>);
}
function SmokeAlarmIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><ellipse cx="12" cy="8" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" /><path d="M4 8v2c0 1.7 3.6 3 8 3s8-1.3 8-3V8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="8" r="1.1" fill="currentColor" /></svg>);
}
function ChevronLeftIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function ChevronRightIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getMonthGrid(year: number, monthIndex: number): (number | null)[][] {
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

interface DateVal { year: number; month: number; day: number; }

interface MonthCalendarProps {
  year: number; monthIndex: number;
  checkedIn?: DateVal | null; checkedOut?: DateVal | null;
  onSelectDate?: (year: number, month: number, day: number) => void;
  showPrev?: boolean; showNext?: boolean;
  onPrev?: () => void; onNext?: () => void;
}

function MonthCalendar({ year, monthIndex, showPrev, showNext, onPrev, onNext, checkedIn, checkedOut, onSelectDate }: MonthCalendarProps) {
  const weeks = getMonthGrid(year, monthIndex);
  const monthLabel = `${MONTH_NAMES[monthIndex]} ${year}`;

  function isInRange(day: number) {
    if (!checkedIn || !checkedOut) return false;
    const d = new Date(year, monthIndex, day).getTime();
    const from = new Date(checkedIn.year, checkedIn.month, checkedIn.day).getTime();
    const to = new Date(checkedOut.year, checkedOut.month, checkedOut.day).getTime();
    return d > from && d < to;
  }
  function isSelected(day: number, which: "in" | "out") {
    const ref = which === "in" ? checkedIn : checkedOut;
    return ref && ref.year === year && ref.month === monthIndex && ref.day === day;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {showPrev ? (
          <IconButton variant="ghost" aria-label="Show previous month" onClick={onPrev}><ChevronLeftIcon className="h-4 w-4" /></IconButton>
        ) : <span className="h-10 w-10" aria-hidden="true" />}
        <span className="text-body font-semibold text-text-primary">{monthLabel}</span>
        {showNext ? (
          <IconButton variant="ghost" aria-label="Show next month" onClick={onNext}><ChevronRightIcon className="h-4 w-4" /></IconButton>
        ) : <span className="h-10 w-10" aria-hidden="true" />}
      </div>
      <table className="w-full border-collapse">
        <caption className="sr-only">{monthLabel}</caption>
        <thead>
          <tr>
            {WEEKDAY_LABELS.map((label, i) => (
              <th key={`${label}-${i}`} scope="col" className="pb-2 text-center text-meta font-normal text-text-secondary">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                const sel = day && (isSelected(day, "in") || isSelected(day, "out"));
                const inRange = day ? isInRange(day) : false;
                return (
                  <td key={di} className="py-1 text-center">
                    {day ? (
                      <button
                        type="button"
                        onClick={() => onSelectDate?.(year, monthIndex, day)}
                        aria-label={`${MONTH_NAMES[monthIndex]} ${day}, ${year}`}
                        aria-pressed={!!sel}
                        className={["h-9 w-9 rounded-full text-meta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                          sel ? "bg-text-primary text-white" : inRange ? "bg-border-light text-text-primary" : "hover:bg-border-light text-text-primary"].join(" ")}
                      >{day}</button>
                    ) : <span />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Amenity { icon: ReactNode; label: string; disabled?: boolean; }
const AMENITIES: Amenity[] = [
  { icon: <KitchenIcon className="h-6 w-6" />, label: "Kitchen" },
  { icon: <WifiIcon className="h-6 w-6" />, label: "Wifi" },
  { icon: <WorkspaceIcon className="h-6 w-6" />, label: "Dedicated workspace" },
  { icon: <ParkingIcon className="h-6 w-6" />, label: "Free parking on premises" },
  { icon: <PoolIcon className="h-6 w-6" />, label: "Pool" },
  { icon: <HotTubIcon className="h-6 w-6" />, label: "Hot tub" },
  { icon: <PawIcon className="h-6 w-6" />, label: "Pets allowed" },
  { icon: <SecurityCameraIcon className="h-6 w-6" />, label: "Exterior security cameras on property" },
  { icon: <CoAlarmIcon className="h-6 w-6" />, label: "Carbon monoxide alarm", disabled: true },
  { icon: <SmokeAlarmIcon className="h-6 w-6" />, label: "Smoke alarm", disabled: true },
];

interface AmenitiesProps { onToast: (message: string) => void; }

/**
 * "Where you'll sleep" + "What this place offers" + interactive calendar.
 * FIXES: location is Candolim (not Alibaug); calendar month nav works;
 * dates are clickable to set check-in / checkout.
 */
export function Amenities({ onToast }: AmenitiesProps) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [checkedIn, setCheckedIn] = useState<DateVal | null>({ year: 2026, month: 10, day: 12 });
  const [checkedOut, setCheckedOut] = useState<DateVal | null>({ year: 2026, month: 10, day: 16 });
  const [selectingCheckout, setSelectingCheckout] = useState(false);

  const base = 2026 * 12 + 10 + monthOffset; // Nov 2026 base
  const leftYear = Math.floor(base / 12);
  const leftMonth = base % 12;
  const rightYear = Math.floor((base + 1) / 12);
  const rightMonth = (base + 1) % 12;

  function handleSelectDate(year: number, month: number, day: number) {
    if (!selectingCheckout || !checkedIn) {
      setCheckedIn({ year, month, day });
      setCheckedOut(null);
      setSelectingCheckout(true);
      onToast(`✅ Check-in set to ${MONTH_NAMES[month]} ${day}`);
    } else {
      const inTime = new Date(checkedIn.year, checkedIn.month, checkedIn.day).getTime();
      const outTime = new Date(year, month, day).getTime();
      if (outTime <= inTime) {
        setCheckedIn({ year, month, day });
        setCheckedOut(null);
        onToast(`✅ Check-in updated to ${MONTH_NAMES[month]} ${day}`);
      } else {
        setCheckedOut({ year, month, day });
        setSelectingCheckout(false);
        const nights = Math.round((outTime - inTime) / 86400000);
        onToast(`🎉 ${nights} night${nights !== 1 ? "s" : ""} selected! Checkout: ${MONTH_NAMES[month]} ${day}`);
      }
    }
  }

  const nights = checkedIn && checkedOut
    ? Math.round((new Date(checkedOut.year, checkedOut.month, checkedOut.day).getTime() - new Date(checkedIn.year, checkedIn.month, checkedIn.day).getTime()) / 86400000)
    : 4;

  const checkInLabel = checkedIn ? `${checkedIn.day} ${MONTH_NAMES[checkedIn.month].slice(0, 3)} ${checkedIn.year}` : "Select check-in";
  const checkOutLabel = checkedOut ? `${checkedOut.day} ${MONTH_NAMES[checkedOut.month].slice(0, 3)} ${checkedOut.year}` : "Select checkout";

  return (
    <div className="w-full py-8">
      <div className="flex flex-col gap-6">

        {/* Where you'll sleep */}
        <div className="flex flex-col gap-4">
          <h2 className="text-heading font-semibold text-text-primary">Where you&apos;ll sleep</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SLEEP_CARDS.map((card) => (
              <div key={card.room} className="flex flex-col gap-3">
                <PlaceholderImage label={card.room} seed="sleep-card" className="aspect-[3/2] w-full overflow-hidden rounded-card" />
                <div className="flex flex-col">
                  <span className="text-body font-semibold text-text-primary">{card.room}</span>
                  <span className="text-body text-text-secondary">{card.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border-light" />

        {/* What this place offers */}
        <div className="flex flex-col gap-6">
          <h2 className="text-heading font-semibold text-text-primary">What this place offers</h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            {AMENITIES.map((amenity) => (
              <li key={amenity.label} className="flex items-center gap-4" {...(amenity.disabled ? { "aria-label": `${amenity.label} (not available)` } : {})}>
                <span className={amenity.disabled ? "shrink-0 text-text-muted" : "shrink-0 text-text-primary"} aria-hidden="true">{amenity.icon}</span>
                <span className={amenity.disabled ? "text-body text-text-muted line-through" : "text-body text-text-primary"} aria-hidden={amenity.disabled ? "true" : undefined}>{amenity.label}</span>
                {amenity.disabled && <span className="sr-only">(not available)</span>}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-fit rounded-card" onClick={() => onToast("📋 All 50 amenities would open in a panel!")}>
            Show all 50 amenities
          </Button>
        </div>

        <div className="border-t border-border-light" />

        {/* Interactive calendar — location FIXED to Candolim */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h2 className="text-heading font-semibold text-text-primary">
              {nights} night{nights !== 1 ? "s" : ""} in Candolim
            </h2>
            <span className="text-body text-text-secondary">{checkInLabel} – {checkOutLabel}</span>
            {selectingCheckout && (
              <span className="mt-1 text-meta font-medium text-brand">👆 Now tap a checkout date</span>
            )}
          </div>

          {/* Responsive: stacked on mobile, side-by-side on md+ */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12">
            <MonthCalendar year={leftYear} monthIndex={leftMonth} showPrev onPrev={() => setMonthOffset((o) => o - 1)}
              checkedIn={checkedIn} checkedOut={checkedOut} onSelectDate={handleSelectDate} />
            <MonthCalendar year={rightYear} monthIndex={rightMonth} showNext onNext={() => setMonthOffset((o) => o + 1)}
              checkedIn={checkedIn} checkedOut={checkedOut} onSelectDate={handleSelectDate} />
          </div>
        </div>

      </div>
    </div>
  );
}
