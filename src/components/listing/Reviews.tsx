"use client";

import { useId, useState, type ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20c7-.5 11-4.5 12.5-12-7 .5-11 4.5-12.5 12Z" />
      <path d="M7 17c4.5-1 7.5-3.5 9-8-4.5 1-7.5 3.5-9 8Z" opacity="0.55" />
      <path d="M10 14c2.5-.7 4.2-2.2 5-4.8-2.5.7-4.2 2.2-5 4.8Z" opacity="0.3" />
    </svg>
  );
}

function CleanlinessIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M9 3h3v3H9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 6h5l2 3v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 12l-1.5-1.5M6 15l-2-1M6 18l-1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AccuracyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 12.5l2.3 2.3 4.7-5.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CommunicationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M4 5.5h16v10H10l-4 3.5v-3.5H4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ValueIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 4h7v7l-9 9-7-7 9-9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="16" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ComfortChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M4 14V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 14h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 19v2M19 19v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HostChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PoolChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 17c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1M3 21c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 11V5a2 2 0 0 1 4 0v6M13 11V5a2 2 0 0 1 4 0v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function NatureChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 21V11M12 11c-2-2-5-2-7 0 0 4 3 6 7 6M12 8c2-2 5-2 7 0 0 4-3 6-7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

interface RatingCategory {
  label: string;
  value: number;
  icon: ReactNode;
}

const RATING_BREAKDOWN: RatingCategory[] = [
  { label: "Cleanliness", value: 4.9, icon: <CleanlinessIcon className="h-6 w-6" /> },
  { label: "Accuracy", value: 4.9, icon: <AccuracyIcon className="h-6 w-6" /> },
  { label: "Check-in", value: 5.0, icon: <CheckInIcon className="h-6 w-6" /> },
  { label: "Communication", value: 5.0, icon: <CommunicationIcon className="h-6 w-6" /> },
  { label: "Location", value: 4.8, icon: <LocationIcon className="h-6 w-6" /> },
  { label: "Value", value: 4.8, icon: <ValueIcon className="h-6 w-6" /> },
];

const OVERALL_HISTOGRAM = [
  { score: 5, pct: 90 },
  { score: 4, pct: 8 },
  { score: 3, pct: 2 },
  { score: 2, pct: 0 },
  { score: 1, pct: 0 },
];

interface CategoryChip {
  label: string;
  icon: ReactNode;
  count: number;
}

const CATEGORY_CHIPS: CategoryChip[] = [
  { label: "Cleanliness", icon: <CleanlinessIcon className="h-4 w-4" />, count: 48 },
  { label: "Comfort", icon: <ComfortChipIcon className="h-4 w-4" />, count: 35 },
  { label: "Friendly host", icon: <HostChipIcon className="h-4 w-4" />, count: 32 },
  { label: "Private Jacuzzi", icon: <PoolChipIcon className="h-4 w-4" />, count: 29 },
  { label: "Serene ambiance", icon: <NatureChipIcon className="h-4 w-4" />, count: 24 },
  { label: "Well equipped", icon: <CleanlinessIcon className="h-4 w-4" />, count: 21 },
  { label: "Great location", icon: <LocationIcon className="h-4 w-4" />, count: 18 },
  { label: "Smooth check-in", icon: <CheckInIcon className="h-4 w-4" />, count: 16 },
];

interface Review {
  name: string;
  tenure: string;
  photo?: string;
  rating: number;
  date: string;
  text: string;
  truncatable?: boolean;
}

const REVIEWS: Review[] = [
  {
    name: "Aakash",
    tenure: "3 years on Airbnb",
    rating: 5,
    date: "October 2026",
    text: "The jacuzzi on the private terrace made our Candolim trip unforgettable! Very clean, stylishly done up, and the host was super responsive. Highly recommended for couples.",
    truncatable: false,
  },
  {
    name: "Sneha",
    tenure: "5 years on Airbnb",
    rating: 5,
    date: "September 2026",
    text: "Spotless apartment and walkable to Candolim beach. The kitchen was stocked with essentials and the Wi-Fi speed was blazing fast for remote work. Will definitely come back!",
    truncatable: false,
  },
  {
    name: "Rohan & Priya",
    tenure: "2 years on Airbnb",
    rating: 5,
    date: "August 2026",
    text: "We stayed for 4 nights and had a wonderful time. The bed was comfortable, air conditioning worked perfectly, and the sunset views from the terrace jacuzzi are magical. Mirashya's hospitality was top-tier.",
    truncatable: true,
  },
  {
    name: "Michael",
    tenure: "7 years on Airbnb",
    rating: 5,
    date: "July 2026",
    text: "One of the best stays in North Goa! Peaceful, secure complex with great restaurants nearby on Fort Aguada road.",
    truncatable: false,
  },
];

