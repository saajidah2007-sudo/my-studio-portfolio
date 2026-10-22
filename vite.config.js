import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: resolve(process.cwd(), "portfolio.html"),
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "assets/[name][extname]"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
});
