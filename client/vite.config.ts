import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { presetUno } from "unocss";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    UnoCSS({
      presets: [presetUno()],
      include: [/\.tsx?$/, /\.jsx?$/],
    }),
  ],
});
