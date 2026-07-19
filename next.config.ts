import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "f004.backblazeb2.com",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-003.backblazeb2.com",
        pathname: "/**",
      },
      
    ],
  },
};

export default nextConfig;