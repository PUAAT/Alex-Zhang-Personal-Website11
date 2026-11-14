import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Silence the "multiple lockfiles / workspace root" warning.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add your Supabase Storage host here once the CMS is configured, e.g.
    // { protocol: "https", hostname: "<project-ref>.supabase.co" }
    remotePatterns: [],
  },
};

export default nextConfig;
