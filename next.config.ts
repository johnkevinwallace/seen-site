import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
};

// Disable Vercel toolbar
process.env.VERCEL_DEPLOYMENT_ID = "";

export default nextConfig;