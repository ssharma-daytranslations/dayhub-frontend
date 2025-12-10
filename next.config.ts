import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  // If we had the proxy:
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:5000/api/:path*', // Default express port
  //     },
  //   ]
  // },
  env: {
    VITE_FRONTEND_FORGE_API_KEY: process.env.VITE_FRONTEND_FORGE_API_KEY,
    VITE_FRONTEND_FORGE_API_URL: process.env.VITE_FRONTEND_FORGE_API_URL,
    VITE_ANALYTICS_ENDPOINT: process.env.VITE_ANALYTICS_ENDPOINT,
    VITE_ANALYTICS_WEBSITE_ID: process.env.VITE_ANALYTICS_WEBSITE_ID,
    VITE_OAUTH_PORTAL_URL: process.env.VITE_OAUTH_PORTAL_URL,
    VITE_APP_ID: process.env.VITE_APP_ID,
  },
};

export default nextConfig;
