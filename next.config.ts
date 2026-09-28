import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Free-license stock photos (Unsplash) standing in for real listing
    // photography — no licensed photos of the actual reference listing
    // exist for this clone, and Unsplash's license permits free use with
    // no attribution required, unlike arbitrary images found via search.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
