import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "cm.config.ts": path.resolve(__dirname, "cm.config.ts"),
      "cm.fetcher.ts": path.resolve(__dirname, "cm.fetcher.ts"),
      "cm.persister.ts": path.resolve(__dirname, "cm.persister.ts"),
    },
  },
});
