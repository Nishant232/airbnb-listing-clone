import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  description:
    "Entire serviced apartment in Candolim, Goa, India. Private jacuzzi, pool, free parking. 4.95★ rated — 19 reviews. Hosted by Mirashya Homes.",
  openGraph: {
    title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
    description:
      "Entire serviced apartment in Candolim, Goa, India. Private jacuzzi, pool, free parking. 4.95★ rated.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
    description: "Entire serviced apartment in Candolim, Goa. 4.95★ · 19 reviews.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Skip-to-content — first focusable element, only visible on focus
            so keyboard / screen-reader users can jump past the header without
            tabbing through every nav item. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-card focus:bg-text-primary focus:px-4 focus:py-2 focus:text-body focus:font-semibold focus:text-white focus:shadow-modal focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
