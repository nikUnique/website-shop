import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
};

export default nextConfig;