function OverallRatingBars() {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[140px]">
      {OVERALL_HISTOGRAM.map((item) => (
        <div key={item.score} className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="w-2">{item.score}</span>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-border-light">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-text-primary"
              style={{ width: `${item.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const textId = useId();

  return (
    <li className="flex flex-col gap-3 rounded-card p-2 md:p-0">
      <div className="flex items-center gap-3">
        <Avatar name={review.name} src={review.photo} size={48} />
        <div className="flex flex-col">
          <span className="text-card-title font-semibold text-text-primary">
            {review.name}
          </span>
          <span className="text-meta text-text-secondary">{review.tenure}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-meta text-text-secondary">
        <StarRating rating={review.rating} size={10} />
        <span aria-hidden="true">&middot;</span>
        <span>{review.date}</span>
      </div>

      <div className="flex flex-col gap-1">
        <p
          id={textId}
          className={
            review.truncatable && !expanded
              ? "text-body text-text-primary line-clamp-3"
              : "text-body text-text-primary"
          }
        >
          {review.text}
        </p>

        {review.truncatable ? (
          <button
            type="button"
            className="flex w-fit items-center gap-1 rounded-sm text-body font-semibold text-text-primary underline underline-offset-2 transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-expanded={expanded}
            aria-controls={textId}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        ) : null}
      </div>
    </li>
  );
}

interface ReviewsProps {
  onToast?: (message: string) => void;
}

export function Reviews({ onToast }: ReviewsProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  function handleChipClick(label: string) {
    if (selectedChip === label) {
      setSelectedChip(null);
      onToast?.("Filter cleared — showing all reviews");
    } else {
      setSelectedChip(label);
      onToast?.(`Filtered by "${label}"`);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 md:px-10 py-8">
      <div className="flex flex-col gap-8 border-t border-border-light pt-8">
        {/* Big stat + guest favourite */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-4 text-text-primary">
            <LeafIcon className="h-10 w-10 text-brand" />
            <span className="text-stat font-semibold text-text-primary">4.95</span>
            <LeafIcon className="h-10 w-10 text-brand -scale-x-100" />
          </div>
          <h2 className="text-heading font-semibold text-text-primary">Guest favourite</h2>
          <p className="max-w-md text-body text-text-secondary">
            One of the most loved homes on Airbnb based on ratings, reviews, and reliability
          </p>
          <button
            type="button"
            className="rounded-sm text-body font-semibold text-text-primary underline underline-offset-2 transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={() => onToast?.("📖 Verified reviews guidelines modal would open here")}
          >
            How reviews work
          </button>
        </div>

        {/* Rating breakdown — fully responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 border-t border-border-light pt-8">
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
            <span className="text-body font-semibold text-text-primary">Overall rating</span>
            <OverallRatingBars />
          </div>
          {RATING_BREAKDOWN.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="text-body font-semibold text-text-primary">{item.label}</span>
              <span className="text-card-title font-semibold text-text-primary">
                {item.value.toFixed(1)}
              </span>
              <span className="text-text-primary" aria-hidden="true">
                {item.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Category chip row */}
        <div className="border-t border-border-light pt-6">
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div
              className="flex w-max gap-3"
              role="list"
              aria-label="Review highlight categories"
            >
              {CATEGORY_CHIPS.map((chip) => {
                const isActive = selectedChip === chip.label;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleChipClick(chip.label)}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-pill"
                  >
                    <Badge
                      role="listitem"
                      icon={<span className="text-text-primary">{chip.icon}</span>}
                      count={chip.count}
                      className={`shrink-0 cursor-pointer transition-all ${
                        isActive
                          ? "!border-text-primary !bg-text-primary !text-surface font-semibold"
                          : "hover:border-text-primary"
                      }`}
                    >
                      {chip.label}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review cards — responsive 1 col on mobile, 2 col on md+ */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-border-light pt-8">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </ul>
      </div>
    </div>
  );
}
