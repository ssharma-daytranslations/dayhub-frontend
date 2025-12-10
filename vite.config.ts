import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";

import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// Set default env vars to suppress warnings and runtime errors if .env is missing
process.env.VITE_ANALYTICS_ENDPOINT = process.env.VITE_ANALYTICS_ENDPOINT || "";
process.env.VITE_ANALYTICS_WEBSITE_ID = process.env.VITE_ANALYTICS_WEBSITE_ID || "";
process.env.VITE_OAUTH_PORTAL_URL = process.env.VITE_OAUTH_PORTAL_URL || "https://auth.example.com";
process.env.VITE_APP_ID = process.env.VITE_APP_ID || "dev-app-id";

const plugins = [react(), tailwindcss(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
