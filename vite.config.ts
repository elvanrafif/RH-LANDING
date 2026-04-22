import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 90 },
      jpg: { quality: 90 },
      jpeg: { quality: 90 },
      webp: { lossless: true },
    }),
  ],
})
