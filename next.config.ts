import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  serverExternalPackages: ["@xenova/transformers"],
  // Turbopack config (Next.js 16 default) — no webpack config needed
  turbopack: {},
};

export default nextConfig;
