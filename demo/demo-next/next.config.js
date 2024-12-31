/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const path = require("path");
    config.resolve.alias = {
      ...config.resolve.alias,
      "cm.config.ts": path.resolve(__dirname, "cm.config.ts"),
      "cm.fetcher.ts": path.resolve(__dirname, "cm.fetcher.ts"),
      "cm.persister.ts": path.resolve(__dirname, "cm.persister.ts"),
    };
    return config;
  },
};

module.exports = nextConfig;
