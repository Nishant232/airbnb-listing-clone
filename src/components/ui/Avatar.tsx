import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  /** Full name of the person/host this avatar represents. Used both for the
   * initial-letter fallback and as the `<Image>` alt text — never a generic
   * "avatar" string. */
  name: string;
  size?: number;
  verified?: boolean;
  className?: string;
}

/**
 * Small fixed set of flat background/text color pairs for the initial-letter
 * fallback, sampled from the reference review-card and co-host avatars
 * (e.g. peach for "Amit", lavender for "Vedant", pink for "Shruti", blue for
 * "Amisha") — see src/lib/design-tokens.ts `avatarPalette` and the matching
 * `--color-avatar-*` tokens in globals.css. A name is hashed to deterministically
 * pick one of 4 pairs, so the same person always renders the same color
 * instead of a single flat neutral gray (which under-represents the variety
 * visible in the reference) or fully random colors (which would flicker
 * between renders/pages).
 */
const AVATAR_BG_CLASSES = [
  "bg-avatar-1-bg text-avatar-1-text",
  "bg-avatar-2-bg text-avatar-2-text",
  "bg-avatar-3-bg text-avatar-3-text",
  "bg-avatar-4-bg text-avatar-4-text",
];

function paletteClassFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % AVATAR_BG_CLASSES.length;
  return AVATAR_BG_CLASSES[index];
}

export function Avatar({ src, name, size = 48, verified, className }: AvatarProps) {
  return (
    <span
      className={cn("relative inline-block shrink-0 rounded-full", className)}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={`${size}px`}
          className="rounded-full object-cover"
        />
      ) : (
        <span
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full text-sm font-medium",
            paletteClassFor(name)
          )}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>
      )}
    </span>
  );
}
