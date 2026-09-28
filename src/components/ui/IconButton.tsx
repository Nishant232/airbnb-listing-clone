import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "ghost" | "elevated" | "outline";

type IconButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  /**
   * `ghost` — transparent at rest with a light gray hover background, used
   * for chrome-style icons that sit directly on a white surface (header
   * hamburger/globe, modal close button).
   *
   * `elevated` — white circular background with a soft shadow, used for
   * icon buttons that float on top of non-white content (map zoom
   * controls, the map's search button).
   *
   * `outline` — thin bordered circle, transparent/white fill, no shadow —
   * used for controls that sit directly on plain white page background but
   * still need a visible boundary (e.g. a card carousel's prev/next pager).
   */
  variant?: IconButtonVariant;
};

// This component is exclusively icon-only (no visible text), so an
// `aria-label` is required at the type level — same enforcement pattern as
// `Button`'s `icon` variant.
export type IconButtonProps = IconButtonBaseProps & { "aria-label": string };

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: "bg-transparent text-text-primary hover:bg-border-light",
  elevated: "bg-surface text-text-primary shadow-card hover:bg-border-light",
  outline: "bg-surface text-text-primary border border-border-default hover:border-text-primary",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          focusRing,
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";
