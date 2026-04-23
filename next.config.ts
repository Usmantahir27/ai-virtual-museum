import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactCompiler: true,
  ...(isGitHubPages && {
    output: "export",
    basePath: "/virtual-museum",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
