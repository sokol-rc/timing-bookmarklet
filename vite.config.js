import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  base: '/timing-bookmarklet/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // inlineDynamicImports: true,
        format: 'iife',
        entryFileNames: 'script.js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
