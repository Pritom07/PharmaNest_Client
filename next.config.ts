import type { NextConfig } from "next";
import { env } from "./env";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
