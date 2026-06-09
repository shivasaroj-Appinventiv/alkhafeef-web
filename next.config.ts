import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.alkhafeef.com.sa',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-image.alkhafeef.com.sa',
        pathname: '/**',
      }
    ],
    // Optimize images for production
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
