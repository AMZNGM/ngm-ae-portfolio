import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [
    react({
      babel: {
        plugins: [command === "build" && ["transform-remove-console", { exclude: ["error", "warn"] }]].filter(Boolean),
      },
    }),
    tailwindcss(),
  ],
  // base: command === "build" ? "/ngm-ae-portfolio/" : "/",
  base: "/ngm-ae-portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["gsap", "lenis"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "gsap", "lenis"],
  },
}));
