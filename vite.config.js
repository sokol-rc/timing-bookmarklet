import { defineConfig } from "vite"

export default defineConfig({
  base: '/',  // Указываем имя репозитория
  build: {
    outDir: 'dist'
  }
});
