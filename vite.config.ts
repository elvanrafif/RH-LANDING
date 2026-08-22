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
  // Dev talks to Directus same-origin through this proxy, so localhost does not
  // have to be added to the server's CORS_ORIGIN just to run `vite dev`.
  server: {
    proxy: {
      '/cms': {
        target: 'https://cms.rhstudioarsitek.my.id',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cms/, ''),
      },
    },
  },
})
