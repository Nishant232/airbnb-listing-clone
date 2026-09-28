import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  variant?: ButtonVariant;
  /**
   * Renders the button as a circular icon-only control (e.g. the pink
   * magnifying-glass search button in the header search pill) — sized to
   * just the icon, no text padding.
   */
  icon?: boolean;
};

// When `icon` is true the button has no visible text, so an `aria-label`
// is required at the type level. Otherwise it stays optional.
export type ButtonProps =
  | (ButtonBaseProps & { icon?: false; "aria-label"?: string })
  | (ButtonBaseProps & { icon: true; "aria-label": string });

const variantClasses: Record<ButtonVariant, string> = {
  // Rest state is a left-to-right gradient (--gradient-brand in globals.css,
  // pixel-sampled from reference/listing-page/01-title-host-highlights-booking-card.png
  // — confirmed via pixel-reviewer this is present at rest, not hover-only).
  // Hover darkens via brightness rather than a second hardcoded gradient,
  // since exact hover-gradient values aren't documented in reference/.
  // Only applies to the full pill (text) button — the small icon-only search
  // button uses a flat fill instead (see iconVariantClasses below); pixel-
  // sampling reference/listing-page/00-hero-header-gallery.png shows it's
  // solid #FF385C, not a gradient — too small for the gradient to read.
  primary: "bg-[image:var(--gradient-brand)] text-white hover:brightness-95",
  secondary: "bg-text-primary text-white hover:opacity-90",
  outline:
    "bg-white text-text-primary border border-border-default hover:border-text-primary",
  ghost: "bg-transparent text-text-primary hover:bg-border-light",
};

const iconVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-text-primary text-white hover:opacity-90",
  outline:
    "bg-white text-text-primary border border-border-default hover:border-text-primary",
  ghost: "bg-transparent text-text-primary hover:bg-border-light",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", icon = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // `transition-colors` alone doesn't cover `filter` (used by the
          // primary variant's `hover:brightness-95`) — hover audit found
          // Reserve's hover snapped instantly instead of easing like every
          // other button on the page, since Tailwind's transition-colors
          // property list excludes filter.
          "inline-flex items-center justify-center font-semibold transition-[color,background-color,border-color,filter] disabled:cursor-not-allowed disabled:opacity-50",
          focusRing,
          icon
            ? "h-8 w-8 shrink-0 rounded-pill"
            : "rounded-pill px-6 py-3 text-body",
          icon ? iconVariantClasses[variant] : variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
