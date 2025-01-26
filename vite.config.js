import { defineConfig } from "vite"

export default defineConfig({
  base: '/timing-bookmarklet/',  // Указываем имя репозитория
  build: {
    outDir: 'dist'
  }
});
