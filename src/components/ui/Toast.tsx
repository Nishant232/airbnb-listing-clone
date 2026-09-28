/**
 * Toast notification stack — renders in the bottom-right corner (above the
 * mobile booking bar on small screens via bottom-24 md:bottom-4). Each toast
 * auto-dismisses after 3 s (timeout managed by page.tsx) and can be closed
 * early by clicking the × button.
 *
 * Rendered OUTSIDE the inert <main> element so toasts remain visible and
 * interactive even while a Photo Tour / Lightbox overlay is open.
 */

interface ToastItem {
  id: number;
  message: string;
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

export function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-24 right-4 z-[150] flex flex-col gap-2 md:bottom-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="flex items-center justify-between gap-4 rounded-card bg-text-primary px-4 py-3 text-body font-medium text-white shadow-modal"
        >
          <span>{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
