import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set NEXT_OUTPUT=standalone (the Dockerfile does) to emit a self-contained
  // server in .next/standalone. Left unset, the default build is unchanged.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
};

export default nextConfig;
