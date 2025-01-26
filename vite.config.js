import { defineConfig } from "vite"

export default defineConfig({
  base: '/timing-bookmarklet/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    target: 'es6',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        format: 'iife',
      },
    },
    noExternal: true,
  },
});
