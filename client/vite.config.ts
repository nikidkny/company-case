import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { presetUno } from "unocss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [presetUno()],
      include: [/\.tsx?$/, /\.jsx?$/],
    }),
  ],
});
