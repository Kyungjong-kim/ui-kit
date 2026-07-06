import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Showcase SPA — 라이브러리 tsup 빌드와 완전 분리된 별도 Vite 앱.
// ui-kit 소스는 `@ui` alias(../src)로 직접 import 한다.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@ui": fileURLToPath(new URL("../src", import.meta.url)),
    },
  },
  server: {
    port: 5180,
  },
  build: {
    outDir: fileURLToPath(new URL("../showcase-dist", import.meta.url)),
    emptyOutDir: true,
  },
});
