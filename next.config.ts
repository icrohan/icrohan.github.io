import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages: `next build` writes the whole site to /out.
 * BASE_PATH is only needed when the site is served from a sub-path
 * (e.g. github.io/<repo>); for a <user>.github.io repo it stays empty.
 */
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
};

export default nextConfig;
