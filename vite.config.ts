import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      localsConvention: "dashes", // Разрешаем имена классов с тире и нижними подчёркиваниями
    },
    preprocessorOptions: {
      scss: {
        additionalData: (content: string, resourcePath: string) => {
          if (/App\.scss$/.test(resourcePath)) {
            return `
              @import "./variables/utils/mixin.scss";
              @import "./variables/utils/variables.scss";
              ${content}
            `;
          }

          return `
            @import "@/app/styles/variables/utils/mixin.scss";
            @import "@/app/styles/variables/utils/variables.scss";
            ${content}
          `;
        },
      },
    },
  },
  server: {
    port: 3000, // Устанавливаем порт 3000
  },
});
